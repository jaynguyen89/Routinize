import { RELATIONSHIPS } from '../shared/enums';

export interface IRelationship {
    itemId : number,
    type : string, //TODO or NOTE
    relationType : RELATIONSHIPS
}