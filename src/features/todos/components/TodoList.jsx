import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, filter, onToggle, onDelete, onUpdate }) {
  if (todos.length === 0) {
    return (
      <ul className="todo-list">
        <li className="empty-state">
          {filter === 'all' 
            ? "You have no tasks. Add one above!" 
            : `No ${filter} tasks found.`}
        </li>
      </ul>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default TodoList;
