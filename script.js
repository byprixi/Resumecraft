function updateResume() {

    document.getElementById("previewName").textContent =
        document.getElementById("name").value || "Your Name";

    document.getElementById("previewJob").textContent =
        document.getElementById("job").value || "Your Job Title";

    const email = document.getElementById("email").value;
    
    const phoneInput = document.getElementById("phone");
    const phone = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    if (phoneInput.value !== phone) phoneInput.value = phone;

    document.getElementById("previewContact").textContent =
        [email, phone].filter(Boolean).join("\n") || "Email\nPhone";

    document.getElementById("previewSummary").textContent =
        document.getElementById("summary").value ||
        "Your summary will appear here.";

    document.getElementById("previewEducation").textContent =
        document.getElementById("education").value ||
        "Your education will appear here.";

    document.getElementById("previewExperience").textContent =
        document.getElementById("experience").value ||
        "Your experience will appear here.";

    
    const skills = document.getElementById("skills").value
        .split(/[,\n]/)
        .map(s => s.trim())
        .filter(Boolean);

    const list = document.getElementById("previewSkills");
    list.innerHTML = "";
    (skills.length ? skills : ["Your skills will appear here."]).forEach(s => {
        const li = document.createElement("li");
        li.textContent = s;
        list.appendChild(li);
    });
}



const layouts = {
    modern:  { side: ["contact"],                       main: ["summary", "education", "skills", "experience"] },
    classic: { side: ["contact"],                       main: ["summary", "education", "skills", "experience"] },
    noir:    { side: ["summary", "skills", "contact"],  main: ["education", "experience"] },
    lime:    { side: ["contact", "skills", "education"], main: ["summary", "experience"] },
    bold:    { side: ["education", "contact"],          main: ["summary", "experience", "skills"] },
    minimal: { side: ["contact", "education", "skills"], main: ["summary", "experience"] },
    slate:   { side: ["contact", "skills"],             main: ["summary", "education", "experience"] }
};

function changeTemplate() {
    const selected = document.getElementById("template").value;
    const resume = document.getElementById("resume");
    const layout = layouts[selected];

    resume.className = "resume t-" + selected;

    ["side", "main"].forEach(column => {
        const box = resume.querySelector("." + column);
        layout[column].forEach(id => {
            box.appendChild(document.getElementById("sec-" + id));
        });
    });
}


function handlePhoto(event) {
    const file = event.target.files[0];
    const photo = document.getElementById("previewPhoto");

    if (!file) {
        photo.style.backgroundImage = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        photo.style.backgroundImage = "url(" + reader.result + ")";
    };
    reader.readAsDataURL(file);
}


function downloadResume() {
    window.print();
}


function fitWordmark() {
    const mark = document.querySelector(".wordmark");
    if (!mark) return;

    const available = Math.min(mark.parentElement.clientWidth - 48, 1500);

    mark.style.fontSize = "100px";
    mark.style.display = "inline-block";
    const natural = mark.getBoundingClientRect().width;
    mark.style.display = "";

    mark.style.fontSize = (100 * available / natural) + "px";
}

window.addEventListener("resize", fitWordmark);
window.addEventListener("load", fitWordmark);
if (document.fonts) document.fonts.ready.then(fitWordmark);

changeTemplate();
updateResume();
fitWordmark();
