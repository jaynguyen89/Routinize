import { StyleSheet } from 'react-native';
import palette from './palette';
import { baseFontSize } from './typography';

interface Theme {
    [key : string] : {
        [key : string] : string
    }
}

const themes : Theme = {
    day : {
        backgroundColor : palette.white,
        expressionBackgroundColor : palette.gray,
        resultBackgroundColor : palette.dark_gray,
        buttonBackgroundColor : palette.gray,
        textColor : palette.black,
        shadowColor : palette.dark
    },
    night : {
        backgroundColor : palette.black,
        expressionBackgroundColor : palette.light_black,
        resultBackgroundColor : palette.dark,
        buttonBackgroundColor : palette.dark,
        textColor : palette.white,
        shadowColor : palette.gray
    },
    neutral : {
        borderColor : palette.dark_gray,
        alternateColor : palette.blue,
        alternateLighter : palette.light_blue,
        alternate : palette.alt_blue,
        shiftColor : palette.orange,
        featureColor : palette.green,
        dangerColor : palette.red,
        warningColor : palette.pink
    }
}

export default themes;
