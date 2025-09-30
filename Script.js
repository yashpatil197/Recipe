const ingredientInput = document.getElementById('ingredient-input');
const searchBtn = document.getElementById('search-btn');
const recipeResults = document.getElementById('recipe-results');

// Themealdb API URL for searching recipes by main ingredient
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

// Function to fetch and display recipes
async function fetchRecipes(ingredient) {
    // Clear previous results and show loading message
    recipeResults.innerHTML = '<p>Loading recipes...</p>';

    try {
        const url = `${API_BASE_URL}${ingredient}`;
        
        // 1. Fetch data
        const response = await fetch(url);
        const data = await response.json();

        // 2. Check for results and render
        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            recipeResults.innerHTML = `<p>No recipes found for "${ingredient}". Try something else!</p>`;
        }

    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeResults.innerHTML = `<p style="color: red;">Failed to fetch recipes. Please try again later.</p>`;
    }
}

// Function to dynamically generate and insert the recipe HTML cards
function displayRecipes(meals) {
    // Start with an empty string to build the new HTML content
    let htmlContent = '';

    meals.forEach(meal => {
        // Themealdb provides a direct link to the recipe's detail page via its ID
        const detailLink = `https://www.themealdb.com/meal/${meal.idMeal}`;

        htmlContent += `
            <div class="recipe-card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="recipe-info">
                    <h2>${meal.strMeal}</h2>
                    <a href="${detailLink}" target="_blank">View Recipe</a>
                </div>
            </div>
        `;
    });

    // Inject all the generated HTML into the results container
    recipeResults.innerHTML = htmlContent;
}

// Event listener for the Search button click
searchBtn.addEventListener('click', () => {
    const ingredient = ingredientInput.value.trim();
    if (ingredient) {
        fetchRecipes(ingredient);
    } else {
        recipeResults.innerHTML = '<p>Please enter an ingredient to search.</p>';
    }
});

// Optional: Allow pressing Enter key to search
ingredientInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});
