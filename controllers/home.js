
const queries = require('./../db/queries');
const cloudinary = require('./../services/cloudinary');

async function renderHome(req, res) {
    try {
        let recipes = await queries.getRecipes();

        res.render('home.ejs', { recipes, pag: 'home' });
    }
    catch (e) {
        console.log(e);

        res.render('error', { error: "we are having a problem right now please try again later" });
    }

}

async function renderCatergories(req, res) {
    try {
        let categories = await queries.getCategories();
        res.render('categories.ejs', { categories, pag: 'categories' });
    } catch (e) {
        res.render('error', { error: "we are having a problem right now please try again later" });
    }
}

async function renderRecipe(req, res) {

    try {
        recipeId = req.params.id;
        let recipe_row = await queries.getSingleRecipe(recipeId);
        recipe_row.recipe_ingredients = recipe_row.recipe_ingredients.split('-');
        // if (recipe_row.public_id != 'web')
        // recipe_row.recipe_image = await cloudinary.getRecipeBanner(recipe_row.public_id);

        res.render('singleRecipePage', { data: recipe_row, pag: 'none' });
    } catch (e) {
        res.render('error', { error: "we are having a problem right now please try again later" });

    }
}

async function renderCategorie(req, res) {

    try {
        let recipes = await queries.getCategory(req.params.id);
        res.render('category', { recipes: recipes, pag: 'none' });
    } catch (e) {
        res.render('error', { error: "we are having a problem right now please try again later" });

    }
}

module.exports = { renderHome, renderCatergories, renderRecipe, renderCategorie }