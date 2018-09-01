import React, { Component } from 'react';
import './TodoList.css';
import TodoItems from './TodoItem';
export default class TodoList extends Component {
    // Declare our state
    state = {
        items: [] //for list of todo Item
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
            key: Date.now(), // properties for looping
            btnLabel: 'Edit',
            isReadOnly: true
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
    * TODO : Edit label & property from the list
    * @param index is from the state. Its rendered with map method in <TodoItem />.
    */
    editItemHandler = (index) => {
        const selectedItem = this.state.items.filter((item,i) => i === index);
        if (selectedItem[0].btnLabel === 'Edit') {
            selectedItem[0].btnLabel = 'Done';
            selectedItem[0].isReadOnly = !selectedItem[0].isReadOnly;
            this.setState(() => ({...this.state.items, selectedItem}) ); //merge it with state.
            this.refEdit.focus();
        } else {
            selectedItem[0].btnLabel = 'Edit';
            selectedItem[0].isReadOnly = !selectedItem[0].isReadOnly;
            this.setState(() => ({...this.state.items, selectedItem}) ); //merge it with state.
        }
        console.log(selectedItem);
    }

    /**
    * TODO : Edit todoText from the list
    * @param index is from the state. Its rendered with map method in <TodoItem />.
    */
    editTextHandler = (e, index) => {
        const selectedItem = this.state.items.filter((item,i) => i === index);
        selectedItem[0].todoText = e.target.value;
        this.setState(() => ({...this.state.items, selectedItem}) ); //merge it with state.
    }

    render() {
        return (
            <div>
                <input className="todoInput" type="text" ref={(a) => this._inputElement = a} onKeyPress={(e) => this.addItemHandler(e)} />
                <input className="btn-add" type="button" value="+" onClick={(e) => this.addItemHandler(e)} />
                <TodoItems data={this.state.items}
                           delete={this.deleteItemHandler}
                           edit={this.editItemHandler}
                           change={this.editTextHandler}
                           refEdit={el => this.refEdit = el}
                           label={this.state.label} />
            </div>
        )
    }

}