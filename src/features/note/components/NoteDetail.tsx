import React from 'react';
import { connect } from 'react-redux';

import { ScrollView, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Icon, Input, Text } from 'react-native-elements';
import NoteSegmentCard from './NoteSegmentCard';
import Popover from 'react-native-popover-view/dist/Popover';
import { ACTION_TYPES } from '../../../shared/enums';
import { EMPTY_NOTE, EMPTY_SEGMENT, INoteDetail } from '../redux/constants';

import { sharedStyles } from '../../../shared/styles';
import { BASE_HEIGHT, baseFontSize, Typography } from '../../../shared/typography';
import {
    faEllipsisV, faPlusCircle, faSyncAlt, faUsers
} from '@fortawesome/free-solid-svg-icons';
import INoteSegment from '../../../models/INoteSegment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PopoverMenu from '../../../customs/PopoverMenu';
import { Switch } from 'react-native-paper';
import styles from '../styles';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    isPersonal : state.todoReducer.isPersonal,
    authStatus : state.appReducer.authStatus,
    item : state.todoReducer.todoItem
});

const NoteDetail = (props : INoteDetail) => {
    const [item, setItem] = React.useState(EMPTY_NOTE);
    const [personal, setPersonal] = React.useState(true);
    const [showMenuPopover, setShowMenuPopover] = React.useState(false);
    const [showPrefPopover, setShowPrefPopover] = React.useState(false);
    const [shouldShowPref, setShouldShowPref] = React.useState(false);
    const stackButton = React.useRef('stackButton');

    React.useEffect(() => {
        setItem(props.item || EMPTY_NOTE);
        setPersonal((props.item && props.item.isPersonal) || !props.authStatus || props.isPersonal)
    }, [props]);

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity ref={ stackButton as unknown as string } style={ sharedStyles.stackBtnWrapper }
                                  onPress={ () => setShowMenuPopover(true) }>
                    <FontAwesomeIcon icon={ faEllipsisV } size={ baseFontSize * 2 } color={ props.settings.theme.textFill.color } />
                </TouchableOpacity>
            )
        });
    }, [props.navigation]);

    const openPreference = () => {
        setShowMenuPopover(false);
        setShouldShowPref(true);
    }

    const checkShowCollaborators = () => {
        if (shouldShowPref) setShowPrefPopover(true);
        setShouldShowPref(false);
    }

    const removeSegment = (segmentId : number) => {
        console.log('NoteDetail - remove segment')
    }

    return (
        <>
            <View style={{ marginHorizontal : BASE_HEIGHT * 0.5, marginVertical : 0 }}>
                <Input placeholder='Note Title (optional)' style={[ Typography.regular ]}
                       leftIcon={ <Icon name='bookmark' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                />

                <View style={[ sharedStyles.inputWrapper, { flexDirection : 'row', marginTop : BASE_HEIGHT * -0.5 } ]}>
                    <Text style={[ Typography.regular, props.settings.theme.black, sharedStyles.inputLabel, { flex : 1 } ]}>Highlight</Text>
                    <Switch
                        value={ item.emphasized }
                        color={ props.settings.theme.btnPrimary.backgroundColor }
                        style={ styles.switcher }
                        onValueChange={ val => setItem({ ...item, emphasized : val }) }
                    />
                </View>
            </View>

            <ScrollView style={ sharedStyles.scroller }>
                {
                    (
                        item.segments &&
                        item.segments.map((segment : INoteSegment) => <NoteSegmentCard segment={ segment } removeSegment={ removeSegment } />)
                    ) ||
                        <NoteSegmentCard segment={ EMPTY_SEGMENT } removeSegment={ removeSegment } />
                }
            </ScrollView>

            <Popover isVisible={ showPrefPopover } onRequestClose={ () => setShowPrefPopover(false) }>
                <View style={ styles.notePrefDialog }>
                    <Text style={[ Typography.thirdHeader, styles.notePrefTitle ]}>Collaborators</Text>

                    <View style={ sharedStyles.inputWrapper }>
                        <Input placeholder='Name to search' style={[ Typography.regular, { flex : 1 } ]}
                               leftIcon={ <Icon name='people' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                               rightIcon={ <Icon name='person-search' size={ 24 }
                                                 color={ props.settings.theme.textFill.color }
                                                 style={[ props.settings.theme.btnPrimary, sharedStyles.inputFieldBtn ] as ViewStyle }
                               /> }
                        />
                    </View>
                </View>
            </Popover>

            <Popover isVisible={ showMenuPopover } onRequestClose={ () => setShowMenuPopover(false) }
                     from={ stackButton } arrowStyle={{ backgroundColor : 'transparent' }}
                     onCloseComplete={ () => checkShowCollaborators() }>
                <PopoverMenu actions={(
                    !personal && [
                        { name : 'Add Segment', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => console.log('add segment') },
                        { name : 'Collaborators', icon : faUsers, type : ACTION_TYPES.NORMAL, callback : () => openPreference() },
                        { name : 'Sync Data', icon : faSyncAlt, type : ACTION_TYPES.NORMAL, callback : () => console.log('Sync') }
                    ]) || [
                    { name : 'Add Segment', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => console.log('add segment') }
                ]} />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps
)(NoteDetail);
