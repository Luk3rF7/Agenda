/* == exportando classe de login ==  */
const Login = require("../models/loginModel");
 
/*  Home page */
exports.index = (req,res) => {
  if(req.session.user)return  res.render('login_logado');
   return  res.render('login');
};

/*  ===  register users === */
exports.register = async function(req,res){
  try{
       const login = new Login(req.body);
       await login.register();

         //checa se tem algum erro
       if (login.errors.length > 0) {
        //config a msg de error
       req.flash("errors", login.errors);
         //utilizo session redirecionar pagina começo
         req.session.save(function() {
         return res.redirect('/login/index');
        });
         return;
       }

      //config msg de suces
      req.flash('success','Usuário Cadastrado com sucesso !');
      req.session.save(function(){
        return res.redirect('/login/index');
      });
      }catch(e){
         console.log(e);
         return   res.render('404');
  }
 
};

/*  ====== login ========= */
exports.login = async function(req,res){
  try{
      const login = new Login(req.body);
      await login.login();

         //checa se tem algum erro
       if(login.errors.length > 0) {
        //config a msg de error
       req.flash('errors', login.errors);
         //utilizo session redirecionar pagina começo
         req.session.save(function() {
         return res.redirect('/login/index');
     });
         return;
      }

      //config msg de suces
      req.flash('success','Você logou no Sitema');
      //session para saber quem logou/esta logado
      req.session.user = login.user;

      req.session.save(function(){
        return res.redirect('/login/index');
      });
      }catch(e){
         console.log(e);
         return   res.render('404');
  }
};
exports.logout = function(req,res) {
    //destroi ou kill session
     req.session.destroy();
     res.redirect('/');
}