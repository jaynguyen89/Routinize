import SQLite from 'react-native-sqlite-storage';
import { DATETIME_FORMATS, STORAGE_KEYS, THEMES, UNIT_SYSTEMS } from '../shared/enums';
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

export const getData = (table : any) : any[] => {
    let dbData: any[] = [];

    connection.database.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM ?', [table],
            (tx, results) => {
                dbData.push(results.rows.item(0))
            })
        })
        //.then(e => console.log(e));

    return dbData;
};

export const execute = (query : string) => {

};

// const executeQuery = (query : string, params = []) => new Promise((resolve, reject) => {
//     connection.database.transaction(tx => {
//         tx.executeSql(
//             query,
//             params,
//             (tx, results) => resolve(results),
//             error => reject(error)
//         );
//     });
// });
