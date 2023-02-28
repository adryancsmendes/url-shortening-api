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

//codigo para esconder o header quando o user rola pra baixo e quando rola pra cima ele aparecer
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

//codigo para envio do formulario
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    shortenUrl();

    setTimeout(() => {
        form.reset();
    }, 1500);

})

//codigo para renderizar elementos no html
const urls = JSON.parse(localStorage.getItem("urls")) || [];

urls.forEach((url) => {
    createElement(url)
})

//função para encurtar as urls
function shortenUrl() {
    //validar se a url existe
    let url = document.getElementById("input-url");
    let labelUrl = document.getElementById("label-url");
    // Usando a API URL para validar a URL
    let urlValida = false;
    try {
        urlValida = Boolean(new URL(url.value));
    } catch (err) {
        // URL inválida
    }

    if (!urlValida) {
        console.log("Invalid URL!");
        addErrorClass(url, labelUrl);
        return;
    }

    console.log("Valid URL!");
    removeErrorClass(url, labelUrl);


    //encurtador de links
    let headers = {
        "Content-Type": "application/json",
        "apikey": "81924584c3c14052a125a1505b465a4a",
    }

    let linkRequest = {
        destination: url.value,
        domain: { fullName: "rebrand.ly" }
    }

    fetch("https://api.rebrandly.com/v1/links", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(linkRequest)
    })
        .then(response => response.json())
        .then(json => {
            let urlBeforeShorten = url.value;
            let urlShortened = json.shortUrl;

            //cria um objeto contendo como chaves as urls antes de encurtar e após encurtar
            const pairOfUrls = {
                "urlBeforeShorten": urlBeforeShorten,
                "shortenedUrl": urlShortened
            }

            urls.push(pairOfUrls);

            localStorage.setItem("urls", JSON.stringify(urls));
            createElement(pairOfUrls);
        });

}

//funções para adicionar ou remover a classe erro caso não seja enviado uma URL válida
function addErrorClass(inputElement, labelElement) {
    if (!inputElement.classList.contains("main-section-two-short-form-label-input-error") && !labelElement.classList.contains("main-section-two-short-form-label-error")) {
        inputElement.classList.add("main-section-two-short-form-label-input-error");
        labelElement.classList.add("main-section-two-short-form-label-error")
    }
}

function removeErrorClass(inputElement, labelElement) {
    if (inputElement.classList.contains("main-section-two-short-form-label-input-error") && labelElement.classList.contains("main-section-two-short-form-label-error")) {
        inputElement.classList.remove("main-section-two-short-form-label-input-error");
        labelElement.classList.remove("main-section-two-short-form-label-error")
    }
}

//função para criar um novo elemento HTML contendo a url encurtada e a url antes de encurtar
function createElement(item) {
    let urlsList = document.getElementById("main-section-two-shortened");

    let urlBeforeShortenElement = document.createElement("li");
    urlBeforeShortenElement.classList.add("main-section-two-shortened-items-current")
    urlBeforeShortenElement.innerText = item.urlBeforeShorten;

    let urlShortenedElement = document.createElement("li");
    urlShortenedElement.classList.add("main-section-two-shortened-items-shortened")
    urlShortenedElement.innerText = item.shortenedUrl;

    let linkDivCopyUrl = document.createElement("a");
    linkDivCopyUrl.classList.add("main-section-two-shortened-items-link");

    let buttonCopyUrl = document.createElement("button");
    buttonCopyUrl.classList.add("main-section-two-shortened-items-link-button");
    buttonCopyUrl.innerText = "Copy";

    let divUrl = document.createElement("ul");
    divUrl.classList.add("main-section-two-shortened-items");

    linkDivCopyUrl.appendChild(buttonCopyUrl)

    divUrl.appendChild(urlBeforeShortenElement);
    divUrl.appendChild(urlShortenedElement);
    divUrl.appendChild(linkDivCopyUrl);

    urlsList.appendChild(divUrl);

    const buttonsCopy = document.querySelectorAll(".main-section-two-shortened-items-link-button");

    buttonsCopy.forEach((button) => {
        button.addEventListener("click", (event) => {
            let clickedButtonDiv = event.target;
            let shortenedUrlCopy = clickedButtonDiv.parentNode.parentNode.children[1].innerText;

            navigator.clipboard.writeText(shortenedUrlCopy);
            button.innerText = "Copied!"
            button.style.background = "#3b3054";

            setTimeout(() => {
                button.innerText = "Copy"
                button.style.background = "#2acfcf";
            }, 3000)
        })
    });
}
