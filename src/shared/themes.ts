import { StyleSheet } from 'react-native';
import palette from './palette';
import { baseFontSize } from './typography';

interface Theme {
    [key : string] : {
        [key : string] : string
    }
}

const themes : Theme = {
    light : {
        backgroundColor : palette.white,
        borderColor : palette.dark_gray,
        textColor : palette.black,
        shadowColor : palette.dark,
        buttonColor : palette.gray,
        disabledColor : palette.dark_gray,
        textDisabled : palette.dark
    },
    dark : {
        backgroundColor : palette.black,
        borderColor : palette.black_lighten1,
        textColor : palette.white,
        shadowColor : palette.gray,
        buttonColor : palette.gray,
        disabledColor : palette.dark_gray,
        textDisabled : palette.dark
    },
    marine : {
        backgroundColor : palette.hidro,
        borderColor : palette.hidro_lighten1,
        textColor : palette.white,
        shadowColor : palette.hidro_lighten2,
        buttonColor : palette.orange,
        disabledColor : palette.orange_lighten1,
        textDisabled : palette.dark_gray
    },
    sky : {
        backgroundColor : palette.blue,
        borderColor : palette.blue_lighten1,
        textColor : palette.white,
        shadowColor : palette.hidro_lighten2,
        buttonColor : palette.violet,
        disabledColor : palette.orange_lighten1,
        textDisabled : palette.dark_gray
    },
    neutral : {
        borderSuccess : palette.green_lighten2,
        backgroundSuccess : palette.green_lighten1,
        textSuccess : palette.green,
        borderWarning : palette.yellow_lighten2,
        backgroundWarning : palette.yellow_lighten1,
        textWarning : palette.yellow,
        borderDanger : palette.pink_lighten2,
        backgroundDanger : palette.pink_lighten1,
        textDanger : palette.pink
    }
}

export default themes;
