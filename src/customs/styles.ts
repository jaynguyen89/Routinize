import { StyleSheet } from "react-native";
import { BASE_HEIGHT } from "../shared/typography";

const styles = StyleSheet.create({
    popover : {
        padding : BASE_HEIGHT * 0.3
    },
    popoverTitle : {
        textAlign : "center",
        marginBottom : BASE_HEIGHT * 0.3
    },
    popoverBtn : {
        marginBottom : BASE_HEIGHT * 0.5
    },
    dynamicBtnWrapper : {
        margin : 0,
        padding : 0,
        flex : 1,
        flexDirection : "row",
        height : BASE_HEIGHT * 1.75
    },
    dynamicBtn : {
        flex : 1,
        lineHeight : BASE_HEIGHT * 1.5,
        textAlign : "center",
        justifyContent : "center"
    },
    iconCenter : {
        alignSelf : "center"
    },
    firstBtn : {
        borderTopLeftRadius : BASE_HEIGHT * 0.2,
        borderBottomLeftRadius : BASE_HEIGHT * 0.2,
        borderRightWidth : 0.5
    },
    lastBtn : {
        borderTopRightRadius : BASE_HEIGHT * 0.2,
        borderBottomRightRadius : BASE_HEIGHT * 0.2,
        borderLeftWidth : 0.5
    },
    nthBtn : {
        borderRightWidth : 0.5,
        borderLeftWidth : 0.5
    }
});

export default styles;
