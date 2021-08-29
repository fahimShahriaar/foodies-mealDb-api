document.getElementById('search-field').addEventListener('input', async function () {
    const searchedField = document.getElementById('search-field').value;
    console.log(searchedField);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedField}`);
    const data = await response.json();
    displayMeals(data.meals);
})

document.getElementById('search-btn').addEventListener('click', async function () {
    const searchedField = document.getElementById('search-field').value;
    console.log(searchedField);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedField}`);
    const data = await response.json();
    displayMeals(data.meals);
    // fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedField}`)
    //     .then(response => response.json())
    //     .then(data => displayMeals(data.meals));
})

function displayMeals(meals) {
    // clearing previous 
    document.getElementById('meal-container').innerText = '';
    meals.forEach(meal => {
        // console.log(meal);
        const { strMealThumb, strMeal, strInstructions, idMeal } = meal;
        const div = document.createElement('div');
        div.innerHTML = `
        <div>
            <div class="col" onclick="loadMealDetail('${idMeal}')">
                <div class="card h-100">
                    <img src="${strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${strMeal}</h5>
                        <p class="card-text">${strInstructions.slice(0, 200)}</p>
                    </div>
                </div>
            </div>  
        </div>
        `;
        document.getElementById('meal-container').appendChild(div);
    })
}

function loadMealDetail(idMeal) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(response => response.json())
        .then(data => {
            const { strMeal, strInstructions, strSource, strYoutube } = data.meals[0];
            const div = document.createElement('div');
            // div.setAttribute("class", "meal-card");
            div.classList.add('container', 'shadow', 'p-5', 'w-50', 'mx-auto', 'my-3', 'meal-card');
            div.innerHTML = `
                <h3>${strMeal}</h3>
                <p>${strInstructions.slice(0, 200)}</p>
                <p><a href="${strSource}">Instagram</a></p>
                <p><a href="${strYoutube}">Youtube</a></p>
                <button class="btn btn-sm btn-outline-danger" id="cancel-meal-box" onclick="cancelMealDetail()">Cancel</button>
            `;

            document.getElementById('meal-detail').appendChild(div);

        });


}


function cancelMealDetail() {
    console.log('cancel');
    const mealCard = document.getElementsByClassName('meal-card');
    for (const card of mealCard) {
        card.style.setProperty("display", "none", "important");

    }
}


