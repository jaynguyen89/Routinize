import { StyleSheet, Dimensions } from 'react-native';

const {
    width : SCREEN_WIDTH,
    height : SCREEN_HEIGHT
} = Dimensions.get('screen');

const DEFAULT_WIDTH = 4320/11;
const DEFAULT_HEIGHT = 8880/11;

export const BASE_HEIGHT = 20 * SCREEN_HEIGHT / DEFAULT_HEIGHT;
export const baseFontSize : number = 10 * SCREEN_WIDTH / DEFAULT_WIDTH;

export const Typography = StyleSheet.create({
    firstHeader : {
        fontSize : baseFontSize * 2.7,
        fontWeight : 'bold'
    },
    secondHeader : {
        fontSize : baseFontSize * 2.4,
        fontWeight : 'bold'
    },
    thirdHeader : {
        fontSize : baseFontSize * 2.1,
        fontWeight : 'bold'
    },
    fourthHeader : {
        fontSize : baseFontSize * 1.8,
        fontWeight : "normal",
    },
    regular : {
        fontSize : baseFontSize * 1.5,
        fontWeight : 'normal'
    },
    small : {
        fontSize : baseFontSize * 1.2,
        fontWeight : 'normal'
    },
    tiny : {
        fontSize : baseFontSize * 0.9,
        fontWeight : '200'
    }
});
