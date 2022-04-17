import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import Input from "./components/Input";
import Button from "./components/Button";
import UnchangibleHeader from "./components/UnchangibleHeader";
import {
    addTaskAC,
    changeStatusTaskAC,
    changeTitleTaskAC,
    removeTaskAC,
    TasksReducer
} from "./reducers/TasksReducer";
import {
    addTodoListAC,
    changeTodoListTitleAC,
    filterAC,
    removeTodoListAC,
    TodoListsReducer
} from "./reducers/TodoListsReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'All' | 'Completed' | 'Active' //типизация для сортировки
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskObjectType = {
    [key: string]: TaskType[]
}


function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const [todoLists, todoListsDispatch] = useReducer(TodoListsReducer,[
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "All"},
    ])


    const [tasks, tasksDispatch] = useReducer(TasksReducer,{
        [todoListId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: true},
            {id: v1(), title: "React", isDone: false},],
        [todoListId2]: [{id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Book", isDone: false},],
    })

    console.log(todoLists)
    console.log(tasks)


//функция удаления таски
    const removeTask = (taskID: string, todoListId: string) => {
        tasksDispatch(removeTaskAC(todoListId, taskID))
    }

// функции для сортировки
    const changeFilter = (value: FilterType, todoListID: string) => {
        todoListsDispatch(filterAC(value, todoListID))
    }

//функция добавления новых таск
    const addTask = (title: string, todoListID: string ) => {
        tasksDispatch(addTaskAC(todoListID, title))
    }

// функция изменения статуса таски - работа с чекбоксами
    const changeTaskStatus = (todoListID: string, taskID: string, isDoneValue: boolean) => {
        tasksDispatch(changeStatusTaskAC(todoListID, taskID, isDoneValue))
    }

// функция изменения названия таски
    const changeTaskTitle = (taskID: string, newTitle: string, todoListID: string) => {
        tasksDispatch(changeTitleTaskAC(todoListID, taskID, newTitle))
    }

//функция удаления todoList
    const removeTodoList = (todoListID: string) => {
        const action = removeTodoListAC(todoListID)
        todoListsDispatch(action)
        tasksDispatch(action)
    }

// функция добавления тудулиста
    const addTodolist = (title: string) => {
        const action = addTodoListAC(title);
        if (title.trim() !== '') {
            todoListsDispatch(action)
            tasksDispatch(action)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

// функция редактирования названия тудулиста
    const changeTodoListTitle = (todoListID: string, newTitle: string) => {
        todoListsDispatch(changeTodoListTitleAC(todoListID, newTitle))
    }


    return (
        <>
            <div className={"newtodo"}>
                <UnchangibleHeader title={"Add new Todolist"}/>
                <Input setError={setError} setTitle={setTitle} title={title} addTaskButtonHandler={addTodolist}
                       className={error ? 'error' : ''}/>
                <Button callBack={() => addTodolist(title)} title={'+'}/>
                {error && <div className={'error-message'}>Field is required</div>}
            </div>

            <div className={'flex-row'}>

                {todoLists.map((tl) => {
                    let FilteredTasks = tasks[tl.id]
                    if (tl.filter === "Completed") {
                        FilteredTasks = tasks[tl.id].filter(t => t.isDone)
                    }
                    if (tl.filter === "Active") {
                        FilteredTasks = tasks[tl.id].filter(t => !t.isDone)
                    }


                    return (

                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={FilteredTasks}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                            filter={tl.filter}
                        />
                    )
                })
                }
            </div>
                  </>
    );
}

export default App;
