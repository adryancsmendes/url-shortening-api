const header = document.getElementById("header");
const hamburguerIcon = document.getElementById("menu-hamburguer");
const logo = document.getElementById("header-nav-logo-img");
const navMenu = document.getElementById("header-nav-list");
//código para que, no evento de clique no ícone do menu hamburger, o menu possa ser mostrado e também recolhido

hamburguerIcon.addEventListener("click", () => {
   
    header.classList.toggle("active");
    
    //quando o header está ativo

    if (header.classList.contains("active")) {
        navMenu.classList.add("active");
        hamburguerIcon.src = "/images/icon-close.svg";
        document.body.style.overflowY = "hidden"
        //quando header nao esta ativo
    } else {
        navMenu.classList.remove("active");
        hamburguerIcon.src = "/images/icon-hamburger.svg";
        hamburguerIcon.classList.remove("active-img");
        document.body.style.overflowY = "visible"
    }
});

/*const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    encurtarUrl();

})

function encurtarUrl() {
    //validar se a url existe
    let url = document.getElementById("input-url").value;
    
    try {
        let urlValida = new URL(url)
        console.log("Valid URL!")
      } catch(err) {
          console.log("Invalid URL!")
          return
      }


    //encurtador de links
    let headers = {
        "Content-Type": "application/json",
        "apikey": "81924584c3c14052a125a1505b465a4a",
    }

    let linkRequest = {
        destination: document.getElementById("input-url").value,
        domain: { fullName: "rebrand.ly" }
    }

    fetch("https://api.rebrandly.com/v1/links", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(linkRequest)
    })
        .then(response => response.json())
        .then(json => {
            /*let input = document.getElementById("input-url");
            input.value = json.shortUrl;*/
/*
            let listaDeUrls = document.getElementById("urls-encurtadas");

            let urlAntesEncurtar = document.createElement("li");
            urlAntesEncurtar.innerText = document.getElementById("input-url").value;

            let urlEncurtada = document.createElement("li");
            urlEncurtada.innerText = json.shortUrl;

            let botaoCopiarUrl = document.createElement("button");
            botaoCopiarUrl.classList.add("button");
            botaoCopiarUrl.innerText = "Copy";

            let divUrl = document.createElement("ul");
            divUrl.classList.add("urls-encurtadas-items")

            urlEncurtada.appendChild(botaoCopiarUrl);

            divUrl.appendChild(urlAntesEncurtar);
            divUrl.appendChild(urlEncurtada);
            

            listaDeUrls.appendChild(divUrl);
        });
}
*/

let lastScrollTop = 0;

window.addEventListener('scroll', function (e) {
    //mesma posição
    if (e.scrollY === lastScrollTop) {
        header.style.display = "block"
    } else if (this.scrollY > lastScrollTop) {
        header.style.display = "none"
    } else {
        header.style.display = "block"
    }
    lastScrollTop = this.scrollY;
})

 