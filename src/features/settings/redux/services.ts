import { getSettingsFromAsyncStorage } from '../../../providers/databaseReader';
import { STORAGE_KEYS } from '../../../shared/enums';

export const getSettings = async () : Promise<any> => {
    return await getSettingsFromAsyncStorage(STORAGE_KEYS.SETTINGS);
}
