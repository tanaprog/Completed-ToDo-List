const form = document.getElementById('task-area');
const inputTask = document.getElementById('single-task');
const buttonAdd = document.getElementById('btn');
const tasksUl = document.getElementById('task');
const taskLi = document.getElementById('list-group-item');
const btnCompleted = document.querySelector('.btn-action1');
const btnDelete = document.querySelector('.btn-action2');

let TASK_LIST = [];

if (localStorage.getItem('TASK_LIST')) {
    TASK_LIST = JSON.parse(localStorage.getItem('TASK_LIST'));
    TASK_LIST.forEach((task) => renderTask(task));
}

function createElement(tag, className) {
    let element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element
}

form.addEventListener('submit', addTask);
tasksUl.addEventListener('click', deleteTask);
tasksUl.addEventListener('click', completedTask);

function addTask(event) {
    event.preventDefault();

    if (inputTask.value === '') {
        const text = createElement('p', 'textP');
        text.innerHTML = 'You must to Add a task...';
        tasksUl.innerHTML = '';
        tasksUl.appendChild(text);
        // if(inputTask.value.length > 0) {
        //     text.classList.add('none')
        // }
        inputTask.addEventListener('input', () => {
            text.remove();
        })
    } else {
        const taskText = inputTask.value;

        const newTask = {
            id: Math.floor(Math.random() * 200) + 1,
            text: taskText,
            isCompleted: false
        };

        TASK_LIST.push(newTask);

        saveToLocalStorage();

        renderTask(newTask);

        inputTask.value = "";
        inputTask.focus();
    }
}

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.list-group-item');

    const id = Number(parentNode.id);

    const index = TASK_LIST.findIndex((tsk) => tsk.id === id);
    // const index = TASK_LIST.findIndex(function(tsk){
    //     if(tsk.id === id){
    //         return true;
    //     }
    // });

    TASK_LIST.splice(index, 1);

    saveToLocalStorage();

    parentNode.remove();
}

function completedTask(event) {
    if (event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('.list-group-item');

    const id = Number(parentNode.id);

    const findTask = TASK_LIST.find((tsk) => tsk.id === id);

    findTask.isCompleted = !findTask.isCompleted;

    saveToLocalStorage();

    console.log(findTask)

    const taskSpan = parentNode.querySelector('.task-title');
    taskSpan.classList.toggle('checked');
}

function saveToLocalStorage() {
    localStorage.setItem('TASK_LIST', JSON.stringify(TASK_LIST))
}

function renderTask(task) {
    const cssClass = task.isCompleted ? "task-title checked" : "task-title";

    const createTask = `
                     <li id="${task.id}" class="list-group-item">
                     <span class="${cssClass}">${task.text}</span>
                     <div class="button">
                     <button type="button" data-action="done" class="btn-action1 button">ok</button>
                     <button type="button" data-action="delete" class="btn-action2 button">x</button>
                     </div>
                    </li>
                    `;

    tasksUl.insertAdjacentHTML('beforeend', createTask);
}


