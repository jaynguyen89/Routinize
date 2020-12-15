import React from 'react';
import { connect } from 'react-redux';

import { KeyboardAvoidingView, Platform, Text } from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { IEditor } from '../../shared/interfaces';
import { sharedStyles } from '../../shared/styles';
import Popover from 'react-native-popover-view/dist/Popover';
import InsertionPopup from './IntertionPopup';
import { EMPTY_STRING } from '../../helpers/Constants';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const RichTextEditor = (props: IEditor) => {
    const editor = React.useRef('editor');
    const [showPopover, setShowPopover] = React.useState(false);
    const [popoverType, setPopoverType] = React.useState(EMPTY_STRING);

    const handleInsertion = (type : string) => {
        setPopoverType(type);
        setShowPopover(true);
    }

    const doneInsertion = (url : string, type : string) => {
        setShowPopover(false);
        if (url.length === 0) return;

        if (type === 'video')
            // @ts-ignore
            editor.current?.insertVideo(url);
        else if (type === 'image')
            // @ts-ignore
            editor.current?.insertImage(url);
        else
            // @ts-ignore
            editor.current?.insertLink(url, url);
    }

    return (
        <>
            <RichEditor ref={ editor as unknown as string }
                containerStyle={ props.settings.theme.border }
                editorStyle={ props.settings.theme.backgroundSecondary }
                placeholder={'Note content'}
                onHeightChange={() => {}}
                // @ts-ignore
                onChange={ async () => props.updateContent(await editor.current?.getContentHtml()) }
            />

            <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }>
                <RichToolbar
                    onPressAddImage={ () => handleInsertion('image') }
                    onInsertLink={ () => handleInsertion('link') }
                    iconTint={ props.settings.theme.black.color }
                    selectedIconTint={ sharedStyles.btnDanger.backgroundColor }
                    editor={ editor }
                    actions={[
                        'bold', 'italic', 'unorderedList', 'orderedList', 'insertVideo',
                        'image', 'link', 'attachMediaOrFile', 'attachPlace', 'removeSegment'
                    ]}
                    iconMap={{
                        insertVideo : require('../../../assets/video_icon.png'),
                        attachMediaOrFile : require('../../../assets/attach_files.png'),
                        attachPlace : require('../../../assets/attach_place.png'),
                        removeSegment : require('../../../assets/remove.png')
                    }}
                    // @ts-ignore
                    insertVideo={ () => handleInsertion('video') }
                    attachMediaOrFile={ props.handleAttachmentAdding }
                    addPlace={ props.handlePlaceAdding }
                    remove={ props.removeSegment }
                />
            </KeyboardAvoidingView>

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }>
                <InsertionPopup type={ popoverType } actions={{
                    done : doneInsertion,
                    cancel : () => setShowPopover(false)
                }} />
            </Popover>
        </>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(RichTextEditor);