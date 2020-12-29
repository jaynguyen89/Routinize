export enum ACTIONS {
    NONE,
    GET,
    CREATE,
    UPDATE,
    DELETE
}

export enum DATABASE_TABLES {
    SETTINGS = 'settings',
    AUTH = 'auth',
    USER = 'user',
    ADDRESS = 'addresses',
    NOTES = 'notes',
    TODOS = 'todos',
    SEGMENTS = 'noteSegments',
    ATTACHMENTS = 'attachments',
    PLACES = 'places'
}

export enum STORAGE_KEYS {
    SETTINGS = 'SETTINGS'
}

export enum THEMES {
    DAY,
    NIGHT,
    SEA,
    SKY
}

export enum ORIGIN {
    PERSONAL,
    SHARED
}

export enum MEDIA_TYPES {
    PHOTO = 0,
    VIDEO = 1,
    AUDIO = 2
}

export enum FILE_TYPES {
    PDF = 3,
    TXT = 4,
    DOC = 5,
    PPT = 6,
    EXCEL = 7,
    ARCHIVE = 8,
    CSV = 9,
    SRC = 10,
    OTHERS = 11
}

export enum ACTION_TYPES {
    NORMAL,
    CAUTIOUS,
    DANGEROUS
}

export enum PERMISSIONS {
    READ,
    EDIT,
    DELETE
}

export enum TEAM_ROLES {
    ADMIN,
    MODERATOR,
    MEMBER
}

export enum INVITATION_STATUS {
    PENDING,
    ACCEPTED,
    REJECTED
}

export enum TITLES {
    MR = 'Mr',
    MS = 'Ms',
    MRS = 'Mrs'
}

export enum DATETIME_FORMATS {
    FRIENDLY_A_DMY = 'DD MMM YYYY hh:mm a', //ex. 25 Oct 2009 01:30 PM
    COMPACT_SA_DMY = 'DD/MM/YYYY hh:mm a', //ex. 25/10/2009 01:30 PM
    COMPACT_HA_DMY = 'DD-MM-YYYY hh:mm a', //ex. 25-10-2009 01:30 PM
    FRIENDLY_A_MDY = 'MMM DD YYYY hh:mm a', //ex. Oct 25 2009 01:30 PM
    COMPACT_SA_MDY = 'MM/DD/YYYY hh:mm a', //ex. 10/25/2009 01:30 PM
    COMPACT_HA_MDY = 'MM-DD-YYYY hh:mm a', //ex. 10-25-2009 01:30 PM
    FRIENDLY_DMY = 'DD MMM YYYY HH:mm', //ex. 25 Oct 2009 13:30
    COMPACT_S_DMY = 'DD/MM/YYYY HH:mm', //ex. 25/10/2009 13:30
    COMPACT_H_DMY = 'DD-MM-YYYY HH:mm', //ex. 25-10-2009 13:30
    FRIENDLY_MDY = 'MMM DD YYYY HH:mm', //ex. Oct 25 2009 13:30
    COMPACT_S_MDY = 'MM/DD/YYYY HH:mm', //ex. 10/25/2009 13:30
    COMPACT_H_MDY = 'MM-DD-YYYY HH:mm', //ex. 10-25-2009 13:30
}

export enum MOMENT_FORMATS {
    DMY = 'DD-MM-YYYY',
    DMMMY = 'DD MMM YYYY',
    HM = 'HH:mm',
    HMA = 'hh:mm a'
}

export enum UNIT_SYSTEMS {
    INTERNATIONAL,
    UNITED_STATES
}

export enum ADDRESS_FORMAT {
    SS, //Suburb + State
    SO, //State Only
    ST, //Street + Suburb
    FULL //Whole address
}

export enum NAME_FORMAT {
    FFLA, //First in full. + Last in abbr.
    FALA, //First in abbr. + Last in abbr.
    FFLF, //First in full + Last in full,
    FALF, //First in abbr. + Last in full
    INITS, //Only initial letters
}

//For phone number, username
export enum PRIVACY {
    HIDDEN, //Hide to everyone
    PARTIAL, //Hide part of phone number
    PUBLIC, //Show to everyone
}

export enum RELATIONSHIPS {
    RELATED,
    BLOCKED,
    BLOCKS
}

export enum ITEM_TYPES {
    TODO,
    NOTE,
    SEGMENT
}
