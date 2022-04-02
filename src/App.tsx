import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import Input from "./components/Input";
import Button from "./components/Button";
import Header from "./components/Header";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'All' | 'Completed' | 'Active' //типизация для сортировки
type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)


    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "All"},
    ])


    const [tasksObj, setTasks] = useState({
        [todoListId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: true},
            {id: v1(), title: "React", isDone: false},],
        [todoListId2]: [{id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Book", isDone: false},],
    })

//функция удаления todoList
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasksObj[todoListId]
    }

//функция удаления таски
    const removeTask = (id: string, todoListId: string) => {
        setTasks({...tasksObj, [todoListId]: tasksObj[todoListId].filter(t => t.id !== id)})
    }

// функции для сортировки
    const changeFilter = (value: FilterType, todoListID: string) => {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: value} : el))
    }

//функция добавления новых таск
    const addTask = (title: string, todoListID: string) => {
        const NewTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasksObj, [todoListID]: [NewTask, ...tasksObj[todoListID]]})
    }

// функция изменения статуса таски - работа с чекбоксами
    const changeTaskStatus = (taskID: string, isDoneValue: boolean, todoListID: string) => {
        setTasks({
            ...tasksObj,
            [todoListID]: tasksObj[todoListID].map(el => el.id === taskID ? {...el, isDone: isDoneValue} : el)
        })
    }

// функция изменения названия таски
    const changeTaskTitle = (taskID: string, newTitle: string, todoListID: string) => {
        setTasks({
            ...tasksObj,
            [todoListID]: tasksObj[todoListID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }

// функция добавления тудулиста
    const addTodolist = (title: string) => {
        let NewTodolist: TodoListType = {
            id: v1(),
            filter: 'All',
            title: title
        }
        setTodoLists([NewTodolist, ...todoLists])
        setTasks({...tasksObj, [NewTodolist.id]: []})
    }

// функция редактирования названия тудулиста
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))
    }


    return (
        <>
            <div className={"newtodo"}>
                {/*<Header title={"Add new Todolist"} changeTodoListTitle={()=>{}}/>*/}
                <Input setError={setError} setTitle={setTitle} title={title} addTaskButtonHandler={addTodolist}
                       className={error ? 'error' : ''}/>
                <Button callBack={() => addTodolist(title)} title={'+'}/>
                {error && <div className={'error-message'}>Field is required</div>}
            </div>

            <div className={'flex-row'}>

                {todoLists.map((tl) => {
                    let FilteredTasks = tasksObj[tl.id]
                    if (tl.filter === "Completed") {
                        FilteredTasks = tasksObj[tl.id].filter(t => t.isDone)
                    }
                    if (tl.filter === "Active") {
                        FilteredTasks = tasksObj[tl.id].filter(t => !t.isDone)
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
