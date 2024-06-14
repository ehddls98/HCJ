function add(x, y) {
    return x + y;
}

const result = add(10, 20); //재정의된 add 함수가 호출되서 console에 10 20 undefined가 출력 됨
console.log(result); //undefined -> 파라미터로 z값을 받지 못했기 때문에 result는 undefined

function add(x, y, z) { //js는 오버로딩이 되지 않아 add 함수가 여기서 재정의 됨
    console.log(x);
    console.log(y);
    console.log(z);
}

//console.log(x);

add(10, 20, 30); //10 20 30이 출력됨

//var x = 50;