const mongoose = require("mongoose");
/* pac de validação  */
const validador  =  require('validator');
/* bcryptjs criptogrifa  */
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    /* config para register */
email: { type: String, required: true },
password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    /* atributo ta classe e teremos acesso ao body */
    this.body = body;
    /*  cria flag de errors */
    this.errors = [];
    // se tiver algum erro aqui dentro desse array vazio não posso cadastrar no bd
    this.user = null;
  }
  //  metodo login

  async login(){
    this.valida();
    if(this.errors.length > 0) return;
    
    //const vai buscar user/email no BD
    this.user = await LoginModel.findOne({ 
      email: this.body.email
    });

    //config user não existe
    if(!this.user) {
      this.errors.push('Usuário não existe!')
      return;
    }
    //checando se password ta igual bd
    if(!bcryptjs.compareSync(this.body.password,this.user.password)){
      this.errors.push('Senha invalida')
      this.user = null;
      return;
    }

  }

  /* metodo register com validação */
 async register() {
   this.valida();

   //verificando error
   if(this.errors.length > 0) return;

   /* verificando se exite conta igual no BD */
    await this.userExists();

    if(this.errors.length > 0) return;
   //config bcryptsjs
   const salt = bcryptjs.genSaltSync();
   this.body.password = bcryptjs.hashSync(this.body.password, salt);

   /* como checar usuario */
     this.user = await LoginModel.create(this.body);

 }
 
 async userExists(){
  // faça obj para verificar
  this.user = await LoginModel.findOne({email:this.body.email});

    //passo a verficar se exist usuario 
    if(this.user) this.errors.push('Usuário já existe!');
 }

  valida() {
    this.cleanUp();
     //validação
    //  o E-mail precisa ser valido:
    if(!validador.isEmail(this.body.email))
    this.errors.push('Email inválido');
    // a senha precisa ter entre 3 a 16 caracteres:
    if(this.body.password.length < 3 || this.body.password.length >= 50){
        this.errors.push('Senha precisa conter de 3 a 50 caracteres.')
    }
  }

  cleanUp() {
    /* 
    metodo que vai fazer for na body
     e vai garantir que tudo dentro do body
    seja string  */
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    };
  }
}

module.exports = Login;
