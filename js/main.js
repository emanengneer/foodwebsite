let closeNav=document.getElementById('close-nav')
let openNav=document.getElementById('open-nav')
let navTap=document.getElementById('nav-tap')
let sideNav=document.getElementById('side-nav')
let searchinput=document.getElementById('searchinput')
let rowData=document.getElementById('rowData')
let submitBtn;
openNav?.addEventListener('click',function(){
    sideNav.style.transform='translateX(0)'
   
    openNav.classList.replace('d-block','d-none')
    closeNav.classList.replace('d-none','d-block')
 })

function closeNavbar(){
    sideNav.style.transform='translateX(-80%)'
   
    closeNav.classList.replace('d-block','d-none')
    openNav.classList.replace('d-none','d-block')
}

closeNav?.addEventListener('click',function(){

    closeNavbar()
})
 
$(document).ready(()=>{
    searchByName('').then(()=>{
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow","visible")
    })
  
})


 searchByName("")
 
 async  function  searchByName () {
    $(".loading-screen").fadeIn(500)
    let respons=await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=`)
   let data=await respons.json()

//    console.log(data);
// let mealName=meal[0].meals.splice(0) 
//    console.log(mealName );
   displaymeals(data.meals) 
   $(".loading-screen").fadeOut(500)
 }

 function displaymeals(arr){
    searchinput.innerHTML=""
    let cartona=``
    for(let i=0; i<arr.length ;i++){
        cartona +=`
        <div class="col-sm-6 col-md-5 col-lg-3 cursor-pointer" onclick="getDetailsId(${arr[i].idMeal})">
        <div  class="image position-relative rounded" >
            <img src="${arr[i].strMealThumb}"  class="w-100">
            <div class="layer rounded bg-opacity-50 d-flex justify-content-center align-items-center bg-white ">
                <h2>${arr[i].strMeal}</h2>
            </div>
        </div>
    </div>
        `
    }
    document.getElementById('rowData').innerHTML=cartona
   
 }
//  function search(id){
//     location.href=`detils.html?=${id}`
//  }
/*=================Details================= */
 async function getDetailsId(mealid){
    $(".loading-screen").fadeIn(500)
  
    let respons=await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
     respons= await respons.json()
    // console.log(respons.meals[0]);
    displaymealDetails(respons.meals[0])
    $(".loading-screen").fadeOut(500)
}

function displaymealDetails(meal){
    searchinput.innerHTML=""
   let  cartona =`
    <div class="col-md-4 cursor-pointer">
    <figcaption>
        <img src="${meal.strMealThumb}" class="w-100 rounded" alt="photo">
        <h2 class="text-white my-3">${meal.strCategory}</h2>
    </figcaption>
</div>
<div class="col-md-8 cursor-pointer">
    <figcaption class="text-white">
        <h2>Instructions</h2>
        <p class="small">${meal.strInstructions}</p>
        <h4> Area : ${meal.strArea}  </h4>
        <h4>Side : ${meal.strMeal} </h4>
        <h4>Recipes :</h4>

        <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-info m-2 p-1">${meal.strIngredient1}</li>
            <li class="alert alert-info m-2 p-1">${meal.strIngredient2}</li>
            <li class="alert alert-info m-2 p-1">${meal.strIngredient3}</li>
            <li class="alert alert-info m-2 p-1">${meal.strIngredient4}</li>
            <li class="alert alert-info m-2 p-1">${meal.strIngredient5}</li>
            <li class="alert alert-info m-2 p-1">${meal.strIngredient6}</li>
            <li class="alert alert-info m-2 p-1">${meal.strIngredient7}</li>
            <li class="alert alert-info m-2 p-1">${meal.strIngredient8}</li>
            <li class="alert alert-info m-2 p-1">${meal.strIngredient9}</li>
          
        </ul>
         <h3>Tags :</h3>
        
           <ul class="d-flex list-unstyled g-3  flex-wrap small">
            <li class="alert alert-danger m-2 p-2 ">soup</li>
           </ul>
     <a href="${meal.strTags}" target="_blank"  class="btn btn-success">source</a>
     <a href="${meal.strYoutube}" target="_blank" class=" btn btn-danger">youtube</a>

    </figcaption>
</div>
    `;

    document.getElementById("rowData").innerHTML = cartona;
   
}

/*==========>ENS DETAILS=============> */


/*===========start Categories ================= */
let categories=[]
async function getCategoriesAPI(){
    closeNavbar()
    $(".loading-screen").fadeIn(500)
    let reponse=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data=await reponse.json()
    // console.log(data);
    categories=data.categories
    displayCategories(categories)
    $(".loading-screen").fadeOut(500)
}


function displayCategories(arr){
    searchinput.innerHTML=""
    let cartona=``
    for(let i = 0; i < arr.length ; i++){
        cartona +=`
        <div class="col-sm-6 col-md-5 col-lg-3" onclick="getCategoriesmeals('${arr[i].strCategory}')">
        <div  class="image position-relative rounded cursor-pointer" >
            <img src="${arr[i].strCategoryThumb}"class="w-100">
            <div class="layer rounded bg-opacity-50 text-center bg-white d-flex align-items-center justify-content-center">
              <div>
              <h4>${arr[i].strCategory}</h4>
              <P>${arr[i].strCategoryDescription.split(' ').splice(0,10).join(' ')}</P>
              </div>
            </div>
        </div>
    </div>
        `
    }
    document.getElementById('rowData').innerHTML=cartona
   
 }

async function getAreaApi(){
    closeNavbar()

    $(".loading-screen").fadeIn(500)
    let reponse=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data=await reponse.json()
    console.log(data);
    Area=data.meals
    displayArea(Area)
    $(".loading-screen").fadeOut(500)
 }

 function displayArea(arr){

    searchinput.innerHTML=""
    let cartona=``
    for(let i = 0; i < arr.length ; i++){
        cartona +=`
        <div class="col-sm-6 col-md-5 col-lg-3" onclick="getAreameals('${arr[i].strArea}')">
       
          
            <div class=" rounded text-center text-white shadow cursor-pointer">
             
              <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h4 class="text-white text-opacity-50 py-4">${arr[i].strArea}</h4>
             
            </div>
        
    </div>
        `
    }
    document.getElementById('rowData').innerHTML=cartona
   
 }

 async function getIngredintsApi(){
    $(".loading-screen").fadeIn(500)
    let reponse=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data=await reponse.json()
    console.log(data.meals);
   
    displayingredint(data.meals.slice(0,20))
    $(".loading-screen").fadeOut(500)
 }
 function displayingredint(arr){
    searchinput.innerHTML=""
    let cartona=``
    for(let i = 0; i < arr.length ; i++){
        cartona +=`
        <div class="col-sm-6 col-md-5 col-lg-3" onclick="getIngredintsmeals('${arr[i].strIngredient}')">
       
          
            <div class=" rounded text-center text-white shadow cursor-pointer">
             
              <i class="fa-solid fa-bowl-food fa-3x text-danger"></i>
              <h5 class="text-opacity-50 py-2">${arr[i].strIngredient}</h5>
               <p>${arr[i].strDescription.split(' ').slice(0,20).join(' ')}</p>
            </div>
        
    </div>
        `
    }
    document.getElementById('rowData').innerHTML=cartona
   
 }

 async function getCategoriesmeals(category){
    $(".loading-screen").fadeIn(500)
    let reponse=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let data=await reponse.json()
    console.log(data);
   displaymeals(data.meals)
   $(".loading-screen").fadeOut(500)
}
function getcategorymeals(arr){
    let cartona=``
    for(let i = 0; i < arr.length ; i++){
        cartona +=`
        <div class="col-sm-6 col-md-5 col-lg-3" onclick="getIngredintsmeals(${arr[i].strIngredient})">
       
          
            <div class=" rounded text-center text-white shadow cursor-pointer">
             
              <i class="fa-solid fa-bowl-food fa-3x text-danger"></i>
              <h5 class="text-opacity-50 py-2">${arr[i].strIngredient}</h5>
               <p>${arr[i].strDescription.split(' ').slice(0,20).join(' ')}</p>
            </div>
        
    </div>
        `
    }
    document.getElementById('rowData').innerHTML=cartona
   
}
async function getAreameals(area){
    $(".loading-screen").fadeIn(500)
    let reponse=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data=await reponse.json()
    console.log(data.meals);
   displaymeals(data.meals)
   $(".loading-screen").fadeOut(500)
}


async function getIngredintsmeals(ingredint){
    $(".loading-screen").fadeIn(500)
    let reponse=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredint}`)
    let data=await reponse.json()
    console.log(data);
    displaymeals(data.meals)
    $(".loading-screen").fadeOut(500)
}

