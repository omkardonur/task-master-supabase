import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import TodoTable from './features/todos/components/TodoTable';
import TodoFilters from './features/todos/components/TodoFilters';
import TodoBoard from './features/todos/components/TodoBoard';
import TodoCalendar from './features/todos/components/TodoCalendar';
import TodoDetailsModal from './features/todos/components/TodoDetailsModal';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './features/todos/api';

const INITIAL_TODOS = [
  { id: 1, text: 'Buy groceries', completed: false, priority: 'medium', dueDate: '', comments: [], attachments: [] },
  { id: 2, text: 'Finish React project', completed: false, priority: 'high', dueDate: new Date().toISOString().split('T')[0], comments: [], attachments: [] },
  { id: 3, text: 'Walk the dog', completed: true, priority: 'low', dueDate: '', comments: [], attachments: [] },
];

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('list'); // 'list', 'board', 'calendar'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      const saved = localStorage.getItem('crud-todos');
      if (saved) {
        setTodos(JSON.parse(saved));
      } else {
        setTodos(INITIAL_TODOS);
      }
      setError("Offline Mode");
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // CRUD Handlers (Same as before)
  const handleAdd = async (arg1, arg2, arg3) => {
    let newTodoData = { completed: false, status: 'todo', comments: [], attachments: [] };
    if (typeof arg1 === 'object') {
      newTodoData = { ...newTodoData, ...arg1 };
    } else {
      newTodoData.text = arg1; newTodoData.priority = arg2; newTodoData.dueDate = arg3;
    }
    const tempId = Date.now();
    const optimisitcTodo = { ...newTodoData, id: tempId };
    setTodos([optimisitcTodo, ...todos]);
    try {
      const created = await createTodo(newTodoData);
      setTodos(prev => prev.map(t => t.id === tempId ? created : t));
    } catch (err) {
      localStorage.setItem('crud-todos', JSON.stringify([optimisitcTodo, ...todos]));
    }
  };

  const handleToggle = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    const newCompleted = !todo.completed;
    const updates = { completed: newCompleted, status: newCompleted ? 'done' : 'todo' };
    const newTodos = todos.map(t => t.id === id ? { ...t, ...updates } : t);
    setTodos(newTodos);
    localStorage.setItem('crud-todos', JSON.stringify(newTodos));
    try { await updateTodo(id, updates); } catch (err) {}
  };

  const handleDelete = async (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('crud-todos', JSON.stringify(newTodos));
    if (selectedTodo && selectedTodo.id === id) setSelectedTodo(null);
    try { await deleteTodo(id); } catch (err) {}
  };

  const handleUpdate = async (id, updatedData) => {
    const updates = typeof updatedData === 'string' ? { text: updatedData } : updatedData;
    const newTodos = todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo);
    setTodos(newTodos);
    localStorage.setItem('crud-todos', JSON.stringify(newTodos));
    if (selectedTodo && selectedTodo.id === id) setSelectedTodo(prev => ({ ...prev, ...updates }));
    try { await updateTodo(id, updates); } catch (err) {}
  };

  const handleUpdateStatus = async (id, status) => {
    const updates = { status, completed: status === 'done' };
    const newTodos = todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo);
    setTodos(newTodos);
    localStorage.setItem('crud-todos', JSON.stringify(newTodos));
    try { await updateTodo(id, updates); } catch (err) {}
  };

  const handleAddComment = async (id, text) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    const newComment = { id: Date.now(), text, timestamp: new Date().toISOString() };
    const updatedComments = [...(todo.comments || []), newComment];
    const newTodos = todos.map(t => t.id === id ? { ...t, comments: updatedComments } : t);
    setTodos(newTodos);
    localStorage.setItem('crud-todos', JSON.stringify(newTodos));
    if (selectedTodo && selectedTodo.id === id) setSelectedTodo(prev => ({ ...prev, comments: updatedComments }));
    try { await updateTodo(id, { comments: updatedComments }); } catch (err) {}
  };

  const handleAddAttachment = async (id, file) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    const updatedAttachments = [...(todo.attachments || []), file];
    const newTodos = todos.map(t => t.id === id ? { ...t, attachments: updatedAttachments } : t);
    setTodos(newTodos);
    localStorage.setItem('crud-todos', JSON.stringify(newTodos));
    if (selectedTodo && selectedTodo.id === id) setSelectedTodo(prev => ({ ...prev, attachments: updatedAttachments }));
    try { await updateTodo(id, { attachments: updatedAttachments }); } catch (err) {}
  };

  const handleSelectTodo = (todo) => setSelectedTodo(todo);
  const handleStartCreate = (initialData = {}) => {
    setSelectedTodo({
      text: '', priority: 'medium', dueDate: '', description: '',
      comments: [], attachments: [], ...initialData
    });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  if (loading) return <div className="loading-screen"><LoadingSpinner /></div>;

  const getViewTitle = () => {
    switch(view) {
      case 'board': return 'Kanban Board';
      case 'calendar': return 'Calendar';
      default: return 'Task List';
    }
  };

  return (
    <div className="dashboard">
      <Sidebar 
        currentView={view} 
        onViewChange={setView} 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isOffline={!!error}
      />
      
      <main className="main-content">
        <Header 
          title={getViewTitle()} 
          todoCount={activeCount} 
          totalCount={todos.length} 
        />

        <div className="content-area">
          {view === 'list' && (
            <>
              <div className="list-header">
                <TodoFilters 
                  currentFilter={filter} 
                  onFilterChange={setFilter} 
                  show={true} 
                />
              </div>
              <div className="list-container card">
                <TodoTable 
                  todos={filteredTodos}
                  filter={filter}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onUpdate={(id) => {
                    const todo = todos.find(t => t.id === id);
                    if (todo) handleSelectTodo(todo);
                  }}
                  onAdd={handleAdd}
                />
              </div>
            </>
          )}

          {view === 'board' && (
            <TodoBoard 
              todos={todos} 
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
              onUpdate={(id) => {
                const todo = todos.find(t => t.id === id);
                if (todo) handleSelectTodo(todo);
              }}
            />
          )}

          {view === 'calendar' && (
            <div className="card">
              <TodoCalendar 
                todos={todos}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={(id) => {
                   const todo = todos.find(t => t.id === id);
                   if (todo) handleSelectTodo(todo);
                }}
                onAdd={handleStartCreate}
              />
            </div>
          )}
        </div>

        {view !== 'list' && (
          <button className="fab-add" onClick={() => handleStartCreate()} title="Add New Task">
            +
          </button>
        )}
      </main>

      {selectedTodo && (
        <TodoDetailsModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
          onAddComment={handleAddComment}
          onAddAttachment={handleAddAttachment}
        />
      )}
    </div>
  );
}

export default App;
