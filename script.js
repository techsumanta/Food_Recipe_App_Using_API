// Variables Initialisation
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");


// Meal List
searchBtn.addEventListener('click', () => {
    let inputText = document.getElementById("search-input").value.trim();    
    if(inputText.length!=0) {        
        let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`;        
        fetch(url).then((resp) => resp.json())
        .then(data => {
            let html="";            
            data.meals.forEach(meal => {
                html +=`<div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>`;
            }) 
            mealList.classList.remove("not-found");
            mealList.innerHTML = html;      
        })
        .catch(() => {
            mealList.innerHTML = "Sorry we didn't find any meal";
            mealList.classList.add("not-found");
        })
    } else {
        mealList.innerHTML = "Enter an Ingredient";
        mealList.classList.add("not-found");
    }
    
});

// Meal Details Modal
mealList.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement.parentElement;
        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`;
        fetch(url).then((resp) => resp.json())
        .then(data => {
            let html = "";
            console.log(data);
            data.meals.forEach(meal => {                
                html+=`<h2 class="recipe-title">${meal.strMeal}</h2>
                        <p class="recipe-category">${meal.strCategory}</p>
                        <div class="recipe-instruct">
                            <h3>Instructions:</h3>
                            <p>${meal.strInstructions}</p>
                            
                            <div class="recipe-meal-img">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="recipe-link">
                                <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                            </div>
                        </div>`;
            })
            
            mealDetailsContent.innerHTML = html;
            mealDetailsContent.parentElement.classList.add("showRecipe");
        })
        .catch(() => {
            console.log("Not Found");
        })
    }
    
})

// Close Modal
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove("showRecipe");
})
