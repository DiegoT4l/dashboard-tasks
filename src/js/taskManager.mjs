export default class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(name, category, dueDate) {
        const task = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            name: name,
            category: category,
            dueDate: dueDate,
            completed: false
        };
        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    toggleTaskCompletion(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    getTasks() {
        return this.tasks;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.tasks = tasks;
    }
};
