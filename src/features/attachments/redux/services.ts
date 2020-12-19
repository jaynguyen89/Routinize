import { deleteEntry } from '../../../providers/databaseReader';
import { DATABASE_TABLES } from '../../../shared/enums';

export const removeLocalAttachment = (attachmentId : number) : Promise<boolean> => {
    return deleteEntry(DATABASE_TABLES.ATTACHMENTS, attachmentId);
}