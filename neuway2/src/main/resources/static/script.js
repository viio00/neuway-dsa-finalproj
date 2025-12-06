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

async function fetchSuggestion(inputElement) {
    const value = inputElement.value.trim();
    const listId = inputElement.id === "start" ? "suggestions-start" : "suggestions-destination";
    const list = document.getElementById(listId);
    list.innerHTML = "";

    if (value.length === 0) return;

    try {
        const response = await fetch("/dijkstra/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prefix: value })
        });

        const items = await response.json();

        items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;

            li.onclick = () => {
                inputElement.value = item;
                list.innerHTML = ""; // hide suggestions
            };

            list.appendChild(li);
        });
    } catch (err) {
        console.error("Error fetching suggestions:", err);
    }
}

async function handleFindPath() {
    const start = document.getElementById("start").value;
    const destination = document.getElementById("destination").value;

    if (!start || !destination) {
        alert("Please enter both start and destination.");
        return;
    }

    try {
        const response = await fetch('/dijkstra', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ start, destination })
        });
        const data = await response.json();
        console.log("Path result:", data);
        // Here you can update your distance, other routes, and image
    } catch (err) {
        console.error("Error computing path:", err);
    }
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

async function fetchSuggestion(inputElement) {
    const value = inputElement.value.trim();

    // Pick correct <ul>
    const listId = inputElement.id === "start"
        ? "suggestions-start"
        : "suggestions-destination";

    const list = document.getElementById(listId);
    list.innerHTML = "";

    // Stop if empty
    if (value.length === 0) return;

    try {
        const response = await fetch("/dijkstra/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prefix: value })
        });

        const items = await response.json();

        items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;

            li.onclick = () => {
                inputElement.value = item;
                list.innerHTML = ""; // hide suggestions
            };

            list.appendChild(li);
        });
    } catch (err) {
        console.error("Error fetching suggestions:", err);
    }
}

