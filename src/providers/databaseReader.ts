import SQLite from 'react-native-sqlite-storage';
import { DATABASE_TABLES, DATETIME_FORMATS, STORAGE_KEYS, THEMES, UNIT_SYSTEMS } from '../shared/enums';
import AsyncStorage from '@react-native-community/async-storage';
import ISettings from '../models/ISettings';
import ITodo from '../models/ITodo';
import moment from 'moment';
import { IFile, IMedia } from '../models/others';
import IAddress from '../models/IAddress';
import INote from '../models/INote';
import { EMPTY_STRING } from '../helpers/Constants';
import INoteSegment from '../models/INoteSegment';

//SQLite.enablePromise(false);
export const DB_TIMESTAMP_FORMAT : string = DATETIME_FORMATS.COMPACT_H_DMY;

const connection = {
    database : SQLite.openDatabase({
            name: 'routinizeDb.db',
            location: 'default',
            createFromLocation: '~routinizeDb.db'
        },
        () => console.log('Database connected successfully.'),
        error => console.log(error)
    )
};

export const insertTodo = async (table : DATABASE_TABLES, data : ITodo) : Promise<number> => {
    const query = getQueryFor(table, 'insert');
    const response : any = await executeQuery(query, [
        data.emphasized ? 1 : 0,
        data.title,
        data.description,
        data.details,
        moment().format(DB_TIMESTAMP_FORMAT),
        moment(data.dueDate).format(DB_TIMESTAMP_FORMAT)
    ]);

    if (response.rowsAffected === 0) return 0;
    await executeQuery('BEGIN TRANSACTION;');

    let insertId = response.insertId;
    let result : boolean = true;

    if (data.attachments) result = await insertAttachments(data.attachments, DATABASE_TABLES.TODOS, insertId);
    if (result && data.places) result = await insertPlaces(data.places, DATABASE_TABLES.TODOS, insertId);

    if (!result) {
        await executeQuery('ROLLBACK; END TRANSACTION;');
        await deleteEntry(table, insertId);
        return 0;
    }

    await executeQuery('COMMIT;');
    return insertId;
};

export const updateTodo = async (table : DATABASE_TABLES, data : ITodo, dtFormat : string) : Promise<number> => {
    await executeQuery('BEGIN TRANSACTION;');

    const query = getQueryFor(table, 'update');
    const response : any = await executeQuery(query, [
        data.emphasized ? 1 : 0,
        data.title,
        data.description,
        data.details,
        moment(data.dueDate, dtFormat).format(DB_TIMESTAMP_FORMAT),
        data.id
    ]);

    if (response.rowsAffected === 0) {
        await executeQuery('ROLLBACK; END TRANSACTION;');
        return -1;
    }

    const newAttachments = data.attachments?.filter(attachment => attachment.id === 0);
    const newPlaces = data.places?.filter(place => place.id === 0);

    let result : boolean = true;
    if (newAttachments) result = await insertAttachments(newAttachments, DATABASE_TABLES.TODOS, data.id);
    if (result && newPlaces) result = await insertPlaces(newPlaces, DATABASE_TABLES.TODOS, data.id);

    if (!result) {
        await executeQuery('ROLLBACK; END TRANSACTION;');
        return 0;
    }

    await executeQuery('COMMIT;');
    return data.id;
};

export const insertNote = async (table : DATABASE_TABLES, data : INote) : Promise<number> => {
    const query = getQueryFor(table, 'insert');
    const response : any = await executeQuery(query, [
        data.emphasized ? 1 : 0,
        data.title,
        moment().format(DB_TIMESTAMP_FORMAT)
    ]);

    if (response.rowsAffected === 0) return 0;
    await executeQuery('BEGIN TRANSACTION;');

    let insertId = response.insertId;
    let result : boolean = true;

    for (let i = 0; i < data.segments.length; i++) {
        const segmentId = await insertNoteSegment(data.segments[i], insertId);

        result = segmentId !== 0;
        if (!result) break;
    }

    if (!result) {
        await executeQuery('ROLLBACK; END TRANSACTION;');
        await deleteEntry(DATABASE_TABLES.NOTES, insertId);
        return 0;
    }

    await executeQuery('COMMIT;');
    return insertId;
}

