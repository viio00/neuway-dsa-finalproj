/*const selector = document.getElementById("Location-select");
const displayImageimage = document.getElementById("displayImage");
selector.addEventListener("change", () => {
    const value = selector.value;

    if (value == ""){
        image.style.display = "none";
        return;
    }

    if (value == "1"){
        displayImage.src = "chynnaCute.jpg";
    } else if (value == "chynnaAdorable"){
        displayImage.src = "chynnaAdorable.jpg";
    } else if (value == "chynnaAmazing"){
        displayImage.src = "chynnaAmazing.jpg";
    } else if (value == "chynnaGanda"){
        displayImage.src = "chynnaGanda.jpg";
    } else if (value == "chynnaMatalino"){
        displayImage.src = "chynnaMatalino.jpg";
    } 

    displayImage.style.display = "block"

});*/

const suggestionsList = [
    "Chynna Maganda",
    "Chynna Smart",
    "Chynna Pretty",
    "Chynna Adorable",
    "Chynna Magaling",
    "Chynna Cute"
];

const input = document.getElementById("searchLocation")
const suggestionsBox = document.getElementById("suggestions")

input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    suggestionsBox.innerHTML = "";
    
    if (!value){
        suggestionsBox.style.display = "none";
        return;
    }

    const filtered = suggestionsList.filter(item =>
        item.toLowerCase().includes(value)
    );

    if (filtered.length == 0){
        suggestionsBox.style.display = "none";
        return;
    }
    filtered.forEach(item => {
        const li = document.createElement("li")
        li.textContent = item;
        li.onclick = () => {
            input.value = item;
            suggestionsBox.style.display = "none";
        };
        suggestionsBox.appendChild(li);
    });
    suggestionsBox.style.display = "block";
});

input.addEventListener("focus", () => {
    if (suggestionsList.length > 0) {
        showAllSuggestions();
    }
});

function showAllSuggestions() {
    suggestionsBox.innerHTML = "";

    suggestionsList.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;

        li.onclick = () => {
            input.value = item;
            suggestionsBox.display.style = "none";
        };
        suggestionsBox.appendChild(li);
    });
    suggestionsBox.style.display = "block";
}
    
