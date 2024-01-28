
let allData = document.getElementById("allData");
let searchContent = document.getElementById("search");
let innerWidthSpace = $(".inner-side").innerWidth();
let submitBtn;

$(document).ready(() => {
    $("#loading").addClass("d-none")
    searchByName("")
})
function sideClosed(){
    $("#sideBar").animate({left : -innerWidthSpace})
    $(".x-icon").addClass("d-none")
    $(".bar-icon").removeClass("d-none");
}

$("#sideBar").animate({left : -innerWidthSpace})
$(".link-item").animate({top:"220px"})

$("#closeBtn").click(function(){
    if($("#sideBar").css("left")=="0px"){
        $("#sideBar").animate({left : -innerWidthSpace},500)
        $(".x-icon").addClass("d-none")
        $(".bar-icon").removeClass("d-none");
        $(".link-item").animate({top:"220px"},400)
    }
    else{
        $("#sideBar").animate({left : "0px"},500)
        $(".x-icon").removeClass("d-none")
        $(".bar-icon").addClass("d-none")
        $(".link-item").animate({top:"0px"},700)
        
    }
})

function displayAllMeals(data){
    let mealBox=``;
    for(let i=0;i<data.length;i++){
        mealBox+=`
        <div class="col-lg-3 col-md-4">
                    <div onclick="getDetails('${data[i].idMeal}')" class="my-card position-relative d-flex justify-content-start align-items-center overflow-hidden">
                        <img src="${data[i].strMealThumb}" class="w-100 rounded-2" alt="">
                        <div class="card-layer d-flex justify-content-start align-items-center rounded-2">
                            <h2 class="meal-name text-capitalize">${data[i].strMeal}</h2>
                        </div>
                    </div>
            </div>
        `
    }
    allData.innerHTML=mealBox;
}


async function getCategories(){
    allData.innerHTML="";
    $(".inner-loading").fadeIn(200)
    searchContent.innerHTML="";
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let response =await api.json();
    displayAllCategories(response.categories)
    $(".inner-loading").fadeOut(200)
}

function displayAllCategories(data){
    let catBox=``;
    for (let i=0 ; i<data.length;i++){
        catBox+=`
        <div class="col-lg-3 col-md-4">
                    <div onclick="getCategoryMeals('${data[i].strCategory}')"  class="my-card d-flex flex-column position-relative overflow-hidden">
                        <img src="${data[i].strCategoryThumb}" class="w-100 rounded-2" alt="">
                        <div class="card-layer rounded-2 text-center">
                            <h2 class="meal-name text-capitalize">${data[i].strCategory}</h2>
                            <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
                </div>
        `
    }
    allData.innerHTML=catBox;
}

async function getAllAreas(){
    allData.innerHTML="";
    $(".inner-loading").fadeIn(200)
    searchContent.innerHTML='';

    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let response = await api.json();

    displayAllArea(response.meals);
    $(".inner-loading").fadeOut(200)

}

function displayAllArea(data){
    let areaBox=``;
    for(let i=0 ; i<data.length;i++){
        areaBox+=`
        <div class="col-md-3">
                <div onclick="getAreaMeals('${data[i].strArea}')" class="rounded-2 text-white text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `
    }

    allData.innerHTML=areaBox;
}

async function getIngredients(){
    allData.innerHTML='';
    $(".inner-loading").fadeIn(200)

    searchContent.innerHTML='';

    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let response= await api.json();

    displayAllIngredients(response.meals.slice(0, 20));
    $(".inner-loading").fadeOut(200)

}

