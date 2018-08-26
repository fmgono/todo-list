import React from "react";
import './TodoItem.css';

const TodoItems = (props) => {
    let { data } = props;
    let listItem = data.map((ls, index) => {
        return (
            <div key={ls.key}>
                <input className="todoList" type="text" defaultValue={ls.todoText} readOnly={props.readonly} ref={props.refEdit} />
                <input className="btn-edit" type="button" value={props.label} onClick={() => props.edit(ls.key) } />
                <input className="btn-remove" type="button" value="-" onClick={() => props.delete(index) } />
            </div>
        )
    })
    return (
        <div>
            {listItem}
        </div>
    )
}
   
export default TodoItems;