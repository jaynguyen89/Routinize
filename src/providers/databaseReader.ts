import SQLite from 'react-native-sqlite-storage';
import { DATABASE_TABLES, DATETIME_FORMATS, STORAGE_KEYS, THEMES, UNIT_SYSTEMS } from '../shared/enums';
import AsyncStorage from '@react-native-community/async-storage';
import ISettings from '../models/ISettings';
import ITodo from '../models/ITodo';
import moment from 'moment';

SQLite.enablePromise(false);
const DB_TIMESTAMP_FORMAT : string = DATETIME_FORMATS.COMPACT_H_DMY;

const connection = {
    database : SQLite.openDatabase({
            name: 'routinizeDb',
            location: 'default',
            createFromLocation: '~routinizeDb.db'
        },
        () => console.log('Database connected successfully.'),
        error => console.log(error)
    )
};

export const insertTodo = async (table : DATABASE_TABLES, data : ITodo) : Promise<number> => {
    const query = getInsertQuery(table);
    const result : any = await executeQuery(query, [
        data.emphasized ? 1 : 0,
        data.title,
        data.description,
        data.details,
        moment().format(DB_TIMESTAMP_FORMAT),
        moment(data.dueDate).format(DB_TIMESTAMP_FORMAT)
    ]);

    if (result.rowsAffected !== 0) return result.insertId;
    return 0;
};

export const updateTodo = async (table : DATABASE_TABLES, data : ITodo) : Promise<boolean> => {
    const query = getUpdateQuery(table);
    const result : any = await executeQuery(query, [
        data.emphasized ? 1 : 0,
        data.title,
        data.description,
        data.details,
        moment().format(DB_TIMESTAMP_FORMAT),
        moment(data.dueDate).format(DB_TIMESTAMP_FORMAT),
        (data.doneDate && moment(data.doneDate).format(DB_TIMESTAMP_FORMAT)) || null
    ]);

    return result.rowsAffected !== 0;
};

export const deleteEntry = async (table : DATABASE_TABLES, id : number) : Promise<boolean> => {
    const query = `DELETE FROM "${ table }" WHERE "id" = ${ id };`;
    const result : any = await executeQuery(query);

    return result.rowsAffected !== 0;
};

export const getSettingsFromAsyncStorage = async (key : STORAGE_KEYS) : Promise<any> => {
    let entry : any | null | undefined = null;
    const setEntry = (val: any) => { entry = val; };

    try {
        await AsyncStorage.getItem(`${ key }`)
            .then(response => { return response; })
            .then(data => { setEntry(data); });

        if (entry === null)
            entry = {
                theme : THEMES.SKY,
                isPremium : false,
                todoUnlocked : false,
                notesUnlocked : false,
                collabUnlocked : false,
                shouldHideAds : false,
                premiumUntil : null,
                unlockedUntil : null,
                dateTimeFormat : DATETIME_FORMATS.FRIENDLY_DMY,
                unitSystem : UNIT_SYSTEMS.INTERNATIONAL
            } as ISettings;
    } catch (e) {
        console.log(e);
    }

    return entry;
};

export const getEntry = async (table : DATABASE_TABLES, id : number) : Promise<any> => {
    const query = `SELECT * FROM ${ table } WHERE "id" = ${ id }`;
    const result : any = await executeQuery(query);

    if (result.rowsAffected !== 0) return result.rows.item(0);
    return null;
}

export const getData = async (table : DATABASE_TABLES): Promise<Array<any> | any> => {
    let dbData : Array<any> | any = [];
    const setData = (val : any[] | any) => { dbData = val; };

    const results : any = await executeQuery(`SELECT * FROM ${ table }`);
    if (
        table === DATABASE_TABLES.AUTH ||
        table === DATABASE_TABLES.USER ||
        table === DATABASE_TABLES.SETTINGS
    )
        setData(results.rows.item(0));
    else {
        let data : Array<any> = [];
        for (let i = 0; i < results.rows.length; i++)
            data.push(results.rows.item(i));

        setData(data);
    }

    return dbData;
};

export const executeRaw = async (query : string) : Promise<any> => {
    const result : any = await executeQuery(query);
    if (result.rowsAffected === 0) return null;

    let data : Array<any> = [];
    for (let i = 0; i < result.rows.length; i++)
        data.push(result.rows.item(i));

    return data;
};

const executeQuery = (query : string, params : Array<any> = []) =>
    new Promise((resolve, reject) => {
        connection.database.transaction(tx => {
            tx.executeSql(
                query,
                params,
                (tx, results) => resolve(results),
                error => reject(error)
            );
        });
    });

const getInsertQuery = (table : DATABASE_TABLES) : string => {
    return table === DATABASE_TABLES.TODOS ? 'INSERT INTO "todos" ("emphasized", "title", "description", "details", "createdOn", "dueDate") VALUES (?, ?, ?, ?, ?, ?);' : (
           table === DATABASE_TABLES.SEGMENTS ? 'INSERT INTO "noteSegments" ("noteId", "body") VALUES (?, ?);' : (
               table === DATABASE_TABLES.USER ? 'INSERT INTO "user" ("email", "username", "avatar", "uniqueId", "firstName", "lastName", "shortName", "gender", "phoneNumber") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);' : (
                   table === DATABASE_TABLES.AUTH ? 'INSERT INTO "auth" ("email", "sessionId", "authToken", "timeStamp") VALUES (?, ?, ?, ?);' : (
                       table === DATABASE_TABLES.ADDRESS ? 'INSERT INTO "address" ("addressName", "building", "street", "suburb", "postcode", "state", "country", "latitude", "longitude") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);' : (
                           table === DATABASE_TABLES.NOTES ? 'INSERT INTO "notes" ("emphasized", "title", "createdOn") VALUES (?, ?, ?);'
                                                           : 'INSERT INTO "attachments" ("type", "assetId", "assetType", "name", "url") VALUES (?, ?, ?, ?, ?);'
                       )
                   )
               )
           )
    );
}

const getUpdateQuery = (table : DATABASE_TABLES) : string => {
    return table === DATABASE_TABLES.TODOS ? 'UPDATE "todos" SET "emphasized" = ?, "title" = ?, "description" = ?, "details" = ?, "createdOn" = ?, "dueDate" = ?, "doneDate" = ? WHERE "id" = ?;' : (
        table === DATABASE_TABLES.SEGMENTS ? 'UPDATE "noteSegments" SET "body" = ? WHERE "id" = ?;' : (
            table === DATABASE_TABLES.USER ? 'UPDATE "user" SET "email" = ?, "username" = ?, "avatar" = ?, "uniqueId" = ?, "firstName" = ?, "lastName" = ?, "shortName" = ?, "gender" = ?, "phoneNumber" = ?;' : (
                table === DATABASE_TABLES.AUTH ? 'UPDATE "auth" SET "email" = ?, "sessionId" = ?, "authToken" = ?, "timeStamp" = ?;' : (
                    table === DATABASE_TABLES.ADDRESS ? 'UPDATE "address" SET "addressName" = ?, "building" = ?, "street" = ?, "suburb" = ?, "postcode" = ?, "state" = ?, "country" = ?, "latitude" = ?, "longitude" = ? WHERE "id" = ?;' : (
                        table === DATABASE_TABLES.NOTES ? 'UPDATE "notes" SET "emphasized" = ?, "title" = ?, "createdOn" = ? WHERE "id" = ?;'
                            : 'UPDATE "attachments" SET "type" = ?, "name" = ?, "url" = ? WHERE "id" = ?;'
                    )
                )
            )
        )
    );
}