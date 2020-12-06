import { StyleSheet } from "react-native";
import { BASE_HEIGHT } from '../../../shared/typography';

const styles = StyleSheet.create({
    teamCard : {
        marginTop : BASE_HEIGHT * 0.5,
        marginBottom : 0,
        marginHorizontal : BASE_HEIGHT * 0.25,
        borderWidth : 0.2
    },
    contentWrapper : {
        flex : 1,
        flexDirection : 'row'
    },
    infoWrapper : {
        flex : 13,
        padding : BASE_HEIGHT * 0.25
    },
    cardCover : {
        margin : BASE_HEIGHT * 0.25,
        width : BASE_HEIGHT * 6,
        height : BASE_HEIGHT * 6,
        borderRadius : BASE_HEIGHT * 3
    },
    projectWrapper : {
        marginVertical : BASE_HEIGHT * 0.3
    }
});

export default styles;