import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Alert, ScrollView, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Icon, Input, Text } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Switch } from 'react-native-paper';
import NoteSegmentCard from './NoteSegmentCard';
import Popover from 'react-native-popover-view/dist/Popover';
import PopoverMenu from '../../../customs/PopoverMenu';
import { ACTION_TYPES, ACTIONS } from '../../../shared/enums';
import { INoteDetail } from '../redux/constants';
import { IFile, IMedia } from '../../../models/others';
import IAddress from '../../../models/IAddress';
import { IDynamicButton } from '../../../shared/interfaces';
import INoteSegment from '../../../models/INoteSegment';

import styles from '../styles';
import { sharedStyles } from '../../../shared/styles';
import { BASE_HEIGHT, baseFontSize, Typography } from '../../../shared/typography';
import {
    faCheckCircle,
    faEllipsisV,
    faPlusCircle,
    faSyncAlt,
    faTimesCircle,
    faUndo,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import { EMPTY_STRING } from '../../../helpers/Constants';
import { EMPTY_NOTE, EMPTY_SEGMENT } from '../../../models/INote';
import ActionButtons from '../../../customs/ActionButtons';
import ScreenCover from '../../../customs/ScreenCover';

import { saveLocalNote, updateLocalNote } from '../redux/actions';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    isPersonal : state.noteReducer.isPersonal,
    authStatus : state.appReducer.authStatus,
    item : state.noteReducer.noteItem
});

const mapActionsToProps = {
    saveLocalNote,
    updateLocalNote
};

