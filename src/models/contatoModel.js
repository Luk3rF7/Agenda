const mongoose = require('mongoose');
const validator = require('validator');

/* === config mongodb === */
const ContatoSchema = new mongoose.Schema({
  nome: {type: String, required:true },
  sobrenome:{ type: String, required:false , default:''},
  email: { type: String, required:false, default:''},
  telefone:{ type: String, required:false, default:''},
  criadoEm : {type : Date,default: Date.now}
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

//utilizando constructor function
function Contato(body){
  this.body = body;
  this.errors =[],
  this.contato = null;

}

Contato.prototype.register =  async function(){
  this.valida();

  if(this.errors.length > 0 )return;
  //verificando e mandando pro BD
  this.contato = await ContatoModel.create(this.body);
};


//fazendo a validação 
Contato.prototype.valida = function(){
  this.cleanUp();

  //fazendo a checagem e-mail:
  if(this.body.email && !validator.isEmail(this.body.email))
  this.errors.push('Email invalido');
  //checando os campos 
  if(!this.body.nome)
  this.errors.push('Nome é um campo obrigatorio!')
  //checando se email ou tel:
  if(!this.body.email && !this.body.telefone) { 
    this.errors.push(
      'Pelo menos um contato precisa ser enviado: e-mail ou telefone.'
      );
  }
  
}

// modo constructor function tranzendo so string 
Contato.prototype.cleanUp = function(){
  for(const key in this.body){
    if(typeof this.body[key] !== 'string'){
      this.body[key]= '';
    }
  }

  //pegando infos
  this.body = {
    nome:  this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
    
  }
}
//metodo editar

Contato.prototype.edit = async function(id){
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id,this.body,{new: true} )
  };

//metodos estaticos nao tem acesso prototype:
//metodo que busca por id
Contato.buscaPorId = async function(id){
  //verificando se e string 
  if(typeof id !== 'string')return;
  //função Statica
  const contato = await ContatoModel.findById(id);
  return contato;
}

Contato.buscaContatos = async function () {
  //função Statica
  const contatos = await ContatoModel.find(
    //posso utilizar para filtrar
   //  ex: {email: this.body.email}
  ).sort({ criadoEm: -1}) //ordem crescendo utilizo 1 normla 
  return contatos;
};

Contato.delete = async function(id){
  if(typeof id !== 'string') return;

  const contato = await ContatoModel.findOneAndDelete({_id:id})
  return contato;
}

module.exports = Contato;