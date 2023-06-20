 // ======= config server ========
require('dotenv').config();
const express = require('express');
const app = express();

// ========== config database ============
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    app.emit("pronto");
    console.log('\n -- Conectado com Sucess!!  MGBDB')
  })
  .catch((e) => 
  console.error("erro ao conectar co mmongoDB",e));

  //  =====  config flash msg e session  ============

  const session = require('express-session');
  const MongoStore = require('connect-mongo');
  const flash = require('connect-flash');

  const routes = require('./routes');
  const path = require('path');
  const helmet = require('helmet');
  const csrf = require('csurf');
  const { middlewareGlobal,
          checkCsrfError,
          csrfMiddleware } = require('./src/middlewares/middlesware');

// ==== config de app =======

app.use(helmet());

//code express ler json 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// ===== session config ========

const sessionOptions = session({
  secret: 'testando...123',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

// =============== configurando engine =============

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// ========== segurança ================

app.use(csrf())
app.use(checkCsrfError);
app.use(csrfMiddleware);
// =========== Nossos próprios middlewares ==========
app.use(middlewareGlobal);

app.use(routes);
// === conf port ==
const port = 10;
const http = process.env.AGENDA
const htp = "http://localhost:";
app.on('pronto', () => {
  app.listen(port, () => {
    console.log(`
    ======================
    Servidor rodando porta 
    http://${http}${port}
    `);
  });
});


