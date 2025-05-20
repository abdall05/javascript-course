import { API_URL, API_KEY } from './config';
import { getJSON, sendJSON } from './helpers';
import { RES_PER_PAGE } from './config';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), //conditionaly add properties
    //spreading undefined inside object literal does nothing
  };
};
export const loadRecipe = async function (id) {
  if (!id) return;
  const recipeUrl = `${API_URL}/${id}`;
  try {
    const data = await getJSON(recipeUrl);
    state.recipe = createRecipeObject(data);
    if (state.bookmarks.find(recipe => state.recipe.id === recipe.id))
      state.recipe.bookmarked = true;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const url = `${API_URL}?search=${query}`;
    const data = await getJSON(url);
    state.search.query = query;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    state.search.currentPage = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.currentPage) {
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const setSeachPage = function (page) {
  state.search.currentPage = page;
};

export const updateServings = function (newServings) {
  if (newServings <= 0) return;
  const currentServings = state.recipe.servings;
  const MultiplicationFactor = newServings / currentServings;
  state.recipe.servings = newServings;
  state.recipe.ingredients.forEach(ing => {
    if (ing.quantity) {
      ing.quantity = ing.quantity * MultiplicationFactor;
    }
  });
};

const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  if (index !== -1) {
    state.bookmarks.splice(index, 1);
  }
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

export const toggleBookmark = function (recipe) {
  if (!state.bookmarks.find(bookmark => bookmark.id === recipe.id))
    addBookmark(recipe);
  else {
    deleteBookmark(recipe.id);
  }
};

export const storeBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const loadBookmarks = function () {
  state.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
};

export const clearStorage = function () {
  localStorage.removeItem('bookmarks');
};

export const uploadRecipe = async function (newRecipe) {
  let ingredients;
  try {
    ingredients = Object.entries(newRecipe)
      .filter(
        entry => entry[0].includes('ingredient') && entry[1].trim() !== ''
      )
      .map(entry => {
        const ingrediantArr = entry[1].split(',');
        if (ingrediantArr.length !== 3) {
          throw new Error(
            'Wrong ingrediant format! please use the correct format!'
          );
        }
        const [quantity, unit, description] = ingrediantArr;
        return {
          quantity: Number(quantity) ? Number(quantity) : null,
          unit: unit.trim(),
          description: description.trim(),
        };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
    storeBookmarks();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// state.recipe = {
//   id: recipe.id,
//   title: recipe.title,
//   publisher: recipe.publisher,
//   sourceUrl: recipe.source_url,
//   image: recipe.image_url,
//   servings: recipe.servings,
//   cookingTime: recipe.cooking_time,
//   ingredients: recipe.ingredients,
// };
