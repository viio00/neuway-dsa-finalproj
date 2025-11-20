const selector = document.getElementById("Location-select");
const displayImageimage = document.getElementById("displayImage");
selector.addEventListener("change", () => {
    const value = selector.value;

    if (value == ""){
        image.style.display = "none";
        return;
    }

    if (value == "chynnaCute"){
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
});
