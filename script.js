// Setup event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Create the addTask function
    function addTask(taskText, save = true) {
        const trimmedText = taskText.trim();
        if (!trimmedText) {
            alert('Please enter a task.');
            return;
        }

        // Task creation and removal
        const li = document.createElement('li');
        li.textContent = trimmedText;
        li.classList.add('task-item');

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = function () {
            taskList.removeChild(this.parentNode);
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(trimmedText);
            if (index > -1) {
                storedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
        if (save && taskInput) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(trimmedText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            if (taskInput) taskInput.value = '';
        }
    }

    // Attach event listeners
    addButton.addEventListener('click', () => addTask(taskInput.value));
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Invoke the addTask function on DOMContentLoaded and load tasks
    loadTasks();
});