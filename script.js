//Load saved todos (or start empty)
let todos = JSON.parse(localStorage.getItem("todos")) || [];

//Function to show the todos on the page
function renderTodos() {

  //Get the todo list container (where we will add items)
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  //Loop over all todos
  todos.forEach((todo, index) => {

    //Create a box (div) for each to-do
    const item = document.createElement("div");
    item.className = "todo-item";

    // Checkbox (mark done)
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done || false;

    checkbox.onclick = () => {
      todos[index].done = checkbox.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    };

    // Editable text field for the todo
    const input = document.createElement("input");
    input.type = "text";
    input.className = "todo-text";
    input.value = todo.text;
    if (todo.done) input.classList.add("done");
    input.readOnly = true;

    // Edit button (toggle edit/save)
    const editBtn = document.createElement("button");
    editBtn.className = "todo-btn";
    editBtn.textContent = "Edit";

    let editing = false;

    // What happens when you click "Edit"
    editBtn.onclick = () => {
      if (!editing) {
        input.readOnly = false;
        input.focus();
        editBtn.textContent = "Save";
        editing = true;
      } 
      // When clicking “Save”
      else {
        const newText = input.value.trim();
        if (newText !== "") {
          todos[index].text = newText;
          localStorage.setItem("todos", JSON.stringify(todos));
        }
        input.readOnly = true;
        editBtn.textContent = "Edit";
        editing = false;
      }
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "todo-btn";
    deleteBtn.textContent = "Delete";

    //When clicked
    deleteBtn.onclick = () => {
      if (confirm("Are you sure you want to delete this to-do?")) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      }
    };

    //Add all these elements to the page
    item.appendChild(checkbox);
    item.appendChild(input);
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);
    list.appendChild(item);
  });
}

// Function to Add a New To-Do
function saveTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (text === "") return;

  todos.push({ text, done: false });
  input.value = "";
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

//Start Everything
renderTodos();
