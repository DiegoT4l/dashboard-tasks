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
            <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <input type="checkbox" class="form-check-input me-2" ${task.completed ? "checked" : ""}>
            <span class="${task.completed ? "text-secondary text-decoration-line-through" : ""}">${task.name}</span>
          </div>
          <div>
            <span class="text-secondary">${task.category}</span><span class="text-secondary"> ${task.dueDate}</span>
            <button class="btn btn-sm ms-2 delete-task" data-id="${task.id}"><i class="bi bi-trash"></i></button>
          </div>
        </li>
        `);
        taskList.append(taskItem);

        $("#total-tasks").text(tasks.length);
        const completedTasks = tasks.filter((task) => task.completed).length;
        $("#completed-tasks").text(completedTasks);
        const completionRate = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
        $("#completion-rate").text(completionRate.toFixed(2));
        $(".progress-bar").css("width", `${completionRate}%`);
    });
}

$('#task-form').on('submit', function (event) {
    event.preventDefault();
    const name = $('#new-task-name').val();
    const category = $('#new-task-category').val();
    const date = $('#new-task-due-date').val() || 'No Due Date';
    taskManager.addTask(name, category, date);
    renderTasks();
    this.reset();
    console.log(taskManager.getTasks());
});

$('#task-list').on('click', '.delete-task', function () {
    const id = $(this).data('id');
    taskManager.deleteTask(id);
    renderTasks();
});

$('#task-list').on('change', '.form-check-input', function () {
    const id = $(this).closest('li').find('.delete-task').data('id');
    taskManager.toggleTaskCompletion(id);
    renderTasks();
});

$(document).ready(function () {
    renderTasks();
});