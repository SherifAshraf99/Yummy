let sideNav = document.querySelector(".side-nav");
let openNav = document.querySelector(".fa-align-justify");
let closeNav = document.querySelector(".open-close-icon");
let loader = document.querySelector(".loading");
let foodsData = document.querySelector("#allFoods");

let search = document.querySelector("#Search");
let searchContainer = document.querySelector(".searchInputs");
let searchBarName = document.querySelector(`[placeholder="Search By Name"]`);
let searchFirstLetter = document.querySelector(`[placeholder="Search By First Litter"]`);

let categories = document.querySelector("#Categories");
let area = document.querySelector("#Area");
let ingredients = document.querySelector("#Ingredients");

let contact = document.querySelector("#Contact");
let contactText = document.querySelector(".contactForm")
let inputs = document.querySelectorAll(".contactForm input");
let submitBtn = document.querySelector("#submit")
let alerts = document.querySelectorAll(".alert-danger");



let currentNameFoods = ""
let currentFirstLetter = "a"



////////////////////////////// events //////////////////////////////

openNav.addEventListener("click",function(){
    openNavbar()
})

closeNav.addEventListener("click",function(){
    closeNavbar()
})

search.addEventListener("click",function(){
    searchContainer.classList.remove("d-none");
    contactText.classList.add("d-none")

    searchBarName.value = "";
    searchFirstLetter.value = "";
    foodsData.innerHTML = "";
    closeNavbar()
    
})
searchBarName.addEventListener("keyup", async function(){
    loader.classList.remove("d-none")
     currentNameFoods =  await searchBarName.value;
      await getApiSearchName(currentNameFoods);
     loader.classList.add("d-none")  
 })
    
searchFirstLetter.addEventListener("keyup", async function(){
        loader.classList.remove("d-none")
        currentFirstLetter =  await searchFirstLetter.value;
          await getApiFirstLetter(currentFirstLetter);
         loader.classList.add("d-none")
    
 })
categories.addEventListener("click",function(){
    contactText.classList.add("d-none")

    searchContainer.classList.add("d-none");
    getApiCategories();
    closeNavbar()
})

area.addEventListener("click",function(){
    contactText.classList.add("d-none")
    searchContainer.classList.add("d-none");
    getApiArea()
    closeNavbar();
})

ingredients.addEventListener("click",function(){
    contactText.classList.add("d-none")
    searchContainer.classList.add("d-none");
    getApiIngredients()
    closeNavbar();
})

contact.addEventListener("click",function(){
    closeNavbar()
    foodsData.innerHTML = "";
    contactText.classList.remove("d-none")
})


 for(i=0;i<inputs.length;i++){
    inputs[i].addEventListener("keyup",()=>{
        if(validationName() & validationEmail() & validationPhone() & validationAge() & validationPassword() & validationRePassword() === true){
        console.log("Done Valid");
        submitBtn.removeAttribute("disabled")
    }
    else {
        submitBtn.setAttribute("disabled",true)
    }
})
}

////////////////////////////// events //////////////////////////////

//////////////////////////// function //////////////////////////////
getApiSearchName(currentNameFoods)

