import React from "react";
import { connect } from "react-redux";

import { ScrollView, TouchableOpacity, View } from "react-native";
import NoteRow from "../components/NoteRow";
import { Divider } from "react-native-elements";
import INote from "../../../models/INote";
import ICollaborator from "../../../models/ICollaborator";
import { IMedia } from "../../../models/others";
import { IActiveNotes } from "../redux/constants";

import { sharedStyles } from "../../../shared/styles";
import { ACTION_TYPES, MEDIA_TYPES } from "../../../shared/enums";

import { setNoteTypeToCreate } from '../redux/actions';
import INoteSegment from "../../../models/INoteSegment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisV, faPlusCircle, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { baseFontSize } from "../../../shared/typography";
import PopoverMenu from "../../../customs/PopoverMenu";
import Popover from "react-native-popover-view/dist/Popover";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    authStatus : state.appReducer.authStatus
});

const mapActionsToProps = {
    setNoteTypeToCreate
}

const items : Array<INote> = [{
    id : 1, title : null, emphasized : false, createdOn : '30 Nov 2020 00:46', isPersonal : true,
    author : {
        id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer', address : null
    } as ICollaborator,
    segments : [{ id : 1,
        body : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec eleifend risus. Phasellus sit amet mollis arcu, quis ornare velit. Aliquam id risus euismod, volutpat ante vitae, porttitor augue. Cras leo ligula, consequat ac dui id, venenatis placerat libero. Etiam mollis ultrices justo, ut rhoncus ligula tempor eu. Morbi sed lacus eget augue dapibus vulputate sed eu metus. Vivamus pretium faucibus est, a finibus nulla placerat id. Fusce at laoreet libero. Cras id metus sit amet diam ultrices facilisis. Fusce scelerisque facilisis mauris nec cursus. Cras malesuada est auctor ipsum dictum, dapibus euismod odio blandit. Sed pharetra diam et arcu porttitor, at bibendum leo aliquet. Fusce laoreet vulputate augue. Duis facilisis risus quis congue sollicitudin.\n' +
            '\n' +
            'Aliquam eu diam condimentum lorem imperdiet placerat non id nunc. Nulla mattis diam magna, in gravida elit efficitur vel. Suspendisse et interdum libero, eu euismod arcu. Integer id enim et nibh imperdiet fermentum quis quis erat. Praesent vel massa porta, porttitor leo ac, malesuada ex. Quisque at laoreet odio. Aliquam gravida odio nunc, in ultricies libero imperdiet eu. Duis viverra nibh elit, ac sagittis eros blandit id. Aenean magna nibh, cursus in libero in, varius tempus enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus massa vel euismod rhoncus. Praesent ornare maximus ante nec lobortis. Aliquam dignissim ipsum turpis, ac finibus urna fringilla molestie.'
    } as INoteSegment]
} as INote, {
    id : 2, title : 'Integer eget aliquet nibh praesent tristique.', emphasized : true, createdOn : '21 Oct 2020 18:37', isPersonal : true,
    author : {
        id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
        address : null
    } as ICollaborator,
    segments : [{ id : 1,
        body : 'Tellus molestie nunc non blandit. Id aliquet risus feugiat in ante metus. Magna eget est lorem ipsum dolor sit amet. Lectus magna fringilla urna porttitor rhoncus dolor purus non. Neque convallis a cras semper auctor. Risus pretium quam vulputate dignissim suspendisse. Lobortis elementum nibh tellus molestie nunc. Etiam dignissim diam quis enim. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Donec ultrices tincidunt arcu non sodales. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Sit amet justo donec enim diam. Enim tortor at auctor urna.\n' +
            '\n' +
            'Dui vivamus arcu felis bibendum ut tristique et. Aliquam vestibulum morbi blandit cursus risus. Dis parturient montes nascetur ridiculus mus mauris. Nunc sed velit dignissim sodales ut. Id velit ut tortor pretium viverra. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Molestie at elementum eu facilisis sed odio morbi. Sagittis eu volutpat odio facilisis mauris sit. Diam sit amet nisl suscipit. Et netus et malesuada fames ac turpis. Sed sed risus pretium quam vulputate. Justo donec enim diam vulputate. Consectetur libero id faucibus nisl tincidunt eget nullam non. Eget mi proin sed libero.',
        attachments : [{ id : 1, url : 'https://picsum.photos/700', type : MEDIA_TYPES.PHOTO } as IMedia]
    }, { id : 2,
        body : 'Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Ac ut consequat semper viverra nam libero. Blandit turpis cursus in hac. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi. Iaculis eu non diam phasellus vestibulum. Laoreet id donec ultrices tincidunt arcu non sodales neque. Ornare suspendisse sed nisi lacus sed viverra tellus in hac. Aliquet nibh praesent tristique magna sit amet purus. Id donec ultrices tincidunt arcu non. Eu tincidunt tortor aliquam nulla facilisi. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Mattis nunc sed blandit libero volutpat sed cras ornare arcu. Morbi quis commodo odio aenean sed adipiscing diam. Magna ac placerat vestibulum lectus mauris ultrices eros. Ipsum consequat nisl vel pretium. Augue ut lectus arcu bibendum. Habitant morbi tristique senectus et netus et malesuada. Sodales ut etiam sit amet nisl purus in. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Purus sit amet luctus venenatis lectus.\n' +
            '\n' +
            'Tortor dignissim convallis aenean et tortor at risus viverra. Non enim praesent elementum facilisis. Enim tortor at auctor urna. Suspendisse ultrices gravida dictum fusce ut placerat. Cursus sit amet dictum sit amet justo donec enim diam. Ut venenatis tellus in metus. Est placerat in egestas erat. Euismod in pellentesque massa placerat duis ultricies. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Morbi quis commodo odio aenean sed adipiscing diam. Leo in vitae turpis massa sed elementum. A lacus vestibulum sed arcu.',
        attachments : [{ id : 1, url : 'https://picsum.photos/700', type : MEDIA_TYPES.PHOTO } as IMedia]
    }]
} as INote];

const PersonalActiveNotes = (props : IActiveNotes) => {
    const [showPopover, setShowPopover] = React.useState(false);
    const stackButton = React.useRef('stackButton');

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity ref={ stackButton as unknown as string } style={ sharedStyles.stackBtnWrapper }
                                  onPress={ () => setShowPopover(true) }>
                    <FontAwesomeIcon icon={ faEllipsisV } size={ baseFontSize * 2 } color={ props.settings.theme.textFill.color } />
                </TouchableOpacity>
            )
        });
    }, [props.navigation]);

    const gotoNewNote = () => {
        setShowPopover(false);
        props.setNoteTypeToCreate(true);
        props.navigation.navigate('New Note - Personal');
    }

    return (
        <>
            <ScrollView style={ sharedStyles.scroller }>
                {
                    items.map((item: INote) => {
                        return (
                            <View key={ item.id }>
                                <NoteRow item={ item } navigation={ props.navigation } />
                                <Divider style={{ backgroundColor : props.settings.theme.btnDisabled.color }} />
                            </View>
                        );
                    })
                }
            </ScrollView>

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }
                     from={ stackButton } arrowStyle={{ backgroundColor : 'transparent' }}>
                <PopoverMenu actions={(
                    props.authStatus && [
                        { name : 'Add New Note', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => gotoNewNote() },
                        { name : 'Sync Data', icon : faSyncAlt, type : ACTION_TYPES.NORMAL, callback : () => console.log('Sync') }
                    ]) || [
                    { name : 'Add New Note', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => gotoNewNote() }
                ]} />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PersonalActiveNotes);
