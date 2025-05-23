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
    e = document.getElementById(email).lower();
    password = document.getElementById(senha);

    //Verificando se o cadastro já existe
    for(i = 0; i<email.length; i++){
        if (e == email[i])
        {
            return alert("O email usado já está cadastrado");
        }
        else{
            //Conferindo se é um de nós ou não
            if (e in("luanaherthal@gmail.com", "lucas.andrioli.santo@gmail.com", "viniciusganda2@gmail.com", "a.g.tomelin@gmail.com", "kunz.luizf@gmail.com", "alanalisbinski9@gmail.com", "rv.falcade@gmail.com", "ed22072008@gmail.com"))
                {
                adimin = true;
                }
            else{
                adimin = false;
            }

            //Cadastrando
            pessoa.push(new Cadastro(name, e, password, adimin));
            
        }
    }
}

//Login no site
function login(){

}