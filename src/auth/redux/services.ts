import { IAuth } from '../../models/others';
import { getData } from '../../providers/databaseReader';
import { DATABASE_TABLES } from '../../shared/enums';

export const getLocalAuth = async () : Promise<any> => {
    return await getData(DATABASE_TABLES.AUTH);
}