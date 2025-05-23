//Armazenamento dos dados
class Cadastro {
    constructor(nome, email, senha, adm)
    {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.adm = adm;
    }
  }

pessoas = [];
 

//Criação da conta
function criarConta(){
    //Recebendo os elementos a partir dos inputs do Html
    name = document.getElementById(nome);
    e = document.getElementById(email);
    password = document.getElementById(senha);

    //Verificando se o cadastro já existe
    for(i = 0; i<email.length; i++){
        if (e == email[i])
        {
            return alert("O email usado já está cadastrado");
        }
        else{
            //Conferindo se é um de nós ou não
            if (e == "luanaherthal@gmail.com" or
                e == "Lucas" or
                e =="viniciusganda2@gmail.com" or
                e == "" or
                e == "kunz.luizf@gmail.com" or
                e =="alanalisbinski9@gmail.com" or
                e == "rv.falcade@gmail.com" or
                e == "ed22072008@gmail.com"){
                adimin = true;
                }
            else{
                adimin = false;
            }

            //Cadastrando
            pessoa.push()
            
        }
    }
}

//Login no site
function login(email, senha){

}