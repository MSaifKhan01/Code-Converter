const openai = require('openai');
const express = require('express');
const OpenAIRouter = express.Router()
require("dotenv").config()
const API_KEY = process.env.api_key
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

OpenAIRouter.post("/convertcode", async (req, res) => {
    try {
        const { code } = req.body;
        const { language } = req.query;

        if (!language) {
            return res.status(400).send({ msg: "Please provide a language to convert." });
        }

        const formattedCode = JSON.stringify(code)

        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `${code} Convert this code to ${language}` }],
                max_tokens: 50,
            }),
        };

        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        const result = data.choices[0].message;


        res.send(result);
    } catch (error) {
        res.status(500).send({ msg: "An error occurred while converting the code." });
    }
});

OpenAIRouter.post("/debug", async (req, res) => {
    try {
        const { code } = req.body;



        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Debug this ${code} and give the right solution` }],
                max_tokens: 50,
            }),
        };

        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        const result = data.choices[0].message;


        res.send(result);
    } catch (error) {
        res.status(500).send({ msg: "An error occurred while converting the code." });
    }
});

OpenAIRouter.post("/qualitycheck", async (req, res) => {
    try {
        const { code } = req.body;


        if (!code) {
            return res.status(400).send({ msg: "Please provide a Code to convert." });
        }


        let feedString = "Please provide quality check on the given code and give me suggestion to improve";

        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `${code} ${feedString}` }],
                max_tokens: 50,
               
            }),
        };

        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        const result = data.choices[0].message

        res.send(result);
    } catch (error) {
        res.status(500).send({ msg: "An error occurred while converting the code.", err: error.message });
    }
});


module.exports = { OpenAIRouter }