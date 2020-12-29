import _ from 'lodash';
import RNFS from 'react-native-fs';
import { FILE_TYPES, MEDIA_TYPES } from '../shared/enums';
import { getAttachmentFolder } from './Helpers';

export const removeFileOnLocalStorage = (fileName : string, type : FILE_TYPES | MEDIA_TYPES) => {
    const folder = getAttachmentFolder(type);
    RNFS.unlink(RNFS.ExternalDirectoryPath + folder + fileName);
}

export const isObjectContentChanged = (first : any, other : any) : boolean => {
    return !_.isEqual(first, other);
}