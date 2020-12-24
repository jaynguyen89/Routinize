import React from 'react';
import { connect } from 'react-redux';

import { Text, View } from 'react-native';
import { IDynamicButton, IPopoverContent } from '../shared/interfaces';
import { Divider } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { TouchableRipple } from 'react-native-paper';

import styles from './styles';
import { ACTION_TYPES } from '../shared/enums';
import { sharedStyles } from '../shared/styles';
import { baseFontSize } from '../shared/typography';
import { SPACE_MONO } from '../helpers/Constants';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const PopoverMenu = (props : IPopoverContent) => {
    return (
        <View style={ props.settings.theme.backgroundSecondary }>
            {
                props.actions.map((action : IDynamicButton, i : number) =>
                    action &&
                    <TouchableRipple key={ i } rippleColor={ props.settings.theme.btnPrimary.backgroundColor } onPress={ action.callback }>
                        <View style={ styles.popover }>
                            <Text style={[
                                styles.menuRow,
                                { color :
                                action.type === ACTION_TYPES.NORMAL ? props.settings.theme.black.color : (
                                    action.type === ACTION_TYPES.CAUTIOUS ? sharedStyles.btnWarning.backgroundColor : sharedStyles.btnDanger.backgroundColor
                                )}
                            ]}>
                                <FontAwesomeIcon icon={ action.icon as IconDefinition } size={ baseFontSize * 1.5 }
                                                 style={ styles.iconCenter } color={ props.settings.theme.invert.color } />
                                { SPACE_MONO + action.name }
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