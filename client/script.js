
// Upload handler
const uploadForm = document.getElementById("uploadForm");
if (uploadForm) {
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(uploadForm);
    try {
      const res = await fetch("http://localhost:5000/api/papers/upload", {
        method: "POST",
        body: formData,
      });
      const msg = await res.text();
      document.getElementById("uploadMsg").innerText = "✅ Uploaded successfully!";
    } catch (err) {
      document.getElementById("uploadMsg").innerText = "❌ Upload failed.";
    }
  });
}

// Search handler
async function searchPapers() {

  const subject = document.getElementById("subject").value;
  const year = document.getElementById("year").value;
  
  const query = new URLSearchParams({ subject, year });
  const res = await fetch(`http://localhost:5000/api/papers/search?${query}`);
  const papers = await res.json();
  

  // const resultsList = document.getElementById("results");
  // resultsList.innerHTML = "";

  // papers.forEach((paper) => {
  //   const li = document.createElement("li");
  //   const link = document.createElement("a");
  //   link.href = `http://localhost:5000/${paper.filePath.replace("server/", "")}`;
  //   link.innerText = `${paper.subject} - ${paper.year}`;
  //   link.target = "_blank";
  //   li.appendChild(link);
  //   resultsList.appendChild(li);
  // });

   document.getElementById('results').textContent = JSON.stringify(papers, null, 2);
}
