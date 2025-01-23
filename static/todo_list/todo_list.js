// Initialize task storage from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskListContainer = document.getElementById('tasks');

// Function to display tasks
function displayTasks() {
  taskListContainer.innerHTML = ''; // Clear current list

  // Sort tasks: Unchecked tasks first, checked tasks later
  const sortedTasks = tasks.sort((a, b) => a.completed - b.completed);

  sortedTasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener('change', () => toggleTaskCompletion(index));

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.classList.add(task.completed ? 'completed' : 'uncompleted');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<span class="material-icons">delete</span>';
    deleteButton.addEventListener('click', () => deleteTask(index));

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);
    taskListContainer.appendChild(taskItem);
  });
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
  taskInput.value = ''; // Clear input field
  displayTasks(); // Refresh the task list
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
  displayTasks(); // Refresh the task list
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove task from array
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
  displayTasks(); // Refresh the task list
}

// Event listener to add task on button click
addTaskButton.addEventListener('click', addTask);

// Initial display of tasks
displayTasks();
