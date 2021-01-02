import React from 'react';
import { connect } from 'react-redux';

import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import TodoCard from '../components/TodoCard';
import PopoverMenu from '../../../customs/PopoverMenu';
import Popover from 'react-native-popover-view/dist/Popover';
import Loading from '../../../customs/Loading';
import CustomError from '../../../customs/CustomError';
import { ITodos } from '../redux/constants';
import ITodo from '../../../models/ITodo';

import { sharedStyles } from '../../../shared/styles';
import { faEllipsisV, faPlusCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { baseFontSize } from '../../../shared/typography';
import { ACTION_TYPES } from '../../../shared/enums';
import * as todoConstants from '../redux/constants';

import { setTodoTypeToCreate, getAllLocalTodos, markLocalTodoAsDoneOrImportant } from '../redux/actions';
import { resetAttachmentRemovalStatus } from '../../attachments/redux/actions';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    authStatus : state.appReducer.authStatus,
    todoRetrieval : state.todoReducer.itemList,
    setDoneOrImportant : state.todoReducer.setDoneOrImportant
});

const mapActionsToProps = {
    setTodoTypeToCreate,
    getAllLocalTodos,
    resetAttachmentRemovalStatus,
    markLocalTodoAsDoneOrImportant
}

const PersonalActiveTodos = (props : ITodos) => {
    const [todos, setTodos] = React.useState(Array<ITodo>());

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
        if (props.setDoneOrImportant.action === todoConstants.MARK_LOCAL_TODO_AS_DONE_OR_EMPHASIZED_FAILED)
            alert('Failed! An issue happened while updating Todo. Please try again.');

        if (props.setDoneOrImportant.action === todoConstants.MARK_LOCAL_TODO_AS_DONE_OR_EMPHASIZED_SUCCESS) {
            const result = props.setDoneOrImportant.result;

            if (!result.result)
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

    const gotoNewTodo = () => {
        setShowPopover(false);
        props.resetAttachmentRemovalStatus();
        props.setTodoTypeToCreate(true);
        props.navigation.navigate('New Todo - Personal');
    }

    React.useEffect(() => {
        props.getAllLocalTodos();
    }, []);

    React.useEffect(() => {
        if (!props.todoRetrieval.isRetrieving && props.todoRetrieval.retrievingSuccess)
            setTodos(props.todoRetrieval.items as unknown as Array<ITodo>);
    }, [props.todoRetrieval]);

    const setDoneOrImportant = (itemId : number, field : string, isEmphasized : boolean) => {
        setShowPopover(false);
        props.markLocalTodoAsDoneOrImportant(itemId, field, isEmphasized);
    }

    return (
        <>
            {
                (
                    props.todoRetrieval.isRetrieving && <Loading message='Loading Todos.' />
                ) || (
                    !props.todoRetrieval.isRetrieving && !props.todoRetrieval.retrievingSuccess &&
                    <CustomError />
                )
            }

            <ScrollView style={ sharedStyles.scroller }>
                {
                    props.todoRetrieval.retrievingSuccess &&
                    todos.map((item: ITodo) =>
                        <TodoCard
                            item={ item }
                            key={ item.id }
                            navigation={ props.navigation }
                            setDoneOrImportant={ setDoneOrImportant }
                        />
                    )
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
