// html i css +
// basic api call +
// obezbedi search input, There are no search results. Try again! +
// search +
// on click find id of meal +
// display as on page +

const flexResult = document.querySelector('.flex-result');
const relativeContent = document.querySelector('.relative-content');
const mealInput = document.querySelector('.meal-input');
const searchMeals = document.querySelector('#search-meals');
const randomMeals = document.querySelector('#random-meals');
const inputTitle = document.querySelector('.input-title');

const mealInfoContainer = document.querySelector('.mealInfo-container');

// event listener

searchMeals.addEventListener('click', () => {
  getMealAPI();
});

// basic call to api

async function getMealAPI() {
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput.value}`
  );

  const res = await data.json();

  displayMeal(res.meals);
}

// display meal

const displayMeal = (meals) => {
  inputTitle.innerHTML = `Search for meal name: <span class='name'>${mealInput.value}</span> `;

  if (meals) {
    if (meals && mealInput.value.length > 2) {
      flexResult.innerHTML = `${meals
        .map(
          (item) =>
            ` 
  
        <div class='relative-content'>
     <div data-id=${item.idMeal} class="img-wrapper">
     <p class="meal-text">${item.strMeal}</p>
   </div>
 <img class="responsive-img" src=${item.strMealThumb} alt="" />
     </div>
`
        )
        .join('')}
 `;

      clearInput();
    } else {
      relativeContent.innerHTML = '';
      inputTitle.innerHTML = 'Unesite trazeno jelo';
    }
  } else {
    inputTitle.innerHTML = `Trazeno jelo <span class='name'>${mealInput.value}</span> ne postoji `;
  }
};

flexResult.addEventListener('click', (e) => {
  let id = e.target.dataset.id;

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => displayMealInfo(data.meals));
});

function displayMealInfo(meals) {
  console.log(meals);

  let mealsDb = [];

  for (let i = 0; i < 20; i++) {
    mealsDb.push(`${meals[0][`strIngredient${i}`]}`);
  }

  let ingredient = mealsDb.filter((item) => {
    return item !== 'undefined' && item.length > 1;
  });

  mealInfoContainer.innerHTML = ` 
   
        <h1 class='meal-title'>${meals[0].strMeal}</h1>
         
        <img class='img-responsive' src=${meals[0].strMealThumb} alt='' />
   
          <h5 class='meal-subtitle'>${meals[0].strArea}</h5>
    
          <h5 class='meal-subtitle'>${meals[0].strCategory}</h5>

          <div class='border'>

            ${meals[0].strInstructions}

          </div>

          <h2>Ingredients: </h2>

            <div class='flex-ingredient'>
            ${ingredient
              .map((item) => {
                return `<li class='ingridi'>${item}</li>`;
              })
              .join('')}

            </div>
    
   
   `;
}

// ocisti input

function clearInput() {
  mealInput.value = '';
}
