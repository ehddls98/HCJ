function modifyUser(user, target, value) {
    const newUser = {
        ...user, //스프레드: 객체 안의 값(키, 밸류)을 복사해 온다. 
        //username: "admin"
        //password: "1234"
        [target]: value // [username] : test-user []안의 값을 키로 받는다, []를 치지 않으면 target이라는 키값이 추가되는 문법이다.
    };
    return newUser;
}

function main() {
    let user = {
        username: "admin",
        password: "1234"
    }

    //delete user.password; -> delete는 .을 통한 주소 참조를 통해서 해야한다. 

    console.log(user);

    const newUser = modifyUser(user, "username", "test-user");
    console.log(newUser);

    const newUser2 = modifyUser(newUser, "password", "1111");
    console.log(newUser2);

    const userList = [ user, newUser ];
    const newUserList = [ ...userList, newUser2 ] //배열 안의 요소들만 복사해 오는 것임, 객체를 복사하는 것이 아니기 때문에 메모리 주소는 다름

    //스프레드 -> 깊은 복사

    const userList2 = userList; //얕은 복사

    const [a, b, c ] = newUserList;

    const { username, password } = newUserList[0];
}

main();