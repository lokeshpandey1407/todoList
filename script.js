const TextInputComponent = document.querySelector("#task-input");
const ButtonComponent = document.querySelector("#task-input-btn");
const TodoListContainer = document.querySelector("#tasks");
const OtherInfoContainer = document.querySelector("#other-info");

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
    markAsComplete(taskTextElement);
  });
  listElement.appendChild(checkboxElement);
  listElement.appendChild(taskTextElement);
  listElement.appendChild(deleteButtonElement);
  return listElement;
}

function markAsComplete(TaskElement) {
  if (TaskElement) {
    TaskElement.classList.toggle("completed");
  }
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
    TextInputComponent.value = "";
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
  }
}

function updateTasksCount() {
  OtherInfoContainer.innerHTML = "";
  const countElement = document.createElement("p");
  countElement.textContent = `${todos.length} tasks left`;
  OtherInfoContainer.appendChild(countElement);
}

document.addEventListener("DOMContentLoaded", function () {
  TextInputComponent.focus();
  updateTasksCount();
});
