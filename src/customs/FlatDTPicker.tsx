import React from 'react';
import { connect } from 'react-redux';

import { Text } from 'react-native-elements';
import { BASE_HEIGHT, Typography } from '../shared/typography';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { DB_TIMESTAMP_FORMAT } from '../providers/databaseReader';
import { View } from 'react-native';
import { EMPTY_STRING } from '../helpers/Constants';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ACTION_TYPES } from '../shared/enums';
import ActionButtons from './ActionButtons';
import { IFlatDTPicker } from '../shared/interfaces';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const FlatDTPicker = (props: IFlatDTPicker) => {
    const [date, setDate] = React.useState(EMPTY_STRING);

    return (
        <View style={{ flex : 1, paddingHorizontal : BASE_HEIGHT * 0.5 }}>
            <Text style={[
                Typography.thirdHeader,
                props.settings.theme.black,
                { textAlign : 'center', marginVertical : BASE_HEIGHT * 0.5 }
            ]}>{ props.title }</Text>

            <DatePicker
                onDateChange={(date) => setDate(moment(date).format(DB_TIMESTAMP_FORMAT))}
                date={ props.values.default }
                maximumDate={ props.values.maxDate }
                minimumDate={ props.values.minDate }
                style={{ marginBottom : BASE_HEIGHT }}
            />

            <ActionButtons actions={[
                { name : 'OK', icon : faCheckCircle, type : ACTION_TYPES.NORMAL, callback : () => props.callback(date) }
            ]} />
        </View>
    );
};

export default connect(
    mapStateToProps
)(FlatDTPicker);