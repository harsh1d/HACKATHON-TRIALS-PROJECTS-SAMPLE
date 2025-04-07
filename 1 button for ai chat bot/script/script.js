function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    
    // Display user message
    displayMessage("You: " + userInput);

    // Simple logic to respond or schedule an appointment
    if (userInput.toLowerCase().includes("more information")) {
        openModal();
        displayMessage("Bot: Please schedule an appointment for more detailed information.");
    } else {
        respondToUser(userInput);
    }

    // Clear input field
    document.getElementById("userInput").value = '';
}

function respondToUser(userInput) {
    let response = "Bot: I'm here to help with criminal cases. Please refer to the suggested questions or ask me anything specific.";
    
    if (userInput.toLowerCase().includes("possible defenses")) {
        response = "Bot: Possible defenses include alibi, self-defense, and insanity.";
    } else if (userInput.toLowerCase().includes("sentencing process")) {
        response = "Bot: The sentencing process involves a judge determining the appropriate punishment based on the crime and other factors.";
    } else if (userInput.toLowerCase().includes("appeal a decision")) {
        response = "Bot: To appeal a decision, you must file a notice of appeal with the court that issued the original decision.";
    } else if (userInput.toLowerCase().includes("legal aid")) {
        response = "Bot: Legal aid is available for those who cannot afford a lawyer. You can apply through your local legal aid office.";
    }

    displayMessage(response);
}

function displayMessage(message) {
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += "<p>" + message + "</p>";
}

function setInput(question) {
    document.getElementById("userInput").value = question;
}

function openModal() {
    document.getElementById("appointmentModal").style.display = "block";
}

function closeModal() {
    document.getElementById("appointmentModal").style.display = "none";
}

// Handle appointment form submission
document.getElementById("appointmentForm").onsubmit = function(event) {
   event.preventDefault();
   const name = document.getElementById("name").value;
   const email = document.getElementById("email").value;
   const date = document.getElementById("date").value;
   alert(`Appointment scheduled successfully!\nName: ${name}\nEmail: ${email}\nDate: ${date}`);
   closeModal();
};
