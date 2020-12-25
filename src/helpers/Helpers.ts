import { DATETIME_FORMATS, FILE_TYPES, MEDIA_TYPES, MOMENT_FORMATS, NAME_FORMAT } from '../shared/enums';
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
    let newDateTime : string;
    format = format.indexOf('_A_') !== -1 || format.indexOf('_HA_') !== -1 ||
             format.indexOf('_SA_') !== -1 ? MOMENT_FORMATS.HMA : MOMENT_FORMATS.HM;

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

export const getTimeElapse = (start : string, end : string) : string => {
    const duration = moment.duration(Math.abs(
        moment(start, DATETIME_FORMATS.COMPACT_H_DMY)
            .diff(moment(end, DATETIME_FORMATS.COMPACT_H_DMY))
    ));

    let elapse = EMPTY_STRING;

    const years = duration.asYears();
    if (years >= 1) {
        elapse += (Math.floor(years) + 'y' + (Math.floor((years - Math.floor(years)) * 12) > 0 ? SPACE_MONO + Math.floor((years - Math.floor(years)) * 12) + 'm' : EMPTY_STRING));
        return elapse;
    }

    const months = duration.asMonths();
    if (months >= 1) {
        elapse += (Math.floor(months) + 'm' + (Math.floor((months - Math.floor(months)) * 30) > 0 ? SPACE_MONO + Math.floor((months - Math.floor(months)) * 30) + 'd' : EMPTY_STRING));
        return elapse;
    }

    const weeks = duration.asWeeks();
    if (weeks >= 1) {
        elapse += (Math.floor(weeks) + 'w' + (Math.floor((weeks - Math.floor(weeks)) * 7) > 0 ? SPACE_MONO + Math.floor((weeks - Math.floor(weeks)) * 7) + 'd' : EMPTY_STRING));
        return elapse;
    }

    const days = duration.asDays();
    if (days >= 1) {
        elapse += (Math.floor(days) + 'd' + (Math.floor((days - Math.floor(days)) * 24) > 0 ? SPACE_MONO + Math.floor((days - Math.floor(days)) * 24) + 'h' : EMPTY_STRING));
        return elapse;
    }

    const hours = duration.asHours();
    if (hours >= 1) {
        elapse += (Math.floor(hours) + 'h' + (Math.floor((hours - Math.floor(hours)) * 60) > 0 ? SPACE_MONO + Math.floor((hours - Math.floor(hours)) * 60) + 'm' : EMPTY_STRING));
        return elapse;
    }

    const minutes = duration.asMinutes();
    return minutes > 0 ? minutes + 'm' : 'Expired';
}

export const getAttachmentFolder = (type : MEDIA_TYPES | FILE_TYPES) : string => {
    return type === MEDIA_TYPES.AUDIO ? '/audios/' : (
        type === MEDIA_TYPES.VIDEO ? '/videos/' : (
            type === MEDIA_TYPES.PHOTO ? '/images/' : '/files/'
        )
    );
}