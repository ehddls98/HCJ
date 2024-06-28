let todoList = [];
loadTodoList();

function handleTodoInputKeyDown(e) { //todo 입력란에서 키보드 입력이 발생하면
    if(e.keyCode === 13) { //엔터키를 누르면
        handleTodoOkClick(); //확인 버튼을 누른것과 같은 동작을 실행한다.
    }
}

function handleTodoOkClick(e) { //확인 버튼을 누르면
    const todoInput = document.querySelector(".todo-input"); //html에서 .todo-input 찾아서 todoInput에 대입
    if(isBlank(document.querySelector(".todo-input"))) { //todo 입력란이 공백이면
        alert("내용을 입력하세요."); //알림창을 띄운다
        clearTodoInput(); //todo 입력란을 비운다.
        return;
    }
    addTodo(); //todo 입력란이 공백이 아니면 todo를 객체를 생성한다. 
    clearTodoInput(); //todo 입력란을 비운다
}

function addTodo() { //todo를 객체를 생성하는 함수
    const todo = { //todo 객체 생성
        id: createNewId(),
        content: document.querySelector(".todo-input").value,
        date: transformDate(new Date())
    }

    todoList = [ ...todoList, todo ];
    saveLocalStorage();
    loadTodoList();
}

function createNewId() {
    const todoIdList = todoList.map(todo => todo.id); //todoList에서 map 함수를 사용하여 id값만 추출하여 todoIdList에 저장
    const maxId = todoIdList.length === 0 ? 0 : Math.max.apply(null, todoIdList); 
    //todoIdList의 길이가 0이면 0을 반환하고, 아니면 todoIdList에서 가장 큰 값을 반환하여 maxId에 저장
    return maxId + 1; //maxId에 1을 더한 값을 반환
}

function saveLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList)); //todoList를 JSON 문자열로 변환하여 localStorage에 저장
}

function loadTodoList() {
    const lsTodoList = localStorage.getItem("todoList"); //localStorage에서 todoList를 가져와서 lsTodoList에 저장
    todoList = !lsTodoList ? [] : JSON.parse(lsTodoList); //lsTodoList가 null이면 빈 배열을 반환하고, 아니면 JSON 문자열을 객체로 변환하여 todoList에 저장
    renderTodoList(); 
}

function renderTodoList() {
    const todoListContainer = document.querySelector(".todo-list-container");
    todoListContainer.innerHTML = todoList.map(todo => {
        return `
            <li class="todo-card">
                <h3 class="todo-date">${todo.date}</h3>
                <p class="todo-content">${todo.content}</p>
                <div class="todo-buttons">
                    <button class="button edit-button" onclick="handleEditClick(event)" value="${todo.id}">수정</button>
                    <button class="button delete-button" onclick="handleDeleteClick(event)" value="${todo.id}">삭제</button>
                </div>
            </li>
        `;
    }).join("");
}

function clearTodoInput() {
    const todoInput = document.querySelector(".todo-input");
    todoInput.value = ""; //todo 입력란을 비운다.
    todoInput.focus(); //todo 입력란에 focus를 준다.
}

function isBlank(input) {
    return !input.value.replaceAll(" ", ""); //input.value가 공백이면 true, 아니면 false를 리턴하고 공백을 모두 제거한다.
}

function transformDate(date) {
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} (${dayList[date.getDay()]}) ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    //2024.05.18(화) 12:30:00
}

function handleDeleteClick(e) {
    if(confirm("정말 삭제하시겠습니까?")) { //confirm 창에서 예를 누르면 
        todoList = todoList.filter(todo => todo.id !== parseInt(e.target.value)); //todoList에서 id값이 삭제를 누른 객체의 id와 같지 않은 요소들만 필터링하여 새로운 배열에 저장
        saveLocalStorage(); //localStorage에 저장
        loadTodoList(); //todoList를 다시 렌더링
    }
}

function handleEditClick(e) { //수정 버튼을 누르면
    const element = `
        <div class="modal-edit-container" onclick="event.stopPropagation()">
                <h3 class="modal-title">TODO 수정하기</h3>
                <div class="input-box">
                    <input type="text" class="todo-input" onkeyDown="if(event.keyCode === 13) document.querySelector('.modal button:nth-of-type(1)').click()">
                </div>
                <div class="todo-buttons">
                    <button class="button" onclick="handleEditOkClick(event)" value="${e.target.value}">확인</button>
                    <button class="button" onclick="closeModal()">취소</button>
                </div>
            </div>
    `;
    openModal(element); 
    const todoInput = document.querySelector(".modal .todo-input"); //element를 통해 .todo-input을 불러온 다음에 querySelector로 .todo-input 선택
    todoInput.focus();
}

function handleEditOkClick(e) {
    todoList = todoList.map(todo => { //todoList에 map 함수를 사용하여 todo 객체를 하나씩 반환
        if(todo.id === parseInt(e.target.value)) { //반환된 객체들 중 id값이 수정을 누른 객체의 id와 같은 객체가 있으면
            return {
                ...todo,
                content: document.querySelector(".modal .todo-input").value,
                date: transformDate(new Date)
            }
        } //수정된 content와 date를 포함한 todo 객체를 반환
        return todo;
    })
    saveLocalStorage();
    closeModal();
    loadTodoList();
}

function handleModalBackgroundClick() {
    closeModal();
}

function openModal(element) {
    const modal = document.querySelector(".modal");
    modal.classList.add("modal-show"); 
    modal.innerHTML = element;
}

function closeModal() {
    const modal = document.querySelector(".modal");
    modal.innerHTML = "";
    modal.classList.remove("modal-show");
}