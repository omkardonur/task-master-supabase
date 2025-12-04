import React, { useState } from 'react';

function TodoCalendar({ todos, onUpdate, onAdd }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  
  const days = [];
  // Padding for previous month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  // Days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getDateString = (day) => {
    if (!day) return null;
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    // Format YYYY-MM-DD in local time
    return `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;
  };

  const getTodosForDate = (day) => {
    if (!day) return [];
    const targetDateStr = getDateString(day);
    return todos.filter(todo => todo.dueDate === targetDateStr);
  };

  const handleAddClick = (e, day) => {
    e.stopPropagation();
    const dateStr = getDateString(day);
    onAdd({ dueDate: dateStr });
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="btn-icon" onClick={prevMonth}>{'<'}</button>
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button className="btn-icon" onClick={nextMonth}>{'>'}</button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-day-header">Sun</div>
        <div className="calendar-day-header">Mon</div>
        <div className="calendar-day-header">Tue</div>
        <div className="calendar-day-header">Wed</div>
        <div className="calendar-day-header">Thu</div>
        <div className="calendar-day-header">Fri</div>
        <div className="calendar-day-header">Sat</div>

        {days.map((day, index) => (
          <div 
            key={index} 
            className={`calendar-cell ${day ? 'active-day' : 'empty-day'}`}
            onClick={(e) => day && handleAddClick(e, day)}
          >
            {day && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="day-number">{day}</div>
                  <button 
                    className="calendar-add-btn"
                    onClick={(e) => handleAddClick(e, day)}
                    title="Add task on this date"
                  >
                    +
                  </button>
                </div>
                <div className="day-content" onClick={(e) => e.stopPropagation()}>
                  {getTodosForDate(day).map(todo => (
                    <div 
                      key={todo.id} 
                      className={`calendar-task priority-${todo.priority || 'medium'}`}
                      onClick={(e) => { e.stopPropagation(); onUpdate(todo.id); }}
                      title={todo.text}
                    >
                      {todo.text}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoCalendar;
