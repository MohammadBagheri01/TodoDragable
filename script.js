function _id(id) {
  let target = document.getElementById(id);
  return target;
}

function _query(query) {
  let target = document.querySelector(query);
  return target;
}

function _queryAll(queryAll) {
  let target = document.querySelectorAll(queryAll);
  return target;
}

function creatElem(elemName) {
  let elem = document.createElement(elemName);
  return elem;
}
let addTodoBtn = _id("add-todo-btn");
let modal = _id("modal");
let modalCloseIcon = _id("modal-close-icon");
let todoInp = _id("todo-inp");
let modalAddBtn = _id("modal-add-btn");
let todos = _queryAll(".todos");
let modalError = _id("modalError");
let modalErrorBtn = _id("modalErrorBtn");
let contents = _queryAll(".content");
let todoDiv;
let todoText;
let todoId = 0;
let noStatusTodoObj;
let notStartedTodoObj;
let inProgressTodoObj;
let completedTodoObj;
let noStatusTodoArry = [];
let notStartedTodoArry = [];
let inProgressTodoArry = [];
let completedTodoArry = [];
addTodoBtn.addEventListener("click", showModalHandler);
modalCloseIcon.addEventListener("click", hideModalHandler);
modalAddBtn.addEventListener("click", addTodoHandler);
contents.forEach(function (content) {
  content.addEventListener("dragover", dragoverHandler);
  content.addEventListener("drop", dropHandler);
  content.addEventListener("dragenter", dropEnterHandler);
  content.addEventListener("dragleave", dropLeaveHandler);
});

function showModalHandler() {
  modal.classList.add("show-modal");
  todoInp.focus();
}

function hideModalHandler() {
  modal.classList.remove("show-modal");
}

function addTodoHandler() {
  if (todoInp.value === "") {
    modalError.classList.add("modalError-show");
    modalErrorBtn.addEventListener("click", function () {
      modalError.classList.remove("modalError-show");
    });
  } else {
    todoDiv = creatElem("div");
    todoDiv.setAttribute("class", "todo");
    todoDiv.setAttribute("id", todoId);
    todoDiv.draggable = true;
    todos[0].append(todoDiv);
    todoDiv.addEventListener("dragstart", dragstartHandler);
    todoText = creatElem("p");
    todoText.setAttribute("class", "todo-text");
    todoText.innerText = todoInp.value;
    todoClose = creatElem("i");
    todoClose.setAttribute("class", "fa fa-close");
    todoClose.classList.add("todo-close");
    todoClose.addEventListener("click", deletedTodoHandler);
    todoDiv.append(todoText, todoClose);
    todoInp.value = "";
    todoInp.focus();
    todoId++;
  }
}

function dragstartHandler(event) {
  event.dataTransfer.setData("elemId", event.target.id);
}

function dropHandler(event) {
  event.target.classList.remove("contActive");
  let dropElemId = event.dataTransfer.getData("elemId");
  let dropElem = _id(dropElemId);
  let contDroped = event.target.firstChild.nextSibling.nextSibling.nextSibling;
  if (contDroped.id == "add-todo-btn") {
    event.stopPropagation();
    contDroped.nextSibling.nextSibling.append(dropElem);
  } else {
    event.stopPropagation();

    contDroped.append(dropElem);
  }
  switch (event.target.id) {
    case "no-status":
      {
        dropElem.style.backgroundColor = "white";
      }
      break;
    case "not-started":
      {
        dropElem.style.backgroundColor = "rgb(219, 0, 0)";
      }
      break;
    case "in-progress":
      {
        dropElem.style.backgroundColor = "rgb(243, 243, 13)";
      }
      break;
    case "completed":
      {
        dropElem.style.backgroundColor = "rgb(97, 243, 13)";
      }
      break;
    default:
      break;
  }
}

function dragoverHandler(event) {
  event.preventDefault();
}

function deletedTodoHandler(event) {
  event.target.parentElement.remove();
}

