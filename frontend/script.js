const form = document.getElementById("ticketForm");
const successMsg = document.getElementById("successMsg");
const ticketList = document.getElementById("ticketList");

const sampleTickets = [
  {
    id: 1,
    subject: "Unable to login",
    status: "Open",
    category: "Technical"
  },
  {
    id: 2,
    subject: "Incorrect billing",
    status: "In Progress",
    category: "Billing"
  },
  {
    id: 3,
    subject: "Feature request",
    status: "Resolved",
    category: "General"
  }
];
function displayTickets() {
  ticketList.innerHTML = ""; 

  sampleTickets.forEach(ticket => {
    const ticketDiv = document.createElement("div");
    ticketDiv.classList.add("ticket-item");

    ticketDiv.innerHTML = `
      <h4>${ticket.subject}</h4>
      <p><strong>Status:</strong> ${ticket.status}</p>
      <p><strong>Category:</strong> ${ticket.category}</p>
    `;

    ticketList.appendChild(ticketDiv);
  });
}

// Handle form submission
form?.addEventListener("submit", function (e) {
  e.preventDefault();

  // Show success message
  successMsg.style.display = "block";

  // Optionally add ticket to the sample list (if form fields are available)
  const subjectInput = form.querySelector('input[name="subject"]');
  const statusInput = form.querySelector('select[name="status"]');
  const categoryInput = form.querySelector('select[name="category"]');

  if (subjectInput && statusInput && categoryInput) {
    const newTicket = {
      id: sampleTickets.length + 1,
      subject: subjectInput.value,
      status: statusInput.value,
      category: categoryInput.value
    };

    sampleTickets.push(newTicket);
    displayTickets(); 
  }

  form.reset();

  setTimeout(() => {
    successMsg.style.display = "none";
  }, 5000);
});

displayTickets();
