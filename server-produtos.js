// produto
// {
//     "id": 1,
//     "nome": "Leonardo",
//     "ean": "090909090",
//     "localizacao": "prateleira 139",
//     "status": "ativo/inativo",
//     "valor": 90.00
//     "quantidade": 88
// }
//
//==========================================
// filmes 
// {
//     "id": 1,
//     "nome": "Leonardo",
//     "avaliacao": 1 a 5,
//     "detalhe": "detalhe do filme",
//     "data_lancamento": "2020-07-21"
// }

//========VARIAVEIS E CONSTANTES========

const { response, request } = require('express');
const express = require('express');
const nodemon = require('nodemon');

const app = express();
app.use(express.json())

let produtos = [];
let filmes = [];
let newId = 1;


//========UTILIZANDO MÉTODO GET========
app.get('/teste', (request, response) => {
    return response.status(200).json({status: 'online'});
})


// GET PRODUTOS
app.get('/produtos', (request, response) => {
    return response.status(200).json({produtos})
})

app.get('/produtos/:id', (request, response) => {
    const id = request.params.id

    const produto = produtos.filter(item => item.id == id)
    return response.json(produto)
})


// GET FILMES
app.get('/filmes', (request, response) => {
    return response.status(200).json({filmes})
})

app.get('/filmes/:id', (request, response) => {
    const id = request.params.id

    const filme = filmes.filter(item => item.id == id)
    return response.json(filme)
})


//========UTILIZANDO MÉTODO POST========

// POST PRODUTOS
app.post('/produtos', (request, response) => {
    const { nome, ean, localizacao, status, valor, quantidade } = request.body

    const id = newId++

    produtos.push({
        id,
        nome,
        ean,
        localizacao,
        status,
        valor,
        quantidade
    })

    return response.json({
        id,
        nome,
        ean,
        localizacao,
        status,
        valor,
        quantidade
    })
})


// POST FILMES
app.post('/filmes', (request, response) => {
    const { nome, avaliacao, detalhe, data_lancamento } = request.body

    const id = newId++

    filmes.push({
        id,
        nome,
        avaliacao,
        detalhe,
        data_lancamento
    })

    return response.json({
        id,
        nome,
        avaliacao,
        detalhe,
        data_lancamento
    })
})


//========UTILIZANDO MÉTODO PUT========

// PUT PRODUTOS
app.put('/produto/:id', (request, response) => {
    const id = request.params.id
    const {nome, ean, localizacao, status, valor, quantidade} = request.body

    const i = produtos.findIndex(item => item.id == id);

    produtos[i].nome = nome
    produtos[i].ean = ean
    produtos[i].localizacao = localizacao
    produtos[i].status = status
    produtos[i].valor = valor
    produtos[i].quantidade = quantidade

    return response.json(produtos[i])
})


// PUT FILMES
app.put('/filme/:id', (request, response) => {
    const id = request.params.id
    const {nome, avaliacao, detalhe, data_lancamento} = request.body

    const i = filmes.findIndex(item => item.id == id);

    filmes[i].nome = nome
    filmes[i].avaliacao = avaliacao
    filmes[i].detalhe = detalhe
    filmes[i].data_lancamento = data_lancamento

    return response.json(filmes[i])
})


//========UTILIZANDO MÉTODO DELETE========

// DELETE PRODUTOS
app.delete('/produto/:id', (request, response) => {
    const id = request.params.id

    const newProdutos = produtos.filter(item => item.id != id);
    produtos = newProdutos

    return response.status(200).end()
})


// DELETE FILMES
app.delete('/filme/:id', (request, response) => {
    const id = request.params.id

    const newFilmes = filmes.filter(item => item.id != id);
    filmes = newFilmes

    return response.status(200).end()
})

//========IMPRIMIR QUANDO RODAR SERVER========
app.listen(3333, () => {
    console.log('****************************')
    console.log(' Server-produtos rodando :D ')
    console.log('****************************')
})