function displayAllIngredients(data){
    let ingredientBox=``
    for(let i=0;i<data.length;i++){
        ingredientBox+=`
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="pointer rounded-2 text-white text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }
    allData.innerHTML=ingredientBox;

}

async function getCategoryMeals(cat){
    allData.innerHTML='';
    $(".inner-loading").fadeIn(200)

    searchContent.innerHTML='';

    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    response = await api.json();

    displayAllMeals(response.meals.slice(0,20));

    $(".inner-loading").fadeOut(200)

}


async function getAreaMeals(area){
    allData.innerHTML="";
    $(".inner-loading").fadeIn(200)

    searchContent.innerHTML='';

    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let response = await api.json()
    displayAllMeals(response.meals.slice(0,20));
    $(".inner-loading").fadeOut(200)

}


async function getIngredientsMeals(ingredients){
    allData.innerHTML="";
    $(".inner-loading").fadeIn(200)

    searchContent.innerHTML="";

    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    let response= await api.json();

    displayAllMeals(response.meals.slice(0,20));
    $(".inner-loading").fadeOut(200)

}

async function getDetails(id){
    allData.innerHTML="";
    $(".inner-loading").fadeIn(200)

    searchContent.innerHTML="";

    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let response= await api.json();

    displayMealsDetails(response.meals[0]);
    $(".inner-loading").fadeOut(200)


}

function displayMealsDetails(data){
    searchContent.innerHTML = "";


    let allingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            allingredients += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }

    let allTags = data.strTags?.split(",")
    if (!allTags) allTags = []

    let tagsStr = ''
    for (let i = 0; i < allTags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${allTags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4 text-white">
                    <div>
                    <img class="w-100 rounded-3" src="${data.strMealThumb}"alt="">
                    <h2>${data.strMeal}</h2></div>
                    </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${data.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${data.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${data.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${allingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    allData.innerHTML = cartoona

}


function searchInputsValues(){
    allData.innerHTML="";
    searchContent.innerHTML=`
    <div class="row py-4">
    <div class="col-md-6">
        <div>
            <input oninput="searchByName(this.value)" id="nameSearch" type="text" class="form-control bg-black text-white " placeholder="Search By Name...">
        </div>
    </div>
    <div class="col-md-6">
        <div>
            <input oninput="searchByLetter(this.value)" id="letterSearch" maxlength="1" type="text" class="form-control bg-black text-white" placeholder="Search By First Letter...">
        </div>
    </div>
</div>
    `

}

async function searchByName(name){
    allData.innerHTML="";
    $(".inner-loading").fadeIn(200)

    const api =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let response= await api.json();
    displayAllMeals(response.meals || []);

    $(".inner-loading").fadeOut(200)

}

async function searchByLetter(letter){
    allData.innerHTML='';
    $(".inner-loading").fadeIn(200)

    if (letter == "") {
        letter = "a";
    }
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let response = await api.json();
    displayAllMeals(response.meals || []);
    $(".inner-loading").fadeOut(200)

}  


function displayContact() {
    allData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="allInputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameMsg" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="allInputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailMsg" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="allInputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneMsg" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="allInputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageMsg" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passInput" onkeyup="allInputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passMsg" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repassInput" onkeyup="allInputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repassMsg" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputFocused = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputFocused = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputFocused = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputFocused = true
    })

    document.getElementById("passInput").addEventListener("focus", () => {
        passInputFocused = true
    })

    document.getElementById("repassInput").addEventListener("focus", () => {
        repassInputFocused = true
    })
}


let nameInputFocused = false;
let emailInputFocused = false;
let phoneInputFocused = false;
let ageInputFocused = false;
let passInputFocused = false;
let repassInputFocused = false;


function validName() {
    return (/^\w{3,15}\s*(\w{3,15})*\s*(\w{3,15})*$/gi.test(document.getElementById("nameInput").value))
}

function validEmail() {
    return (/^\w{3,15}@[a-z]{3,}.[a-z]{3}$/gi.test(document.getElementById("emailInput").value))
}

function validPhone() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function validAge() {
    return (/^[0-9]{1,3}$/.test(document.getElementById("ageInput").value))
}

function validPass() {
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("passInput").value))
}

function ValidRepass() {
    return document.getElementById("repassInput").value == document.getElementById("passInput").value
}

function allInputsValidation(){
    if(nameInputFocused){
        if(validName()){
            document.getElementById("nameMsg").classList.replace("d-block", "d-none");
        }
        else{
            document.getElementById("nameMsg").classList.replace("d-none", "d-block");
        }
    }
    if(emailInputFocused){
        if(validEmail()){
            document.getElementById("emailMsg").classList.replace("d-block", "d-none");
        }
        else{
            document.getElementById("emailMsg").classList.replace("d-none", "d-block")
        }
    }
    if (phoneInputFocused) {
        if (validPhone()) {
            document.getElementById("phoneMsg").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneMsg").classList.replace("d-none", "d-block")
        }
    }
    if (ageInputFocused) {
        if (validAge()) {
            document.getElementById("ageMsg").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageMsg").classList.replace("d-none", "d-block")
        }
    }
    if (passInputFocused) {
        if (validPass()) {
            document.getElementById("passMsg").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passMsg").classList.replace("d-none", "d-block")
        }
    }

    if(validName() && validEmail() && validPhone() && validAge() && validPass() && ValidRepass())
    {
        submitBtn.removeAttribute("disabled");
    }
    else{
        submitBtn.setAttribute("disabled", true);
    }
}