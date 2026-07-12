let students = [];

// Load current published seating file
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

        console.log("Loaded:", students.length, "students");

    })
    .catch(error => {

        console.error(error);

        document.getElementById("result").innerHTML =
            "<h2 style='color:red'>Unable to load seating data.</h2>";

    });

// Search button
document.getElementById("searchBtn").addEventListener("click", searchStudent);

// Allow Enter key
document.getElementById("rollNo").addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        searchStudent();
    }

});

function searchStudent() {

    const roll = document.getElementById("rollNo").value.trim();

    if (roll === "") {

        document.getElementById("result").innerHTML =
            "<h2 style='color:red'>Please enter a Roll Number.</h2>";

        return;

    }

    console.log("Searching:", roll);

    const student = students.find(
        s => String(s.rollNo).trim() === roll
    );

    if (!student) {

        document.getElementById("result").innerHTML =
            "<h2 style='color:red'>Student Not Found</h2>";

        return;

    }

    const formattedDate = new Date(student.examDate).toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    document.getElementById("result").innerHTML = `
        <h2>${student.studentName}</h2>

        <p><b>Roll No:</b> ${student.rollNo}</p>

        <p><b>Paper Code:</b> ${student.paperCode}</p>

        <p><b>Building:</b> ${student.building}</p>

        <div class="room-number">
            Room No. ${student.roomNo}
        </div>

        <p><b>Seat:</b> ${student.seatPosition}</p>

        <p><b>Date:</b> ${formattedDate}</p>

        <p><b>Shift:</b> ${student.shift}</p>
    `;

}