const NoteDetail = (props : INoteDetail) => {
    const [action, setAction] = React.useState(ACTIONS.NONE);
    const [item, setItem] = React.useState(_.cloneDeep(EMPTY_NOTE));
    const [segmentIndexesToRemove, setSegmentIndexesToRemove] = React.useState(new Array<number>());
    const [screenCover, setScreenCover] = React.useState({ message : EMPTY_STRING, visible : false });

    const [personal, setPersonal] = React.useState(true);
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
            )
        });
    }, [props.navigation]);

    React.useEffect(() => {
        setItem(props.item || _.cloneDeep(EMPTY_NOTE));
        setPersonal((props.item && props.item.isPersonal) || !props.authStatus || props.isPersonal);
    }, [props]);

    const openPreference = () => {
        setShowMenuPopover(false);
        setShouldShowPref(true);
    }

    const checkShowCollaborators = () => {
        if (shouldShowPref) setShowPrefPopover(true);
        setShouldShowPref(false);
    }

    const addSegment = () => {
        setShowMenuPopover(false);
        const emptySegment = item.segments.filter((segment : INoteSegment) => segment.body.length === 0);

        if (emptySegment.length !== 0) {
            Alert.alert(
                'Add new segment.',
                'Your note has an unused segment with empty content. You can add some details on it.',
                [{ text: 'OK', onPress : () => { } }],
                { cancelable: false }
            );

            return;
        }

        let segments = _.cloneDeep(item.segments);
        segments.push(_.cloneDeep(EMPTY_SEGMENT));
        setItem({ ...item, segments });
    }

    // Caution: remove segment by index, NOT id
    const removeSegment = (segmentIndex : number) => {
        Alert.alert(
            'Remove segment.',
            'Are you sure to remove this segment? This can\'t be undone.',
            [{ text: 'NO', onPress: () => { } },
                {
                    text : 'YES', onPress : () => {
                        if (item.segments.length === 1) return;

                        let segmentIndexes = _.cloneDeep(segmentIndexesToRemove);
                        segmentIndexes.push(segmentIndex);

                        if (segmentIndexes.length === item.segments.length) {
                            let segments = _.cloneDeep(item.segments);
                            segments.push(_.cloneDeep(EMPTY_SEGMENT));
                            setItem({ ...item, segments });
                        }

                        setSegmentIndexesToRemove(segmentIndexes);
                    }
                }
            ],
            { cancelable: false }
        );
    }

    const undoSegmentRemoval = () => {
        setShowMenuPopover(false);

        let segmentIndexes = _.cloneDeep(segmentIndexesToRemove);
        segmentIndexes.pop();

        setSegmentIndexesToRemove(segmentIndexes);
    }

    const updateNoteSegment = (
        segmentIndex : number, field : string, data : string | IMedia | IFile | IAddress | null | Array<IMedia | IFile | IAddress>
    ) => {
        let segment = item.segments.filter((segment : INoteSegment, i : number) => i === segmentIndex)[0];

        if (field === 'body') segment.body = data as string;
        if (field === 'attachments' && Array.isArray(data)) segment.attachments = data as Array<IMedia | IFile>;
        if (field === 'attachments' && !Array.isArray(data)) {
            if (!segment.attachments) segment.attachments = new Array<IMedia | IFile>();

            segment.attachments.push(data as IMedia | IFile);
        }

        if (field === 'places' && Array.isArray(data)) segment.places = data as Array<IAddress>;
        if (field === 'places' && !Array.isArray(data)) {
            if (!segment.places) segment.places = new Array<IAddress>();

            segment.places.push(data as IAddress);
        }

        let segments = _.cloneDeep(item.segments);
        segments[segmentIndex] = segment;
        setItem({ ...item, segments });
    }

    const confirmAndGoBack = () =>
        Alert.alert(
            "Cancel Note",
            "Your Note has not been saved. All details you have entered will be lost.\n\nAre you sure?",
            [
                {
                    text: "No, back to my Note.",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: 'Yes, I\'m sure.',
                    onPress: () => props.navigation.goBack()
                }
            ],
            { cancelable: false }
        );

    const createOrUpdateNote = () => {
        if (item.segments.length === 1 && item.segments[0].body.length === 0) {
            alert('Note has no content to save.');
            return;
        }

        if (item.id === 0) {
            setScreenCover({ message : 'Saving Note...', visible : true });
            props.saveLocalNote(item, segmentIndexesToRemove);
            setAction(ACTIONS.CREATE);
        }
        else {
            setScreenCover({ message : 'Updating Note...', visible : true });
            props.updateLocalNote(item, segmentIndexesToRemove);
            setAction(ACTIONS.UPDATE);
        }
    }

    return (
        <>
            <ScrollView style={ sharedStyles.scroller }>
                <View style={{ marginHorizontal : BASE_HEIGHT * 0.5, marginVertical : 0 }}>
                    <Input placeholder='Note Title (optional)' style={[ Typography.regular ]} value={ item.title || EMPTY_STRING }
                           leftIcon={ <Icon name='bookmark' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                           onChangeText={ val => setItem({ ...item, title : val }) }
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

                {
                    item.segments.map((segment : INoteSegment, i : number) =>
                        <View key={ i } style={{ display :  (_.includes(segmentIndexesToRemove, i) && 'none') || 'flex' }}>
                            <NoteSegmentCard
                                segmentIndex={ i }
                                segment={ segment }
                                removeSegment={ removeSegment }
                                updateNoteSegment={ updateNoteSegment }
                            />
                        </View>
                    )
                }
            </ScrollView>

            <ActionButtons actions={[
                { name : 'Cancel', icon : faTimesCircle, type : ACTION_TYPES.DANGEROUS, callback : () => confirmAndGoBack() },
                { name : 'Done', icon : faCheckCircle, type : ACTION_TYPES.NORMAL, callback : () => createOrUpdateNote() }
            ]} />

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
                        { name : 'Add Segment', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => addSegment() },
                        (segmentIndexesToRemove.length !== 0 && { name : 'Undo segment removal', icon : faUndo, type : ACTION_TYPES.NORMAL, callback : () => undoSegmentRemoval() }) || null as unknown as IDynamicButton,
                        { name : 'Collaborators', icon : faUsers, type : ACTION_TYPES.NORMAL, callback : () => openPreference() },
                        { name : 'Sync Data', icon : faSyncAlt, type : ACTION_TYPES.NORMAL, callback : () => console.log('Sync') }
                    ]) || [
                    { name : 'Add Segment', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => addSegment() },
                    (segmentIndexesToRemove.length !== 0 && { name : 'Undo segment removal', icon : faUndo, type : ACTION_TYPES.NORMAL, callback : () => undoSegmentRemoval() }) || null as unknown as IDynamicButton
                ]} />
            </Popover>

            <ScreenCover message={ screenCover.message } visible={ screenCover.visible } />
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(NoteDetail);
