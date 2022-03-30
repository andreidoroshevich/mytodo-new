import React from 'react';
import {TaskType} from "../App";
import Button from "./Button";
import './Main.css';

type TaskListType = {
    todoListID: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void

}

const TaskList = (props: TaskListType) => {

    const onClickRemoveHandler = (id: string, todoListId: string) => {
        props.removeTask(id, todoListId)
    }

    const onChangeCheckBoxHandler = (id: string, isDone: boolean, todoListId: string) => {
        props.changeTaskStatus(id, isDone, todoListId)
    }


    return (
        <div className={'main'}>
            <div className={'tasklist'}>
                <ul>
                    {props.tasks.map(t =>
                        <div className={'flex'}>
                            <div className={'task'}>
                                <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                                    <input type="checkbox" onChange={(e)=>onChangeCheckBoxHandler(t.id, e.currentTarget.checked, props.todoListID )}
                                                      checked={t.isDone}/><span>{t.title}</span></li>
                            </div>
                            <div className={'del_button'}><Button callBack={() => onClickRemoveHandler(t.id, props.todoListID)}
                                                                  title={'x'}/></div>
                        </div>
                    )}
                </ul>
            </div>

        </div>
    );
};

export default TaskList;