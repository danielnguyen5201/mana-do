import {Todo, TodoStatus} from '../models/todo';
import {
    AppActions,
    CREATE_TODO,
    DELETE_ALL_TODOS,
    DELETE_TODO,
    SET_TODO,
    TOGGLE_ALL_TODOS,
    UPDATE_TODO,
    UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
    todos: Array<Todo>
}

export const initialState: AppState = {
    todos: []
}

// FIXED: don't mutate the old state
// FIXED: wrap cases inside a block
function reducer(state: AppState, action: AppActions): AppState {
    switch (action.type) {
        case SET_TODO: {
            return {
                ...state,
                todos: action.payload
            };
        }

        case CREATE_TODO: {
            const newTodos = [...state.todos, action.payload]
            return {
                ...state,
                todos: newTodos
            };
        }

        case UPDATE_TODO: {
            const newTodos = state.todos.map(todo => {
                if(todo.id === action.payload.todoId) {
                    return {...todo, content: action.payload.content}
                }
                return todo
            })

            return {
                ...state,
                todos: newTodos
            }
        }

        case UPDATE_TODO_STATUS: {
            const newTodos = state.todos.map(todo => {
                if(todo.id === action.payload.todoId) {
                    return {...todo, status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE}
                }
                return todo
            })

            return {
                ...state,
                todos: newTodos
            }
        }

        case TOGGLE_ALL_TODOS: {
            const tempTodos = state.todos.map((e) => {
                return {
                    ...e,
                    status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
                }
            })

            return {
                ...state,
                todos: tempTodos
            }
        }

        case DELETE_TODO: {
            const newTodos = state.todos.filter(todo => todo.id !== action.payload)

            return {
                ...state,
                todos: newTodos
            }
        }

        case DELETE_ALL_TODOS: {
            return {
                ...state,
                todos: []
            }
        }

        default:
            return state;
    }
}

export default reducer;