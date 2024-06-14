const user = {
    username: "admin",
    password: "1234",
    name: {
        lastName: "김",
        firstName: "동인"
    },
    print: () => {
        console.log("사용자 이름: " + user.username);
        console.log(`비밀번호: ${user.password}`); //표현식 ${변수명}
    },
};

console.log(user);
console.log(user.username);
console.log(user.password);
console.log(user.name.firstName);
console.log(user.name.lastName);
user.print();