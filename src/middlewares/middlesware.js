exports.middlewareGlobal = (req, res, next) => {
  //var global de error
    res.locals.errors = req.flash('errors');
    //var global sucess
    res.locals.success = req.flash('success');
    //global das session
    res.locals.user = req.session.user;
    next();
  };
  
  exports.outroMiddleware = (req, res, next) => {
    next();
  };

  /*  middles tokken */
  exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
      return res.render('404');
    }
    next();
  };

  exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
  };
 // middleware verifica user logado

 exports.loginRequired = (req,res,next) =>{
  //verficação do usuario não logado
  if(!req.session.user){
    req.flash('errors','Você precisa fazer o login.');
      // salva antes de redirecionar p/ pagina
    req.session.save(() => res.redirect('/'));
    return;
  };
  next();
 };