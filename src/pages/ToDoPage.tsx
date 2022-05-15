import React, {useEffect, useReducer, useRef, useState} from 'react';
import {MdDelete, MdEdit} from "react-icons/md";

import reducer, {initialState} from '../store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus, deleteTodo, updateTodo
} from '../store/actions';
import Service from '../service';
import {TodoStatus} from '../models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [editingItem, setEditingItem] = useState('');
    const inputRef = useRef<any>(null);
    const itemRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    useEffect(() => {
        if (itemRef.current) itemRef.current.focus()
    }, [editingItem]);


    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = ''
        }
    }

    const onUpdateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(updateTodo(editingItem, itemRef.current.value))
            setEditingItem('')
            itemRef.current = null
        }
    }

    const onBlurItemInput = () => {
        itemRef.current = null
        setEditingItem('')
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {todos.length === 0 && <h3>Let's add some plan!!!</h3>}
                {todos?.length > 0 && todos?.map((todo, index) => {
                    // show todos depends on showing state
                    if (showing !== 'ALL' && todo.status !== showing) return null
                    return (
                        <div key={index} className="ToDo__item">
                            <input
                                type="checkbox"
                                className="Todo-item__checkbox"
                                checked={todo.status === TodoStatus.COMPLETED}
                                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                            />
                            {todo.id !== editingItem && (
                                <label className="Todo-item__label" onDoubleClick={() => setEditingItem(todo.id)}>
                                    {todo.content}
                                </label>
                            )}
                            {todo.id === editingItem &&
                               <input className="Todo-item__input" ref={itemRef} onKeyDown={onUpdateTodo}
                                      onBlur={onBlurItemInput}/>
                            }
                            <button className="Todo-item__btn Todo-item__btn--edit"
                                    onClick={() => setEditingItem(todo.id)}>
                                <MdEdit/>
                            </button>
                            <button className="Todo-item__btn Todo-item__btn--delete"
                                    onClick={() => onDeleteTodo(todo.id)}>
                                <MdDelete/>
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className="Todo__toolbar">
                {/*add onclick handler for 'all' button*/}
                <button className="Action__btn" onClick={() => setShowing('ALL')}>
                    All
                </button>
                <button className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
                    Active
                </button>
                <button className="Action__btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
                    Completed
                </button>
                <button className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;