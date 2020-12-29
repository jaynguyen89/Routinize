export const EMPTY_STRING = '';
export const SPACE_MONO = ' ';
export const EMPTY_OBJ = {};
export const EMPTY_ARRAY = [];
export const EMPTY_TAG = 'empty';
export const NA_TAG = 'N/A';
export const DOT = '.';

export const DATE_FORMATS : {
    [key : string] : string
} = {
    'DD MMM YYYY hh:mm a' : 'DD MMM YYYY',
    'DD/MM/YYYY hh:mm a' : 'DD/MM/YYYY',
    'DD-MM-YYYY hh:mm a' : 'DD-MM-YYYY',
    'MMM DD YYYY hh:mm a' : 'MMM DD YYYY',
    'MM/DD/YYYY hh:mm a' : 'MM/DD/YYYY',
    'MM-DD-YYYY hh:mm a' : 'MM-DD-YYYY',
    'DD MMM YYYY HH:mm' : 'DD MMM YYYY',
    'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY',
    'DD-MM-YYYY HH:mm' : 'DD-MM-YYYY',
    'MMM DD YYYY HH:mm' : 'MMM DD YYYY',
    'MM/DD/YYYY HH:mm' : 'MM/DD/YYYY',
    'MM-DD-YYYY HH:mm' : 'MM-DD-YYYY'
}

export const TIME_FORMATS : {
    [key : string] : string
} = {
    'DD MMM YYYY hh:mm a' : 'hh:mm a',
    'DD/MM/YYYY hh:mm a' : 'hh:mm a',
    'DD-MM-YYYY hh:mm a' : 'hh:mm a',
    'MMM DD YYYY hh:mm a' : 'hh:mm a',
    'MM/DD/YYYY hh:mm a' : 'hh:mm a',
    'MM-DD-YYYY hh:mm a' : 'hh:mm a',
    'DD MMM YYYY HH:mm' : 'HH:mm',
    'DD/MM/YYYY HH:mm' : 'HH:mm',
    'DD-MM-YYYY HH:mm' : 'HH:mm',
    'MMM DD YYYY HH:mm' : 'HH:mm',
    'MM/DD/YYYY HH:mm' : 'HH:mm',
    'MM-DD-YYYY HH:mm' : 'HH:mm'
}

export const FILE_FORMATS : { [key : string] : Array<string> } = {};
FILE_FORMATS['pdf'] = ['pdf'];
FILE_FORMATS['txt'] = ['txt', 'rtf'];
FILE_FORMATS['doc'] = ['doc', 'docx', 'pages'];
FILE_FORMATS['ppt'] = ['ppt', 'pptx', 'key'];
FILE_FORMATS['excel'] = ['xls', 'xlsx', 'numbers'];
FILE_FORMATS['archive'] = ['rar', 'zip', 'tar', 'gz', '7z'];
FILE_FORMATS['csv'] = ['csv'];
FILE_FORMATS['src'] = ['exe', 'msi'];
FILE_FORMATS['audio'] = ['aac', 'mp3', 'wav', 'wma', 'flac'];