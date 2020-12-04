export enum DATABASE_TABLES {
    SETTINGS = 'settings'
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
    CODE = 10,
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
    FRIENDLY_A_DMY = 'DD MMM YYYY hh:ss a', //ex. 25 Oct 2009 01:30 PM
    COMPACT_SA_DMY = 'DD/MM/YYYY hh:ss a', //ex. 25/10/2009 01:30 PM
    COMPACT_HA_DMY = 'DD-MM-YYYY hh:ss a', //ex. 25-10-2009 01:30 PM
    FRIENDLY_A_MDY = 'MMM DD YYYY hh:ss a', //ex. Oct 25 2009 01:30 PM
    COMPACT_SA_MDY = 'MM/DD/YYYY hh:ss a', //ex. 10/25/2009 01:30 PM
    COMPACT_HA_MDY = 'MM-DD-YYYY hh:ss a', //ex. 10-25-2009 01:30 PM
    FRIENDLY_DMY = 'DD MMM YYYY hh:ss', //ex. 25 Oct 2009 13:30
    COMPACT_S_DMY = 'DD/MM/YYYY hh:ss', //ex. 25/10/2009 13:30
    COMPACT_A_DMY = 'DD-MM-YYYY hh:ss', //ex. 25-10-2009 13:30
    FRIENDLY_MDY = 'MMM DD YYYY hh:ss', //ex. Oct 25 2009 13:30
    COMPACT_S_MDY = 'MM/DD/YYYY hh:ss', //ex. 10/25/2009 13:30
    COMPACT_H_MDY = 'MM-DD-YYYY hh:ss', //ex. 10-25-2009 13:30
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
    FML, //First + Middle + Last in abbr.
    FLA, //First in full + Last in abbr.
    FLF, //First + Last in full,
    FAL, //First in abbr. + Last in full
    INITS, //Only initial letters
}

export enum PRIVACY {
    HIDDEN, //Hide to everyone
    PARTIAL, //Hide part of phone number
    PUBLIC, //Show to everyone
    CUSTOM
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