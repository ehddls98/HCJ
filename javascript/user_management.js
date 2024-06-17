//inputMode = 1 > 추가
//inputMode = 2 > 수정
let inputMode = 1;

let userList = []; //userList라는 빈 배열 생성
loadUserList();

let emptyUser = { //빈 값 username, password를 가진 emptyuser 객체 정의
    id: 0,
    name: "",
    username: "",
    password: ""
};

let user = { //emptyUser 객체를 스프레드로 복사해와서 user라는 객체 생성
    ...emptyUser
}

function renderTable() {
    const userTableBody = document.querySelector(".user-table-body"); //html 문서에서 user-table-body 클래스를 찾아서 userTableBody 변수에 대입
    userTableBody.innerHTML = userList.map(({id, name, username, password}, index) => { //innerHTML은 ``안의 값을 태그로 인식
        return `
            <tr>
                <th><input type="checkbox" onchange="handleUserCheck(event)"></th>
                <td>${index + 1}</td>
                <td>${id}</td>
                <td>${name}</td>
                <td>${username}</td>
                <td>${password}</td>
                <th><button onclick="deleteUser(event)" value="${id}">삭제</button></th>
            </tr>
        `;
    }).join(""); //join 메서드는 map 메서드로 반환된 배열을 문자열로 변환해준다.
}

function handleUserInputKeyDown(e) {
    user = {
        ...user, // -> 스프레드를 통해 emptyUser 객체를 깊은 복사하여 username: "", password: "" 값들만 복사해온다.
        [e.target.name]: e.target.value 
        // [e.target.name] -> username 또는 password 중 focus가 가있는 쪽으로 key가 대입된다. 
        // e.target.value -> keydown이 일어날때마다 key로 잡혀있는 쪽에 value가 추가된다. 
    }

    //user[e.target.name] = e.target.value; //user의 주소가 바뀌지 않는다. user 객체의 key값이 바뀌는 것이다.
        
    if(e.keyCode === 13) { //keyCode 13 = 엔터키
        const nameInput = document.querySelector(".name-input"); //html 문서에서 name-input 클래스를 찾는다 nameInput 변수에 대입
        const usernameInput = document.querySelector(".username-input"); //html 문서에서 username-input 클래스를 찾아서 usernameInput 변수에 대입
        const passwordInput = document.querySelector(".password-input"); //html 문서에서 password-input 클래스를 찾는다 passwordInput 변수에 대입
        
        if(e.target.name === "name") { //엔터키를 입력했을 때 username 입력란에 focus가 있다면
            usernameInput.focus();  //password 입력란으로 focus를 옮긴다.
        }
        if(e.target.name === "username") { //엔터키를 입력했을 때 username 입력란에 focus가 있다면
            passwordInput.focus();  //password 입력란으로 focus를 옮긴다.
        }
        if(e.target.name === "password") { //엔터키를 입력했을 때 password 입력란에 focus가 있다면 
            userList = [ ...userList, { ...user, id: getNewId() } ]; 
            //userList = [ ...userList, user ]; 
            //-> 31번 줄처럼 어차피 기존 user 객체가 아닌 새로운 객체를 생성하여 값을 대입하는 경우 이렇게 작성해야 한다.
            //[...userList] -> 기존의 userList를 스프레드로 복사해 오고
            //{...user} -> 깊은 복사를 통해 새로운 객체로 복사를 해서 각 객체의 주소값이 겹치지 않도록 하기 위해 사용
            
            saveUserList();
            renderTable(); 
            
            nameInput.value = emptyUser.name; //name 입력란을 비운다
            usernameInput.value = emptyUser.username; //username 입력란을 비운다
            passwordInput.value = emptyUser.password; //password 입력란을 비운다
            
            nameInput.focus(); //name 입력란으로 focus가 가게 한다.            
        }
    }
}

function saveUserList() {
    localStorage.setItem("userList", JSON.stringify(userList));
}

function loadUserList() {
    const lsUserList = localStorage.getItem("userList");
    userList = !lsUserList ? [] : JSON.parse(lsUserList);
    renderTable();
}

function deleteUser(e) {
    userList = userList.filter(({id}) => id !== parseInt(e.target.value));
    saveUserList();
    renderTable();
}

function getNewId() {
    const userIds = userList.map(user => user.id);
    const maxUserId = userIds.length === 0 ? 20240000 : Math.max.apply(null, userIds);
    return maxUserId + 1;
}

function handleUserCheck(e) {
    
}