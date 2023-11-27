import express from 'express';
import path from 'path';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta) {
    const dados = requisicao.body;
    let conteudoResposta = '';

    conteudoResposta += `
        <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <title>Menu do sistema</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body>
            <div class="container">
                <form action='/cadastrarUsuario' method='POST' class="row g-3 needs-validation" novalidate>
                    <fieldset class="border p-2">
                        <legend class="mb-3">Cadastro de usuário</legend>
    `;

    if (!(dados.nome && dados.sobrenome && dados.nomeUsuario
        && dados.cidade && dados.uf && dados.cep)) {
        conteudoResposta += `
            <div class="col-md-4">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" class="form-control is-invalid" id="nome" name="nome" value="${dados.nome}" required>
                <div class="invalid-feedback">
                    Por favor, informe o nome!
                </div>
            </div>
            <div class="col-md-4">
                <label for="sobrenome" class="form-label">Sobrenome</label>
                <input type="text" class="form-control is-invalid" id="sobrenome" name="sobrenome" value="${dados.sobrenome}" required>
                <div class="invalid-feedback">
                    Por favor, informe o sobrenome!
                </div>
            </div>
            <div class="col-md-4">
                <label for="nomeUsuario" class="form-label">Nome do usuário</label>
                <div class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="text" class="form-control is-invalid" id="nomeUsuario" name="nomeUsuario"
                        value="${dados.nomeUsuario}" aria-describedby="inputGroupPrepend" required>
                    <div class="invalid-feedback">
                        Por favor, informe o nome de usuário!
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <label for="cidade" class="form-label">Cidade</label>
                <input type="text" class="form-control is-invalid" id="cidade" name="cidade" value="${dados.cidade}" required>
                <div class="invalid-feedback">
                    Por favor, informe a cidade!
                </div>
            </div>
            <div class="col-md-3">
                <label for="uf" class="form-label">UF</label>
                <select class="form-select is-invalid" id="uf" name="uf" required>
                    <option selected disabled value="">Escolha um estado...</option>
                    <!-- Adicione as opções de estados aqui -->
                </select>
                <div class="invalid-feedback">
                    Por favor, informe o estado!
                </div>
            </div>
            <div class="col-md-3">
                <label for="cep" class="form-label">CEP</label>
                <input type="text" class="form-control is-invalid" id="cep" name="cep" value="${dados.cep}" required>
                <div class="invalid-feedback">
                    Por favor, informe o CEP!
                </div>
            </div>
        `;
        conteudoResposta += `
            <div class="col-12 mt-2">
                <p class="text-danger">Por favor, corrija os erros no formulário.</p>
            </div>
        `;
    } else {
        const usuario = {
            nome: dados.nome,
            sobrenome: dados.sobrenome,
            nomeUsuario: dados.nomeUsuario,
            cidade: dados.cidade,
            uf: dados.uf,
            cep: dados.cep
        }
        listaUsuarios.push(usuario);
    }

    conteudoResposta += `
                    <div class="col-12 mt-2">
                        <button class="btn btn-primary" type="submit">Cadastrar</button>
                    </div>
                </fieldset>
            </form>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>
    </body>
    </html>
    `;

    resposta.end(conteudoResposta);
}

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'paginas')));

app.get('/', (requisicao, resposta) => {
    resposta.end(`
        <!DOCTYPE html>
            <head>
                <meta charset="UTF-8">
                <title>Menu do sistema</title>
            </head>
            <body>
                <h1>MENU</h1>
                <ul>
                    <li><a href="/cadastraUsuario.html">Cadastrar Usuário</a></li>
                </ul>
            </body>
        </html>
    `);
})

app.post('/cadastrarUsuario', processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});
