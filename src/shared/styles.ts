import { StyleSheet } from 'react-native';
import themes from '../shared/themes';
import { BASE_HEIGHT } from './typography';

const shadows = StyleSheet.create({
    lightShadow : {
        shadowColor : '#ffffff',
        shadowOffset : {
            width : 0, height : 1
        },
        shadowOpacity : 0.8,
        shadowRadius : 2.22,
        elevation : 3
    },
    darkShadow : {
        shadowColor : '#000000',
        shadowOffset : {
            width : 0, height : 2
        },
        shadowOpacity : 0.8,
        shadowRadius : 3.84,
        elevation : 5
    },
    limeShadow : {
        shadowColor : '#00cfc8',
        shadowOffset : {
            width : 0, height : 2
        },
        shadowOpacity : 0.8,
        shadowRadius : 3.84,
        elevation : 5
    },
    blueShadow : {
        shadowColor : '#0088ff',
        shadowOffset : {
            width : 0, height : 2
        },
        shadowOpacity : 0.8,
        shadowRadius : 3.84,
        elevation : 5
    }
});

export const sharedStyles = StyleSheet.create({
    btn : {
        borderWidth : 0.5,
        height : 1.5 * BASE_HEIGHT,
        elevation : 1,
        textAlign : "center"
    },
    btnMini : {
        borderWidth : 0.5,
        height : BASE_HEIGHT,
        elevation : 1,
        textAlign : "center"
    },
    btnSuccess : {
        backgroundColor : themes.neutral.backgroundSuccess,
        color : themes.neutral.textSuccess,
        borderColor : themes.neutral.borderSuccess
    },
    btnSuccessDisabled : {
        backgroundColor : themes.neutral.borderColor,
        color : themes.neutral.textSuccess,
        borderColor : themes.neutral.borderSuccess
    },
    btnWarning : {
        backgroundColor : themes.neutral.backgroundWarning,
        color : themes.neutral.textWarning,
        borderColor : themes.neutral.borderWarning
    },
    btnWarningDisabled : {
        backgroundColor : themes.neutral.borderWarning,
        color : themes.neutral.textWarning,
        borderColor : themes.neutral.borderWarning
    },
    btnDanger : {
        backgroundColor : themes.neutral.backgroundDanger,
        color : themes.neutral.textDanger,
        borderColor : themes.neutral.borderDanger
    },
    btnDangerDisabled : {
        backgroundColor : themes.neutral.borderDanger,
        color : themes.neutral.textDanger,
        borderColor : themes.neutral.borderDanger
    }
});

export const dayTheme = StyleSheet.create({
    btnPrimary : {
        backgroundColor : themes.light.buttonColor,
        color : themes.light.textColor,
        borderColor : themes.light.borderColor
    },
    btnDisabled : {
        backgroundColor : themes.light.disabledColor,
        color : themes.light.textColor,
        borderColor : themes.light.borderColor
    },
    background : {
        backgroundColor : themes.light.backgroundColor,
        color : themes.light.textColor
    },
    shadow : shadows.darkShadow
});

export const nightTheme = StyleSheet.create({
    btnPrimary : {
        backgroundColor : themes.dark.buttonColor,
        color : themes.dark.textColor,
        borderColor : themes.dark.borderColor
    },
    btnDisabled : {
        backgroundColor : themes.dark.disabledColor,
        color : themes.dark.textColor,
        borderColor : themes.dark.borderColor
    },
    background : {
        backgroundColor : themes.dark.backgroundColor,
        color : themes.dark.textColor
    },
    shadow : shadows.lightShadow
});

export const seaTheme = StyleSheet.create({
    btnPrimary : {
        backgroundColor : themes.marine.buttonColor,
        color : themes.marine.textColor,
        borderColor : themes.marine.borderColor
    },
    btnDisabled : {
        backgroundColor : themes.marine.disabledColor,
        color : themes.marine.textColor,
        borderColor : themes.marine.borderColor
    },
    background : {
        backgroundColor : themes.marine.backgroundColor,
        color : themes.marine.textColor
    },
    shadow : shadows.limeShadow
});

export const skyTheme = StyleSheet.create({
    btnPrimary : {
        backgroundColor : themes.sky.buttonColor,
        color : themes.sky.textColor,
        borderColor : themes.sky.borderColor
    },
    btnDisabled : {
        backgroundColor : themes.sky.disabledColor,
        color : themes.sky.textColor,
        borderColor : themes.sky.borderColor
    },
    background : {
        backgroundColor : themes.sky.backgroundColor,
        color : themes.sky.textColor
    },
    shadow : shadows.blueShadow
});
