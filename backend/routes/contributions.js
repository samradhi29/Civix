const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const CONTRIBUTORS_FILE = path.join(__dirname, "../cache/contributors.json"); // adjust path as needed
const GITHUB_API_URL = "https://api.github.com/repos/HarshS16/Civix/contributors";

router.get("/", async (req, res) => {
    try {
        let useCached = false;

        // Check if contributors.json exists
        if (fs.existsSync(CONTRIBUTORS_FILE)) {
            const stats = fs.statSync(CONTRIBUTORS_FILE);
            const lastModified = new Date(stats.mtime);
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

            if (lastModified > oneHourAgo) {
                useCached = true;
            }
        }

        if (useCached) {
            // Return cached file
            const cachedData = fs.readFileSync(CONTRIBUTORS_FILE, "utf-8");
            return res.json(JSON.parse(cachedData));
        } else {
            // Fetch fresh data from GitHub
            const response = await axios.get(GITHUB_API_URL, {
                headers: {
                    "User-Agent": "Civix-App",
                    "Accept": "application/vnd.github+json",
                    // If you hit rate limits, use GitHub token:
                    // Authorization: `token ${process.env.GITHUB_TOKEN}`
                },
            });

            const contributors = response.data;

            // Save to file
            fs.writeFileSync(CONTRIBUTORS_FILE, JSON.stringify(contributors, null, 2));

            return res.json(contributors);
        }
    } catch (error) {
        console.error("Error fetching contributors:", error.message);
        return res.status(500).json({ error: "Failed to fetch contributors." });
    }
});

module.exports = router;
