const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')
const todoList = document.getElementById("todo-list")
    
let todoData = loadData()
updateTodoList()

todoForm.addEventListener('submit', function(e) {
    e.preventDefault()

    addTodo()
})

function addTodo(){
    const todoText = todoInput.value.trim()

    if (todoText.length < 1){
        alert('Please fill up the text field')
    }
    else {
        const todoObject = {
            text: todoText,
            completed: false
        }
        todoData.push(todoObject)
        updateTodoList()
        saveData()
        todoInput.value = ''
    }
}

function updateTodoList() {
    todoList.innerHTML = '';
    todoData.forEach((todo, todoIndex) => {
        todoItem = createToDoItem(todo, todoIndex);
        todoList.append(todoItem);
    })
}

function createToDoItem(todo, todoIndex) {
    const todoId = 'todo-' + todoIndex;
    const li = document.createElement('li')
    const todoText = todo.text;
    li.className = 'todo-item';
    li.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="todo-check" for="${todoId}">
            <i class="bi bi-circle"></i>
            <i class="bi bi-check-circle-fill"></i>
        </label>
        <label class="todo-text" for="${todoId}">
            ${todoText}
        </label>
        <button class="todo-delete">
            <i class="bi bi-trash-fill"></i>
        </button>
    `

    const deleteButton = li.querySelector('.todo-delete')
    deleteButton.addEventListener('click', () => {
        deleteToDoItem(todoIndex)
    })

    const todoCheck = li.querySelector('input')
    todoCheck.addEventListener('change', () => {
        todoData[todoIndex].completed = todoCheck.checked;
        saveData()
    })
    todoCheck.checked = todo.completed;
    return li;
}

function deleteToDoItem(todoIndex){
    todoData = todoData.filter((_, i) => i !== todoIndex)
    saveData()
    updateTodoList()
}

function saveData() {
    const todoDataJson = JSON.stringify(todoData)
    localStorage.setItem('todoData', todoDataJson)
}

function loadData() {
    const todoData = localStorage.getItem('todoData') || '[]'
    return JSON.parse(todoData)
}