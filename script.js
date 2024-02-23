const TextInputComponent = document.querySelector("#task-input");
const ButtonComponent = document.querySelector("#task-input-btn");
const TodoListContainer = document.querySelector("#tasks");
const OtherInfoContainer = document.querySelector("#other-info");
const DateContainer = document.querySelector(".date");
const FinishedTasksContainer = document.querySelector("#finished-tasks");

let todos = [];
let todo = {};
ButtonComponent.addEventListener("click", addTodoToList);

function createTodoItem(todo) {
  const listElement = document.createElement("li");
  listElement.classList.add("task");
  listElement.setAttribute("data-id", todo.id);
  const checkboxElement = document.createElement("input");
  checkboxElement.id = "task-checkbox";
  checkboxElement.setAttribute("type", "checkbox");
  const taskTextElement = document.createElement("p");
  taskTextElement.textContent = todo.text;
  taskTextElement.classList.add("task-text");
  const deleteButtonElement = document.createElement("span");
  deleteButtonElement.classList.add("close-btn");
  deleteButtonElement.textContent = "X";
  deleteButtonElement.setAttribute("title", "Delete");
  deleteButtonElement.addEventListener("click", function () {
    removeTodoFromList(todo.id);
  });
  checkboxElement.addEventListener("change", function () {
    markAsComplete(taskTextElement, todo);
  });
  listElement.appendChild(checkboxElement);
  listElement.appendChild(taskTextElement);
  listElement.appendChild(deleteButtonElement);
  return listElement;
}

function markAsComplete(TaskElement, todo) {
  if (TaskElement) {
    TaskElement.classList.toggle("completed");
  }
  if (todo.completed) {
    todo.completed = false;
  } else {
    todo.completed = true;
  }
  updateFinishedTasksCount();
}

function addTodoToList() {
  let textValue = TextInputComponent.value;
  if (textValue.trim() === "") {
    alert("Please enter a todo item!");
    return;
  } else {
    todo = {
      id: Math.random(),
      text: textValue,
      completed: false,
    };
    todos.push(todo);
    let todoItem = createTodoItem(todo);
    TodoListContainer.appendChild(todoItem);
    updateTasksCount();
    updateFinishedTasksCount();
    TextInputComponent.value = "";
    TextInputComponent.focus();
  }
}

function removeTodoFromList(id) {
  let filteredTodos = todos.filter((todo) => {
    return todo.id != id;
  });
  todos = filteredTodos;
  let todoItem = document.querySelector(`li[data-id="${id}"]`);
  if (todoItem) {
    todoItem.remove();
    updateTasksCount();
    updateFinishedTasksCount();
  }
}

function updateTasksCount() {
  OtherInfoContainer.innerHTML = "";
  const countElement = document.createElement("p");
  countElement.textContent = `${todos.length} tasks`;
  OtherInfoContainer.appendChild(countElement);
}

function updateFinishedTasksCount() {
  let completedCount = todos.filter((todo) => {
    return todo.completed === true;
  }).length;
  let totalCount = todos.length;
  FinishedTasksContainer.textContent = `${completedCount} of ${totalCount} tasks `;
}

document.addEventListener("DOMContentLoaded", function () {
  TextInputComponent.focus();
  updateTasksCount();
  updateCurrentDate();
  updateFinishedTasksCount();
});
function updateCurrentDate() {
  const date = new Date();
  let currentDate = date.getDate();
  let currentMonth = getCurrentMonthInString(date.getMonth());
  let currentDay = getCurrentDayInString(date.getDay());
  DateContainer.textContent = `${currentDay} ${currentDate} ${currentMonth}`;
}

function getCurrentDayInString(day) {
  let ans = "";
  switch (day) {
    case 1:
      ans = "Monday";
      break;
    case 2:
      ans = "Tuesday";
      break;
    case 3:
      ans = "Wednesday";
      break;
    case 4:
      ans = "Thursday";
      break;
    case 5:
      ans = "Friday";
      break;
    case 6:
      ans = "Saturday";
      break;
    case 7:
      ans = "Sunday";
      break;
    default:
      ans = "Funday";
      break;
  }
  return ans;
}

function getCurrentMonthInString(day) {
  let ans = "";
  switch (day) {
    case 0:
      ans = "January";
      break;
    case 1:
      ans = "Feburary";
      break;
    case 2:
      ans = "March";
      break;
    case 3:
      ans = "April";
      break;
    case 4:
      ans = "May";
      break;
    case 5:
      ans = "June";
      break;
    case 6:
      ans = "July";
      break;
    case 7:
      ans = "August";
      break;
    case 8:
      ans = "September";
      break;
    case 9:
      ans = "October";
      break;
    case 10:
      ans = "November";
      break;
    case 11:
      ans = "December";
      break;
    default:
      ans = "";
      break;
  }
  return ans;
}
