import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

const todos = [
  {
    text: "je suis une todo",
    done: false,
    editMode: false,
  },
  {
    text: "faire du javascript",
    done: true,
    editMode: false,
  },
];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const displayTodo = () => {
  const todoNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todoNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  li.addEventListener("click", () => {
    toogleTodo(index);
  });

  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });

  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "Edition";
  buttonEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    toogleEditMode(index);
  });

  li.innerHTML = `
  <span class="todo ${todo.done ? "done" : ""}"></span>
  <p>${todo.text}</p>`;
  li.append(buttonEdit, buttonDelete);
  li.appendChild(buttonDelete);
  return li;
};

const createTodoEditElement = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;

  const buttonSave = document.createElement("button");
  buttonSave.innerHTML = "Sauvegarder";
  buttonSave.addEventListener("click", (event) => {
    editTodo(index, input);
  });

  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Annuler";
  buttonCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    toogleEditMode(index);
  });

  li.append(input, buttonCancel, buttonSave);
  return li;
};

const addTodo = (text) => {
  todos.push({
    text,
    done: false,
  });
  displayTodo();
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

const toogleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

const toogleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
};

displayTodo();
