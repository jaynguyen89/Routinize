import { StyleSheet } from "react-native";
import { BASE_HEIGHT } from "../../shared/typography";

const styles = StyleSheet.create({
    todoCard : {
        marginTop : BASE_HEIGHT * 0.5,
        marginBottom : 0,
        marginHorizontal : BASE_HEIGHT * 0.25,
        borderWidth : 0.2
    },
    cardCover : {
        height : BASE_HEIGHT * 7
    },
    title : {
        marginTop : BASE_HEIGHT * 0.3,
        textAlign : "justify"
    },
    infoWrapper : {
        flex : 1,
        flexDirection : 'row',
        marginTop : BASE_HEIGHT * 0.3,
        padding : BASE_HEIGHT * 0.25,
        borderRadius : BASE_HEIGHT * 0.25
    },
    overlapped : {
        flex : 1,
        position : "absolute",
        top : BASE_HEIGHT * 0.1,
        right : BASE_HEIGHT * 0.1,
        backgroundColor : '#fff'
    },
    action : {
        flex : 1,
        position : "absolute",
        top : -4,
        right : -20,
        backgroundColor : '#fff',
        opacity : 0.5,
        elevation : 0
    },
    btnWrapper : {
        flex : 1,
        marginHorizontal : 5
    },
    inputFieldBtn : {
        padding : BASE_HEIGHT * 0.25,
        borderRadius : BASE_HEIGHT * 0.15,
        width : BASE_HEIGHT * 2.5
    }
});

export default styles;
