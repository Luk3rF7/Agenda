# Template - Express,Mongoose e Segurança

## Para iniciar Projeto segue os passos:
      -npm i 

   ###  para instalar dev dependece e node_modules

   1) Crie arquivo .env para adicionar chave  sensivel do moogoDb
   2) vai no mongoDB seu cluster connectar
   3) dentro co arquivo coloque:

   ## Exemplo
     CONNECTIONSTRING=mongodb+srv://<nome>:<password>@agendacurso.l9w9phv.mongodb.net/?retryWrites=true&w=majority


# Agenda contem:

 -  Sessão de Login
 -  Sessão de Cadastro
 -  area onde se pode marca nome,email e telefone
<br><br>
# Template express - M V C - (Models view Controllers)

feito no Curso express do zero com aplicações de:

- Express 

- Webpack babel e cli

- banco de dado mongoDB / flash / MongoStore

- session - cookie de login

- sistema de seguranças utilizando csrf e helmet

- Middlewares 

- utilização da engine view e EJS

- Bcryptjs

## M.V.C - models views controller

como funciona a gente configura router.js para decidir qual controller vai ser utilizado  ou quem vai controlar aquela rota exemplo:

quem vai controlar rota home?<BR>
r: homeController na pasta controller.

unico trabalho do controler é decidir esse e models dessa rota que vai controlar dados da base de dados e coisa relacionado a dados e esse outro aqui ta relacionado ao view nessa aplicação
