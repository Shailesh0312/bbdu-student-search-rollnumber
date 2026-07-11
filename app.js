let students = [];

fetch("verified_seating_2026_05_20_evening.json")
    .then(response => response.json())
    .then(data => {

        students = data.records;

        console.log("Student records loaded:", students.length);

    })
    .catch(error => {

        console.error(error);

        document.getElementById("result").innerHTML =
            "Unable to load JSON";

    });

document.getElementById("searchBtn").addEventListener("click", searchStudent);

function searchStudent() {

    const roll = document.getElementById("rollNo").value.trim();

    const student = students.find(s => s.rollNo === roll);

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
