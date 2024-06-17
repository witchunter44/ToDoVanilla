//date
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date();
    let currentDay = days[d.getDay()];

    const currentMonthDay = new Date().getDate();
    const currentMonthIndex = new Date().getMonth();
    const currentMonth = months[currentMonthIndex];
    const currentYear = new Date().getFullYear();

    document.getElementById('date').innerHTML = currentDay + ', <br>' + currentMonthDay + ' ' + currentMonth + ' ' + currentYear;

    //changing name
    const nameId = document.getElementById('name-hello');
    let newtask = document.getElementById("main-part");
    let confirmNickname = false;

    nameId.addEventListener('click', function() {
        let nameWindow = document.createElement('div');
        nameWindow.id = 'task-window';

        let nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'nickname';
        nameInput.id = 'inputText';

        let nameButton = document.createElement('button');
        nameButton.type = 'submit';
        nameButton.className = 'buttons';
        nameButton.id = 'name-button';
        nameButton.textContent = 'Change name';

        nameWindow.appendChild(nameInput);
        nameWindow.appendChild(nameButton);
        
        newtask.appendChild(nameWindow);

        let addingNickname = document.getElementById('name-button');
        const nicknameInput = document.getElementById('inputText');                       
    
        addingNickname.addEventListener('click', function(){
            confirmNickname = true;
            const newNickname = nicknameInput.value;
            if (confirmNickname == true) {
                nameId.innerHTML = "Hello, " + newNickname;
                confirmNickname = false;
                saveTask();
                removeTaskWindow();
            }
        });
    });

    // Task Settings Function
    function taskSettings(taskCell) {
    let actionWindow = document.createElement('div');
    actionWindow.id = 'action-window';

    let title = document.createElement('h1');
    title.textContent = 'Task Actions';
    actionWindow.appendChild(title);

    let completeButton = createActionButton('Mark as Completed', 'pictures/completed-icon.png', function() {
        let taskImg = taskCell.querySelector('img');
        taskImg.src = 'pictures/completed-icon.png';
        saveTask();
        removeActionWindow();
    });
    actionWindow.appendChild(completeButton);

    let uncompleteButton = createActionButton('Mark as Uncompleted', 'pictures/uncompleted-icon.png', function() {
        let taskImg = taskCell.querySelector('img');
        taskImg.src = 'pictures/uncompleted-icon.png';
        saveTask();
        removeActionWindow();
    });
    actionWindow.appendChild(uncompleteButton);

    let deleteButton = createActionButton('Delete Task', '', function() {
        removeTaskCell(taskCell);
        removeActionWindow();
    });
    actionWindow.appendChild(deleteButton);

    newtask.appendChild(actionWindow);

    function removeActionWindow() {
        let actionWindow = document.getElementById('action-window');
        if (actionWindow) {
            actionWindow.remove();
        }
    }
}

    function createActionButton(text, iconSrc, clickHandler) {
        let button = document.createElement('button');
        button.textContent = text;
        button.className = 'buttons';
        button.addEventListener('click', clickHandler);
        return button;
    }

    // Remove Task Function
    function removeTaskCell(taskCell) {
        taskCell.remove();
        saveTask();
    }

    // Add Task Function
    function addTask() {
        let taskWindow = document.createElement('div');
        taskWindow.id = 'task-window';

        let title = document.createElement('h1');
        title.textContent = 'Add new task';
        taskWindow.appendChild(title);

        let textarea = document.createElement('textarea');
        textarea.name = 'description';
        textarea.cols = 26;
        textarea.rows = 4;
        textarea.id = 'content-text';
        taskWindow.appendChild(textarea);

        let imgSelection = document.createElement('div');
        imgSelection.id = 'img-selection';
        imgSelection.innerHTML = '<h1>Choose the marker:</h1><img src="pictures/book-alt.png" id="book"><img src="pictures/briefcase.png" id="briefcase"><img src="pictures/gym.png" id="gym"><img src="pictures/sparkles.png" id="sparkles"><img src="pictures/utensils.png"id="utensils">';
        taskWindow.appendChild(imgSelection);

        let button = document.createElement('button');
        button.type = 'submit';
        button.className = 'buttons';
        button.id = 'proceed-button';
        button.textContent = 'Add task';
        button.onclick = removeTaskWindow;
        taskWindow.appendChild(button);

        newtask.appendChild(taskWindow);

        let book = document.getElementById('book');
        let briefcase = document.getElementById('briefcase');
        let gym = document.getElementById('gym');
        let sparkles = document.getElementById('sparkles');
        let utensils = document.getElementById('utensils');
        let addingTask = document.getElementById('proceed-button');

        let iconselection;

        //choosing
        book.addEventListener("click", function(){
            iconselection = 1;
        });
        briefcase.addEventListener("click", function(){
            iconselection = 2;
        });
        gym.addEventListener("click", function(){
            iconselection = 3;
        });
        sparkles.addEventListener("click", function(){
            iconselection = 4;
        });
        utensils.addEventListener("click", function(){
            iconselection = 5;
        });

        let contentText = document.getElementById("content-text");

        //checking the conditions to print the result on main page
        addingTask.addEventListener("click", function(){
            confirm = true;                        
            let content = contentText.value;
            let taskCell = document.createElement('div');
            taskCell.className = 'block';

            let taskImg = document.createElement('img');
            let taskText = document.createElement('p');
            let chunkedContent = chunkText(content, 20);
            taskText.innerHTML = chunkedContent.join('<br>');

            let menuImg = document.createElement('input');
            menuImg.type = 'image';
            menuImg.src = 'pictures/menu-dots.png';
            menuImg.alt = 'Menu';
            menuImg.setAttribute('class', 'task-settings');
            menuImg.addEventListener('click', function() {
                taskSettings(taskCell);
            });

            if (iconselection == 1 && confirm == true) {
                taskImg.src = 'pictures/book-alt.png';
            } else if (iconselection == 2 && confirm == true) {
                taskImg.src = 'pictures/briefcase.png';
            } else if (iconselection == 3 && confirm == true) {
                taskImg.src = 'pictures/gym.png';
            } else if (iconselection == 4 && confirm == true) {
                taskImg.src = 'pictures/sparkles.png';
            } else if (iconselection == 5 && confirm == true) {
                taskImg.src = 'pictures/utensils.png';
            }

            taskText.id = 'contentOfTask';

            taskCell.appendChild(taskImg);
            taskCell.appendChild(taskText);
            taskCell.appendChild(menuImg);
            newtask.appendChild(taskCell);

            saveTask();
        });
    }

    // Remove Task Window Function
    function removeTaskWindow() {
        let refresh = document.createElement('div');
        refresh.id = 'add-task-window';

        let trash = document.getElementById('task-window');
        trash.parentNode.replaceChild(refresh, trash);
    }

    // Save Task Function
    function saveTask() {
        const savedTasks = document.getElementsByClassName('block');
        const tasksData = [];
        const savedNickname = document.getElementById('name-hello').innerHTML;

        for (let i = 0; i < savedTasks.length; i++) {
            tasksData.push(savedTasks[i].innerHTML);
        }

        localStorage.setItem('savedTasks', JSON.stringify(tasksData));
        localStorage.setItem('savedNickname', JSON.stringify(savedNickname));
    }

    // Restore Task Function
    document.addEventListener('DOMContentLoaded', function() {
        restoreTask();
    });

    function restoreTask() {
    const tasksData = JSON.parse(localStorage.getItem('savedTasks'));
    const savedTasksContainer = document.getElementById('main-part');
    const nicknameData = JSON.parse(localStorage.getItem('savedNickname'));
    const savedNicknameContainer = document.getElementById('name-hello');

    if (tasksData && tasksData.length > 0) {
        for (let i = 0; i < tasksData.length; i++) {
            let restoredCell = document.createElement('div');
            restoredCell.className = 'block';
            restoredCell.innerHTML = tasksData[i];
            savedTasksContainer.appendChild(restoredCell);

            let menuButton = restoredCell.querySelector('.task-settings');
            if (menuButton) {
                menuButton.addEventListener('click', function() {
                    taskSettings(restoredCell);
                });
            }
        }
    }

    if (nicknameData) {
        savedNicknameContainer.innerHTML = nicknameData;
    }
}

    // Add Empty Block Function
    function addEmptyBlock(container) {
        let emptyBlock = document.createElement('div');
        emptyBlock.className = 'block';
        container.appendChild(emptyBlock);
    }

    // Chunk Text Function
    function chunkText(text, chunkSize) {
        let chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.slice(i, i + chunkSize));
        }
        return chunks;
    }