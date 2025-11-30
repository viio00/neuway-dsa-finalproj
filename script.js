//Suggestions for Location
//Stored Values
const suggestionsList = [
    "A. Gate",
    "B. Main Blg",
    "C. Library",
    "D. IS Blg",
    "E. PSB",
    "F. Secret Garden",
    "G. SOM"
];
//Get the HTML elements
function searchBox(inputId, suggestionsId, suggestionsList){

const input = document.getElementById(inputId)
const suggestionsBox = document.getElementById(suggestionsId)

//When you type something,this happens
input.addEventListener("input", () => {
    const value = input.value.toLowerCase();

    //Clears the old suggestions
    suggestionsBox.innerHTML = "";
    
    //Hide suggestion if value is nothing
    if (!value){
        suggestionsBox.style.display = "none";
        return;
    }

    //Find matching
    const filtered = suggestionsList.filter(item =>
        item.toLowerCase().includes(value)
    );

    //If no matches this hides the suggestions
    if (filtered.length == 0){
        suggestionsBox.style.display = "none";
        return;
    }

    //Show each matching suggestion
    filtered.forEach(item => {
        const li = document.createElement("li")
        li.textContent = item;

        //when you click a suggestion it appears on the search box
        li.onclick = () => {
            input.value = item;
            suggestionsBox.style.display = "none";
            showImage();
        };
        suggestionsBox.appendChild(li);
    });
    suggestionsBox.style.display = "block";
});

//When you click on the search box it shows all the suggestions
input.addEventListener("focus", () => {
    if (suggestionsList.length > 0) {
        showAllSuggestions();
    }
});

//Shows all suggestions
function showAllSuggestions() {
    suggestionsBox.innerHTML = "";

    suggestionsList.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        
        //After clicking a suggestion, suggestions disappears
        li.onclick = () => {
            input.value = item;
            suggestionsBox.style.display = "none";
            showImage();
        };
        suggestionsBox.appendChild(li);
    });
    suggestionsBox.style.display = "block";
}}
//Call the function
searchBox("searchLocation", "suggestionsLocation", suggestionsList);
searchBox("searchDestination", "suggestionsDestination", suggestionsList);

/////////////////////////////////////////////////////////////////////////////////////

const searchLocation = document.getElementById("searchLocation");
const searchDestination = document.getElementById("searchDestination");
const routeImages = document.getElementById("displayImage");

const displayImageList = {
    "A. Gate-B. Main Blg": "A-B.jpg", "B. Main Blg-A. Gate": "A-B.jpg", 
    "A. Gate-C. Library": "A-C.jpg", "C. Library-A. Gate": "A-C.jpg",
    "A. Gate-D. IS Blg": "A-D.jpg", "D. IS Blg-A. Gate": "A-D.jpg",
    "A. Gate-E. PSB": "A-E.jpg", "E. PSB-A. Gate": "A-E.jpg",
    "A. Gate-F. Secret Garden": "A-F.jpg", "F. Secret Garden-A. Gate": "A-F.jpg",
    "A. Gate-G. SOM": "A-G.jpg", "G. SOM-A. Gate": "A-G.jpg",

    "B. Main Blg-C. Library": "B-C.jpg", "B. Main Blg-C. Library": "B-C.jpg",
    "B. Main Blg-D. IS Blg": "B-D.jpg", "D. IS Blg-B. Main Blg": "B-D.jpg",
    "B. Main Blg-E. PSB": "B-E.jpg", "E. PSB-B. Main Blg": "B-E.jpg",
    "B. Main Blg-F. Secret Garden": "B-F.jpg", "F. Secret Garden-B. Main Blg": "B-F.jpg",
    "B. Main Blg-G. SOM": "B-G.jpg", "B. Main Blg-G. SOM": "B-G.jpg",

    "C. Library-D. IS Blg": "C-D.jpg", "D. IS Blg-C. Library": "C-D.jpg",
    "C. Library-E. PSB": "C-E.jpg", "E. PSB-C. Library": "C-E.jpg",
    "C. Library-F. Secret Garden": "C-F.jpg", "F. Secret Garden-C. Library": "C-F.jpg",
    "C. Library-G. SOM": "C-G.jpg", "G. SOM-C. Library": "C-G.jpg",
    
    "D. IS Blg-E. PSB": "D-E.jpg", "E. PSB-D. IS Blg": "D-E.jpg",
    "D. IS Blg-F. Secret Garden": "D-F.jpg", "F. Secret Garden-D. IS Blg": "D-F.jpg",
    "D. IS Blg-G. SOM": "D-G.jpg", "G. SOM-D. IS Blg": "D-G.jpg"

    
    //"A. Gate"
    //"B. Main Blg"
    //"C. Library"
    //"D. IS Blg"
    //"E. PSB"
    //"F. Secret Garden"
    //"G. SOM"
};

function showImage(){
    routeImages.style.display = "none";

    const key = searchLocation.value + "-" + searchDestination.value;

    if (displayImageList[key]){
        routeImages.src = displayImageList[key];
        routeImages.style.display = "block";
    }
}
searchLocation.addEventListener("input", showImage);
searchDestination.addEventListener("input", showImage);
