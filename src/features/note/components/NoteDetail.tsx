import React from 'react';
import { connect } from 'react-redux';

import { ScrollView, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import DynamicButtons from '../../../customs/DynamicButtons';
import { FAB } from 'react-native-paper';
import NoteSegmentCard from './NoteSegmentCard';
import Popover from 'react-native-popover-view/dist/Popover';
import NotePreference from './NotePreference';
import { ACTION_TYPES } from '../../../shared/enums';
import { INoteDetail } from '../redux/constants';

import styles from '../styles';
import { sharedStyles } from '../../../shared/styles';
import { Typography } from '../../../shared/typography';
import {
    faFileImport,
    faMapMarkerAlt,
    faMinusCircle,
    faPhotoVideo,
    faPlusCircle,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import INoteSegment from '../../../models/INoteSegment';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    isPersonal : state.todoReducer.isPersonal,
    item : state.todoReducer.todoItem
});

const NoteDetail = (props : INoteDetail) => {
    const [showPopover, setShowPopover] = React.useState(false);

    return (
        <>
            <View style={ sharedStyles.inputWrapper }>
                <Input placeholder='Note Title (optional)' style={[ Typography.regular ]}
                       leftIcon={ <Icon name='bookmark' size={ 24 } color={ props.settings.theme.invert.backgroundColor } /> }
                />
            </View>

            <View style={ styles.functionalBtnRow }>
                <DynamicButtons actions={[
                    { icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => console.log('Add Segment') },
                    { icon : faPhotoVideo, type : ACTION_TYPES.NORMAL, callback : () => console.log('Add Media') },
                    { icon : faFileImport, type : ACTION_TYPES.NORMAL, callback : () => console.log('Add File') },
                    { icon : faMapMarkerAlt, type : ACTION_TYPES.NORMAL, callback : () => console.log('Add Location') },
                    { icon : faTrashAlt, type : ACTION_TYPES.CAUTIOUS, callback : () => console.log('Remove Attachment') },
                    { icon : faMinusCircle, type : ACTION_TYPES.DANGEROUS, callback : () => console.log('Remove Segment') }
                ]} />
            </View>

            <ScrollView style={ sharedStyles.scroller }>
                {
                    (
                        props.item &&
                        props.item.segments.map((segment : INoteSegment) => <NoteSegmentCard segment={ segment } />)
                    ) ||
                        <NoteSegmentCard />
                }
            </ScrollView>

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }>
                <NotePreference />
            </Popover>

            <FAB visible icon='cogs' small
                 style={[ sharedStyles.fab, props.settings.theme.invert ]}
                 onPress={ () => setShowPopover(true) }
            />
        </>
    );
}

export default connect(
    mapStateToProps
)(NoteDetail);
