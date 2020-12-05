import { StyleSheet } from 'react-native';
import { BASE_HEIGHT } from '../../shared/typography';

const styles = StyleSheet.create({
    rowWrapper : {
        margin : 0,
        height : BASE_HEIGHT * 3,
        paddingHorizontal : BASE_HEIGHT * 0.25,
        paddingVertical : BASE_HEIGHT * 0.4,
        flex : 1
    },
    contentWrapper : {
        flex : 1,
        flexDirection : 'row',
        paddingHorizontal : BASE_HEIGHT * 0.3
    },
    infoSummary : {
        flex : 1,
        flexDirection : 'row',
        marginTop : BASE_HEIGHT * 0.3,
        paddingHorizontal : BASE_HEIGHT * 0.3
    },
});

export default styles;