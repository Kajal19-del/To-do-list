import './index.css';
import Task from '../modules/newTask.js';
import addtask from '../modules/addTask.js';
import removetask from '../modules/removeTask.js';
import edittask from '../modules/editTask.js';
import completed from '../modules/complete.js';

const todoList = document.getElementById('todoList');

// displaying tasks on window loading
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks !== null) {
    tasks.sort((a, b) => a.index - b.index);

    tasks.forEach((item) => {
      todoList.innerHTML += `
        <div class="todoFlex">
          <div class="todoDiv">
            <input type="checkbox" name="${item.id}" class="checkbox" ${item.completed ? 'checked' : ''} >
            <input class="todoP" name="${item.id}" value="${item.description}" >
          </div>
          <i class="bi bi-trash3-fill dots" id="${item.id}" onclick="remove(this)"></i>
        </div>
      `;
    });
  }
});

// formInput + enter
const formInput = document.querySelector('.formInput');
const enter = document.getElementById('enter');

formInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});

let indexTask;
enter.addEventListener('click', () => {
  if (localStorage.getItem('tasks') === null) {
    indexTask = 1;
  } else {
    indexTask = JSON.parse(localStorage.getItem('tasks')).length + 1;
  }

  const todo1 = new Task(formInput.value, false, indexTask, Date.now().toString());
  addtask(todo1); // add new task
  formInput.value = '';
});

// delete btn working
window.remove = (name) => {
  removetask(name.id.toString());
  name.parentElement.remove();
};

// clear all completed button
const clearAll = document.querySelector('.clearAll');

clearAll.addEventListener('click', () => {
  const checkbox = document.querySelectorAll('.checkbox:nth-child(1)');

  Array.from(checkbox).filter((item) => item.checked).forEach((item) => {
    removetask(item.name); // remove task
    item.parentElement.parentElement.remove();
  });
});

// edit task
edittask();

// completed
completed();