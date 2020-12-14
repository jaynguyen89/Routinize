import React from 'react';
import { connect } from 'react-redux';

import { KeyboardAvoidingView, Platform, Text } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { IEditor } from '../../shared/interfaces';
import { sharedStyles } from '../../shared/styles';
import { baseFontSize, Typography } from '../../shared/typography';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const RichTextEditor = (props: IEditor) => {
    const editor = React.useRef('editor');
    const linkModal = React.createRef();

    const handleInsertion = (type : string) => {
        console.log(type)
    }

    const underline = () => {
        console.log('underline')
    }

    const addHeading = (type : string) => {
        console.log('add heading')
    }

    const promptForAttachmentType = () => {
        console.log('prompt for attachment type')
    }

    const addLocation = () => {
        console.log('add location')
    }

    const removeSegment = () => {
        console.log('remove segment')
    }

    return (
        <>
            <RichEditor ref={ editor as unknown as string }
                containerStyle={ props.settings.theme.border }
                editorStyle={ props.settings.theme.backgroundSecondary }
                placeholder={'Note content'}
                onHeightChange={ () => {}}
                onChange={ props.callback }
            />

            <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }>
                <RichToolbar
                    onPressAddImage={ () => handleInsertion('image') }
                    onInsertLink={ () => handleInsertion('link') }
                    iconTint={ props.settings.theme.black.color }
                    selectedIconTint={ sharedStyles.btnDanger.backgroundColor }
                    editor={ editor }
                    actions={[
                        'bold', 'underline', 'italic', 'unorderedList', 'orderedList',
                        'firstHeading', 'secondHeading', 'insertVideo', 'image', 'link',
                        'attachMediaOrFile', 'attachPlace', 'removeSegment'
                    ]}
                    iconMap={{
                        insertVideo : require('../../../assets/video_icon.png'),
                        underline : require('../../../assets/underline_icon.png'),
                        firstHeading : require('../../../assets/heading1.png'),
                        secondHeading : require('../../../assets/heading2.png'),
                        attachMediaOrFile : require('../../../assets/attach_files.png'),
                        attachPlace : require('../../../assets/attach_place.png'),
                        removeSegment : require('../../../assets/remove.png')
                    }}
                    insertVideo={ () => handleInsertion('video') }
                    underline={ () => underline() }
                    firstHeading={ () => addHeading('first') }
                    secondHeading={ () => addHeading('second') }
                    attachMediaOrFile={ () => promptForAttachmentType() }
                    addPlace={ () => addLocation() }
                    remove={ () => removeSegment() }
                />
            </KeyboardAvoidingView>
        </>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(RichTextEditor);