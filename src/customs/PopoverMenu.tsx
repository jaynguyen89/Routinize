import React from 'react';
import { connect } from 'react-redux';

import styles from './styles';
import { Text, View } from 'react-native';
import { IDynamicButton, IPopoverContent } from '../shared/interfaces';
import { Divider } from 'react-native-elements';
import { TouchableRipple } from 'react-native-paper';
import { ACTION_TYPES } from '../shared/enums';
import { sharedStyles } from '../shared/styles';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const PopoverMenu = (props : IPopoverContent) => {
    return (
        <View style={ props.settings.theme.backgroundSecondary }>
            {
                props.actions.map((action : IDynamicButton, i : number) =>
                    <TouchableRipple key={ i } rippleColor={ props.settings.theme.btnPrimary.backgroundColor } onPress={ action.callback }>
                        <View style={ styles.popover }>
                            <Text style={[
                                styles.menuRow,
                                { color :
                                action.type === ACTION_TYPES.NORMAL ? props.settings.theme.black.color : (
                                    action.type === ACTION_TYPES.CAUTIOUS ? sharedStyles.btnWarning.backgroundColor : sharedStyles.btnDanger.backgroundColor
                                )}
                            ]}>
                                { action.name }
                            </Text>

                            {
                                i !== props.actions.length - 1 &&
                                <Divider style={{ backgroundColor : props.settings.theme.btnDisabled.color }} />
                            }
                        </View>
                    </TouchableRipple>
                )
            }
        </View>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PopoverMenu);