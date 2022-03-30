import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";

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


    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "All"}
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

    const removeTodoList = (todoListId: string)=>{
        let filteredTodoList = todoLists.filter(tl=>tl.id !==todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }


//функция удаления таски
    const removeTask = (id: string, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let FilteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = FilteredTasks
        setTasks({...tasksObj})
    }

// функции для сортировки

    const changeFilter = (filter: FilterType, todoListID: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = filter
            setTodoLists([...todoLists])
        }
    }


//функция добавления новых таск

    const addTask = (title: string, todoListID: string) => {
        const NewTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        let tasks = tasksObj[todoListID]
        let newTasks = [NewTask, ...tasks]
        tasksObj[todoListID] = newTasks
        setTasks({...tasksObj})
    }

// функция изменения статуса таски - работа с чекбоксами

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        let tasks = tasksObj[todoListID]
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone

            setTasks({...tasksObj})
        }
    }


    return (
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
                        filter={tl.filter}
                    />
                )
            })
            }
        </div>
    );
}

export default App;
