import { NAME_FORMAT } from '../shared/enums';
import { EMPTY_STRING, SPACE_MONO } from './Constants';

export const makeShortName = (
    firstName : string, lastName : string, rule : NAME_FORMAT
) : string => {
    if (!firstName || !lastName) return EMPTY_STRING;

    let shortName = EMPTY_STRING;

    const firstNameTokens = firstName.split(SPACE_MONO);
    const lastNameTokens = lastName.split(SPACE_MONO);

    switch (rule) {
        case NAME_FORMAT.FALF:
            shortName = firstNameTokens[0].substr(0, 3) + SPACE_MONO + lastNameTokens[lastNameTokens.length - 1];
            break;
        case NAME_FORMAT.FALA:
            shortName = firstNameTokens[0].substr(0, 3) + SPACE_MONO + lastNameTokens[lastNameTokens.length - 1].substr(0, 3);
            break;
        case NAME_FORMAT.FFLF:
            shortName = firstNameTokens[0] + SPACE_MONO + lastNameTokens[lastNameTokens.length - 1];
            break;
        case NAME_FORMAT.FFLA:
            shortName = firstNameTokens[0] + SPACE_MONO + lastNameTokens[lastNameTokens.length - 1].substr(0, 3);
            break;
        default: //NAME_FORMAT.INITS
            firstNameTokens.map(token => shortName += token.substr(0, 1));
            lastNameTokens.map(token => shortName += token.substr(0, 1));
            break;
    }

    return shortName;
}