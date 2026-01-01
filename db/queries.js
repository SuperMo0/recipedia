const pg = require('pg');
const { pool } = require('./pool');


async function getSingleRecipe(id) {

    sql = `select * from recipes where id=$1`
    try {
        let result = await pool.query(sql, [id]);
        return result.rows[0];
    }
    catch (e) {
        throw ('Error Fetching a recipe from the database');
    }
}

async function getRecipes() {

    sql = `select * from recipes`
    try {
        let result = await pool.query(sql);
        return result.rows;
    }
    catch (e) {
        console.log(e);

        throw ('Error Fetching recipes from the database');
    }
}

async function getCategory(id) {
    sql = `select * from recipes where category_id=$1`
    try {
        let result = await pool.query(sql, [id]);
        return result.rows;
    }
    catch (e) {
        throw ('Error Fetching categories from the database');
    }
}


async function getCategories() {
    sql = `select * from category`
    try {
        let result = await pool.query(sql);
        return result.rows;
    }
    catch (e) {
        throw ('Error Fetching categories from the database');
    }
}

async function insertRecipe(data) {

    const sql = `
    insert into recipes values(default,$1,$2,$3,$4,$5,$6,$7,$8,$9)
    `
    try {
        await pool.query(sql,
            [data.recipe_name,
            data.recipe_ingredients,
            data.recipe_instructions,
            data.minuts,
            data.recipe_image,
            data.user_id,
            data.category_id,
            data.hours,
            data.public_id
            ]
        )
    } catch (e) {
        throw ('Error inserting the recipe into the database');
    }

}

async function insertCategory(data) {

    try {
        const sql = `
    insert into category values(default,$1,$2) returning id
    `
        let res = await pool.query(sql, [data.category_name, data.public_id]);
        return res.rows[0].id;
    } catch (e) {
        throw ('error inserting the category into the data base')
    }
}


module.exports = { getSingleRecipe, getCategory, insertRecipe, insertCategory, getCategories, getRecipes };