function openNavbar(){
    closeNav.classList.remove("d-none")
    openNav.classList.add("d-none")
    sideNav.style.left = "0"
}
function closeNavbar(){
    closeNav.classList.add("d-none")
    openNav.classList.remove("d-none")
    sideNav.style.left = "-320px"
}

 async function getApiSearchName(currentFood){
    foodsData.innerHTML = ""
    loader.classList.remove("d-none")
    let api =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${currentFood}`)
    let  response =  await api.json()
    console.log(response.meals.slice(0,20));
    display(response.meals.slice(0,20))
    loader.classList.add("d-none")
}

async function getApiFirstLetter(letter){
    foodsData.innerHTML = ""
    loader.classList.remove("d-none")
    let api =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let  response =  await api.json()
    console.log(response.meals.slice(0,20));
    display(response.meals.slice(0,20))
    loader.classList.add("d-none")
}

function display(arr){
    let boxEat = "";
    for(i = 0; i < arr.length; i++){
        boxEat = boxEat + `
        <div class="col-md-3 food" onclick="getApiDetails (${arr[i].idMeal})">
        <div class="item position-relative">
            <img src= ${arr[i].strMealThumb} alt="" width="100%">
        <div class="layer d-flex align-items-center rounded-3">
            <h2 class="p-2">${arr[i].strMeal}</h2>
        </div>
        </div>
    </div>    
     `
    }
    foodsData.innerHTML = boxEat;
}

async function getApiDetails (id){
    foodsData.innerHTML = "";
    loader.classList.remove("d-none")
    let api =  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let respone = await api.json()
   let arraydetails  =  respone.meals[0];
   console.log(arraydetails);
    displayDetails(arraydetails )
    loader.classList.add("d-none")
}

function displayDetails(arr){
    searchContainer.classList.add("d-none");
    let detailsBox = `
     <div class="col-md-4">
     <img src="${arr.strMealThumb}" class="w-100 rounded-3" alt="details image" />
     <h1 class="mt-2">${arr.strMeal}</h1>
  </div>
  <div class="col-md-8">
     <div>
        <h2>Instructions</h2>
        <p>${arr.strInstructions}</p>
        <h3>Area: ${arr.strArea}</h3>
        <h3>Category: ${arr.strCategory}</h3>
        <h3>Tags:</h3>
        <a href="${arr.strSource}" class="btn btn-success m-2" target="_blank">Source</a>
        <a href="${arr.strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
     </div>
  </div>`
  foodsData.innerHTML = detailsBox
  }

async function getApiCategories(){
    foodsData.innerHTML = ""
loader.classList.remove("d-none")
let api =  await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
let response =  await api.json()
console.log(response.categories);
displayCategories(response.categories);
loader.classList.add("d-none")
}

function displayCategories(arr){
    let boxEat = "";
    for(i = 0; i < arr.length; i++){
        boxEat = boxEat + `
        <div class="col-md-3 food" onclick="getApiCategoriesMeals('${arr[i].strCategory}')">
        <div class="item position-relative">
            <img src= ${arr[i].strCategoryThumb} alt="" width="100%">
        <div class="layer rounded-3 text-center p-2">
            <h3>${arr[i].strCategory}</h3>
            <p>${arr[i].strCategoryDescription}</p>
        </div>
        </div>
    </div>    
     `
    }
foodsData.innerHTML = boxEat;
}

async function getApiCategoriesMeals(meal){
    foodsData.innerHTML = ""
    loader.classList.remove("d-none")
    let api =  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`)
    let response =  await api.json()
    console.log(response.meals.slice(0,20));
    displayCategoriesMeals(response.meals.slice(0,20))
    loader.classList.add("d-none")
}

function displayCategoriesMeals(arr){
    let boxEat = "";
    for(i = 0; i < arr.length; i++){
        boxEat = boxEat + `
        <div class="col-md-3 food" onclick="getApiDetails (${arr[i].idMeal})">
        <div class="item position-relative">
            <img src= ${arr[i].strMealThumb} alt="" width="100%">
        <div class="layer d-flex align-items-center rounded-3">
            <h2 class="p-2">${arr[i].strMeal}</h2>
        </div>
        </div>
    </div>    
     `
    }
    foodsData.innerHTML = boxEat;
}


async function getApiArea(){
    foodsData.innerHTML = ""
    loader.classList.remove("d-none")
    let api =  await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let response =  await api.json()
    console.log(response.meals.slice(0,20));
    displayArea(response.meals.slice(0,20))
    loader.classList.add("d-none")
    }


function displayArea(arr){
    let boxEat = "";
    for(i = 0; i < arr.length; i++){
        boxEat = boxEat + `
        <div class="col-md-3" onclick="getApiAreaCountries('${arr[i].strArea}')">
        <div class="item text-center">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${arr[i].strArea}</h3>
        </div>
    </div>    
     `
    }
foodsData.innerHTML = boxEat;
}

