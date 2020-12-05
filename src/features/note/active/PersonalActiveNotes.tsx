import React from "react";
import { connect } from "react-redux";

import { Button, ScrollView, View } from 'react-native';
import { FAB } from "react-native-paper";
import NoteRow from "../components/NoteRow";
import { Divider } from "react-native-elements";
import INote from "../../../models/INote";
import ICollaborator from "../../../models/ICollaborator";
import { IMedia } from "../../../models/others";
import IPlace from "../../../models/IPlace";
import { IActiveNotes } from "../redux/constants";

import { sharedStyles } from "../../../shared/styles";
import { MEDIA_TYPES } from "../../../shared/enums";

import { setNoteTypeToCreate } from '../redux/actions';
import INoteSegment from "../../../models/INoteSegment";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {
    setNoteTypeToCreate
}

const items : Array<INote> = [{
    id : 1, title : null, emphasized : false, createdOn : '30 Nov 2020 00:46', isPersonal : true,
    author : {
        id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
        address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IPlace
    } as ICollaborator,
    // assignees : [{
    //     id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
    //     address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IPlace
    // } as ICollaborator],
    segments : [{ id : 1,
        body : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec eleifend risus. Phasellus sit amet mollis arcu, quis ornare velit. Aliquam id risus euismod, volutpat ante vitae, porttitor augue. Cras leo ligula, consequat ac dui id, venenatis placerat libero. Etiam mollis ultrices justo, ut rhoncus ligula tempor eu. Morbi sed lacus eget augue dapibus vulputate sed eu metus. Vivamus pretium faucibus est, a finibus nulla placerat id. Fusce at laoreet libero. Cras id metus sit amet diam ultrices facilisis. Fusce scelerisque facilisis mauris nec cursus. Cras malesuada est auctor ipsum dictum, dapibus euismod odio blandit. Sed pharetra diam et arcu porttitor, at bibendum leo aliquet. Fusce laoreet vulputate augue. Duis facilisis risus quis congue sollicitudin.\n' +
            '\n' +
            'Aliquam eu diam condimentum lorem imperdiet placerat non id nunc. Nulla mattis diam magna, in gravida elit efficitur vel. Suspendisse et interdum libero, eu euismod arcu. Integer id enim et nibh imperdiet fermentum quis quis erat. Praesent vel massa porta, porttitor leo ac, malesuada ex. Quisque at laoreet odio. Aliquam gravida odio nunc, in ultricies libero imperdiet eu. Duis viverra nibh elit, ac sagittis eros blandit id. Aenean magna nibh, cursus in libero in, varius tempus enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin luctus massa vel euismod rhoncus. Praesent ornare maximus ante nec lobortis. Aliquam dignissim ipsum turpis, ac finibus urna fringilla molestie.'
    } as INoteSegment]
} as INote, {
    id : 2, title : 'Integer eget aliquet nibh praesent tristique.', emphasized : true, createdOn : '21 Oct 2020 18:37', isPersonal : true,
    author : {
        id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
        address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IPlace
    } as ICollaborator,
    // assignees : [{
    //     id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
    //     address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IPlace
    // } as ICollaborator],
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
    //const [open, setOpen] = React.useState(false);

    const gotoNewNote = () => {
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

            <FAB visible icon='plus'
                 style={[ sharedStyles.fab, props.settings.theme.invert ]}
                 onPress={ () => gotoNewNote() }
            />

            {/*<Provider>*/}
            {/*    <Portal>*/}
            {/*        <FAB.Group visible*/}
            {/*            open={open}*/}
            {/*            style={[ styles.fab]}*/}
            {/*            icon={ require('../../../../assets/images/add_icon.png') }*/}
            {/*            actions={[*/}
            {/*                { icon: require('../../../../assets/images/add_icon.png'), onPress: () => console.log('Pressed add') },*/}
            {/*                {*/}
            {/*                    icon: require('../../../../assets/images/add_icon.png'),*/}
            {/*                    label: 'Star',*/}
            {/*                    onPress: () => console.log('Pressed star'),*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    icon: require('../../../../assets/images/add_icon.png'),*/}
            {/*                    label: 'Email',*/}
            {/*                    onPress: () => console.log('Pressed email'),*/}
            {/*                },*/}
            {/*                {*/}
            {/*                    icon: require('../../../../assets/images/add_icon.png'),*/}
            {/*                    label: 'Remind',*/}
            {/*                    onPress: () => console.log('Pressed notifications'),*/}
            {/*                },*/}
            {/*            ]}*/}
            {/*            onStateChange={() => setOpen(!open)}*/}
            {/*            onPress={ () => {} }*/}
            {/*        />*/}
            {/*    </Portal>*/}
            {/*</Provider>*/}
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PersonalActiveNotes);
