import { StyleSheet } from "react-native";
import { BASE_HEIGHT, baseFontSize } from "../shared/typography";
import themes from "../shared/themes";

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
        padding : 10
    }
});

export default styles;
