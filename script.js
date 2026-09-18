// ===================== STEP 2: JavaScript Form Validation =====================

const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const formSuccess = document.getElementById('formSuccess');

function showError(input, errorId, msg) {
  input.classList.add('invalid');
  document.getElementById(errorId).textContent = msg;
}

function clearError(input, errorId) {
  input.classList.remove('invalid');
  document.getElementById(errorId).textContent = '';
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;

  // Name validation
  if (nameInput.value.trim() === '') {
    showError(nameInput, 'nameError', 'Name is required.');
    isValid = false;
  } else {
    clearError(nameInput, 'nameError');
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === '') {
    showError(emailInput, 'emailError', 'Email is required.');
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, 'emailError', 'Enter a valid email address.');
    isValid = false;
  } else {
    clearError(emailInput, 'emailError');
  }

  // Phone validation
  const phonePattern = /^[0-9]{10}$/;
  if (phoneInput.value.trim() === '') {
    showError(phoneInput, 'phoneError', 'Phone number is required.');
    isValid = false;
  } else if (!phonePattern.test(phoneInput.value.trim())) {
    showError(phoneInput, 'phoneError', 'Enter a valid 10-digit phone number.');
    isValid = false;
  } else {
    clearError(phoneInput, 'phoneError');
  }

  // Message validation
  if (messageInput.value.trim() === '') {
    showError(messageInput, 'messageError', 'Message cannot be empty.');
    isValid = false;
  } else {
    clearError(messageInput, 'messageError');
  }

  if (isValid) {
    formSuccess.textContent = '✅ Thank you! Your message has been submitted successfully.';
    form.reset();
    setTimeout(() => { formSuccess.textContent = ''; }, 4000);
  } else {
    formSuccess.textContent = '';
  }
});


// ===================== STEP 4: Dynamic To-Do List (DOM Manipulation) =====================

const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

function renderEmptyMessage() {
  if (todoList.children.length === 0) {
    const emptyMsg = document.createElement('li');
    emptyMsg.className = 'empty-msg';
    emptyMsg.textContent = '🎉 No tasks yet. Add one above!';
    todoList.appendChild(emptyMsg);
  }
}

function addTodo() {
  const taskText = todoInput.value.trim();
  if (taskText === '') {
    return;
  }

  // Remove empty-state message if present
  const existingEmptyMsg = todoList.querySelector('.empty-msg');
  if (existingEmptyMsg) {
    existingEmptyMsg.remove();
  }

  const li = document.createElement('li');

  const span = document.createElement('span');
  span.className = 'todo-text';
  span.textContent = taskText;
  span.addEventListener('click', function () {
    li.classList.toggle('completed');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '🗑️ Remove';
  deleteBtn.addEventListener('click', function () {
    li.remove();
    renderEmptyMessage();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  todoInput.value = '';
  todoInput.focus();
}

addTodoBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// Initialize with the empty-state message
renderEmptyMessage();
