import React, { Component } from 'react';
import './TodoList.css';
import TodoItems from './TodoItem';
export default class TodoList extends Component {
    // Declare our state
    state = {
        items: [], //for list of todo Item
        isReadOnly: true, // for input type attribute
        label: 'Edit' //for button label
    }

    /**
    * TODO : Add item to the list
    * @param e is callback from the event listener
    */
    addItemHandler = e => {
        let inputValue = this._inputElement.value; // Ref for input type element & get the value
        
        //Create object to merge state
        let newItem = {
            todoText: inputValue,
            key: Date.now() // properties for looping
        };

        /* 
        * * this method handler is used for 2 events, onClick, and onKeyPress
        */
        if (e.type === 'keypress') { // so checking if event type is keypress ?
            if ((inputValue !== '' && e.key === 'Enter')) { // is keyboard is Enter ?
                this.setState({items: this.state.items.concat(newItem)}); // merge it to state
                this._inputElement.value = '';
            }
        }else { // event type is click ?
            if (inputValue !== '') {
                this.setState({items: this.state.items.concat(newItem)}); // merge it to state
                this._inputElement.value = '';
            }
        }

    }

    /**
    * TODO : Delete item from the list
    * @param index is from the child components. Its rendered with map method
    */
    deleteItemHandler = index => {
        const undeletedItems = this.state.items.filter((item, i) => i !== index); // filter the undeleted Items from the state
        this.setState({items: undeletedItems}); // merge it to state
    }

    /**
    * TODO : Edit item from the list
    * @param key is from the state. Its rendered with map method in <TodoItem />.
    */
    editItemHandler = (key) => {
        if (this.state.label === 'Edit') { //check the label button is Edit or Done ?
            this.setState({
                readonly: !this.state.isReadOnly, //change readonly
                label: 'Done' //  change label
            });
            this.refEdit.focus(); // focus the editElement
        } else {
            const changedItem = this.state.items.filter((item,i) => item.key === key);
            changedItem[0].todoText = this.refEdit.value;
            
            this.setState(() => ({...this.state.items, changedItem}) ); //merge it with state.
            this.setState({label: 'Edit'});
        }
    }

    render() {
        return (
            <div>
                <input className="todoInput" type="text" ref={(a) => this._inputElement = a} onKeyPress={(e) => this.addItemHandler(e)} />
                <input className="btn-add" type="button" value="+" onClick={(e) => this.addItemHandler(e)} />
                <TodoItems data={this.state.items}
                           delete={this.deleteItemHandler} 
                           edit={this.editItemHandler} 
                           readonly={this.state.isReadOnly}
                           refEdit={el => this.refEdit = el}
                           label={this.state.label} />
            </div>
        )
    }

}