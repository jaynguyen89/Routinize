import { StyleSheet } from "react-native";
import { BASE_HEIGHT } from "../shared/typography";
import { sharedStyles } from '../shared/styles';

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1
    },
    scroller : {
        marginTop : BASE_HEIGHT * 0.1
    },
    footerContainer: {
        padding: BASE_HEIGHT * 0.5,
        margin : 0
    },
    menuRow : {
        margin : 0
    },
    rowHeader: {
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    rowMenu: {
        padding: 0,
        margin : 0
    },
    rowItem: {
        padding : 10,
        flexDirection : "row"
    },
    rowIcon : {
        flex : 1,
        marginRight : BASE_HEIGHT * 0.4
    },
    rowText : {
        flex : 9
    },
    archivedRow : {
        backgroundColor : sharedStyles.btnWarning.color,
        borderColor : sharedStyles.btnWarning.backgroundColor,
        borderTopWidth : 2,
        borderBottomWidth : 2,
        marginVertical : 2
    }
});

export default styles;
