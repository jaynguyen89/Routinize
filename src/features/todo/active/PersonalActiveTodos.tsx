import React from 'react';
import { connect } from 'react-redux';

import { ScrollView, TouchableOpacity } from 'react-native';
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

import { setTodoTypeToCreate, getAllLocalTodos } from '../redux/actions';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings,
    authStatus : state.appReducer.authStatus,
    todoRetrieval : state.todoReducer.itemList
});

const mapActionsToProps = {
    setTodoTypeToCreate,
    getAllLocalTodos
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

    const gotoNewTodo = () => {
        setShowPopover(false);
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
                    todos.map((item: ITodo) => <TodoCard item={ item } key={ item.id } navigation={ props.navigation } />)
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
