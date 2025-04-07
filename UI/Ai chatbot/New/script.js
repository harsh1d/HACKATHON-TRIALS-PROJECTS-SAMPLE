let pdfText = "";

// Initialize UI state
document.addEventListener('DOMContentLoaded', function() {
  // Disable question input and ask button until PDF is loaded
  document.getElementById("question").disabled = true;
  document.getElementById("askButton").disabled = true;
});

document.getElementById("uploadButton").onclick = async function () {
  const fileInput = document.getElementById("fileInput");

  if (fileInput.files.length === 0) {
    alert("Please select a PDF file.");
    return;
  }

  const file = fileInput.files[0];

  // Read the PDF file
  const reader = new FileReader();

  reader.onload = async function (event) {
    try {
      const typedarray = new Uint8Array(event.target.result);
      const pdf = await pdfjsLib.getDocument(typedarray).promise;
      
      // Extract text from each page
      let textContent = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const text = await page.getTextContent();
        textContent += `Page ${i}\n${text.items.map((item) => item.str).join(" ")}\n\n`;
      }

      pdfText = textContent; // Store extracted text
      
      // Display the extracted text in a pre-formatted element
      const contentDiv = document.getElementById("pdfContent");
      contentDiv.innerHTML = `<pre>${textContent}</pre>`;
      contentDiv.classList.remove("hidden");
      
      document.getElementById("question").disabled = false;
      document.getElementById("askButton").disabled = false;
    } catch (error) {
      alert("Error processing PDF: " + error.message);
    }
  };

  reader.readAsArrayBuffer(file);
};

document.getElementById("askButton").onclick = function () {
  const question = document.getElementById("question").value.trim().toLowerCase();
  
  if (!question) {
    alert("Please enter a question");
    return;
  }

  // Improved answer generation
  let answer = "Sorry, I couldn't find relevant information in the document.";
  const searchText = pdfText.toLowerCase();
  
  if (searchText.includes(question)) {
    // Find the context around the matched text
    const index = searchText.indexOf(question);
    const start = Math.max(0, index - 100);
    const end = Math.min(searchText.length, index + question.length + 100);
    const context = pdfText.slice(start, end).trim();
    
    answer = `Found relevant context:\n\n"...${context}..."`;
  }

  document.getElementById("answer").innerHTML = `<pre>${answer}</pre>`;
};
