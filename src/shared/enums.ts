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
    PHOTO,
    VIDEO,
    AUDIO
}

export enum FILE_TYPES {
    PDF,
    TXT,
    DOC,
    PPT,
    EXCEL,
    ARCHIVE,
    CSV,
    CODE,
    OTHERS
}

export enum ACTION_TYPES {
    NORMAL,
    CAUTIOUS,
    DANGEROUS
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
