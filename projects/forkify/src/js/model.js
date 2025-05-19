import { API_URL } from './config';
import { getJSON } from './helpers';
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

export const loadRecipe = async function (id) {
  if (!id) return;
  const recipeUrl = `${API_URL}/${id}`;
  try {
    const data = await getJSON(recipeUrl);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
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
    console.log(err);
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
