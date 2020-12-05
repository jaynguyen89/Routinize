import ISettings from '../../../models/ISettings';
import IIdea from '../../../models/IIdea';

export interface IRandomIdeas {
    settings : any,
    navigation : any,
    items : Array<IIdea>
}

export interface IIdeaRow {
    settings : any,
    navigation : any,
    item : IIdea
}