function  showSearchinpts(){
    $(".loading-screen").fadeIn(500)
    searchinput.innerHTML=`
    <div class="row  g-3">
        <div class="col-md-6">
            <input onkeyup="SearchByName(this.value)" type="text" class="form-control bg-transparent text-white " placeholder="Search by Name">
        </div> 
         <div class="col-md-6">
            <input onkeyup="SearchlistName(this.value)" type="text" length="1" class="form-control bg-transparent text-white " placeholder="Searc by last Name">
        </div>
    </div>
`
rowData.innerHTML=""
$(".loading-screen").fadeOut(500)
}

 
async  function  SearchByName (term) {
    $(".loading-screen").fadeIn(500)
    let respons=await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${term}`)
   let data=await respons.json()

//    console.log(data);
// let mealName=meal[0].meals.splice(0) 
//    console.log(mealName );
displaymeals(data.meals)
console.log(data.meals);
$(".loading-screen").fadeOut(500)

 }

 async  function  SearchlistName(term) {
    $(".loading-screen").fadeIn(500)

    term=="" ? term=="a":""
    let respons=await fetch(`https://themealdb.com/api/json/v1/1/search.php?f=${term}`)
   let data=await respons.json()

//    console.log(data);
// let mealName=meal[0].meals.splice(0) 
//    console.log(mealName );
displaymeals(data.meals)
console.log(data.meals);
$(".loading-screen").fadeOut(500)

 }


 function ContactUs() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput"  onkeyup="inputsValidation()" type="text" class="form-control bg-transparent" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control bg-transparent" placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control bg-transparent " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control bg-transparent" placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control bg-transparent" placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control bg-transparent" placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-info px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

 let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




 function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}


  
  
 
