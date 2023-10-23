//* HTML Collection Varibales
let prodTitle = document.querySelector("#prodTitle")
let prodPrice = document.querySelector("#prodPrice")
let prodTaxes = document.querySelector("#prodTaxes")
let prodDiscount = document.querySelector("#prodDiscount")
let totalInner = document.querySelector("#total")
let prodCategory = document.querySelector("#category");
let addProduct = document.querySelector("#addProduct")
let count = document.querySelector("#count")
let updateProduct = document.querySelector("#updateProduct")
let deleteAll = document.querySelector("#deleteAll")
let totalProd = document.getElementById("totalProd");
let search = document.getElementById("search")
let currUpdate = 0;
let moodSearch = "title";


let prodArr = [];


if (localStorage.getItem("products") !== null) {
    prodArr = JSON.parse(localStorage.getItem("products"))
    displayData()
} else {
    prodArr = []
}






//* Calc Total
document.querySelectorAll(".crud-input .row input").forEach((e) => {
    e.addEventListener("keyup", _ => {
        calcTotal()
    })
})
function calcTotal() {
    let result = 0;
    if (prodPrice.value != "") {
        result = prodPrice.value - (prodTaxes.value || 0) - prodDiscount.value
    }
    totalInner.innerHTML = result;
    if (result > 0) {
        totalInner.style.color = "#B55400";
    } else if (result < 0) {
        totalInner.style.color = "#d70909c7";
    }
}



//* Create Product

function createProd() {
    let product = {
        title: prodTitle.value.toLowerCase(),
        price: prodPrice.value,
        taxes: prodTaxes.value,
        discount: prodDiscount.value,
        total: totalInner.innerHTML,
        category: prodCategory.value.toLowerCase()
    }
    if(count.value > 1 && count.value < 100){
        for(let i = 0; i < count.value; i++ ){
        
        prodArr.push(product)
        localStorage.setItem("products", JSON.stringify(prodArr))

    }}else{
        prodArr.push(product)
        localStorage.setItem("products", JSON.stringify(prodArr))
    }

    displayData()
    resetData()
    deleteAllProduct()
}
//^ Show Data
function displayData() {
    let container = ``
    for (let i = 0; i < prodArr.length; i++) {
        container += `
        <tr>
        <td>${i+1}</td>
        <td>${prodArr[i].title}</td>
        <td>${prodArr[i].price}</td>
        <td>${prodArr[i].taxes || 0}</td>
        <td>${prodArr[i].discount || 0}</td>
        <td>${prodArr[i].total}</td>
        <td>${prodArr[i].category}</td>
        <td><button onclick="getDataInfo(${i})" class="btn fs-5"> <i class="fa-regular fa-pen-to-square"></i>    </button></td>
        <td><button onclick="deleteProd(${i})" class="btn fs-5"> <i class="fa-solid fa-trash"></i>  </button></td>
    </tr>
        `
    }
    document.getElementById("tbody").innerHTML = container
}

//^ Delete Product 
function deleteProd(index) {
    prodArr.splice(index, 1)
    localStorage.setItem("products", JSON.stringify(prodArr))
    displayData()
    deleteAllProduct()
}
//^ Reset Data Input 
function  resetData(){
    prodTitle.value = ""
   prodPrice.value = ""
     prodTaxes.value = ""
     prodDiscount.value = ""
     prodCategory.value = ""
     count.value = ""

}
//^ Update Data
function getDataInfo(index){
    prodTitle.value = prodArr[index].title
    prodPrice.value = prodArr[index].price
    prodTaxes.value = prodArr[index].taxes
    prodDiscount.value = prodArr[index].discount
    prodCategory.value = prodArr[index].category
    calcTotal()
    scroll({
        top:0
    })
    currUpdate = index;
    

    addProduct.classList.add("d-none")
    updateProduct.classList.replace("d-none","d-block")
 

}
function update(){
    prodArr[currUpdate].title =  prodTitle.value
    prodArr[currUpdate].price= prodPrice.value 
     prodArr[currUpdate].taxes= prodTaxes.value
    prodArr[currUpdate].discount=  prodDiscount.value
   prodArr[currUpdate].category = prodCategory.value 
   prodArr[currUpdate].total = totalInner.innerHTML 

  
    localStorage.setItem("products", JSON.stringify(prodArr))
resetData()
}
//^ Delete All Product (Button)
 function deleteAllProduct(){
    if(prodArr.length > 0){
        totalProd.innerHTML = prodArr.length
        deleteAll.classList.replace("d-none","d-block")
    }else{
        deleteAll.classList.add("d-none")
    
    }
    
}
deleteAllProduct()


//^ Seach 
function inpSearch (val){
    let container = ``
    for(let i = 0 ; i < prodArr.length;i++){

        if(moodSearch === "title"){
            if(prodArr[i].title.includes(val.toLowerCase())){
                container += `
                <tr>
                <td>${i+1}</td>
                <td>${prodArr[i].title}</td>
                <td>${prodArr[i].price}</td>
                <td>${prodArr[i].taxes || 0}</td>
                <td>${prodArr[i].discount || 0}</td>
                <td>${prodArr[i].total}</td>
                <td>${prodArr[i].category}</td>
                <td><button onclick="getDataInfo(${i})" class="btn fs-5"> <i class="fa-regular fa-pen-to-square"></i>    </button></td>
                <td><button onclick="deleteProd(${i})" class="btn fs-5"> <i class="fa-solid fa-trash"></i>  </button></td>
            </tr>
                `
        document.getElementById("tbody").innerHTML = container 
            }
        }
        if(moodSearch === "category"){

            if( prodArr[i].category.includes(val)){
                container += `
                <tr>
                <td>${i+1}</td>
                <td>${prodArr[i].title}</td>
                <td>${prodArr[i].price}</td>
                <td>${prodArr[i].taxes || 0}</td>
                <td>${prodArr[i].discount || 0}</td>
                <td>${prodArr[i].total}</td>
                <td>${prodArr[i].category}</td>
                <td><button onclick="getDataInfo(${i})" class="btn fs-5"> <i class="fa-regular fa-pen-to-square"></i>    </button></td>
                <td><button onclick="deleteProd(${i})" class="btn fs-5"> <i class="fa-solid fa-trash"></i>  </button></td>
            </tr>
                `
        document.getElementById("tbody").innerHTML = container
            }
        }
     
    }
}











//* Event
addProduct.addEventListener("click", _ => {
    createProd()
})
updateProduct.addEventListener("click", _ => {
   update()
   
   displayData()
   addProduct.classList.remove("d-none")
   updateProduct.classList.replace("d-block","d-none")
})
deleteAll.addEventListener("click",_=>{
    prodArr.splice(0)
    localStorage.setItem("products", JSON.stringify(prodArr))
    displayData()
    totalProd.innerHTML = 0
  resetData()
})
search.onkeyup = function(){
    inpSearch(this.value)
}


document.querySelectorAll(".searchOption button").forEach((e)=>{
e.addEventListener("click",function(ev){
    moodSearch = ev.target.value;
       search.placeholder = `Search by ${moodSearch}`
})
})