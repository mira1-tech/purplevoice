const textInput = document.getElementById("textInput");

const counter = document.getElementById("counter");

const logoutBtn = document.getElementById("logoutBtn");

const generateBtn = document.getElementById("generateBtn");
const voiceselect = document.getElementById("voiceSelect");

// Live character counter

textInput.addEventListener("input", () => {

    counter.textContent = `${textInput.value.length} / 5000`;

});

// REAL Generate button

generateBtn.addEventListener("click", async () => {

    const text = textInput.value.trim();

    if (text === "") {

        alert("Please enter some text first.");

        return;

    }

    generateBtn.disabled = true;

    generateBtn.textContent = "⏳ Generating...";

    try {

        const response = await fetch("https://purplevoice.onrender.com/generate", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({ 
                text,
                voiceId:  voiceSelect.value
             })

        });

        if (!response.ok) {

            throw new Error("Voice generation failed");

        }

        const audioBlob = await response.blob();

        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);

        audio.play();

    } catch (error) {

        console.error(error);

        alert("❌ Failed to generate voice. Check the server terminal.");

    } finally {

        generateBtn.disabled = false;

        generateBtn.textContent = "🎙 Generate Voice";

    }

});

// Logout

logoutBtn.addEventListener("click", () => {

    window.location.href = "login.html";
});