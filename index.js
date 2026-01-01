const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const path = require('node:path');
const pool = require('./db/pool');
const multer = require('multer');
var expressLayouts = require('express-ejs-layouts');

const upload = multer({
    limits: {
        fileSize: 1000 * 1000 * 2
    },
})

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(express.static('./public'));
app.use(express.static('./node_modules/@fortawesome/fontawesome-free'))
const homeCont = require('./controllers/home');
const createCont = require('./controllers/create');



app.get('/', homeCont.renderHome);
app.get('/categories', homeCont.renderCatergories);
app.get('/create', createCont.renderCreateForm);
app.post('/create', upload.single('recipe_image'), createCont.handleCreateForm);
app.get('/recipe/:id', homeCont.renderRecipe);
app.get('/category/:id', homeCont.renderCategorie);


/*app.use((req, res) => {
    res.render('error', { error: 'page does not exist yet visit us later and check if we add it ' })
})
*/

app.listen(3000);