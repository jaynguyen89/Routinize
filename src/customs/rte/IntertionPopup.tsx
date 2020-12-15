import React from 'react';
import { connect } from 'react-redux';

import styles from '../styles';
import { View, Text } from 'react-native';
import { Typography } from '../../shared/typography';
import { IRteDialog } from '../../shared/interfaces';
import { sharedStyles } from '../../shared/styles';
import { Icon, Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { EMPTY_STRING } from '../../helpers/Constants';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const InsertionPopup = (props: IRteDialog) => {
    const [error, setError] = React.useState(EMPTY_STRING);
    const [url, setUrl] = React.useState(EMPTY_STRING);

    const validateUrl = (url : string) => {
        if (url.length === 0) {
            setUrl(url);
            setError(EMPTY_STRING);
        }
        else if (url.indexOf('http') === -1 && url.indexOf('www') === -1) {
            setUrl(EMPTY_STRING);
            setError('Invalid URL.');
        }
        else {
            setError(EMPTY_STRING);
            setUrl(url);
        }
    }

    return (
        <View style={ styles.rteDialog }>
            <Text style={[ Typography.fourthHeader, styles.rteTitle ]}>
                { props.type === 'link' ? 'Insert Link' : (props.type === 'video' ? 'Embed Video' : 'Embed Image') }
            </Text>
            <Text style={[ Typography.small ]}>Please fill in your URL below:</Text>

            <View style={ sharedStyles.inputWrapper }>
                <Input
                    onChangeText={ url => validateUrl(url) }
                    style={ Typography.small }
                    containerStyle={{  }}
                    placeholder='URL'
                    leftIcon={
                        <Icon name='link' size={ 24 } color={ props.settings.theme.invert.backgroundColor } />
                    }
                />

                {
                    error.length !== 0 &&
                    <Text style={[Typography.tiny, sharedStyles.charCount, { color: sharedStyles.btnDanger.backgroundColor }]}>
                        { error }
                    </Text>
                }
            </View>

            <View style={{ flexDirection : 'row' }}>
                <Button style={{ flex : 1 }} mode='text' compact
                        onPress={ props.actions.cancel }
                        color={ props.settings.theme.invert.backgroundColor }
                >
                    Cancel
                </Button>
                <Button disabled={ error.length > 0 } style={{ flex : 1 }} mode='text' compact
                        onPress={ () => props.actions.done(url, props.type) }
                        color={ props.settings.theme.invert.backgroundColor }
                >
                    Done
                </Button>
            </View>
        </View>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(InsertionPopup);