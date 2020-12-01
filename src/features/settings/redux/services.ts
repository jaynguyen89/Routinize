import { getSettingsFromAsyncStorage } from '../../../providers/databaseReader';
import { STORAGE_KEYS } from '../../../shared/enums';
import ISettings from "../../../models/ISettings";

export const getSettings = async () : Promise<ISettings> => {
    return await getSettingsFromAsyncStorage(STORAGE_KEYS.SETTINGS);
}
