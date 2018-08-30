import React from "react";
import './TodoItem.css';

const TodoItems = (props) => {
    let { data } = props; // destructuring from props
    let listItem = data.map((ls, index) => {
        return (
            <div key={ls.key}>
                <input className="todoList" 
                       type="text" 
                       defaultValue={ls.todoText} 
                       readOnly={ls.isReadOnly} 
                       onChange={(e) => props.change(e, index)}
                       ref={props.refEdit} />
                <input className="btn-edit" 
                       type="button" 
                       value={ls.btnLabel} 
                       onClick={() => props.edit(index) } />
                <input className="btn-remove" 
                       type="button" 
                       value="-" 
                       onClick={() => props.delete(index) } />
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