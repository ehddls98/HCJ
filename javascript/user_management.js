const names = [ "김동인", "김서인", "김남인"];
console.log(names.join("!")); //join메서드 예시 

let userList = [];

let emptyUser = {
    username: "",
    password: ""
};

let user = {
    ...emptyUser
}

function renderTable() {
    const userTableBody = document.querySelector(".user-table-body");
    userTableBody.innerHTML = userList.map(({username, password}, index) => { //innerHTML은 ``안의 값을 태그로 인식
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${username}</td>
                <td>${password}</td>
            </tr>
        `;
    }).join(""); //join 메서드는 디폴트로 배열 사이에 ","를 넣어주는데 이것을 없애줬다. 
}

function handleUserInputKeyDown(e) {
    user = { //
        ...user,
        [e.target.name]: e.target.value //keydown이 일어날때마다 user의 value에 입력값 추가
    }

    console.log(user);

    if(e.keyCode === 13) {
        const passwordInput = document.querySelector(".password-input");
        const usernameInput = document.querySelector(".username-input");

        if(e.target.name === "username") {
            passwordInput.focus();
        }
        if(e.target.name === "password") {
            userList = [ ...userList, { ...user } ]; //새로 생성되는 user를 userList에 추가, 
            //{...user} -> 깊은 복사를 통해 새로운 객체로 복사를 해서 각 객체의 주소값이 겹치지 않도록 하기 위해 사용

            renderTable();

            usernameInput.value = emptyUser.username;
            passwordInput.value = emptyUser.password;

            usernameInput.focus();
        }
    }
    console.log(e.target.name);
}