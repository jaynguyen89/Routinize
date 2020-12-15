import React from 'react';
import { connect } from 'react-redux';

import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import NoteSegmentCard from './NoteSegmentCard';
import Popover from 'react-native-popover-view/dist/Popover';
import NotePreference from './NotePreference';
import { ACTION_TYPES } from '../../../shared/enums';
import { EMPTY_SEGMENT, INoteDetail } from '../redux/constants';

import { sharedStyles } from '../../../shared/styles';
import { BASE_HEIGHT, baseFontSize, Typography } from '../../../shared/typography';
import {
    faEllipsisV, faPlusCircle, faSyncAlt, faToolbox
} from '@fortawesome/free-solid-svg-icons';
import INoteSegment from '../../../models/INoteSegment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PopoverMenu from '../../../customs/PopoverMenu';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    isPersonal : state.todoReducer.isPersonal,
    authStatus : state.appReducer.authStatus,
    item : state.todoReducer.todoItem
});

const NoteDetail = (props : INoteDetail) => {
    const [showMenuPopover, setShowMenuPopover] = React.useState(false);
    const [showPrefPopover, setShowPrefPopover] = React.useState(false);
    const [shouldShowPref, setShouldShowPref] = React.useState(false);
    const stackButton = React.useRef('stackButton');

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity ref={ stackButton as unknown as string } style={ sharedStyles.stackBtnWrapper }
                                  onPress={ () => setShowMenuPopover(true) }>
                    <FontAwesomeIcon icon={ faEllipsisV } size={ baseFontSize * 2 } color={ props.settings.theme.textFill.color } />
                </TouchableOpacity>
            ),
        });
    }, [props.navigation]);

    const openPreference = () => {
        setShowMenuPopover(false);
        setShouldShowPref(true);
    }

    const checkShowPreference = () => {
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
            </View>

            <ScrollView style={ sharedStyles.scroller }>
                {
                    (
                        props.item &&
                        props.item.segments.map((segment : INoteSegment) => <NoteSegmentCard segment={ segment } removeSegment={ removeSegment } />)
                    ) ||
                        <NoteSegmentCard segment={ EMPTY_SEGMENT } removeSegment={ removeSegment } />
                }
            </ScrollView>

            <Popover isVisible={ showPrefPopover } onRequestClose={ () => setShowPrefPopover(false) }>
                <NotePreference />
            </Popover>

            <Popover isVisible={ showMenuPopover } onRequestClose={ () => setShowMenuPopover(false) }
                     from={ stackButton } arrowStyle={{ backgroundColor : 'transparent' }}
                     onCloseComplete={ () => checkShowPreference() }>
                <PopoverMenu actions={(
                    props.authStatus && [
                        { name : 'Add Segment', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => console.log('add segment') },
                        { name : 'Note Preference', icon : faToolbox, type : ACTION_TYPES.NORMAL, callback : () => openPreference() },
                        { name : 'Sync Data', icon : faSyncAlt, type : ACTION_TYPES.NORMAL, callback : () => console.log('Sync') }
                    ]) || [
                    { name : 'Add Segment', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => console.log('add segment') },
                    { name : 'Note Preference', icon : faToolbox, type : ACTION_TYPES.NORMAL, callback : () => openPreference() }
                ]} />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps
)(NoteDetail);
