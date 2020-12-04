import React from "react";
import { connect } from "react-redux";
import ITodo from '../../../models/ITodo';
import IPlace from '../../../models/IPlace';
import ICollaborator from '../../../models/ICollaborator';
import { MEDIA_TYPES } from '../../../shared/enums';
import { IMedia } from '../../../models/others';
import { ITodos } from '../redux/constants';
import { ScrollView } from 'react-native';
import { sharedStyles } from '../../../shared/styles';
import TodoCard from '../components/TodoCard';
import { FAB } from 'react-native-paper';
import { setTodoTypeToCreate } from '../redux/actions';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {
    setTodoTypeToCreate
}

const items : Array<ITodo> = [{
    id : 1, title : 'Lorem ipsum dolor sit amet!', isPersonal : true, emphasized : true, createdOn : '25 Nov 2020 16:40', doneDate : null,
    author : {
        id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
        address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IPlace
    } as ICollaborator,
    description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor sed do eiusmod tempor eiusmod incididunt ut labore et dolore magna aliqua.',
    details : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel. At imperdiet dui accumsan sit amet nulla facilisi. Facilisis magna etiam tempor orci eu lobortis. Maecenas pharetra convallis posuere morbi. Eros donec ac odio tempor. Morbi tristique senectus et netus. Hendrerit dolor magna eget est lorem ipsum dolor. Amet tellus cras adipiscing enim eu turpis egestas.',
    images : [{ id : 1, url : 'https://picsum.photos/700', type : MEDIA_TYPES.PHOTO } as IMedia],
    files : undefined, related : undefined,
    dueDate : '20 Nov 2021 13:30',
    assignees : [{
        id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
        address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IPlace
    } as ICollaborator],
    places : [{ id : 2, name : 'Melbourne State Library', address : '328 Swanston St, Melbourne, VIC 3000', coordination : { lat : -37.81, long : 144.9645554 } } as IPlace]
}];

const PersonalImportantTodos = (props : ITodos) => {

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
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PersonalImportantTodos);
