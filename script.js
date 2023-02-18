async function buscaEndereco(cep) {
    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`)
        let consultaCEPConvertida = await consultaCEP.json()
        if (consultaCEPConvertida.erro){
            throw Error('CEP inexistente!')
        }
        let cidade = document.getElementById('cidade');
        let logradouro = document.getElementById('endereco');
        let estado = document.getElementById('estado');
        let bairro = document.getElementById('bairro');


        cidade.value = consultaCEPConvertida.localidade
        logradouro.value = consultaCEPConvertida.logradouro
        estado.value = consultaCEPConvertida.uf
        bairro.value = consultaCEPConvertida.bairro

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida
    }catch (erro){
        console.log(erro);
    }

}

let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));


let cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value));