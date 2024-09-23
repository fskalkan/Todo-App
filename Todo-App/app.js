const todoAddForm = document.getElementById("todoAddForm");
const todoInput = document.getElementById("todoName");
const todoList = document.getElementById("todoList");
const cardBody = document.querySelectorAll(".card-body")[0];
const cardBody2 = document.querySelectorAll(".card-body")[1];
const todoClearButton = document.getElementById("todoClearButton");
const todoSearch = document.getElementById("todoSearch");

let todos = [];

runEvents();

function runEvents() {
  todoAddForm.addEventListener("submit", todoAddFormFunc);
  document.addEventListener("DOMContentLoaded", loadPage);
  cardBody2.addEventListener("click", removeTodoListUI);
  todoClearButton.addEventListener("click", todoClearAllOfThem);
  todoSearch.addEventListener("keyup", filterSearch);
}

function filterSearch(e) {
  const filterValue = e.target.value.trim().toLowerCase();
  const li = document.querySelectorAll(".list-group-item");

  if (li.length > 0) {
    li.forEach(function (todo) {
      if (todo.textContent.trim().toLowerCase().includes(filterValue)) {
        todo.setAttribute("style", "display: block");
      } else {
        todo.setAttribute("style", "display: none !important");
      }
    });
  }
}

function todoClearAllOfThem(e) {
  const todoList = document.querySelectorAll(".list-group-item");
  if (todoList.length > 0) {
    todoList.forEach(function (todo) {
      todo.remove();
    });
    showAlert("success", "Tüm todolar başarıyla silindi.");
  } else {
    showAlert("warning", "Silmek için en az bir adet todo girmeniz gerekiyor!");
  }

  todos = [];
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodoListUI(e) {
  if (e.target.className == "fa fa-remove") {
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    showAlert("success", "Başarıyla Silindi.");
    removeTodoToStorage(todo.textContent);
  }
}

function removeTodoToStorage(removeTodo) {
  checkTodoFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadPage() {
  checkTodoFromStorage();
  todos.forEach(function (todo) {
    todoListUI(todo);
  });
}

function todoAddFormFunc(e) {
  let todoText = todoInput.value.trim();

  if (todoText == "" || todoText == null) {
    showAlert("warning", "Bir todo yazmalısınız!");
  } else if (todos.includes(todoText.toLowerCase())) {
    // Eğer todo zaten varsa hata mesajı göster
    showAlert("danger", "Bu todo zaten mevcut!");
  } else {
    todoListUI(todoText);
    addTodoToStorage(todoText);
    showAlert("success", "Listeye Eklendi.");
  }

  e.preventDefault();
}

function todoListUI(newTodo) {
  /*<li class="list-group-item d-flex justify-content-between">
                Todo 1
                <a href="#" class="delete-item">
                  <i class="fa fa-remove"></i>
                </a>
              </li> */

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  todoInput.value = "";
}

function addTodoToStorage(newTodo) {
  checkTodoFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodoFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  /* <div class="alert alert-success" role="alert">
  This is a success alert—check it out!
</div> */

  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.role = "alert";
  div.textContent = message;

  cardBody.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 2500);
}
