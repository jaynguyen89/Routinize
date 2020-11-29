import React from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { Button } from 'react-native-elements';
import Gravatar from "@krosben/react-native-gravatar";

import styles from "./styles";
import {Typography} from "../shared/typography";
import {sharedStyles} from "../shared/styles";

interface IDrawerAccount {
    settings : any
}

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const DrawerAccount = (props : IDrawerAccount) => {
    return (
        props.settings &&
        <>
            <View style={[ styles.appHeading, props.settings.theme.invert ]}>
                <Text style={[ styles.header, props.settings.theme.textFill ]}>Routinize</Text>
            </View>

            <View style={[ styles.drawerAccountContainer, props.settings.theme.backgroundPrimary ]}>
                <View style={ styles.accountContent }>
                    <View style={ styles.avatarWrapper }>
                        <Gravatar email='nguyen.le.kim.phuc@gmail.com' size={ 150 } defaultImage='mm' />
                    </View>
                    <View style={ styles.accountWrapper }>
                        <View style={ styles.account }>
                            <Text style={[ props.settings.theme.backgroundPrimary, Typography.thirdHeader ]}>
                                Jay Nguyen
                            </Text>
                            <Text style={[ props.settings.theme.backgroundPrimary, Typography.small ]}>
                                jay.nguyen@jaydeveloper.com
                            </Text>
                        </View>

                        <View style={ styles.accountBtn }>
                            <Button title='Sign Out'
                                    buttonStyle={[ sharedStyles.btnMini, sharedStyles.btnDanger ]}
                                    onPress={() => console.log('Manage Account')}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

export default connect(
    mapStateToProps
)(DrawerAccount);