export const updateNote = async (table : DATABASE_TABLES, data : INote) : Promise<boolean> => {
    await executeQuery('BEGIN TRANSACTION;');

    const query = getQueryFor(table, 'update');
    const result : any = await executeQuery(query, [data.emphasized, data.title, data.id]);

    if (result.rowsAffected === 0) {
        await executeQuery('ROLLBACK; END TRANSACTION;');
        return false;
    }

    const unsavedSegments = data.segments.filter(segment => segment.id === 0);
    let saveSegmentResult : boolean = true;
    for (let i = 0; i < unsavedSegments.length; i++) {
        const segmentId = await insertNoteSegment(unsavedSegments[i], data.id);
        if (segmentId === 0) break;
    }

    if (!saveSegmentResult) {
        await executeQuery('ROLLBACK; END TRANSACTION;');
        return false;
    }

    for (let i = 0; i < data.segments.length; i++) {
        if (data.segments[i].id === 0) continue;

        const segmentToUpdate = data.segments[i];
        const updateSegmentQuery = getQueryFor(DATABASE_TABLES.SEGMENTS, 'update');
        const updateSegmentResult : any = await executeQuery(updateSegmentQuery, [segmentToUpdate.body, segmentToUpdate.id]);

        if (updateSegmentResult.rowsAffected === 0) {
            await executeQuery('ROLLBACK; END TRANSACTION;');
            return false;
        }
    }

    await executeQuery('COMMIT;');
    return true;
}

const insertNoteSegment = async (segment : INoteSegment, noteId : number) : Promise<number> => {
    const query = getQueryFor(DATABASE_TABLES.SEGMENTS);
    const response : any = await executeQuery(query, [noteId, segment.body]);

    if (response.rowsAffected === 0) return 0;

    let insertId : number = response.insertId;
    let result : boolean = true;

    if (segment.places) result = await insertPlaces(segment.places, DATABASE_TABLES.SEGMENTS, insertId);
    if (result && segment.attachments) result = await insertAttachments(segment.attachments, DATABASE_TABLES.SEGMENTS, insertId);

    return !result ? 0 : insertId;
}

export const insertAttachments = async (
    attachments : Array<IMedia | IFile>, assetType : string, assetId : number
) : Promise<boolean> => {
    for (let i = 0; i < attachments.length; i++) {
        const attachment = attachments[i];

        const query = getQueryFor(DATABASE_TABLES.ATTACHMENTS, 'insert');
        const response : any = await executeQuery(query, [
            attachment.type,
            assetId,
            assetType,
            attachment.name || null,
            attachment.url || null
        ]);

        if (response.rowsAffected === 0) return false;
    }

    return true;
}

export const getAttachmentsFor = async (assetType : string, assetId : number) : Promise<any> => {
    const query = `SELECT "id", "type", "name", "url" FROM "attachments" WHERE "assetType" = '${ assetType }' AND "assetId" = ${ assetId };`;
    const response : any = await executeQuery(query);

    if (response.rows.length === 0) return null;

    let data : Array<any> = [];
    for (let i = 0; i < response.rows.length; i++)
        data.push(response.rows.item(i));

    return data;
}

export const insertPlaces = async (
    places : Array<IAddress>, assetType : string, assetId : number
) : Promise<boolean> => {
    for (let i = 0; i < places.length; i++) {
        const address = places[i];

        const addressQuery = getQueryFor(DATABASE_TABLES.ADDRESS, 'insert');
        const addressResponse : any = await executeQuery(addressQuery, [
            address.name,
            address.building,
            address.street,
            address.suburb,
            address.postcode,
            address.state,
            address.country,
            address.coordination.lat,
            address.coordination.long
        ]);

        if (addressResponse.rowsAffected === 0) return false;

        const placeQuery = getQueryFor(DATABASE_TABLES.PLACES, 'insert');
        const placeResponse : any = await executeQuery(placeQuery, [
            addressResponse.insertId,
            assetId,
            assetType
        ]);

        if (placeResponse.rowsAffected === 0) return false;
    }

    return true;
}

