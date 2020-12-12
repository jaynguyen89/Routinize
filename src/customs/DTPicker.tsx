import React from 'react';
import { connect } from 'react-redux';

import styles from './styles';
import { View, Text } from 'react-native';
import { Typography } from '../shared/typography';
import { IDTPicker } from '../shared/interfaces';
import { DATE_FORMATS, TIME_FORMATS } from '../helpers/Constants';
import { TouchableRipple } from 'react-native-paper';
import { sharedStyles } from '../shared/styles';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const DTPicker = (props: IDTPicker) => {
    return (
        <View style={{ flex : 1, flexDirection : 'row', marginTop : 10 }}>
            <View style={{ flex : 10 }}>
                <TouchableRipple style={ sharedStyles.touchable } onPress={ props.actions.dateAction }>
                    <Text style={[ { textAlign : 'center' }, Typography.regular, styles.datetime ]}>
                        { props.date || DATE_FORMATS[props.settings.dateTimeFormat] }
                    </Text>
                </TouchableRipple>
            </View>

            <View style={{ flex : 9, flexDirection : 'row' }}>
                <TouchableRipple style={[ sharedStyles.touchable, { flex : 3 } ]} onPress={ props.actions.timeAction }>
                    <Text style={[ { textAlign : 'center' }, Typography.regular, styles.datetime ]}>
                        { props.time || TIME_FORMATS[props.settings.dateTimeFormat] }
                    </Text>
                </TouchableRipple>

                <Text style={[ { textAlign : 'center', flex : 1 }, Typography.regular, styles.datetime ]}>
                    { (
                        TIME_FORMATS[props.settings.dateTimeFormat].indexOf('a') !== -1 && (
                                parseInt(props.time?.split(':')[0] as string) > 12 ? 'PM' : 'AM'
                            )
                        ) || '-'
                    }
                </Text>
            </View>
        </View>
    );
};

export default connect(
    mapStateToProps
)(DTPicker);