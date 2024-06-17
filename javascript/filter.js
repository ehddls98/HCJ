let names = ["김준일", "김준이", "김준삼"];

console.log(names);

names = names.map((name, index) => {return name + "님"}); //map 메서드를 통해 names 배열의 각 요소에 "님"을 붙여준다.
// ["김준일님", "김준이님", "김준삼님"];
console.log(names);

names = names.filter((name, index) =>  index !== 1); 
console.log(names);