import IThing from './IThing';

interface ITodo extends IThing {
    description : string | null,
    details : string | null,
    dueDate : string | null,
    doneDate : string | null
}

export default ITodo;