let students = [];

fetch("current.json?t=" + Date.now(), { cache: "no-store" })
    .then(response => response.json())
    .then(config => {

        return fetch(config.currentFile + "?t=" + Date.now(), {
            cache: "no-store"
        });

    })
    .then(response => response.json())
    .then(data => {

        students = data.records;

        console.log("Loaded:", data.records.length, "students");

    })
    .catch(error => {

        console.error(error);

        document.getElementById("result").innerHTML =
            "<h2 style='color:red'>Unable to load seating data.</h2>";

    });
