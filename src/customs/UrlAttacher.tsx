import React from 'react';
import { connect } from 'react-redux';

import { Icon, Input, Text } from 'react-native-elements';
import { Typography } from '../shared/typography';
import { sharedStyles } from '../shared/styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { getDropdownFileTypesPicker } from '../helpers/Helpers';
import { EMPTY_STRING } from '../helpers/Constants';
import { Button, TouchableRipple } from 'react-native-paper';
import { View } from 'react-native';
import { IUrlAttacher } from '../shared/interfaces';
import styles from './styles';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const UrlAttacher = (props: IUrlAttacher) => {
    const [url, setUrl] = React.useState({ value : EMPTY_STRING, type : -1 });
    const [error, setError] = React.useState(EMPTY_STRING);

    const updateUrl = (value : string | number, field : string) => {
        if (field === 'value') setUrl({ ...url, value : value as string });
        if (field === 'type') setUrl({ ...url, type : value as number });
    }

    const returnUrl = () => {
        if (url.value.length === 0 || url.type < 0) {
            setError('Please select URL File Type and enter URL.');
            return;
        }

        setError(EMPTY_STRING);
        props.getUrl(url);
    }

    return (
        <View style={ sharedStyles.urlPopover }>
            <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel ]}>Attach URL</Text>
            <DropDownPicker
                items={ getDropdownFileTypesPicker() }
                containerStyle={ sharedStyles.dropdownContainer }
                placeholder='Select URL File Type'
                dropDownStyle={ sharedStyles.dropdown }
                defaultValue={ url.type >= 0 ? url.type : undefined }
                onChangeItem={ item => updateUrl(item.value, 'type') }
            />

            <Input placeholder='Enter URL' style={[ Typography.regular ]}
                   value={ url.value }
                   leftIcon={ <Icon name='link' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                   onChangeText={ (val : string) => updateUrl(val, 'value') }
            />

            <Text style={[ Typography.tiny, styles.urlError, { color : sharedStyles.btnDanger.backgroundColor } ]}>{ error }</Text>

            <TouchableRipple style={{ margin : 10 }} rippleColor={ props.settings.theme.backgroundPrimary.backgroundColor } onPress={ () => returnUrl() }>
                <Button mode='contained' dark color={ props.settings.theme.backgroundPrimary.backgroundColor } style={{ flex : 1 }}>OK</Button>
            </TouchableRipple>
        </View>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(UrlAttacher);