export const updateDoneOrEmphasizedFor = async (
    itemId : number, table : DATABASE_TABLES, field : string, isEmphasized : boolean
) : Promise<boolean> => {
    const query = `UPDATE ${ table } SET "${ field }" = ? WHERE "id" = ?;`;
    const response : any = await executeQuery(
        query,
        [field === 'emphasized' ? (isEmphasized ? 0 : 1) : moment().format(DB_TIMESTAMP_FORMAT), itemId]
    );

    return response.rowsAffected !== 0;
}

export const updateTodoAsDoneWithDate = async (itemId : number, date : string) : Promise<boolean> => {
    const query = `UPDATE ${ DATABASE_TABLES.TODOS } SET "doneDate" = ? WHERE "id" = ?;`;
    const response : any = await executeQuery(query, [date, itemId]);

    return response.rowsAffected !== 0;
}

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

const removeInsertedData = (table : DATABASE_TABLES, insertedIds : Array<number>) => {
    insertedIds.forEach(async (id : number) => await deleteEntry(table, id));
}

const getQueryFor = (table : DATABASE_TABLES, task = 'insert') : string => {
    let query = EMPTY_STRING;

    switch (table) {
        case DATABASE_TABLES.NOTES:
            query = task === 'insert' ? 'INSERT INTO "notes" ("emphasized", "title", "createdOn") VALUES (?, ?, ?);'
                                      : 'UPDATE "notes" SET "emphasized" = ?, "title" = ? WHERE "id" = ?;';
            break;
        case DATABASE_TABLES.ATTACHMENTS:
            query = task === 'insert' ? 'INSERT INTO "attachments" ("type", "assetId", "assetType", "name", "url") VALUES (?, ?, ?, ?, ?);'
                                      : 'UPDATE "attachments" SET "type" = ?, "name" = ?, "url" = ? WHERE "id" = ?;';
            break;
        case DATABASE_TABLES.TODOS:
            query = task === 'insert' ? 'INSERT INTO "todos" ("emphasized", "title", "description", "details", "createdOn", "dueDate") VALUES (?, ?, ?, ?, ?, ?);'
                                      : 'UPDATE "todos" SET "emphasized" = ?, "title" = ?, "description" = ?, "details" = ?, "dueDate" = ? WHERE "id" = ?;';
            break;
        case DATABASE_TABLES.PLACES:
            query = task === 'insert' ? 'INSERT INTO "places" ("addressId", "assetId", "assetType") VALUES (?, ?, ?);'
                                      : 'UPDATE places SET "addressId" = ? WHERE "id" = ?;';
            break;
        case DATABASE_TABLES.ADDRESS:
            query = task === 'insert' ? 'INSERT INTO "address" ("addressName", "building", "street", "suburb", "postcode", "state", "country", "latitude", "longitude") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);'
                                      : 'UPDATE "address" SET "addressName" = ?, "building" = ?, "street" = ?, "suburb" = ?, "postcode" = ?, "state" = ?, "country" = ?, "latitude" = ?, "longitude" = ? WHERE "id" = ?;';
            break;
        case DATABASE_TABLES.AUTH:
            query = task === 'insert' ? 'INSERT INTO "auth" ("email", "sessionId", "authToken", "timeStamp") VALUES (?, ?, ?, ?);'
                                      : 'UPDATE "auth" SET "email" = ?, "sessionId" = ?, "authToken" = ?, "timeStamp" = ?;';
            break;
        case DATABASE_TABLES.USER:
            query = task === 'insert' ? 'INSERT INTO "user" ("email", "username", "avatar", "uniqueId", "firstName", "lastName", "shortName", "gender", "phoneNumber") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);'
                                      : 'UPDATE "user" SET "email" = ?, "username" = ?, "avatar" = ?, "uniqueId" = ?, "firstName" = ?, "lastName" = ?, "shortName" = ?, "gender" = ?, "phoneNumber" = ?;';
            break;
        case DATABASE_TABLES.SEGMENTS:
            query = task === 'insert' ? 'INSERT INTO "noteSegments" ("noteId", "body") VALUES (?, ?);'
                                      : 'UPDATE "noteSegments" SET "body" = ? WHERE "id" = ?;';
            break;
        case DATABASE_TABLES.SETTINGS:
            query = task === 'insert' ? ''
                                      : '';
            break;
        default:
            break;
    }

    return query;
}
