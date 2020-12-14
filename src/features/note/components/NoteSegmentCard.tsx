import React from 'react';
import { connect } from 'react-redux';

import { Text, TextInput, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { INoteSegmentCard } from '../redux/constants';
import RichTextEditor from '../../../customs/rte/RichTextEditor';

import styles from '../styles';
import { faAlignJustify, faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { baseFontSize } from '../../../shared/typography';
import { sharedStyles } from '../../../shared/styles';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const NoteSegmentCard = (props : INoteSegmentCard) => {console.log(props.segment);
    return (
        <View style={ styles.segmentWrapper }>
                <View style={[ { flex : 3 }, props.settings.theme.backgroundSecondary ]}>
                    {/*<TextInput multiline style={[ styles.textContainer, props.settings.theme.btnDisabled ]}*/}
                    {/*           placeholder='Note content' value={ props.segment?.body } />*/}

                    <RichTextEditor />
                </View>

                {/*<View style={[ styles.attachmentContainer ]}>*/}
                {/*    <View style={{ height : 60 }}>*/}
                {/*        <View style={ styles.editorIconWrapper }>*/}
                {/*            <View style={[ { flex : 1 }, styles.firstBtn, sharedStyles.btnSuccessDisabled ]}>*/}
                {/*                <FontAwesomeIcon icon={ faBold } size={ baseFontSize * 1.3 }*/}
                {/*                                 style={ styles.editorIcon } color={ sharedStyles.btnSuccessDisabled.color } />*/}
                {/*            </View>*/}

                {/*            <View style={[ { flex : 1 }, styles.secondBtn, sharedStyles.btnSuccessDisabled ]}>*/}
                {/*                <FontAwesomeIcon icon={ faItalic } size={ baseFontSize * 1.3 }*/}
                {/*                                 style={ styles.editorIcon } color={ sharedStyles.btnSuccessDisabled.color } />*/}
                {/*            </View>*/}
                {/*        </View>*/}

                {/*        <View style={ styles.editorIconWrapper }>*/}
                {/*            <View style={[ { flex : 1 }, styles.thirdBtn, sharedStyles.btnSuccessDisabled ]}>*/}
                {/*                <FontAwesomeIcon icon={ faUnderline } size={ baseFontSize * 1.3 }*/}
                {/*                                 style={ styles.editorIcon } color={ sharedStyles.btnSuccessDisabled.color } />*/}
                {/*            </View>*/}

                {/*            <View style={[ { flex : 1 }, styles.fourthBtn, sharedStyles.btnSuccessDisabled ]}>*/}
                {/*                <FontAwesomeIcon icon={ faAlignJustify } size={ baseFontSize * 1.3 }*/}
                {/*                                 style={ styles.editorIcon } color={ sharedStyles.btnSuccessDisabled.color } />*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*    </View>*/}

                {/*    <View style={[ { flex : 1 }, styles.attachmentWrapper, props.settings.theme.btnDisabled ]}>*/}
                {/*        <Text>Attachments</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}
        </View>
    );
}

export default connect(
    mapStateToProps
)(NoteSegmentCard);
