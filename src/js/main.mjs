import $ from "jquery";
import TaskManager from './taskManager.mjs';

const taskManager = new TaskManager();
taskManager.loadTasks();

function renderTasks() {
    const tasks = taskManager.getTasks();
    const taskList = $('#task-list');
    taskList.empty();
    tasks.forEach(task => {
        const taskItem = $(`
            <li class="list-group-item ${task.completed ? 'list-group-item-success' : ''}">
                <span>${task.name}</span>
                <button class="btn btn-sm btn-danger float-right delete-task" data-id="${task.id}">Eliminar</button>
                <button class="btn btn-sm btn-secondary float-right mr-2 complete-task" data-id="${task.id}">${task.completed ? 'Desmarcar' : 'Completar'}</button>
            </li>
        `);
        taskList.append(taskItem);
    });
}

$('#task-form').on('submit', function (event) {
    event.preventDefault();
    const name = $('#task-name').val();
    const description = $('#task-desc').val();
    taskManager.addTask(name, description);
    renderTasks();
    this.reset();
    console.log(taskManager.getTasks());
});

$('#task-list').on('click', '.delete-task', function () {
    const id = $(this).data('id');
    taskManager.deleteTask(id);
    renderTasks();
});

$('#task-list').on('click', '.complete-task', function () {
    const id = $(this).data('id');
    taskManager.toggleTaskCompletion(id);
    renderTasks();
});

$(document).ready(function () {
    renderTasks();
});
