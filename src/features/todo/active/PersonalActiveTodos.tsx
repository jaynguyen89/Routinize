import React from 'react';
import { connect } from 'react-redux';

import { ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import TodoCard from '../components/TodoCard';
import { ITodos } from '../redux/constants';

import { setTodoTypeToCreate } from '../redux/actions';
import ITodo from '../../../models/ITodo';
import ICollaborator from '../../../models/ICollaborator';
import IPlace from '../../../models/IPlace';
import { MEDIA_TYPES } from '../../../shared/enums';
import { sharedStyles } from '../../../shared/styles';
import { IMedia } from '../../../models/others';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {
    setTodoTypeToCreate
}

const items : Array<ITodo> = [{
    id : 1, title : 'Lorem ipsum dolor sit amet!', isPersonal : true, emphasized : true, createdOn : '25 Nov 2020 16:40', doneDate : null, doneBy : null,
    author : {
        id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
        address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IPlace
    } as ICollaborator,
    description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor sed do eiusmod tempor eiusmod incididunt ut labore et dolore magna aliqua.',
    details : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel. At imperdiet dui accumsan sit amet nulla facilisi. Facilisis magna etiam tempor orci eu lobortis. Maecenas pharetra convallis posuere morbi. Eros donec ac odio tempor. Morbi tristique senectus et netus. Hendrerit dolor magna eget est lorem ipsum dolor. Amet tellus cras adipiscing enim eu turpis egestas.',
    attachments : [
        { id : 1, url : 'https://picsum.photos/700', type : MEDIA_TYPES.PHOTO } as IMedia
    ], places : [{ id : 2, name : 'Melbourne State Library', address : '328 Swanston St, Melbourne, VIC 3000', coordination : { lat : -37.81, long : 144.9645554 } } as IPlace],
    related : null,
    dueDate : '20 Nov 2021 13:30'
    // assignees : [{
    //     id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
    //     address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IPlace
    // } as ICollaborator]
}];

const PersonalActiveTodos = (props : ITodos) => {
    //const [open, setOpen] = React.useState(false);

    const gotoNewTodo = () => {
        props.setTodoTypeToCreate(true);
        props.navigation.navigate('New Todo - Personal');
    }

    return (
        props.settings &&
        <>
            <ScrollView style={ sharedStyles.scroller }>
                {
                    items.map((item: ITodo) => <TodoCard item={ item } key={ item.id } navigation={ props.navigation } />)
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
)(PersonalActiveTodos);
