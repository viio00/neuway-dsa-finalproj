const displayImageList = {
    "GATEMAINBLG": "Objects/GateMain.png",
    "MAINBLGGATE": "Objects/GateMain.png",

    "GATELIBRARY": "Objects/GateLib.png",
    "LIBRARYGATE": "Objects/GateLib.png",

    "GATESECRETGARDEN": "Objects/GateSega.png",
    "SECRETGARDENSEGA": "Objects/GateSega.png",

    "GATESOM": "Objects/GateSOM.png",
    "SOMGATE": "Objects/GateSOM.png",

    "GATEISBLG": "Objects/GateIS.png",
    "ISBLGGATE": "Objects/GateIS.png",

    "GATEPSB": "Objects/GatePSB.png",
    "PSBGATE": "Objects/GatePSB.png",

    "MAINBLGLIBRARY": "Objects/MainLib.png",
    "LIBRARYMAINBLG": "Objects/MainLib.png",

    "MAINBLGISBLG": "Objects/MainIS.png",
    "ISBLGMAINBLG": "Objects/MainIS.png",

    "MAINBLGPSB": "Objects/MainPSB.png",
    "PSBMAINBLG": "Objects/MainPSB.png",

    "MAINBLGSECRETGARDEN": "Objects/MainSega.png",
    "SECRETGARDENMAINBLG": "Objects/MainSega.png",

    "MAINBLGSOM": "Objects/MainSOM.png",
    "SOMMAINBLG": "Objects/MainSOM.png",

    "LIBRARYISBLG": "Objects/LibIS.png",
    "ISBLGLIBRARY": "Objects/LibIS.png",

    "LIBRARYPSB": "Objects/LibPSB.png",
    "PSBLIBRARY": "Objects/LibPSB.png",

    "LIBRARYSECRETGARDEN": "Objects/LibSega.png",
    "SECRETGARDENLIBRARY": "Objects/LibSega.png",

    "LIBRARYSOM": "Objects/LibSOM.png",
    "SOMLIBRARY": "Objects/LibSOM.png",

    "LIBRARYSOM": "Objects/LibSOM.png",
    "SOMLIBRARY": "Objects/LibSOM.png",

    "ISBLGPSB": "Objects/ISPSB.png",
    "PSBISBLG": "Objects/ISPSB.png",

    "ISBLGSECRETGARDEN": "Objects/ISSega.png",
    "SECRETGARDEISBLG": "Objects/ISSega.png",

    "ISBLGSOM": "Objects/ISSOM.png",
    "SOMISBLG": "Objects/ISSOM.png",

    "PSBSOM": "Objects/PSBSOM.png",
    "SOMPSB": "Objects/PSBSOM.png",
};

function showRouteImage(start, destination) {
    const clean = s => s.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const key = clean(start) + clean(destination);
    const rev = clean(destination) + clean(start);

    if (displayImageList[key]) {
        showImage(key);          // valid → show image
    } else if (keyArray.includes(rev)) {
        showImage(rev); 
    } else {
        showError("This route does not exist in the map.");
        showDefaultImage();
    }
}

//Function for showing images
function showImage(key){
    displayImage.style.display = "none";

    if (displayImageList[key]){
        displayImage.src = displayImageList[key];
        displayImage.style.display = "block";
    } else {
        displayImage.src = "Objects/NEU.png";
        displayImage.style.display = "block";
    }
}
function handleFindPath() {
    const start = document.getElementById("start").value;
    const destination = document.getElementById("destination").value;
    computePath();
    getAllPaths();
    showRouteImage(start, destination);
}

//for backend (distace & other routes)
async function computePath() {
    const start = document.getElementById('start').value;
    const destination = document.getElementById('destination').value;

    makeKey(startInput, destinationInput)

    const response = await fetch('/dijkstra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start, destination })
    });

    const data = await response.json();
    const distanceDiv = document.getElementById('distance');        
    distanceDiv.innerHTML = `${data.totalDistance} <span style="font-size: 14px;"> meters</span>`;
}

 async function getAllPaths() {
    const start = document.getElementById('start').value;
    const destination = document.getElementById('destination').value;

    const response = await fetch('/dijkstra/all-paths', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start, destination })
    });

    const data = await response.json();
    let out = "";
            
    data.forEach((route, i) => {
        out += `${i + 1}. ${route.path} | ${route.distance} meters\n`;
    });

    document.getElementById('result2').textContent = out;
}


//Event Listener of findPath button
document.getElementById("findPath").addEventListener("click", async () => {

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
        //Image
        showImage(data.result);
        //Distance
        document.getElementById("distance").textContent = data.distance || "XX m";
        //Other Routes
        document.getElementById("otherRoutes").textContent = data.routes || "Other routes";

    } catch (err) {
        console.error("Error fetching path:", err);
        alert("Failed to find path. Please try again.");
    }
});