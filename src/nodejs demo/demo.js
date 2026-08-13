async function ops(){
    return new Promise((resolve)=>{
        setTimeout(()=>resolve(10),3000)
    })
}

console.log("Entering ops");

let a = await ops();
console.log(`a: ${a}`)
console.log("end")