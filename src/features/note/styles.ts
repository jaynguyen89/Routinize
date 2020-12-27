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
        flex : 1
    },
    segmentWrapper : {
        marginTop : BASE_HEIGHT * 0.1,
        marginBottom : BASE_HEIGHT * 0.65,
        marginHorizontal : BASE_HEIGHT * 0.3
    },
    attachmentWrapper : {
        borderWidth : 0.5,
        borderColor : '#ccc',
        marginBottom : BASE_HEIGHT * 0.5,
        borderBottomRightRadius : BASE_HEIGHT * 0.2,
        borderBottomLeftRadius : BASE_HEIGHT * 0.2
    }
});

export default styles;
