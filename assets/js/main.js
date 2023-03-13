// get the form element by its ID
const form = document.getElementById("form");
// add an event listener for the form submission event
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // call the shortenUrl function
    shortenUrl();
    // reset the form after 1.5 seconds
    setTimeout(() => {
        form.reset();
    }, 1500);

})

// retrieve the URLs array from local storage or initialize it as an empty array if it doesn't exist
const urls = JSON.parse(localStorage.getItem("urls")) || [];

// loop through the URLs array and create elements for each pair of URLs
urls.forEach((pairOfUrls) => {
    createElement(pairOfUrls)
})

// shorten url inserted by user
function shortenUrl() {
    // get necessary HTML elements
    const url = document.getElementById("input-url");
    const labelUrl = document.getElementById("label-url");
    const urls = JSON.parse(localStorage.getItem("urls")) || [];

    try {
        const urlObj = new URL(url.value);
    } catch (err) {
        // shows error message if url is invalid
        addErrorClass(url, labelUrl);
        return;
    }

    // if the URL is valid, remove the error message and remove the error class
    removeErrorClass(url, labelUrl);

    // object that will be sent in the request
    const linkRequest = {
        destination: url.value,
        domain: { fullName: "rebrand.ly" },
    };
    // request to shorten the URL
    fetch("https://api.rebrandly.com/v1/links", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apikey: "81924584c3c14052a125a1505b465a4a",
        },
        body: JSON.stringify(linkRequest),
    })
        .then((response) => response.json())
        .then((json) => {
            // create an object with the URL before and after being shortened
            const pairOfUrls = {
                urlBeforeShorten: url.value,
                shortenedUrl: json.shortUrl,
            };
            // add the URL pair to the URL array and save the array to localStorage
            urls.push(pairOfUrls);
            localStorage.setItem("urls", JSON.stringify(urls));
            // create the HTML element that displays the shortened URL
            createElement(pairOfUrls);
        });
}

// adds error classes to an input element and its corresponding label element to indicate that there is an error with the URL entered by the user.
function addErrorClass(inputElement, labelElement) {
    inputElement.classList.add("main-section-two-short-form-label-input-error");
    labelElement.classList.add("main-section-two-short-form-label-error")
}
// removes the error classes from an input element and its corresponding label element to indicate that the error has been corrected or the input is valid.
function removeErrorClass(inputElement, labelElement) {
    inputElement.classList.remove("main-section-two-short-form-label-input-error");
    labelElement.classList.remove("main-section-two-short-form-label-error")
}

// create a new HTML element containing the shortened url and the url before shortening
function createElement(item) {
    // Retrieves the unordered list element where the new list item will be appended to
    const urlsList = document.getElementById("main-section-two-shortened");

    // Creates a new div element for the URL before shortening
    const urlBeforeShortenElement = document.createElement("div");
    urlBeforeShortenElement.classList.add("main-section-two-shortened-items-current")
    urlBeforeShortenElement.innerText = item.urlBeforeShorten;

    // Creates a new div element for the shortened URL
    const urlShortenedElement = document.createElement("div");
    urlShortenedElement.classList.add("main-section-two-shortened-items-shortened")
    urlShortenedElement.innerText = item.shortenedUrl;

    // Creates a new <a> element to contain the copy button
    const linkDivCopyUrl = document.createElement("a");
    linkDivCopyUrl.classList.add("main-section-two-shortened-items-link");

    // Creates a new copy button element
    const buttonCopyUrl = document.createElement("button");
    buttonCopyUrl.classList.add("main-section-two-shortened-items-link-button");
    buttonCopyUrl.innerText = "Copy";
    // Sets the shortened URL as a data attribute on the copy button element
    buttonCopyUrl.setAttribute("data-shortened-url", item.shortenedUrl);

    // Creates a new <li> element to contain the div items and copy button
    const divUrl = document.createElement("li");
    divUrl.classList.add("main-section-two-shortened-items");

    // Appends the copy button to the <a> element
    linkDivCopyUrl.appendChild(buttonCopyUrl)

    // Appends the URL before shortening, shortened URL, and copy button to the <li> element
    divUrl.appendChild(urlBeforeShortenElement);
    divUrl.appendChild(urlShortenedElement);
    divUrl.appendChild(linkDivCopyUrl);

    // Appends the <li> element to the <ul>
    urlsList.appendChild(divUrl);

}

// add a click event listener to the document
document.addEventListener("click", (event) => {
    // find the closest copy button to the clicked element
    const clickedButton = event.target.closest(".main-section-two-shortened-items-link-button");

    // check if a copy button was found
    if (clickedButton) {
        // get the shortened URL value from the data-shortened-url attribute
        const shortenedUrlCopy = clickedButton.getAttribute("data-shortened-url");

        // copy the shortened URL to the clipboard
        navigator.clipboard.writeText(shortenedUrlCopy);

        // update the text and style of the button to indicate that the copy was successful
        clickedButton.innerText = "Copied!";
        clickedButton.style.background = "#3b3054";

        // set a timeout to revert the text and style of the button back to "Copy"
        setTimeout(() => {
            clickedButton.innerText = "Copy";
            clickedButton.style.background = "#2acfcf";
        }, 3000);
    }
});