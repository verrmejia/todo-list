const todoInput = document.getElementById("todo-input")
const todoSubmit = document.getElementById("todo-submit")
const todoList = document.getElementById("todo-list")

// To Do Submit Button
todoSubmit.addEventListener("click", () => {
    if (todoInput.value === ''){
        alert('Please fill up the text field');
    }
    else{
        // Elements
        const li = document.createElement("li");
        const p = document.createElement("p");
        const i = document.createElement("i");

        // Classes
        i.classList.add('bi');
        i.classList.add('bi-trash-fill');

        // Values
        p.innerHTML = todoInput.value;
        
        // Append
        todoList.appendChild(li);
        li.appendChild(p);
        li.appendChild(i);
    }

    todoInput.value = '';
    saveData();
})

// To Do Delete Button
todoList.addEventListener("click", function(e) {
    if (e.target.tagName === 'P') {
        e.target.classList.toggle('checked');
        saveData();
    }
    else if (e.target.tagName === 'I') {
        e.target.parentElement.remove();
        saveData();
    }
}, false)

function saveData() {
    localStorage.setItem('data', todoList.innerHTML);
}

function showData() {
    todoList.innerHTML = localStorage.getItem('data');
}
showData();