//import SQLite from 'react-native-sqlite-storage';
import { STORAGE_KEYS, THEMES } from '../shared/enums';
import AsyncStorage from '@react-native-community/async-storage';

// const connection = {
//     database : SQLite.openDatabase({
//             name: 'calculator_data',
//             location: 'default',
//             createFromLocation: '~calculator_data.sqlite'
//         },
//         () => console.log('Database connected successfully.'),
//         error => console.log(error)
//     )
// };

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
                theme : THEMES.DAY,
                isPremium : false,
                reminderUnlocked : false,
                todoUnlocked : false,
                notesUnlocked : false,
                shouldHideAds : false,
                premiumElapseTime : 0
            };
    } catch (e) {
        console.log(e);
    }

    return entry;
};

export const getEntry = () => {

}

// export const getData = (table : any) : any[] => {
//     let dbData: any[] = [];
//     connection.database.transaction(tx => {
//         tx.executeSql(
//             `SELECT * FROM ${ table }`, [],
//             (tx, results) => {
//                 results.rows.raw().forEach(item => dbData.push(item));
//             })
//     })
//         .then(r => console.log(r));
//
//     return dbData;
// };

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
