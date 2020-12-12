import { MOMENT_FORMATS, NAME_FORMAT } from '../shared/enums';
import { EMPTY_STRING, SPACE_MONO } from './Constants';
import moment from 'moment';

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

export const processDateTimeChange = (
    current : string | null, newVal : string, field : string, format : string
) : string => {alert('helper newVal = ' + newVal);
    let newDateTime = EMPTY_STRING;
    format = format.indexOf('_A_') !== -1 || format.indexOf('_HA_') !== -1 ||
             format.indexOf('_SA_') !== -1 ? MOMENT_FORMATS.HMA : MOMENT_FORMATS.HM;
alert(format);
    if (current) {alert('current')
        const currentDate = moment(current).format(MOMENT_FORMATS.DMY);
        const currentTime = moment(current).format(format);

        newDateTime = field === 'date' ? moment(newVal).format(MOMENT_FORMATS.DMY).concat(SPACE_MONO).concat(currentTime)
                                       : currentDate.concat(SPACE_MONO).concat(moment(newVal).format(format));
    }
    else
        newDateTime = moment(newVal).format(format);

    return newDateTime;
}