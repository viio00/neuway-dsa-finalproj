const searchLocation = document.getElementById("searchLocation");
const searchDestination = document.getElementById("searchDestination");
const displayImage = document.getElementById("displayImage");

const displayImageList = {
    "": "A-B.jpg",
    "": "A-C.jpg",
    "": "A-D.jpg", 
    "": "A-E.jpg",
    "": "A-F.jpg",
    "": "A-G.jpg",

    "": "B-C.jpg",
    "": "B-D.jpg",
    "": "B-E.jpg", 
    "": "B-F.jpg",
    "": "B-G.jpg",

    "": "C-D.jpg",
    "": "C-E.jpg",
    "": "C-F.jpg",
    "": "C-G.jpg",
    
    "": "D-E.jpg",
    "": "D-F.jpg",
    "": "D-G.jpg",

    "": "E-G.jpg",
    "": "E-F.jpg",

    "": "F-G.jpg"
};
//Function for showing images
function showImage(key){
    displayImage.style.display = "none";

    if (displayImageList[key]){
        displayImage.src = displayImageList[key];
        displayImage.style.display = "block";
    } else {
        displayImage.src = "images/default.png";
        displayImage.style.display = "block";
    }
}
//Event Listener of submit button
document.getElementById("submit").addEventListener("click", async () => {

    const location = document.getElementById("searchLocation").value;
    const destination = document.getElementById("searchDestination").value;

if (!location || !destination){
    alert("Enter both location and destination");
    return;
} 
    try {
        const response = await fetch("/dijkstra", {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                searchLocation: location,
                searchDestination: destination,
            })
    });

        const data = await response.json();

        showImage(data.result);

        document.getElementById("distance").textContent = data.distance || "XX m";
    
        document.getElementById("routes").textContent = data.routes || "Other routes";

    } catch (err) {
        console.error("Error fetching path:", err);
        alert("Failed to find path. Please try again.");
    }
});