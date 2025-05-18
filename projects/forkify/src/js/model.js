import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
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
  } catch (err) {
    console.log(err);
    throw err;
  }
};
