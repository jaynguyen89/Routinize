import SQLite from 'react-native-sqlite-storage';
import { DATABASE_TABLES, DATETIME_FORMATS, STORAGE_KEYS, THEMES, UNIT_SYSTEMS } from '../shared/enums';
import AsyncStorage from '@react-native-community/async-storage';
import ISettings from "../models/ISettings";

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

export const insertData = () => {

};

export const updateEntry = () => {

};

export const deleteEntry = () => {

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

export const getEntry = () => {

}

export const getData = async (table : DATABASE_TABLES): Promise<Array<any> | any> => {
    let dbData : Array<any> | any = [];
    const setData = (val : any[] | any) => { dbData = val; };

    let results : any = await executeQuery('SELECT * FROM ' + table);
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

export const execute = (query : string) => {

};

const executeQuery = (query : string, params : Array<DATABASE_TABLES> = []) =>
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
