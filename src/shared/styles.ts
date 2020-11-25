import { StyleSheet } from 'react-native';
import themes from '../shared/themes';
import {BASE_HEIGHT, baseFontSize} from './typography';

export const sharedStyles = StyleSheet.create({
    button : {
        backgroundColor : themes.day.buttonBackgroundColor,
        borderColor : themes.day.dark,
        borderWidth : 0.5,
        height : 1.75 * BASE_HEIGHT,
        elevation : 1
    },
    buttonLarger : {
        backgroundColor : themes.day.buttonBackgroundColor,
        borderColor : themes.day.dark,
        borderWidth : 0.5,
        height : 2 * BASE_HEIGHT,
        elevation : 1
    },
    buttonXLarge : {
        backgroundColor : themes.day.buttonBackgroundColor,
        borderColor : themes.day.dark,
        borderWidth : 0.5,
        height : 2.5 * BASE_HEIGHT,
        elevation : 1
    },
    buttonTall : {
        backgroundColor : themes.day.buttonBackgroundColor,
        borderColor : themes.day.dark,
        borderWidth : 0.5,
        height : 5.5 * BASE_HEIGHT,
        elevation : 1
    }
});

export const common = StyleSheet.create({
    lightShadow : {
        shadowColor : '#000',
        shadowOffset : {
            width : 0, height : 1
        },
        shadowOpacity : 0.8,
        shadowRadius : 2.22,
        elevation : 3
    },
    darkShadow : {
        shadowColor : '#000',
        shadowOffset : {
            width : 0, height : 2
        },
        shadowOpacity : 0.8,
        shadowRadius : 3.84,
        elevation : 5
    },
    footer : {
        flex : 12,
        flexDirection : 'column',
        paddingTop : 3
    },
    footerText : {
        textAlign : 'center',
        backgroundColor : themes.neutral.alternateColor,
        color : themes.neutral.alternateLighter,
        fontSize : baseFontSize * 2.5,
        paddingBottom : 3,
        borderTopLeftRadius : 4,
        borderTopRightRadius : 4
    }
});
