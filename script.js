//Load saved todos (or start empty)
let todos = JSON.parse(localStorage.getItem("todos")) || [];

//Function to show the todos on the page
function renderTodos() {

  //Get the todo list container (where we will add items)
  const list = document.getElementById("todoList");
  list.innerHTML = "";
}