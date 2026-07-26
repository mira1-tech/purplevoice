const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const axios = require("axios");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.send("💜 PurpleVoice Backend is Running!");

});

app.post("/generate", async (req, res) => {

    try {

        const { text, voiceId } = req.body;

        const response = await axios.post(

            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            
        {
              text: text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
        stability: 0.45,
        similarity_boost: 0.95,
        style: 0.15,
        use_speaker_boost: true

                }
                },

            {

                headers: {

                    "xi-api-key": process.env.ELEVENLABS_API_KEY,

                    "Content-Type": "application/json",

                    "Accept": "audio/mpeg"

                },

                responseType: "arraybuffer"

            }

        );

        res.set({

            "Content-Type": "audio/mpeg"

        });

        res.send(response.data);

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({ error: "Voice generation failed." });

    }

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`💜 PurpleVoice server is running on http://localhost:${PORT}`);
});