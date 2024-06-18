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
                <th><input type="checkbox" onchange="handleUserCheck(event)" value="${id}"></th>
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
            if(inputMode === 1) {
                const newUser =  {
                    ...user,
                    id: getNewId()
                }
                userList = [ ...userList, newUser ]; 
            }

            if(inputMode === 2) {
                let findIndex = -1;
                for(let i = 0; i< userList.length; i++) {
                    if(userList[i].id === user.id) {
                        findIndex = i;
                        break;
                    }
                }
                if(findIndex === -1) {
                    alert("사용자 정보 수정 중 오류 발생. 관리자에게 문의하세요.");
                    return;
                }
                userList[findIndex] = user;
            }        
            
            saveUserList();
            renderTable(); 
            clearInputValue(); 
            
            
            nameInput.focus(); //name 입력란으로 focus가 가게 한다.    
        }
    }
}

function saveUserList() {
    localStorage.setItem("userList", JSON.stringify(userList)); 
    //userList를 JSON 문자열로 변환하여 localStorage에 저장
}

function loadUserList() {
    const lsUserList = localStorage.getItem("userList");
    userList = !lsUserList ? [] : JSON.parse(lsUserList);
    renderTable();
}

function deleteUser(e) {
    userList = userList.filter(({id}) => id !== parseInt(e.target.value)); 
    //userlist에서 id값이 삭제를 누른 객체의 id와 같지 않은 요소들만 필터링하여 새로운 배열에 저장
    saveUserList();
    renderTable();
}

function getNewId() {
    const userIds = userList.map(user => user.id); //userList에서 user들의 id값들만 추출하여 userIds 변수에 저장
    const maxUserId = userIds.length === 0 ? 20240000 : Math.max.apply(null, userIds); 
    //userIds의 길이가 0이라면 20240000을 maxUserId에 저장하고, 그렇지 않다면 userIds의 최대값을 maxUserId에 저장
    return maxUserId + 1;
    //maxUserId에 1을 더한 값을 반환
}

function handleUserCheck(e) {
    const checkBoxList = document.querySelectorAll("input[type='checkbox']"); 
    //html 문서에서 checkbox 타입의 input 태그를 찾아서 checkBoxList 변수에 대입
        for(let checkBox of checkBoxList) { //checkBoxList의 길이만큼 반복
            if(checkBox === e.target) { //현재 체크한 checkBox가 checkBoxList의 i번째 요소와 같다면
                continue; //다음 요소로 넘어간다.
            }
            checkBox.checked = false; //현재 체크한 요소가 checkBoxList의 i번째 요소와 다르다면 체크를 해제한다.
        }

        if(e.target.checked) { 
            inputMode = 2; //수정 모드로 전환
            const [ findUser ] = userList.filter(user => user.id === parseInt(e.target.value));
            setInputValue(findUser);
            user = {
                ...findUser
            }
            return;
    }

    clearInputValue();  
}
function setInputValue(user) {
    const nameInput = document.querySelector(".name-input"); 
    const usernameInput = document.querySelector(".username-input"); 
    const passwordInput = document.querySelector(".password-input"); 
    nameInput.value = user.name; //입력란에 findUser의 name값을 대입
    nameInput.value = user.name; //입력란에 findUser의 name값을 대입
    usernameInput.value = user.username; //입력란에 findUser의 username값을 대입
    passwordInput.value = user.password; //입력란에 findUser의 password값을 대입
}

function clearInputValue() {
    const nameInput = document.querySelector(".name-input"); 
    const usernameInput = document.querySelector(".username-input"); 
    const passwordInput = document.querySelector(".password-input"); 
    nameInput.value = emptyUser.name; //name 입력란을 비운다
    usernameInput.value = emptyUser.username; //username 입력란을 비운다
    passwordInput.value = emptyUser.password; //password 입력란을 비운다

    inputMode = 1; //추가 모드로 전환
    user = {
        ...emptyUser
    }
}


