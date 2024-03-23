'use strict';
// selecting elements

const titleInput = document.getElementById('title-input');
const dateInput = document.getElementById('date-input');
const descriptionInput = document.getElementById('desc-input');
const addNewTaskBtn = document.querySelector('.add-new-task-btn');
const tasksContainer = document.querySelector('.tasks-list--container');
const resetBtn = document.querySelector('#reset');


const taskData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];


let currentTask = {};

updateTaskContainer();

function addTaskHander(e) {
  e.preventDefault();

  if (titleInput.value === '' || dateInput.value === '' || descriptionInput.value === '') {
    alert('Please Input Remaining Field')
    return;
  }


  const taskObj = {
    id: `${titleInput.value.split(' ').join('-')}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  }

  const arrIndex = taskData.findIndex(item => item.id === currentTask.id);

  if (arrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[arrIndex] = taskObj;
    addNewTaskBtn.textContent="Add New Task"
  }


  localStorage.setItem('data', JSON.stringify(taskData));
  tasksContainer.innerHTML = '';

  updateTaskContainer();
  reset();
}

function updateTaskContainer() {
  // localStorage.setItem('data', JSON.stringify(taskData));

  taskData.forEach(({ id, title, date, description }) => {

     tasksContainer.innerHTML += `
    <div id=${id} class="tasks-list">
    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Description:</strong></p>
    <textarea disabled="true" cols="30" rows="2" class="d">${description}</textarea>
    <button id="edit" onclick="editTask(this)"></button>
    <button id="delete" onclick="deleteTask(this)"></button>
    <input type="checkbox" name="done"  class="done" onclick="completedTask(this)"/>
    </div>`
   })

}

function reset() {
  titleInput.value = '';
  dateInput.value = '';
  descriptionInput.value = '';
}


addNewTaskBtn.addEventListener('click',addTaskHander)



function editTask(button) {
  const arrIndex = taskData.findIndex(item => item.id === button.parentElement.id)
  currentTask = taskData[arrIndex];
  if (titleInput.value || dateInput.value || descriptionInput.value) return;
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;
  addNewTaskBtn.textContent="Update Task"

}


function deleteTask(button) {
  // if () {
  //   return;
  // }
  const arrIndex = taskData.findIndex(item => item.id === button.parentElement.id);
  taskData.splice(arrIndex, 1)
  button.parentElement.remove();
  localStorage.setItem('data',JSON.stringify(taskData))



}

function completedTask(button) {
const done=button.parentElement.querySelector('.done');
  if (done.checked === true) {
    button.parentElement.style.backgroundColor = 'rgba(0,240,0,0.5)';
    button.parentElement.querySelector('#edit').style.display = "none"
    console.log( button.parentElement)
  } else {
    button.parentElement.style.backgroundColor ='';
    button.parentElement.querySelector('#edit').style.display = "inline";

  }
}