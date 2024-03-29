'use strict';

const btnRandomMeal = document.getElementById('random-meal');
const recipeEl = document.querySelector('.recipe');
const input = document.getElementById('input');
const form = document.querySelector('.form');
const errorWindow = document.querySelector('.error-window');
const mealsEl = document.querySelector('.meals');

const overlay = document.querySelector('.overlay');
const btnTryAgain = document.getElementById('try-again');

const errorTextEl = document.getElementById('error-text');

let recipes = [];

/* AJAX CALLS */

/* FROM INPUT */

const getRecipeByNameOrIngredient = async function (name) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );

    const data = await res.json();

    recipes = data.meals;

    if (!data.meals) throw new Error('Did not find any recipes! 😎');

    if (data.meals.length === 1) {
      renderRecipe(data.meals[0]);
      return;
    }

    /* more than 1 recipes */
    renderMeals(data.meals);
    /////
  } catch (err) {
    renderErrorMessageWindow(err.message);
  }
};

/* FROM RANDOM BUTTON */

const getOneRandomRecipe = async function () {
  try {
    mealsEl.innerHTML = '';

    const res = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    );

    const data = await res.json();

    const [recipe] = data.meals;

    if (!recipe) throw new Error('Something went wrong please try again! 🤷‍♀️');

    renderRecipe(recipe);
  } catch (err) {
    renderErrorMessageWindow(err.message);
  }
};

/* FUNCTIONS */

/* ERRORMESSAGE */

const renderErrorMessageWindow = function (errorText = 'Recipes not found 😎') {
  errorWindow.classList.remove('hidden');
  errorWindow.classList.add('show');
  overlay.classList.remove('hidden');
  errorTextEl.innerText = errorText;
};

/* HELPER FUNCTIONS */

const ingredientsArray = function (recipe) {
  const arr = Object.entries(recipe);

  return arr
    .filter(el => el[0].substring(0, 6) === 'strIng' && el[1] !== '')
    .map(el => (el = el[1]))
    .filter(el => el !== null);
};

const measuresArray = function (recipe) {
  const arr = Object.entries(recipe);

  return arr
    .filter(el => el[0].substring(0, 8) === 'strMeasu' && el[1] !== '')
    .map(el => (el = el[1]))
    .filter(el => el !== null);
};

/* RENDER RECIPE */

const renderRecipe = function (recipe) {
  const ingredients = ingredientsArray(recipe);
  const measures = measuresArray(recipe);

  recipeEl.innerHTML = '';

  recipeEl.classList.remove('hidden');

  const html = `<h2 class="title">${recipe.strMeal}</h2>
  <img
    src="${recipe.strMealThumb}"
    alt=""
  />
  <div class="info">
    <div class="ingredients">
      <p>Ingredients</p>
      <ul>
        ${ingredients
          .map((ingredient, i) => {
            return `<li>✔ ${ingredient} ${measures[i]}</li>`;
          })
          .join('')}
      </ul>
    </div>
    <div class="instructions">
      <h4>Instructions</h4>
      <p>
        ${recipe.strInstructions}
      </p>
    </div>
  </div>`;

  recipeEl.innerHTML = html;
};

const renderMeals = function (meals) {
  mealsEl.innerHTML = '';

  mealsEl.classList.remove('hidden');

  const html = `<ul>${meals
    .map(meal => (meal = meal.strMealThumb))
    .map((url, i) => {
      return `<li><img id="${i}" src="${url}" class="img"/></li>`;
    })
    .join('')}</ul>`;

  mealsEl.innerHTML = html;
};

/* getRecipeByNameOrIngredient('meat'); */

/* EVENT LISTENERS */

btnRandomMeal.addEventListener('click', getOneRandomRecipe);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  /* hide recipe */
  recipeEl.classList.add('hidden');

  /* get new recipes */
  const name = input.value;

  if (name) {
    getRecipeByNameOrIngredient(name);
  } else {
    alert('Please enter meal or keyword.');
  }

  input.value = '';
});

btnTryAgain.addEventListener('click', function () {
  location.reload();
});

mealsEl.addEventListener('click', function (e) {
  if (!e.target.classList.contains('img')) return;

  const index = +e.target.id;

  renderRecipe(recipes[index]);

  recipeEl.scrollIntoView({ behavior: 'smooth' });
});
