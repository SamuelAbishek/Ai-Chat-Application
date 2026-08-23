async function sum(){
	console.log("A");
	await Promise.resolve();
	//await res=();
	return "sam";
}

console.log("1");
const name = sum();

console.log(name);
console.log(2);
name.then((val)=>{
	console.log(val)
});
console.log(name);