function createLocalStorages() {
  let todoList = document.querySelectorAll(".todo");
  todoList.forEach(addToArry);
  localStorage.setItem("noStatusTodo", JSON.stringify(noStatusTodoArry));
  localStorage.setItem("notStartedTodo", JSON.stringify(notStartedTodoArry));
  localStorage.setItem("inProgressTodo", JSON.stringify(inProgressTodoArry));
  localStorage.setItem("completedTodo", JSON.stringify(completedTodoArry));
  noStatusTodoArry.splice(0);
  notStartedTodoArry.splice(0);
  inProgressTodoArry.splice(0);
  completedTodoArry.splice(0);
}
let rTodo;
let rtodoText;
let rTdoIcon;

function getLocalStorages() {
  let noStatusTodo = JSON.parse(localStorage.getItem("noStatusTodo"));
  let notStartedTodo = JSON.parse(localStorage.getItem("notStartedTodo"));
  let inProgressTodo = JSON.parse(localStorage.getItem("inProgressTodo"));
  let completedTodo = JSON.parse(localStorage.getItem("completedTodo"));

  todos.forEach(function (event) {
    switch (event.parentElement.id) {
      case "no-status":
        {
          noStatusTodo.forEach(function (obj) {
            refrashedHandler(event, obj);
            rTodo.style.backgroundColor = "white";
          });
        }
        break;
      case "not-started":
        {
          notStartedTodo.forEach(function (obj) {
            refrashedHandler(event, obj);
            rTodo.style.backgroundColor = "rgb(219, 0, 0)";
          });
        }
        break;
      case "in-progress":
        {
          inProgressTodo.forEach(function (obj) {
            refrashedHandler(event, obj);

            rTodo.style.backgroundColor = "rgb(243, 243, 13)";
          });
        }
        break;
      case "completed":
        {
          completedTodo.forEach(function (obj) {
            refrashedHandler(event, obj);
            rTodo.style.backgroundColor = "rgb(97, 243, 13)";
          });
        }
        break;

      default:
        break;
    }
  });
}
function addToArry(elem) {
  let txt = elem.firstChild.innerText;
  let id = elem.id;
  let parentID = elem.parentElement.parentElement.id;
  switch (parentID) {
    case "no-status":
      {
        noStatusTodoObj = {
          todoTxt: txt,
          todoId: id,
        };
        noStatusTodoArry.push(noStatusTodoObj);
      }
      break;
    case "not-started":
      {
        notStartedTodoObj = {
          todoTxt: txt,
          todoId: id,
        };
        notStartedTodoArry.push(notStartedTodoObj);
      }
      break;
    case "in-progress":
      {
        inProgressTodoObj = {
          todoTxt: txt,
          todoId: id,
        };
        inProgressTodoArry.push(inProgressTodoObj);
      }
      break;
    case "completed":
      {
        completedTodoObj = {
          todoTxt: txt,
          todoId: id,
        };
        completedTodoArry.push(completedTodoObj);
      }
      break;

    default:
      break;
  }
}

window.addEventListener("unload", createLocalStorages);
window.addEventListener("DOMContentLoaded", getLocalStorages);

function refrashedHandler(event, obj) {
  rTodo = creatElem("div");
  rTodo.setAttribute("class", "todo");
  rTodo.setAttribute("id", obj.todoId);
  rTodo.draggable = true;
  event.append(rTodo);
  rTodo.addEventListener("dragstart", dragstartHandler);
  rtodoText = creatElem("p");
  rtodoText.setAttribute("class", "todo-text");
  rtodoText.innerText = obj.todoTxt;
  rTdoIcon = creatElem("i");
  rTdoIcon.setAttribute("class", "fa fa-close");
  rTdoIcon.classList.add("todo-close");
  rTdoIcon.addEventListener("click", deletedTodoHandler);
  rTodo.append(rtodoText, rTdoIcon);
  return rTodo;
}
function dropEnterHandler(event) {
  event.target.classList.add("contActive");
}
function dropLeaveHandler(event) {
  event.target.classList.remove("contActive");
}
