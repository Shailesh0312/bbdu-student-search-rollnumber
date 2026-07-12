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
            "<h2 style='color:red;text-align:center;'>Please enter your University Roll Number.</h2>";

        return;

    }

    const student = students.find(
        s => String(s.rollNo).trim() === roll
    );

    if (!student) {

        document.getElementById("result").innerHTML =
            `<h2 style="color:red;text-align:center;">
                No seating record found.<br><br>
                Please verify your University Roll Number.
            </h2>`;

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

<div class="student-card">

<h2>${student.studentName}</h2>

<hr>

<p><strong>University Roll Number</strong></p>
<p>${student.rollNo}</p>

<hr>

<p><strong>Paper Code</strong></p>
<p style="font-size:28px;font-weight:bold;color:#002B5C;">
${student.paperCode}
</p>

<hr>

<p><strong>Building</strong></p>
<p>${student.building}</p>

<div class="room-number">

ROOM NO.<br>

${student.roomNo}

</div>

<p><strong>Seat Position</strong></p>
<p style="font-size:24px;font-weight:bold;">
${student.seatPosition}
</p>

<hr>

<p><strong>Examination Date</strong></p>
<p>${formattedDate}</p>

<hr>

<p><strong>Shift</strong></p>
<p>${student.shift}</p>

</div>

`;

}
