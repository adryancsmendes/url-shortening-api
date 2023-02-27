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


//codigo para formulario
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    encurtarUrl();

    setTimeout(() => {
        form.reset();
    }, 1500);

})

function encurtarUrl() {
    //validar se a url existe
    let url = document.getElementById("input-url");
    let labelUrl = document.getElementById("label-url");
    try {
        let urlValida = new URL(url.value)
        console.log("Valid URL!")
        if(url.classList.contains("main-section-two-short-form-label-input-error") && labelUrl.classList.contains("main-section-two-short-form-label-error")){
            url.classList.remove("main-section-two-short-form-label-input-error");
            labelUrl.classList.remove("main-section-two-short-form-label-error")
            }
    } catch (err) {
        console.log("Invalid URL!")
        if(!url.classList.contains("main-section-two-short-form-label-input-error") && !labelUrl.classList.contains("main-section-two-short-form-labelerror")){
        url.classList.add("main-section-two-short-form-label-input-error");
        labelUrl.classList.add("main-section-two-short-form-label-error")
        }
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

            let urlsList = document.getElementById("main-section-two-shortened");

            let urlBeforeShorten = document.createElement("li");
            urlBeforeShorten.classList.add("main-section-two-shortened-items-current")
            urlBeforeShorten.innerText = document.getElementById("input-url").value;

            let urlShortened = document.createElement("li");
            urlShortened.classList.add("main-section-two-shortened-items-shortened")
            urlShortened.innerText = json.shortUrl;

            let linkDivCopyUrl = document.createElement("a");
            linkDivCopyUrl.classList.add("main-section-two-shortened-items-link");

            let buttonCopyUrl = document.createElement("button");
            buttonCopyUrl.classList.add("main-section-two-shortened-items-link-button");
            /*buttonCopyUrl.setAttribute("onclick","copyShortenedLink()");*/
            buttonCopyUrl.innerText = "Copy";

            let divUrl = document.createElement("ul");
            divUrl.classList.add("main-section-two-shortened-items");

            linkDivCopyUrl.appendChild(buttonCopyUrl)

            divUrl.appendChild(urlBeforeShorten);
            divUrl.appendChild(urlShortened);
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
                })
            })

        });
}






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

