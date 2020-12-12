import React from 'react';
import { connect } from 'react-redux';

import styles from '../styles';
import { ActivityIndicator, Text, View } from 'react-native';
import Gravatar from '@krosben/react-native-gravatar';
import { BASE_HEIGHT, Typography } from '../../shared/typography';
import { Button } from 'react-native-elements';
import { sharedStyles } from '../../shared/styles';
import { IAuth } from '../../models/others';
import { getLocalAccount } from '../redux/actions';
import { setAuthStatus } from '../../../root/redux/actions';
import ILocalAccount from '../../models/local/IAccount';
import { makeShortName } from '../../helpers/Helpers';
import { NAME_FORMAT } from '../../shared/enums';
import { EMPTY_OBJ, EMPTY_STRING } from '../../helpers/Constants';

interface IAccountInfo {
    navigation : any,
    settings : any,
    auth : any,
    accountData : any
    getLocalAccount : any,
    setAuthStatus : any
}

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings,
    auth : state.authReducer,
    accountData : state.accountReducer
});

const mapActionsToProps = {
    getLocalAccount,
    setAuthStatus
};

const AccountInfo = (props: IAccountInfo) => {
    const [account, setAccount] = React.useState(EMPTY_OBJ as ILocalAccount);

    React.useEffect(() => {
        if (!props.auth.isRetrieving && !props.auth.isSuccess)
            props.navigation.navigate('Account', { screen : 'Error' });

        if (!props.auth.isRetrieving && props.auth.isSuccess && props.auth.auth) {
            const authData : { isLocal : boolean, data : IAuth } = props.auth.auth;

            if (authData.isLocal) {
                if (authData.data) {
                    //TODO: Check if user have an online account to authenticate (by fetching)
                    //If yes, authenticate using authToken, otherwise, continue locally as below

                    //This line should be double-checked or removed
                    props.getLocalAccount();
                    props.setAuthStatus(false);
                }
                else {
                    props.getLocalAccount();
                }
            }
            else { //authData.isLocal === false meaning user is authenticated
                //TODO: read additional data
            }
        }
    }, [props.auth]);

    React.useEffect(() => {
        if (!props.accountData.isRetrieving && !props.accountData.isSuccess)
            props.navigation.navigate('Account', { screen : 'Error' });

        if (!props.accountData.isRetrieving && props.accountData.isSuccess && props.accountData.account) {
            setAccount(props.accountData.account);
            props.setAuthStatus(false);
        }
        else
            setAccount(null as unknown as ILocalAccount);
    }, [props.accountData]);

    return (
        <View style={[ styles.drawerAccountContainer, props.settings.theme.backgroundPrimary ]}>
            {
                (props.auth.isRetrieving || props.accountData.isRetrieving) &&
                <ActivityIndicator size='large' color={ props.settings.theme.invert.color } />
            }

            <View style={ styles.accountContent }>
                <View style={ styles.avatarWrapper }>
                    <Gravatar email={ (account && account.email && account.email as string) || EMPTY_STRING } size={ BASE_HEIGHT * 7.75 } defaultImage='mm' />
                </View>

                <View style={ styles.accountWrapper }>
                    <View style={ styles.account }>
                        <Text style={[ props.settings.theme.backgroundPrimary, Typography.fourthHeader ]}>
                            {
                                (
                                    account && makeShortName(account.firstName as string, account.lastName as string, NAME_FORMAT.FFLF)
                                ) || 'Hi there!'
                            }
                        </Text>
                        <Text style={[ props.settings.theme.backgroundPrimary, Typography.tiny ]}>
                            {
                                (
                                    account && account.email
                                ) || 'Login now to explore features.'
                            }
                        </Text>
                    </View>

                    <View style={ styles.accountBtn }>
                        {
                            (
                                account &&
                                <Button title='Sign Out'
                                        buttonStyle={ [sharedStyles.btnMini, sharedStyles.btnDanger ]}
                                        onPress={ () => console.log('Sign Out') }
                                />
                            ) ||
                            <Button title='Sign In'
                                    buttonStyle={[ sharedStyles.btnMini, sharedStyles.btnSuccess ]}
                                    onPress={ () => props.navigation.navigate('Account', { screen : 'SignIn' }) }
                            />
                        }
                    </View>
                </View>
            </View>
        </View>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(AccountInfo);