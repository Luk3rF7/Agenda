const express = require('express');
const route = express.Router();
// == import Controller ==
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
 // import de middleware

 const { loginRequired }  = require('./src/middlewares/middlesware');

// Rotas da home
route.get("/",homeController.index);


//rotas de login
route.get('/login/index', loginController.index);
//rota post register
route.post('/login/register', loginController.register);
//rota login
route.post('/login/login', loginController.login);
//rota  logout
route.get('/login/logout', loginController.logout);


/* ===  rotas contato ===  */

route.get('/contato/index', loginRequired , contatoController.index);
route.post('/contato/register',loginRequired,contatoController.register);
route.get('/contato/index/:id',loginRequired ,contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired ,contatoController.edit);
route.get('/contato/delete/:id', loginRequired ,contatoController.delete);

module.exports = route;