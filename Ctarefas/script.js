// Referências aos elementos do DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Função para carregar tarefas salvas do LocalStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
  });
}

// Função para salvar tarefas no LocalStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(task => {
    tasks.push({
      text: task.querySelector('span').textContent,
      completed: task.classList.contains('completed'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Adiciona uma nova tarefa ao DOM
function addTaskToDOM(taskText, isCompleted = false) {
  const li = document.createElement('li');
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✔️';
  completeBtn.onclick = () => {
    toggleTaskComplete(li);
    saveTasks(); // Salva o estado atualizado
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.onclick = () => {
    deleteTask(li);
    saveTasks(); // Salva o estado atualizado
  };

  li.appendChild(taskSpan);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  if (isCompleted) {
    li.classList.add('completed');
  }

  taskList.appendChild(li);
}

// Adiciona uma nova tarefa
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Por favor, digite uma tarefa.');
    return;
  }

  addTaskToDOM(taskText); // Adiciona ao DOM
  saveTasks(); // Salva no LocalStorage
  taskInput.value = ''; // Limpa o campo de entrada
}

// Alterna o status de conclusão da tarefa
function toggleTaskComplete(task) {
  task.classList.toggle('completed');
}

// Exclui uma tarefa
function deleteTask(task) {
  taskList.removeChild(task);
}

// Eventos
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Carrega as tarefas ao iniciar
document.addEventListener('DOMContentLoaded', loadTasks);
