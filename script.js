let itemCounter = 2;
let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  document.getElementById(tabId).classList.add('active');
  
  const activeBtn = Array.from(document.querySelectorAll('.nav-btn')).find(
    btn => btn.getAttribute('onclick').includes(tabId)
  );
  if (activeBtn) activeBtn.classList.add('active');
}

function logToVirtualConsole(message) {
  const consoleOutput = document.getElementById('console-output');
  const timestamp = new Date().toLocaleTimeString();
  consoleOutput.textContent += `[${timestamp}] ${message}\n`;
}

function clearConsole() {
  document.getElementById('console-output').textContent = '';
}


function runTask0() {
  const studentName = "Arai";
  const studentGroup = "SE-2529";

  console.log(`Student: ${studentName}, Group: ${studentGroup}`);
  logToVirtualConsole(`console.log -> Name: ${studentName}, Group: ${studentGroup}`);

  alert("Hello, JavaScript World!");
}

function runTask1() {
  const strVar = "JavaScript";
  const numVar = 42;
  const boolVar = true;

  const sum = numVar + 8;
  const product = numVar * 2;
  const concatStr = strVar + " is " + (boolVar ? "awesome!" : "okay.");

  console.log("String Variable:", strVar);
  console.log("Number Variable:", numVar);
  console.log("Boolean Variable:", boolVar);
  console.log("Arithmetic Sum (42 + 8):", sum);
  console.log("Arithmetic Product (42 * 2):", product);
  console.log("Concatenation Result:", concatStr);

  logToVirtualConsole("--- Task 1 Execution ---");
  logToVirtualConsole(`String: "${strVar}", Number: ${numVar}, Boolean: ${boolVar}`);
  logToVirtualConsole(`Sum (42 + 8) = ${sum}`);
  logToVirtualConsole(`Product (42 * 2) = ${product}`);
  logToVirtualConsole(`Concatenation: "${concatStr}"`);
}


function changeContent() {
  const para = document.getElementById('target-paragraph');
  para.textContent = "The content of this paragraph has been dynamically updated using JavaScript!";
}

function changeBgColor() {
  const box = document.getElementById('style-box');
  const colors = [
    'rgba(243, 166, 189, 0.2)', 
    'rgba(147, 197, 253, 0.2)', 
    'rgba(167, 243, 208, 0.2)', 
    'rgba(253, 230, 138, 0.2)'
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  box.style.backgroundColor = randomColor;
}

function changeFontSize() {
  const box = document.getElementById('style-box');
  const sizes = ['13px', '15px', '17px', '19px'];
  const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
  box.style.fontSize = randomSize;
}

function addItem() {
  itemCounter++;
  const ul = document.getElementById('dynamic-list');
  const li = document.createElement('li');
  li.textContent = `Item ${itemCounter}`;
  ul.appendChild(li);
}

function removeItem() {
  const ul = document.getElementById('dynamic-list');
  if (ul.lastElementChild) {
    ul.removeChild(ul.lastElementChild);
  }
}


function handleMouseOver() {
  const box = document.getElementById('hover-box');
  box.classList.add('hovered');
  box.textContent = "Mouse is Over!";
}

function handleMouseOut() {
  const box = document.getElementById('hover-box');
  box.classList.remove('hovered');
  box.textContent = "Hover over me!";
}

function handleKeyUp(event) {
  const output = document.getElementById('keyup-output');
  output.textContent = event.target.value || '-';
}

function calculate(operator) {
  const n1 = parseFloat(document.getElementById('calc-num1').value);
  const n2 = parseFloat(document.getElementById('calc-num2').value);
  const output = document.getElementById('calc-output');

  if (isNaN(n1) || isNaN(n2)) {
    output.textContent = "Enter valid numbers";
    return;
  }

  let result = 0;
  switch (operator) {
    case '+': result = n1 + n2; break;
    case '-': result = n1 - n2; break;
    case '*': result = n1 * n2; break;
    case '/': 
      result = n2 !== 0 ? (n1 / n2) : "Division by zero"; 
      break;
  }

  output.textContent = typeof result === 'number' ? Number(result.toFixed(4)) : result;
}


function handleAddTask(e) {
  e.preventDefault();
  const titleInput = document.getElementById('task-title');
  const descInput = document.getElementById('task-desc');

  const newTask = {
    id: Date.now(),
    title: titleInput.value.trim(),
    description: descInput.value.trim(),
    completed: false
  };

  tasks.push(newTask);
  
  titleInput.value = '';
  descInput.value = '';

  renderTasks();
}

function toggleTaskComplete(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function renderTasks() {
  const container = document.getElementById('todo-list');
  container.innerHTML = '';

  if (tasks.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">No tasks added yet.</p>';
    return;
  }

  tasks.forEach(task => {
    const item = document.createElement('div');
    item.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    item.innerHTML = `
      <div class="task-content" onclick="toggleTaskComplete(${task.id})">
        <div class="task-title">${escapeHtml(task.title)}</div>
        <div class="task-desc">${escapeHtml(task.description)}</div>
      </div>
      <div class="task-actions">
        <button class="btn-icon" onclick="deleteTask(${task.id})" title="Delete Task">
          <i data-lucide="x" style="width: 18px; height: 18px;"></i>
        </button>
      </div>
    `;

    container.appendChild(item);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}