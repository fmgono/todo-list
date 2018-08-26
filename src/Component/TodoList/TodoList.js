import React, { Component } from 'react';
import './TodoList.css';
import TodoItems from './TodoItem';
export default class TodoList extends Component {
    // constructor(props) {
    //     this.setInputRef = React.createRef()
    // }
    state = {
        items: [],
        readonly: true,
        label: 'Edit'
    }

    addItemHandler = e => {
        let newItem = {
            todoText: this._inputElement.value,
            key: Date.now()
        };
        if (e.type === 'keypress') {
            if ((this._inputElement.value !== '' && e.key === 'Enter')) {
                this.setState({items: this.state.items.concat(newItem)});
                this._inputElement.value = '';
            }
        }else {
            if (this._inputElement.value !== '') {
                this.setState({items: this.state.items.concat(newItem)});
                this._inputElement.value = '';
            }
        }

    }

    deleteItemHandler = index => {
        const undeletedItems = this.state.items.filter((val, i) => i !== index);
        this.setState({items: undeletedItems});
    }

    editItemHandler = (key) => {
        if (this.state.label === 'Edit') {
            console.log(this.refEdit);
            this.setState({
                readonly: !this.state.readonly,
                label: 'Done'
            });
            this.refEdit.focus();
        } else {
            const changedItem = this.state.items.filter((item,i) => item.key === key);
            changedItem[0].todoText = this.refEdit.value;
            
            this.setState(() => ({...this.state.items, changedItem}) );
            this.setState({label: 'Edit'},() => console.log('Callback SetState()',this.state.label));
        }
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <input className="todoInput" type="text" ref={(a) => this._inputElement = a} onKeyPress={(e) => this.addItemHandler(e)} />
                <input className="btn-add" type="button" value="+" onClick={(e) => this.addItemHandler(e)} />
                <TodoItems data={this.state.items}
                           delete={this.deleteItemHandler} 
                           edit={this.editItemHandler} 
                           readonly={this.state.readonly}
                           refEdit={el => this.refEdit = el}
                           label={this.state.label} />
            </div>
        )
    }

}