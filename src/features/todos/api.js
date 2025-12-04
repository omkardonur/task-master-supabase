import { supabase } from '../../lib/supabase';

const toFrontend = (todo) => {
  if (!todo) return null;
  return {
    ...todo,
    dueDate: todo.due_date, // Map snake_case to camelCase
    // remove due_date if you want to clean up, but keeping it is fine usually
  };
};

const toBackend = (todo) => {
  const { id, dueDate, ...rest } = todo;
  return {
    ...rest,
    due_date: dueDate, // Map camelCase to snake_case
  };
};

export const fetchTodos = async () => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data.map(toFrontend);
};

export const createTodo = async (todo) => {
  const payload = toBackend(todo);
  
  const { data, error } = await supabase
    .from('todos')
    .insert([payload])
    .select()
    .single();
    
  if (error) throw error;
  return toFrontend(data);
};

export const updateTodo = async (id, updates) => {
  // Handle partial updates
  const payload = { ...updates };
  if (payload.dueDate !== undefined) {
    payload.due_date = payload.dueDate;
    delete payload.dueDate;
  }
  
  const { data, error } = await supabase
    .from('todos')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return toFrontend(data);
};

export const deleteTodo = async (id) => {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return id;
};
