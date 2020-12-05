import { StyleSheet } from "react-native";
import { BASE_HEIGHT } from "../../shared/typography";

const styles = StyleSheet.create({
    rowWrapper : {
        margin : 0,
        height : BASE_HEIGHT * 3,
        paddingHorizontal : BASE_HEIGHT * 0.25,
        paddingVertical : BASE_HEIGHT * 0.4,
        flex : 1
    },
    titleWrapper : {
        flex : 1,
        flexDirection : 'row',
        paddingHorizontal : BASE_HEIGHT * 0.3
    },
    titleIcon : {
        flex : 1,
        marginRight : BASE_HEIGHT * 0.3
    },
    title : {
        flex : 9,
        lineHeight : BASE_HEIGHT * 0.9
    },
    infoSummary : {
        flex : 1,
        flexDirection : 'row',
        marginTop : BASE_HEIGHT * 0.3,
        paddingHorizontal : BASE_HEIGHT * 0.3
    },
    functionalBtnRow : {
        flexDirection : "row",
        marginTop : BASE_HEIGHT * -1,
        marginHorizontal : BASE_HEIGHT * 0.5
    },
    textBtn : {
        flex : 1
    },
    notePrefDialog : {
        width : BASE_HEIGHT * 15
    },
    notePrefTitle : {
        paddingHorizontal : BASE_HEIGHT,
        marginTop : BASE_HEIGHT * 0.3
    },
    switcher : {
        alignSelf : "flex-start",
        marginTop : BASE_HEIGHT * 0.25
    },
    segmentWrapper : {
        minHeight : BASE_HEIGHT * 7.5,
        marginTop : BASE_HEIGHT * 0.5,
        marginHorizontal : BASE_HEIGHT * 0.25
    },
    segmentEditorWrapper : {
        flex : 1,
        flexDirection : 'row'
    },
    textContainer : {
        flex : 3,
        textAlignVertical : 'top',
        paddingHorizontal : BASE_HEIGHT * 0.5,
        paddingVertical : BASE_HEIGHT * 0.3,
        borderTopWidth : 0.5,
        borderLeftWidth : 0.5,
        borderBottomWidth : 0.5,
        borderRightWidth : 0.75
    },
    attachmentContainer : {
        flex : 1
    },
    editorIconWrapper : {
        flex : 1,
        flexDirection : 'row',
        margin : 0,
        padding : 0
    },
    editorIcon : {
        alignSelf : "center",
        margin : 7.5
    },
    firstBtn : {
        borderWidth : 0.35
    },
    secondBtn : {
        borderWidth : 0.35,
        borderTopRightRadius : BASE_HEIGHT * 0.25
    },
    thirdBtn : {
        borderWidth : 0.35
    },
    fourthBtn : {
        borderWidth : 0.35
    },
    attachmentWrapper : {
        borderTopWidth : 0.5,
        borderRightWidth : 0.5,
        borderBottomWidth : 0.5,
        padding : BASE_HEIGHT * 0.25
    }
});

export default styles;
