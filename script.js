const blur = document.querySelector(".blur");
const blur_id = document.querySelector("#blur");
const minha_playlist = document.getElementById("minha_playlist");
const musicas = document.querySelector(".musicas");
const BtnAddPlaylist = document.querySelector(".add");
const playlist_container = document.querySelector(
  "#minha_playlist_container ul"
);
const input = document.querySelector(".input-container input");
const modal = document.querySelector(".modal");

// Animações
ScrollReveal().reveal(".musicas", {
  origin: "bottom",
  duration: 1000,
  distance: "20px",
});

// Botão playlist
function abrirMinhaPlaylist() {
  blur.classList.add("active");
  minha_playlist.classList.add("active");
  listarMusicasPlaylist()
}

function sairMinhaPlaylist() {
  blur.classList.remove("active");
  minha_playlist.classList.remove("active");
}
// Fim botão playlist

// Botão criar música
function abrirModal() {
  blur_id.classList.add("active");
  modal.classList.add("active");
}

function fecharModal() {
  blur_id.classList.remove("active");
  modal.classList.remove("active");
}
// Fim botão criar música

// Interações com api

function inserirMusicaAPI() {
  event.preventDefault();
  let musica = {
    imagem: document.getElementById("imagem").value,
    nome: document.getElementById("nome_musica").value,
    album: document.getElementById("nome_album").value,
    artista: document.getElementById("nome_artista").value,
  };
  fetch("http://localhost:3000/musicas", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(musica),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert("Canção registrada com sucesso");
      fecharModal();
      CarregarCancoes();
    });
}

function inserirCancoes(listademusicas) {
  console.log("Carregando musicas");
  musicas.innerHTML = "";

  listademusicas.map((musica) => {
    musicas.innerHTML += `
     <li class="perfil-musica">
                <img class="imagem" src="${musica.imagem}" alt="Foto de ${musica.nome}">
                <div class="infos-perfil-musica">
                    <h3 class="nome_cancao" >${musica.nome}</h3>
                    <h4 class="nome_album">${musica.album}</h4>
                    <h4 class="nome_artista">${musica.artista}</h4> 
                </div>
                <button class="add" onclick="carregarMusicasPlaylist(${musica.id})">
                    <img width="30" height="30" src="https://img.icons8.com/ios/30/ffffff/plus--v1.png" alt="plus--v1"/>
                </button>
            </li>
    `;
  });
}

function buscarTarefas() {
  fetch("http://localhost:3000/musicas")
    .then((res) => res.json())
    .then((res) => {
      inserirCancoes(res);
    });
}

buscarTarefas();

// function listaMusicasPlaylist(musicaID) {
//   playlist_container.innerHTML = "";
//   for (let index = 0; index < minhaPlaylistArray.length; index++) {
//     playlist_container.innerHTML += `
//         <li>
//                     <hr>
//                     <div class="info_playlist">
//                         <p>${minhaPlaylistArray[index].CancaoNome} - ${minhaPlaylistArray[index].CancaoArtista} </p>
//                         <img onclick="deletarCancaoPlaylist(${minhaPlaylistArray[index].id})" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/trash--v1.png" alt="trash--v1"/>
//                     </div>
//                     <hr>
//                 </li>
//         `;
//   }
// }

let minhaPlaylistArray = [];

function carregarMusicasPlaylist(musicaId) {
  fetch("http://localhost:3000/musicas")
    .then((res) => res.json())
    .then((res) => {
      const cancao = res.find((musica) => musica.id === musicaId);
      minhaPlaylistArray.push(cancao)
      alert("Música adicionada com sucesso!")
    });
}

function listarMusicasPlaylist(){
   playlist_container.innerHTML = "";
  minhaPlaylistArray.map( musica => {
    playlist_container.innerHTML += `
      <li>
                    <hr>
                    <div class="info_playlist">
                        <p>${musica.nome} - ${musica.artista} </p>
                        <img onclick="deletarCancaoPlaylist(${musica.id})" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/trash--v1.png" alt="trash--v1"/> 
                    </div>
                    <hr>
                </li>
    `;

  })
}

function deletarCancaoPlaylist(cancaoId) {
  minhaPlaylistArray = minhaPlaylistArray.filter(
    (cancao) => cancao.id != cancaoId
  );
  //  Deixa no array apenas as cancoes com ids diferentes do selecionado
  alert("Música apagada da plylist com sucesso");
  sairMinhaPlaylist()
}

function procurar() {
  const lis = document.querySelectorAll(".musicas li");
  console.log(lis)
  lis.forEach((li) => {
    const nomeCancao = li.querySelector(".nome_cancao").innerHTML;
    const nomeAlbum = li.querySelector(".nome_album").innerHTML;
    const nomeArtista = li.querySelector(".nome_artista").innerHTML;

    if (
      !nomeCancao.includes(input.value) &&
      !nomeAlbum.includes(input.value) &&
      !nomeArtista.includes(input.value)
    ) {
      li.classList.add("oculto");
    } else {
      li.classList.remove("oculto");
    }
  });
}
