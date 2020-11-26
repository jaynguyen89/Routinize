import { StyleSheet } from "react-native";
import {BASE_HEIGHT, baseFontSize} from "../shared/typography";

const styles = StyleSheet.create({
    drawerAccountContainer : {
        margin : 0,
        height : BASE_HEIGHT * 4.4
    },
    appHeading : {
        height : BASE_HEIGHT * 1.5
    },
    header : {
        lineHeight : BASE_HEIGHT * 1.5,
        textAlign : "center",
        fontSize : baseFontSize * 1.8,
        fontFamily : "monospace"
    },
    accountContent : {
        flex : 1,
        flexDirection : 'row'
    },
    avatarWrapper : {
        flex : 7,
        alignItems : "center",
        paddingTop : BASE_HEIGHT * 0.3
    },
    accountWrapper : {
        flex : 13,
        padding : BASE_HEIGHT * 0.2
    },
    account : {
        flex : 13
    },
    accountBtn : {
        flex : 7,
        width : BASE_HEIGHT * 5
    }
});

export default styles;
