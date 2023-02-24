import storeRetrieve from './storeTask.js';

const todoList = document.getElementById('todoList');

export default function addtask(task) {
  todoList.innerHTML += `
    <div class="todoFlex">
      <div class="todoDiv">
        <input type="checkbox" name="${task.id}" class="checkbox" ${task.completed ? 'checked' : ''} >
        <input class="todoP" name="${task.id}" value="${task.description}" >
      </div>
      <i class="bi bi-trash3-fill dots" id="${task.id}" onclick="remove(this)"></i>
    </div>
  `;

  /* store and retrieve tasks in LocalStorage */
  storeRetrieve(task);
}