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
        disabledColor : palette.orange_lighten,
        textDisabled : palette.dark_gray
    },
    sky : {
        backgroundColor : palette.blue,
        borderColor : palette.blue_lighten1,
        textColor : palette.white,
        shadowColor : palette.blue,
        buttonColor : palette.dark_blue,
        disabledColor : palette.blue_lighten2,
        textDisabled : palette.dark_gray,
        textBlack : palette.black
    },
    neutral : {
        borderSuccess : palette.green_lighten1,
        backgroundSuccess : palette.green,
        textSuccess : palette.green_lighten2,
        borderWarning : palette.yellow_lighten1,
        backgroundWarning : palette.yellow,
        textWarning : palette.yellow_lighten2,
        borderDanger : palette.pink_lighten1,
        backgroundDanger : palette.pink,
        textDanger : palette.pink_lighten2,
        indigo : palette.dark_blue,
    }
}

export default themes;
