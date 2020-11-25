import { StyleSheet } from "react-native";
import {BASE_HEIGHT, baseFontSize} from "../shared/typography";
import themes from "../shared/themes";

const styles = StyleSheet.create({
    drawerContainer: {
        paddingTop: BASE_HEIGHT,
        flex: 1
    },
    navItemStyle: {
        padding: 10
    },
    navSectionStyle: {
        backgroundColor: 'lightgrey'
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
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

export default styles;
