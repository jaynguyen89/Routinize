import { getData } from '../../providers/databaseReader';
import { DATABASE_TABLES } from '../../shared/enums';
import IAccount from '../../models/IAccount';

export const getLocalUserAccount = () : Promise<IAccount> => {
    return getData(DATABASE_TABLES.USER);
}