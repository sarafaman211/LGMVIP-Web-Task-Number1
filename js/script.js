const container = document.querySelector(".container")
const messageElement = document.querySelector("#message")
const todoForm = document.querySelector(".todo-form")
const todoInput = document.querySelector("#todo_input")
const addBtn = document.querySelector(".btn")
const lists = document.querySelector("#lists")

const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${ status }`);
    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${ status }`);
    }, 2000)
}

const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li")
    todoElement.id = todoId
    todoElement.classList.add('li_style')
    todoElement.innerHTML = `
    <span> ${todoValue} </span>
    <span><button id="deleteButton"><i class="fas fa-trash"></i></button></span>
    `;
    lists.appendChild(todoElement);
    
    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo);
}

const deleteTodo = (e) => {
    const selectedTodo = e.target.parentElement.parentElement.parentElement;
    lists.removeChild(selectedTodo)
    showMessage('Deleted Success', "success")

    let todos = getTodosFromLocalStorage();
    todos = todos.filter(todo => todo.todoId != selectedTodo.id)
    localStorage.setItem("myTodos", JSON.stringify(todos));
}

const getTodosFromLocalStorage = () => {
    return localStorage.getItem("myTodos") ? JSON.parse(localStorage.getItem('myTodos')) : []
}

const addTodo = (e) => {
    e.preventDefault()
    const todoValue = todoInput.value;
    const todoId = Date.now().toString();

    // console.log(todoValue, todoId)
    if(todoValue.length > 0 ){
        createTodo(todoId, todoValue)
        showMessage("Todo Added", "success")
    
        const todos = getTodosFromLocalStorage();
        todos.push({ todoId, todoValue });
        localStorage.setItem("myTodos", JSON.stringify(todos))
        todoInput.value = ""
    }else{
        showMessage("Enter the todo first", "danger")
    }
}

const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map(todo => createTodo(todo.todoId, todo.todoValue))
}

// addTodo()

todoForm.addEventListener("submit",addTodo);
window.addEventListener('DOMContentLoaded', loadTodos);