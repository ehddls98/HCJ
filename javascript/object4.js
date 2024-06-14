//(*중요)비구조 할당, 구조 분해
function main() {
    const user = {
        username: "admin",
        password: "1234",
        name: "김동인",
        email: "aaa@gmail.com"
    }

    const names = [ "박현주", "이성희", "권오강", "권혁진" ];

    const { username, password, email } = user;
    console.log(username); 
    console.log(password); 
    console.log(email); 

    const [ a, b ] = names; //a에 0번 인덱스, b에 1번 인덱스
    console.log(a);
    console.log(b);

    //rest
    const { name, ...rest } = user; //name을 제외한 나머지 값들만 가져와서 새로운 객체를 생성
    console.log(rest);

    console.log(names.slice(1, 3)); //1에서 3번 인덱스 전까지 가져오기
}

main();