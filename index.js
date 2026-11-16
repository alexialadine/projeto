let autores = recuperarRegistros("autores");
if (!autores) {
    autores = [{ id: 1, nome: "Alexia Ladine", email: "alexialadineferreirasilveira@email.com" }];
    persistir("autores", autores);
}

let posts = recuperarRegistros("posts");
if (!posts) {
    posts = [{ id: 1, titulo: "Meu primeiro post", autor_id: 1 }];
    persistir("posts", posts);
}

let comentarios = recuperarRegistros("comentarios");
if (!comentarios) {
    comentarios = [{ id: 1, texto: "Adorei!", post_id: 1 }];
    persistir("comentarios", comentarios);
}

function persistir(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
}

function recuperarRegistros(chave) {
    const registros = localStorage.getItem(chave);
    if (registros) {
        return JSON.parse(registros);
    } else {
        return null;
    }
}

function listarAutores() {
    let retorno = "";
    autores.forEach(a => {
        retorno += `<div class="item-lista">${a.nome} (${a.email})
        <button class="btn btn-sm btn-outline-secondary" onclick="buscarAutorProForm(${a.id})">Alterar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="excluirAutor(${a.id})">Excluir</button></div>`;
    });
    document.getElementById("listaAutores").innerHTML = retorno;
    listarOpcoes();
}

function gravarAutor() {
    const id = document.getElementById("idAutor").value;
    const nome = document.getElementById("nomeAutor").value;
    const email = document.getElementById("emailAutor").value;

    if (id == "") {
        let novoId = autores.length ? autores[autores.length - 1].id + 1 : 1;
        autores.push({ id: novoId, nome: nome, email: email });
    } else {
        const indice = autores.findIndex(a => a.id == id);
        autores[indice].nome = nome;
        autores[indice].email = email;
    }
    persistir("autores", autores);
    document.getElementById("formAutor").reset();
    limparAutor();
    listarAutores();
}

function buscarAutorProForm(id) {
    const autor = autores.find(a => a.id == id);
    document.getElementById("idAutor").value = autor.id;
    document.getElementById("nomeAutor").value = autor.nome;
    document.getElementById("emailAutor").value = autor.email;
}

function excluirAutor(id) {
    const indice = autores.findIndex(a => a.id == id);
    if (indice != -1) {
        autores.splice(indice, 1);
        persistir("autores", autores);
        listarAutores();
    }
}

function limparAutor() {
    document.getElementById("idAutor").value = "";
}

function listarPosts() {
    let retorno = "";
    posts.forEach(p => {
        let nomeAutor = "Autor não encontrado";
        const autor = autores.find(a => a.id == p.autor_id);
        if (autor) nomeAutor = autor.nome;

        retorno += `<div class="col-md-6"><div class="post">
        <small>Publicado por ${nomeAutor}</small>
        <h4 class="mt-2">${p.titulo}</h4>
        <button class="btn btn-sm btn-outline-secondary" onclick="buscarPostProForm(${p.id})">Alterar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="excluirPost(${p.id})">Excluir</button>
        </div></div>`;
    });
    document.getElementById("listaPosts").innerHTML = retorno;
    listarOpcoes();
}

function gravarPost() {
    const id = document.getElementById("idPost").value;
    const titulo = document.getElementById("tituloPost").value;
    const autorId = Number(document.getElementById("autorPost").value);

    if (id == "") {
        let novoId = posts.length ? posts[posts.length - 1].id + 1 : 1;
        posts.push({ id: novoId, titulo: titulo, autor_id: autorId });
    } else {
        const indice = posts.findIndex(p => p.id == id);
        posts[indice].titulo = titulo;
        posts[indice].autor_id = autorId;
    }
    persistir("posts", posts);
    document.getElementById("formPost").reset();
    limparPost();
    listarPosts();
}

function buscarPostProForm(id) {
    const post = posts.find(p => p.id == id);
    document.getElementById("idPost").value = post.id;
    document.getElementById("tituloPost").value = post.titulo;
    document.getElementById("autorPost").value = post.autor_id;
}

function excluirPost(id) {
    const indice = posts.findIndex(p => p.id == id);
    if (indice != -1) {
        posts.splice(indice, 1);
        persistir("posts", posts);
        listarPosts();
    }
}

function limparPost() {
    document.getElementById("idPost").value = "";
}

/* COMENTARIOS */
function listarComentarios() {
    let retorno = "";
    comentarios.forEach(c => {
        retorno += `<div class="item-lista">${c.texto} 
        <button class="btn btn-sm btn-outline-secondary" onclick="buscarComentarioProForm(${c.id})">Alterar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="excluirComentario(${c.id})">Excluir</button></div>`;
    });
    document.getElementById("listaComentarios").innerHTML = retorno;
    listarOpcoes();
}

function gravarComentario() {
    const id = document.getElementById("idComentario").value;
    const texto = document.getElementById("textoComentario").value;
    const postId = Number(document.getElementById("postComentario").value);

    if (id == "") {
        let novoId = comentarios.length ? comentarios[comentarios.length - 1].id + 1 : 1;
        comentarios.push({ id: novoId, texto: texto, post_id: postId });
    } else {
        const indice = comentarios.findIndex(c => c.id == id);
        comentarios[indice].texto = texto;
        comentarios[indice].post_id = postId;
    }
    persistir("comentarios", comentarios);
    document.getElementById("formComentario").reset();
    limparComentario();
    listarComentarios();
}

function buscarComentarioProForm(id) {
    const comentario = comentarios.find(c => c.id == id);
    document.getElementById("idComentario").value = comentario.id;
    document.getElementById("textoComentario").value = comentario.texto;
    document.getElementById("postComentario").value = comentario.post_id;
}

function excluirComentario(id) {
    const indice = comentarios.findIndex(c => c.id == id);
    if (indice != -1) {
        comentarios.splice(indice, 1);
        persistir("comentarios", comentarios);
        listarComentarios();
    }
}

function limparComentario() {
    document.getElementById("idComentario").value = "";
}

/*opcoes do formularior*/
function listarOpcoes() {
    let listaAutores = "";
    autores.forEach(a => {
        listaAutores += `<option value="${a.id}">${a.nome}</option>`;
    });
    document.getElementById("autorPost").innerHTML = listaAutores;

    let listaPosts = "";
    posts.forEach(p => {
        listaPosts += `<option value="${p.id}">${p.titulo}</option>`;
    });
    document.getElementById("postComentario").innerHTML = listaPosts;
}

listarAutores();
listarPosts();
listarComentarios();
