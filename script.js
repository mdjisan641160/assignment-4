const initialJobs = [
    { id: 1, companyName: "Akij Group", position: "Manager", location: "Dhaka", type: "Full-time", salary: "35k", description: "Work on Akij Group of industries as a manager", status: 'all' },
    { id: 2, companyName: "Bashundra", position: "Senior Officer", location: "Dhaka", type: "Full-Time", salary: "40k", description: "Work on bashundra Company As a Senior officer.", status: 'all' },
    { id: 3, companyName: "Square", position: "Marketing", location: "Khulna", type: "Full-Time", salary: "30k", description: "Work on Square company limited as a Marketing officer .", status: 'all' },
    { id: 4, companyName: "ACI", position: "Worker", location: "Dhaka", type: "Full-time", salary: "20k", description: "Work on ACI as a worker.", status: 'all' },
    { id: 5, companyName: "Pathao", position: "Backend Engineer", location: "Dhaka (Remote)", type: "Full-time", salary: "50k", description: "Work on Pathao as a backend engineer .", status: 'all' },
    { id: 6, companyName: "bKash", position: "Software Quality Assurance", location: "Rajshai", type: "Full-time", salary: "45k", description: "Work in Bkash as a Software quality assurance.", status: 'all' },
    { id: 7, companyName: "Ten Minute School", position: "Content Developer", location: "Dhaka", type: "Full-Time", salary: "35k", description: "Work in Ten Minute School As a Content Developer.", status: 'all' },
    { id: 8, companyName: "Shikho", position: "UI/UX Designer", location: "Banani", type: "Full-time", salary: "20k", description: "Work in Shikho as a UX Designer.", status: 'all' }
];

let jobs = [...initialJobs];
let currentFilter = 'all';

function renderJobs() {
    const container = document.getElementById('jobs-container');
    const emptyState = document.getElementById('empty-state');
    const filtered = jobs.filter(job => currentFilter === 'all' ? true : job.status === currentFilter);

    container.innerHTML = "";
    
    if (filtered.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
    } else {
        container.classList.remove('hidden');
        emptyState.classList.add('hidden');
        
        filtered.forEach(job => {
            container.innerHTML += `
                <div class="card bg-white shadow-xl border p-5">
                    <h3 class="font-bold text-lg">${job.position}</h3>
                    <p class="text-sm text-blue-600 font-medium">${job.companyName}</p>
                    <div class="my-2 text-sm text-gray-500">
                        <span>📍 ${job.location}</span> | <span>💼 ${job.type}</span>
                    </div>
                    <p class="text-green-600 font-bold mb-3">${job.salary}</p>
                    <p class="text-xs text-gray-400 mb-4">${job.description}</p>
                    <div class="flex gap-2 mt-auto">
                        <button onclick="updateStatus(${job.id}, 'interview')" class="btn btn-sm btn-outline btn-info flex-1">Interview</button>
                        <button onclick="updateStatus(${job.id}, 'rejected')" class="btn btn-sm btn-outline btn-error flex-1">Rejected</button>
                    </div>
                    <button onclick="deleteJob(${job.id})" class="mt-2 text-xs text-red-400 hover:underline">Remove Card</button>
                </div>
            `;
        });
    }
    updateDashboard();
}

function updateStatus(id, newStatus) {
    const jobIndex = jobs.findIndex(j => j.id === id);
    jobs[jobIndex].status = newStatus;
    renderJobs();
}

function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    renderJobs();
}

function switchTab(tab, element) {
    currentFilter = tab;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));
    element.classList.add('tab-active');
    renderJobs();
}

function updateDashboard() {
    document.getElementById('count-interview').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('count-rejected').innerText = jobs.filter(j => j.status === 'rejected').length;
    document.getElementById('total-jobs').innerText = jobs.length;
}

// Initial Call
renderJobs();