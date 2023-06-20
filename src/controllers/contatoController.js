const Contato = require('../models/contatoModel');

exports.index = (req,res) => {
    res.render('contato' , {
      contato : {}
    })
}

exports.register = async (req,res) => {
     try{
       const contato = new Contato(req.body);
       await contato.register();

       //exibir msg de error
       if (contato.errors.length > 0) {
         req.flash("errors", contato.errors);
         req.session.save(() =>
         res.redirect("/"));
         return;
       }

       //config exibir msg sucess
         req.flash("success",
         "Contato registrado com sucesso!");
         req.session.save(() =>
           res.redirect(`/`)
         );
         return;
     }catch(e){
        console.log(e);
        return res.render('404')
    }  
}

exports.editIndex = async function(req,res) {

  if(!req.params.id) return res.render('404');

  const contato = await Contato.buscaPorId(req.params.id);

  if(!contato) return res.render('404');
    res.render('contato',
     { contato } );
}

exports.edit = async function(req,res) {
  try{
      if(!req.params.id) return res.render('404');
      const contato = new Contato(req.body);
      await contato.edit(req.params.id);

      //exibir msg de error
      if(contato.errors.length > 0) {
        req.flash("errors", contato.errors);
        req.session.save(() => res.redirect("/contato/index"));
        return;
      }

      //config exibir msg sucess
      req.flash("success", "Contato editado com sucesso!");
      req.session.save(() =>
        res.redirect(`/`)
      );
  }catch(e){
    console.log(e);
    res.render('404');
  }

};
 
exports.delete = async function (req, res) {
  if(!req.params.id) return res.render('404');

  const contato = await Contato.delete(req.params.id);
  if(!contato) return res.render('404');

  req.flash("success", "Contato apagado com sucesso!");
  req.session.save(() => res.redirect(`/`));
};