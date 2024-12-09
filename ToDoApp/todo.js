// DOM Elements
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskClick);
filterButtons.forEach(button => button.addEventListener('click', filterTasks));

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to Add Task
function addTask() {
    const taskText = taskInput.value;
    const dueDate = dueDateInput.value;
    
    if (taskText === '') return; // Prevent adding empty tasks

    const taskItem = createTaskElement(taskText, dueDate, false);
    taskList.appendChild(taskItem);
    
    saveTasks(); // Save to localStorage
    taskInput.value = ''; // Clear input field
    dueDateInput.value = ''; // Clear due date field
}

// Function to Create Task Element
function createTaskElement(text, dueDate, completed) {
    const taskItem = document.createElement('li');
    
    const taskTextNode = document.createElement('span');
    taskTextNode.textContent = `${text} (Due: ${dueDate || 'No due date'})`;
    taskItem.appendChild(taskTextNode);
    
    if (completed) {
        taskItem.classList.add('completed');
    }

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    taskItem.appendChild(editBtn);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    taskItem.appendChild(deleteBtn);

    return taskItem;
}

// Handle Task Clicks (Edit, Delete, Complete)
function handleTaskClick(e) {
    const target = e.target;
    const taskItem = target.parentElement;

    if (target.classList.contains('delete-btn')) {
        taskItem.remove(); // Remove task
        saveTasks();
    } else if (target.classList.contains('edit-btn')) {
        editTask(taskItem);
    } else {
        taskItem.classList.toggle('completed'); // Toggle completion
        saveTasks();
    }
}

// Function to Edit a Task
function editTask(taskItem) {
    const taskTextNode = taskItem.firstChild;
    const currentText = taskTextNode.textContent.split(' (Due: ')[0];
    
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = currentText;
    taskTextNode.replaceWith(editInput);

    const saveBtn = taskItem.querySelector('.edit-btn');
    saveBtn.textContent = 'Save';
    
    saveBtn.addEventListener('click', () => {
        const updatedText = editInput.value;
        const updatedDueDate = taskItem.textContent.match(/\(Due: (.*?)\)/)[1];
        editInput.replaceWith(document.createTextNode(`${updatedText} (Due: ${updatedDueDate})`));
        saveBtn.textContent = 'Edit';
        saveTasks();
    }, { once: true });
}

// Filter Tasks (All, Completed, Incomplete)
function filterTasks(e) {
    const filter = e.target.id;
    document.querySelectorAll('li').forEach(taskItem => {
        switch (filter) {
            case 'filter-all':
                taskItem.style.display = 'flex';
                break;
            case 'filter-completed':
                taskItem.style.display = taskItem.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'filter-incomplete':
                taskItem.style.display = !taskItem.classList.contains('completed') ? 'flex' : 'none';
                break;
        }
    });

    // Update active filter button style
    filterButtons.forEach(button => button.classList.remove('active'));
    e.target.classList.add('active');
}

// Save Tasks to LocalStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(taskItem => {
        tasks.push({
            text: taskItem.firstChild.textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks from LocalStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(taskItem);
    });
}
