const modal = document.getElementById("myModal");
const btn = document.getElementById("btn_modal");
const span = document.getElementsByClassName("close")[0];



// codigo pedido no exercicio 
const myLibrary = [];

function Book(autor, titulo, numeroPaginas, statusLeitura) {
    this.autor = autor;
    this.titulo = titulo;
    this.numeroPaginas = numeroPaginas;
    if (statusLeitura === "lido") {
        this.statusLeitura = true;
    } else {
        this.statusLeitura = false;
    }
}

async function addBookToLibrary() {
    const autor = document.getElementById("autor").value
    const titulo = document.getElementById("titulo").value
    const numeroPaginas = document.getElementById("numeroPaginas").value
    const statusLeitura = form.querySelector('input[name="status_leitura"]:checked').value;


    // instanciando o objeto
    let novoLivro = new Book(autor, titulo, numeroPaginas, statusLeitura);

    // adicionando ao array

    myLibrary.push(novoLivro)
    addBookDisplay()
}

// variavel de controlde de livros adicionados
const livrosJaAdicionados = new Set();

function addBookDisplay() {
    // container dos livros
    const container_livros = document.getElementById("container_book");

    setTimeout(() => {
        myLibrary.forEach(function (livro) {
            if (!livrosJaAdicionados.has(livro.titulo)) {
                const card = document.createElement("div"); // elemento de card
                card.classList.add("card"); // adiciona a class .card do css

                card.innerHTML = `
            <h2>${livro.autor}</h2>
            <p>Autor: ${livro.titulo}</p>
            <p>Número de Páginas: ${livro.numeroPaginas}</p>
            <p>Status de Leitura: <p id="leitura_status" class="${livro.statusLeitura ? "LIDO" : "NAO"}">${livro.statusLeitura ? "LIDO" : "NAO LIDO"}</p></p>
            <button class="removeBtn" id="removeBtn">X</button> <!-- Botão para remover o livro -->
          `;
                container_livros.appendChild(card);
                // adiciona o controle de livros adicionado a variavel
                livrosJaAdicionados.add(livro.titulo);

                // Adiciona um evento de clique ao botão "X" para remover o livro
                card.querySelector('.removeBtn').addEventListener('click', function () {
                    // Remove o livro da tela
                    card.remove();
                    // Remove o livro do array
                    const index = myLibrary.findIndex(item => item.titulo === livro.titulo);
                    if (index !== -1) {
                        myLibrary.splice(index, 1);
                    }
                    // Remove o título do livro do conjunto de livros adicionados
                    livrosJaAdicionados.delete(livro.titulo);
                });

                const status_leitura_trocar = document.getElementById("leitura_status");
                card.querySelector('#leitura_status').addEventListener('click', function () {
                    if(status_leitura_trocar.className.includes("LIDO")){
                        status_leitura_trocar.className = "NAO";
                        status_leitura_trocar.innerText = "NAO LIDO";
                    }else{
                        status_leitura_trocar.className = "LIDO"
                        status_leitura_trocar.innerText = "LIDO";
                    }
                });
            }
        })
    }, 3000);
}



btn.onclick = function () {
    modal.style.display = "block";
}


span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// form 
// Form submission handling
var form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary() // chama a funcao
    console.log(myLibrary); // da um console logo no array

    modal.style.display = "none";
});