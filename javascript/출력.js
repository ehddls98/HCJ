var num = 10;
var sNum = "10"
console.log(num === sNum);
var num2;
console.log(!!num2); 
/*
    !(not) 연산자를 활용하여 문자, 숫자 등의 자료를 논리데이터로 변환하는 법
    var num = 10;
    !!num -> ture
    num = 0;
    !!num -> false

    var str = "test";
    !!str -> true
    str = ""
    !!str -> false

    var array = [1, 2, 3 ];
    !!array -> true

    array = [];
    !!array -> true
    !!array.length -> false
    array.length > 0 -> true
    array.length === 0 -> false 
*/

var num = 0;
console.log(!!num);
var str = ""; //공백이 있어도 false다
console.log(!!str);
var array = [];
console.log(!!array); //배열은 객체이기 때문에 비어있어도 true
console.log(!!array.length);
var a;
console.log(!!a); //undefined는 false
var b  = null;
console.log(!!b); //null은 false
var c = 0/0; //NaN -> 계산 불가
console.log(!!c); 


if(!num) {
    var num2 = 20;
    console.log("num은 0입니다.")
    if(!!num2) {
        console.log("num2는 값이 있습니다.")
    }
}

if(!str) {
    console.log("빈 문자열입니다.")
}

if(!b) {
    console.log("Null입니다.")
}