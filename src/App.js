import React, { Component } from 'react';
import Todolist from './Component/TodoList/TodoList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Todo List Apps</h1>
        <Todolist />
      </div>
    );
  }
}

export default App;
