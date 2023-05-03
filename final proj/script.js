const jobForm = document.getElementById("job-form");
const jobTableBody = document.getElementById("job-table-body");
const sortByNameBtn = document.getElementById("sort-by-name-btn");
const sortByDateBtn = document.getElementById("sort-by-date-btn");
const sortByCompanyBtn = document.getElementById("sort-by-company-btn");

let jobs = [];

const sortedStatus = {
    // each value is "unsorted" || "sorted" || "reverse"
    jobname: "unsorted",
    companytitle: "unsorted",
    dateapplied: "unsorted"
};

// i can use git if you can see this

jobForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const jobName = document.getElementById("job-name").value;
    const companyTitle = document.getElementById("company-title").value;
    const dateApplied = document.getElementById("date-applied").value;
    const notes = document.getElementById("notes").value;

    const job = {
        jobName,
        companyTitle,
        dateApplied,
        notes,
    };

    jobs.push(job);

    displayJobs();

    jobForm.reset();
});

function displayJobs() {
    // Clear the table body first
    jobTableBody.innerHTML = "";

    // Filter the jobs array to remove any empty entries
    const filteredJobs = jobs.filter((job) => {
        return job.jobName.trim() !== "" &&
            job.companyTitle.trim() !== "" &&
            job.dateApplied.trim() !== "" &&
            job.notes.trim() !== "";
    });

    filteredJobs.forEach((job, index) => {
        const row = document.createElement("tr");

        const jobNameCell = document.createElement("td");
        jobNameCell.innerText = job.jobName;
        row.appendChild(jobNameCell);

        const companyTitleCell = document.createElement("td");
        companyTitleCell.innerText = job.companyTitle;
        row.appendChild(companyTitleCell);

        const dateAppliedCell = document.createElement("td");
        dateAppliedCell.innerText = job.dateApplied;
        row.appendChild(dateAppliedCell);

        const notesCell = document.createElement("td");
        notesCell.innerText = job.notes;
        row.appendChild(notesCell);

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            jobs.splice(index, 1);
            displayJobs();
        });
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        jobTableBody.appendChild(row);
    });
}






function sortByName() {
    switch (sortedStatus.jobname) {
        case ("unsorted"):
        case ("reverse"):
            jobs.sort((a, b) => a.jobName.localeCompare(b.jobName));
            displayJobs();
            sortedStatus.jobname = "sorted";
            break;
        case ("sorted"):
            jobs.sort((a, b) => a.jobName.localeCompare(b.jobName)).reverse();
            displayJobs();
            sortedStatus.jobname = "reverse";
            break;
    }

}

function sortByDate() {
    switch (sortedStatus.dateapplied) {
        case ("unsorted"):
            jobs.sort((a, b) => new Date(a.dateApplied) - new Date(b.dateApplied));
            displayJobs();
            sortedStatus.dateapplied = "sorted";
            break;
        case ("sorted"):
            jobs.sort((a, b) => new Date(a.dateApplied) - new Date(b.dateApplied)).reverse();
            displayJobs();
            sortedStatus.dateapplied = "reverse";
            break;
        case ("reverse"):
            jobs.sort((a, b) => a.jobName.localeCompare(b.jobName));
            displayJobs();
            sortedStatus.dateapplied = "unsorted";
            break;
    }
}

function sortByCompany() {
    switch (sortedStatus.companytitle) {
        case ("unsorted"):
            jobs.sort((a, b) => a.companyTitle.localeCompare(b.companyTitle));
            displayJobs();
            sortedStatus.companytitle = "sorted";
            break;
        case ("sorted"):
            jobs.sort((a, b) => a.companyTitle.localeCompare(b.companyTitle)).reverse();
            displayJobs();
            sortedStatus.companytitle = "reverse";
            break;
        case ("reverse"):
            jobs.sort((a, b) => a.jobName.localeCompare(b.jobName));
            displayJobs();
            sortedStatus.companytitle = "unsorted";
            break;
    }
}


sortByNameBtn.addEventListener("click", sortByName);
sortByDateBtn.addEventListener("click", sortByDate);
sortByCompanyBtn.addEventListener("click", sortByCompany);