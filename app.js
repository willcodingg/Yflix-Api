
var listaLinks = []
contadorDeFilmes = 0

function adicionarFilme() {
    var campoDoFilme = document.querySelector("#filme")
    var nomeDoFilme = campoDoFilme.value  
    // REQUEST DO FILME
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie?api_key=6ac040cdb08ce2085e436dba651a25aa&language=pt-BR&query=' + nomeDoFilme}
  
      axios.request(options).then(function (response) {
          // VERIFICANDO RESULTADO
          //var resultadoNoHTML = document.getElementById("resultado")
          //var resultado = "! FILME ENCONTRADO COM SUCESSO !"
          //resultadoNoHTML.innerHTML = resultado
        
          // PEGANDO INFOS DO FILME
          var dataDoFilme = response.data["results"][0]
          var idDoFilme = dataDoFilme["id"]
          var nomeDoFilme = dataDoFilme["original_title"]
          var imgDoFilme = "https://image.tmdb.org/t/p/w500/" + dataDoFilme["poster_path"] 
        
          // OUTRO REQUEST USANDO IDDOFILME PARA PEGAR O LINK DO TRAILER
          const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/' + idDoFilme + '/videos?api_key=6ac040cdb08ce2085e436dba651a25aa&language=en-US'}
      
          axios.request(options).then(function (response) {

            // COLOCANDO O LINK DO TRAILER NO HTML
            var keyDoTrailer = response.data["results"][0]["key"]
            var video = "https://www.youtube.com/embed/" + keyDoTrailer
            var trailer = document.getElementById("yt")
            trailer.src = video
            
            // MUDAR VIDEO FUNÇÃO NO HTML
            var linhaDoMudarVideo = "<a id='funcaoTrailer' href='#' " + "onClick='mudarVideo(" + contadorDeFilmes  + ")'" + ">"
            listaLinks[contadorDeFilmes] = video
            contadorDeFilmes = contadorDeFilmes + 1
            var linhaDoMudarVideoFinal = "</a>"
            // ADICIONAR POSTER
            var listaFilmes = document.querySelector("#listaFilmes")
            var elementoFilme = "<img src=" + imgDoFilme + " width=175 height=250>"
            listaFilmes.innerHTML = listaFilmes.innerHTML  + linhaDoMudarVideo + elementoFilme + linhaDoMudarVideoFinal


          })
        
      }).catch(function (error) {
          console.error(error);
          var resultadoNoHTML = document.getElementById("resultado")
          var resultado = "! FILME NÃO ENCONTRADO. Digite outro !"
          resultadoNoHTML.innerHTML = resultado
      });
  
  campoDoFilme.value = ""
  
  }

// FUNÇÃO PARA MUDAR O VIDEO DE ACORDO COM O CLICK NO POSTER
function mudarVideo(numeroDoFilme) {
    var trailer = document.getElementById("yt")
    trailer.src = listaLinks[numeroDoFilme]
    var resultadoNoHTML = document.getElementById("resultado")
    var resultado = ""
    resultadoNoHTML.innerHTML = resultado
}   