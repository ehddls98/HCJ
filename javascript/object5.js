function printUser(user) { //매개변수를 객체로 받아오기

    console.log(`사용자이름: ${username}`);
    console.log(`비밀번호: ${password}`);
    console.log(`이름: ${name}`);
    console.log(`이메일: ${email}`);

}

function printUser2({ username, password, name, email }) { //매개변수를 비구조 할당으로 받아오기, const { username, password, name, email } = user;

    console.log(`사용자이름: ${username}`);
    console.log(`비밀번호: ${password}`);
    console.log(`이름: ${name}`);
    console.log(`이메일: ${email}`);

}

function main() {
    const user = {
            username: "admin",
            password: "1234",
            name: "김동인",
            email: "aaa@gmail.com"
    }
}

    printUser(user);
    printUser2(user);


main();