async function getApiAreaCountries(country){
    foodsData.innerHTML = ""
    loader.classList.remove("d-none")
    let api =  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    let response =  await api.json()
    console.log(response.meals.slice(0,20));
    displayAreaCountries(response.meals.slice(0,20))
    loader.classList.add("d-none")
}

function displayAreaCountries(arr){
    let boxEat = "";
    for(i = 0; i < arr.length; i++){
        boxEat = boxEat + `
        <div class="col-md-3 food" onclick="getApiDetails (${arr[i].idMeal})">
        <div class="item position-relative">
            <img src= ${arr[i].strMealThumb} alt="" width="100%">
        <div class="layer d-flex align-items-center rounded-3">
            <h2 class="p-2">${arr[i].strMeal}</h2>
        </div>
        </div>
    </div>    
     `
    }
    foodsData.innerHTML = boxEat;
}


async function getApiIngredients(){
    foodsData.innerHTML = ""
    loader.classList.remove("d-none")
    let api =  await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    let response =  await api.json()
    console.log(response.meals);
    console.log(response.meals.slice(0,20));
    displayIngredients(response.meals.slice(0,20))
    loader.classList.add("d-none")
    }

    function displayIngredients(arr){
        let boxEat = "";
        for(i = 0; i < arr.length; i++){
            boxEat = boxEat + `
            <div class="col-md-3">
            <div class="item text-center" onclick="getApiIngredientsFoods('${arr[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription.split(" ").slice(0,25).join(" ")}</p>
            </div>
        </div>    
         `
        }
    foodsData.innerHTML = boxEat;
    }

    async function getApiIngredientsFoods(food){
        foodsData.innerHTML = ""
        loader.classList.remove("d-none")
        let api =  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${food}`)
        let response =  await api.json()
        console.log(response.meals.slice(0,20));
        displayIngredientsFoods(response.meals.slice(0,20))
        loader.classList.add("d-none")
    }
    
    function displayIngredientsFoods(arr){
        let boxEat = "";
        for(i = 0; i < arr.length; i++){
            boxEat = boxEat + `
            <div class="col-md-3 food" onclick="getApiDetails (${arr[i].idMeal})">
            <div class="item position-relative">
                <img src= ${arr[i].strMealThumb} alt="" width="100%">
            <div class="layer d-flex align-items-center rounded-3">
                <h2 class="p-2">${arr[i].strMeal}</h2>
            </div>
            </div>
        </div>    
         `
        }
        foodsData.innerHTML = boxEat;
    }

//////////////////////////// Validation ////////////////////////////
function validationName(){  
    const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
    if(regexStyle.test(inputs[0].value) == true){
      alerts[0].classList.add("d-none")
       return true
    }
    else{
        alerts[0].classList.remove("d-none")
        return false
    }
   }

   function validationEmail(){
    const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if(regexStyle.test(inputs[1].value) == true){
        alerts[1].classList.add("d-none")
         return true
      }
      else{
          alerts[1].classList.remove("d-none")
          return false
      }
  }

function  validationPhone(){
    const regexStyle =  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if(regexStyle.test(inputs[2].value) == true){
        alerts[2].classList.add("d-none")
         return true
      }
      else{
          alerts[2].classList.remove("d-none")
          return false
      }
}
   
  function validationAge(){
    const regexStyle = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    if(regexStyle.test(inputs[3].value) == true){
        alerts[3].classList.add("d-none")
         return true
      }
      else{
          alerts[3].classList.remove("d-none")
          return false
      }
}
   

  function validationPassword(){
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(regexStyle.test(inputs[4].value) == true){
        alerts[4].classList.add("d-none")
         return true
      }
      else{
          alerts[4].classList.remove("d-none")
          return false
      }
}

function validationRePassword(){
    if((inputs[4].value) == (inputs[5].value)){
        alerts[5].classList.add("d-none")
         return true
      }
      else{
          alerts[5].classList.remove("d-none")
          return false
      }
}


