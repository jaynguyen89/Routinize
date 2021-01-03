import React from 'react';
import { connect } from 'react-redux';

import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import TodoCard from '../components/TodoCard';
import PopoverMenu from '../../../customs/PopoverMenu';
import Popover from 'react-native-popover-view/dist/Popover';
import Loading from '../../../customs/Loading';
import CustomError from '../../../customs/CustomError';
import { ITodos } from '../redux/interfaces';
import ITodo from '../../../models/ITodo';

import { sharedStyles } from '../../../shared/styles';
import { faEllipsisV, faGlobe, faPlusCircle, faSun, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { baseFontSize } from '../../../shared/typography';
import { ACTION_TYPES } from '../../../shared/enums';
import * as todoConstants from '../redux/constants';

import { setTodoTypeToCreate, getAllLocalTodos, markLocalTodoAsDoneOrImportant, deleteLocalTodo } from '../redux/actions';
import { resetAttachmentRemovalStatus } from '../../attachments/redux/actions';
import Message from '../../../customs/Message';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    authStatus : state.appReducer.authStatus,
    todoRetrieval : state.todoReducer.itemList,
    setDoneOrImportant : state.todoReducer.setDoneOrImportant,
    deleteTodo : state.todoReducer.deleteTodo
});

const mapActionsToProps = {
    setTodoTypeToCreate,
    getAllLocalTodos,
    resetAttachmentRemovalStatus,
    markLocalTodoAsDoneOrImportant,
    deleteLocalTodo
}

const PersonalActiveTodos = (props : ITodos) => {
    const [todos, setTodos] = React.useState(Array<ITodo>());
    const [shouldShowOnlyImportantItems, setShouldShowOnlyImportantItems] = React.useState(false);

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

        props.navigation.addListener('focus', () => props.getAllLocalTodos());
    }, [props.navigation]);

    React.useEffect(() => {
        props.getAllLocalTodos();
    }, []);

    React.useEffect(() => {
        if (props.todoRetrieval.action === todoConstants.GET_ALL_TODOS_LOCAL_SUCCESS)
            setTodos(props.todoRetrieval.items as unknown as Array<ITodo>);
    }, [props.todoRetrieval]);

    React.useEffect(() => {
        if (props.setDoneOrImportant.action === todoConstants.MARK_LOCAL_TODO_AS_DONE_OR_EMPHASIZED_FAILED)
            alert('Failed! An issue happened while updating Todo. Please try again.');

        if (props.setDoneOrImportant.action === todoConstants.MARK_LOCAL_TODO_AS_DONE_OR_EMPHASIZED_SUCCESS) {
            const result = props.setDoneOrImportant.result?.result;

            if (!result)
                alert('Failed! An issue happened while updating Todo. Please try again.');
            else
                Alert.alert(
                    "Success!",
                    "Your Todo has been updated.",
                    [{
                        text: 'OK',
                        onPress: () => props.getAllLocalTodos()
                    }],
                    { cancelable: false }
                );
        }
    }, [props.setDoneOrImportant]);

    React.useEffect(() => {
        if (props.deleteTodo.action === todoConstants.DELETE_LOCAL_TODO_FAILED)
            alert('Failed! An issue happened while deleting Todo. Please try again.');

        if (props.deleteTodo.action === todoConstants.DELETE_LOCAL_TODO_SUCCESS) {
            const result = props.deleteTodo.result;

            if (!result) alert('Failed! An issue happened while deleting Todo. Please try again.');
            else
                Alert.alert(
                    "Success!",
                    "Your Todo has been deleted.",
                    [{
                        text: 'OK',
                        onPress: () => props.getAllLocalTodos()
                    }],
                    { cancelable: false }
                );
        }
    }, [props.deleteTodo]);

    const gotoNewTodo = () => {
        setShowPopover(false);
        props.resetAttachmentRemovalStatus();
        props.setTodoTypeToCreate(true);
        props.navigation.navigate('New Todo - Personal');
    }

    const setDoneOrImportant = (itemId : number, field : string, isEmphasized : boolean) => {
        setShowPopover(false);
        props.markLocalTodoAsDoneOrImportant(itemId, field, isEmphasized);
    }

    const deleteTodo = (item : ITodo) => props.deleteLocalTodo(item);

    return (
        <>
            {
                (
                    props.todoRetrieval.action === todoConstants.GET_ALL_TODOS_LOCAL && <Loading message='Loading Todos.' />
                ) || (
                    props.todoRetrieval.action === todoConstants.GET_ALL_TODOS_LOCAL_FAILED && <CustomError />
                )
            }

            {
                (
                    props.todoRetrieval.action === todoConstants.GET_ALL_TODOS_LOCAL_SUCCESS && todos.length > 0 &&
                    <ScrollView style={ sharedStyles.scroller }>
                        {
                            todos.filter((todo : ITodo) =>
                                todo.deletedOn === null && todo.doneDate === null &&
                                (!shouldShowOnlyImportantItems || todo.emphasized === shouldShowOnlyImportantItems)
                            )
                                 .map((item: ITodo) =>
                                    <TodoCard
                                        item={ item }
                                        key={ item.id }
                                        navigation={ props.navigation }
                                        setDoneOrImportant={ setDoneOrImportant }
                                        deleteTodo={ deleteTodo }
                                    />
                            )
                        }
                    </ScrollView>
                ) ||
                <Message mainMessage='You have no Todo item.' otherMessage='Start adding your first Todo item by tapping the icon on top-right corner.' />
            }

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }
                     from={ stackButton } arrowStyle={{ backgroundColor : 'transparent' }}>
                <PopoverMenu actions={(
                    props.authStatus && [
                        { name : 'Add New Todo', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => gotoNewTodo() },
                        (
                            shouldShowOnlyImportantItems && { name : 'All Todos', icon : faGlobe, type : ACTION_TYPES.NORMAL, callback : () => setShouldShowOnlyImportantItems(false) }
                        ) || { name : 'Important Todos', icon : faSun, type : ACTION_TYPES.NORMAL, callback : () => setShouldShowOnlyImportantItems(true) },
                        { name : 'Sync Data', icon : faSyncAlt, type : ACTION_TYPES.NORMAL, callback : () => console.log('Sync') }
                    ]) || [
                        { name : 'Add New Todo', icon : faPlusCircle, type : ACTION_TYPES.NORMAL, callback : () => gotoNewTodo() },
                        (
                            shouldShowOnlyImportantItems && { name : 'All Todos', icon : faGlobe, type : ACTION_TYPES.NORMAL, callback : () => setShouldShowOnlyImportantItems(false) }
                        ) || { name : 'Important Todos', icon : faSun, type : ACTION_TYPES.NORMAL, callback : () => setShouldShowOnlyImportantItems(true) }
                    ]} />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(PersonalActiveTodos);
