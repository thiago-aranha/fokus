"use strict"

import layout from "./layout.js";

const addTaskButton         = document.querySelector('.app__button--add-task');
const cancelAddButton       = document.querySelector('.app__form-footer__button--cancel');
const addTaskForm           = document.querySelector('.app__form-add-task');
const textArea              = document.querySelector('.app__form-textarea');
const ulTasks               = document.querySelector('.app__section-task-list');
const onGoingTaskDesc       = document.querySelector('.app__section-active-task-description');
const remCompletedButton    = document.querySelector('#btn-remover-concluidas');
const remAllButton          = document.querySelector('#btn-remover-todas');

let selectedTask        = null;
let liSelectedTask      = null;

let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

function updateTaskList () {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function removeLiActiveSelection () {
    const activesLi = document.querySelectorAll('.app__section-task-list-item-active');
    activesLi.forEach(li => {
        li.classList.remove('app__section-task-list-item-active');
    });
};    

function listenNewTaskDescriptionButton (button, paragraph, task) {
    button.onclick = () => {
        const newTaskDescription = prompt('Qual a descrição correta da tarefa?');
        if (newTaskDescription) {
            paragraph.textContent = newTaskDescription;
            task.description = newTaskDescription;
            updateTaskList();
        };
    };    
}    

function activateTaskSelection (li, task) {
    li.classList.add('app__section-task-list-item-active');
    onGoingTaskDesc.textContent = task.description;

    selectedTask = task;
    liSelectedTask = li;
}

function selectTask (task, li) {
    removeLiActiveSelection();

    if (selectedTask === task) {
        onGoingTaskDesc.textContent = '';
        selectedTask = null;
        liSelectedTask = null;
        return;
    }

    activateTaskSelection(li, task);

}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>    
    `;

    const p = document.createElement('p');
    p.textContent = task.description;
    p.classList.add('app__section-task-list-item-description');

    const button = document.createElement('button');
    button.classList.add('app__card-button');

    listenNewTaskDescriptionButton(button, p, task);

    const buttonImg = document.createElement('img');
    buttonImg.setAttribute('src', '/imgs/edit.png')
    button.append(buttonImg);

    li.append(svg);
    li.append(p);
    li.append(button);

    if (task.completed) {
        li.classList.add('app__section-task-list-item-complete');
        button.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => {
            selectTask (task, li);
        }
    }
    
    return li;
};

function hideTextArea() {
    addTaskForm.classList.toggle('hidden');
    textArea.value = '';
}

addTaskButton.addEventListener('click', () => {
    hideTextArea();
});

function addTaskLocalStorage(description) {
    taskList.push({
        "description": description
    });
};

function removeTasksLocalStorage(operation) {
    if (operation === 'completed') {
        taskList = taskList.filter(task => !task.completed);
    } else if (operation === 'all') {
        taskList = [];
    } else {
        return false;
    };

    updateTaskList();
};

addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    addTaskLocalStorage(textArea.value);


    const taskElement = createTaskElement(taskList[taskList.length - 1]);
    ulTasks.append(taskElement);

    updateTaskList();
    hideTextArea();

});

cancelAddButton.addEventListener('click', () => {
    hideTextArea();;
});

function removeTasks(operation) {
    let removableTasks = null;
    if (operation === 'completed') {
        removableTasks = document.querySelectorAll('.app__section-task-list-item-complete');
    } else if (operation === 'all') {
        removableTasks = document.querySelectorAll('.app__section-task-list-item');
    } else {
        return false;
    }
    
    removableTasks.forEach(item => {
        item.remove();
    });
    removeTasksLocalStorage(operation);

    return true;
}

remCompletedButton.addEventListener('click', () => {
    removeTasks('completed');
});

remAllButton.addEventListener('click', () => {
    removeTasks('all');
});

document.addEventListener('countDownFinished', () => {
    if (layout.getActiveLayout() === 'focus' && selectedTask && liSelectedTask) {
        liSelectedTask.classList.remove('app__section-task-list-item-active');
        liSelectedTask.classList.add('app__section-task-list-item-complete');
        liSelectedTask.querySelector('button').setAttribute('disabled', 'disabled');

        selectedTask.completed = true;

        updateTaskList();

    }
});

taskList.forEach(task => {
    const taskElement = createTaskElement(task);
    ulTasks.append(taskElement);
});