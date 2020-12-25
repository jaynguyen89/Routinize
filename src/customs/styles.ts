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
    },
    menuRow : {
        flex : 1,
        marginBottom : BASE_HEIGHT * 0.35
    },
    datetime : {
        padding : BASE_HEIGHT * 0.25,
        marginHorizontal : BASE_HEIGHT * 0.25,
        borderRadius : BASE_HEIGHT * 0.2,
        backgroundColor : '#dedede'
    },
    imageWrapper : {
        margin : 0,
        padding : 0,
        width : BASE_HEIGHT * 3,
        height : BASE_HEIGHT * 4,
    },
    imageThumb : {
        width : BASE_HEIGHT * 3,
        height : BASE_HEIGHT * 4,
        borderRadius : BASE_HEIGHT * 0.2
    },
    iconThumb : {
        position : 'absolute',
        left : 3,
        top : 3,
        elevation : 2,
        borderRadius : BASE_HEIGHT * 0.2
    },
    iconTouchable : {
        position : 'absolute',
        left : 0,
        top : 0,
        padding : BASE_HEIGHT * 0.75
    },
    actionMarkerIcon : {
        position : 'absolute',
        left : BASE_HEIGHT * 0.25,
        top : BASE_HEIGHT * 0.25,
        padding : BASE_HEIGHT * 0.75
    },
    fileType : {
        position : 'absolute',
        textTransform : 'uppercase',
        left : BASE_HEIGHT * 0.25,
        bottom : BASE_HEIGHT * 0.25,
        color : '#fff'
    },
    rteDialog : {
        width : BASE_HEIGHT * 15,
        marginVertical : 0,
        marginHorizontal : BASE_HEIGHT * 0.5
    },
    rteTitle : {
        marginVertical : BASE_HEIGHT * 0.2,
        marginTop : BASE_HEIGHT * 0.5,
        fontWeight : 'bold'
    },
    rteError : {
        marginVertical : 0
    },
    mainMessage : {
        textAlign : 'center',
        marginTop : BASE_HEIGHT * 2.5
    },
    otherMessage : {
        width : BASE_HEIGHT * 10,
        marginTop : BASE_HEIGHT * 0.5,
        alignSelf : 'center',
        textAlign : 'center'
    }
});

export default styles;
