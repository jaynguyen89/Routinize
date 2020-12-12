import React from 'react';
import { connect } from 'react-redux';

import { ScrollView, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper';
import TodoCard from '../components/TodoCard';
import { ITodos } from '../redux/constants';

import { setTodoTypeToCreate } from '../redux/actions';
import ITodo from '../../../models/ITodo';
import ICollaborator from '../../../models/ICollaborator';
import IAddress from '../../../models/IAddress';
import { ACTION_TYPES, MEDIA_TYPES } from '../../../shared/enums';
import { sharedStyles } from '../../../shared/styles';
import { IMedia } from '../../../models/others';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV, faPlus, faPlusCircle, faSync, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { baseFontSize } from '../../../shared/typography';
import PopoverMenu from '../../../customs/PopoverMenu';
import Popover from 'react-native-popover-view/dist/Popover';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    authStatus : state.appReducer.authStatus
});

const mapActionsToProps = {
    setTodoTypeToCreate
}

const items : Array<ITodo> = [{
    id : 1, title : 'Lorem ipsum dolor sit amet!', isPersonal : true, emphasized : true, createdOn : '25 Nov 2020 16:40', doneDate : null, doneBy : null,
    author : {
        id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
        address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IAddress
    } as ICollaborator,
    description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor sed do eiusmod tempor eiusmod incididunt ut labore et dolore magna aliqua.',
    details : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel. At imperdiet dui accumsan sit amet nulla facilisi. Facilisis magna etiam tempor orci eu lobortis. Maecenas pharetra convallis posuere morbi. Eros donec ac odio tempor. Morbi tristique senectus et netus. Hendrerit dolor magna eget est lorem ipsum dolor. Amet tellus cras adipiscing enim eu turpis egestas.',
    attachments : [
        { id : 1, url : 'https://picsum.photos/700', type : MEDIA_TYPES.PHOTO } as IMedia
    ], places : [{ id : 2, name : 'Melbourne State Library', address : '328 Swanston St, Melbourne, VIC 3000', coordination : { lat : -37.81, long : 144.9645554 } } as IAddress],
    related : null,
    dueDate : '20 Nov 2021 13:30'
    // assignees : [{
    //     id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
    //     address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IPlace
    // } as ICollaborator]
}];

const PersonalActiveTodos = (props : ITodos) => {
    const [showPopover, setShowPopover] = React.useState(false);
    const stackButton = React.useRef('stackButton');

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity ref={ stackButton as unknown as string } style={ sharedStyles.stackBtnWrapper }
                                  onPress={ () => setShowPopover(true) }>
                    <FontAwesomeIcon icon={ faEllipsisV } size={ baseFontSize * 2 } color={ props.settings.theme.textFill.color } />
                </TouchableOpacity>
            ),
        });
    }, [props.navigation]);

    const gotoNewTodo = () => {
        setShowPopover(false);
        props.setTodoTypeToCreate(true);
        props.navigation.navigate('New Todo - Personal');
    }

    return (
        <>
            <ScrollView style={ sharedStyles.scroller }>
                {
                    items.map((item: ITodo) => <TodoCard item={ item } key={ item.id } navigation={ props.navigation } />)
                }
            </ScrollView>

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }
                     from={ stackButton } arrowStyle={{ backgroundColor : 'transparent' }}>
                <PopoverMenu actions={(
                    props.authStatus && [
                        { name : 'Add New Todo', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => gotoNewTodo() },
                        { name : 'Sync Data', icon : faSyncAlt, type : ACTION_TYPES.NORMAL, callback : () => console.log('Sync') }
                    ]) || [
                        { name : 'Add New Todo', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => gotoNewTodo() }
                    ]} />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PersonalActiveTodos);
