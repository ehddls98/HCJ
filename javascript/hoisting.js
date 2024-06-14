console.log(a);

var a;
a = 10; //변수 선언은 호이스팅 되지만 초기화는 호이스팅 되지 않는다.

var b = 10;
console.log(b);

var b = 20;
console.log(b);

let c = 30; //재선언 안됨
console.log(c);
c = 40;

const d = 50;
console.log(d);
//d = 60; 재할당 안됨
//console.log(d);

