import React from "react";
import {connect} from "react-redux";

import {ScrollView} from "react-native";
import {FAB} from "react-native-paper";
import NoteCard from "../components/NoteCard";

import INote from "../../../models/INote";
import {sharedStyles} from "../../../shared/styles";

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {

}

const items : Array<INote> = [];

const PersonalActiveNotes = (props : any) => {
    //const [open, setOpen] = React.useState(false);

    const gotoNewTodo = () => {
        props.setTodoTypeToCreate(true);
        props.navigation.navigate('New Note - Personal');
    }

    return (
        props.settings &&
        <>
            <ScrollView style={ sharedStyles.scroller }>
                {
                    items.map((item: INote) => <NoteCard item={ item } key={ item.id } navigation={ props.navigation } />)
                }
            </ScrollView>

            <FAB visible icon='plus'
                 style={[ sharedStyles.fab, props.settings.theme.invert ]}
                 onPress={ () => gotoNewTodo() }
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
