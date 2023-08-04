const express = require('express');
const cors = require('cors');
const { OpenAIRouter } = require('./Routes/OpenAI.Routes');
const app = express()
app.use(cors())
app.use(express.json())


app.use("/api", OpenAIRouter)

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.listen(4040, async () => {
    try {
        console.log("Server is Connected To Port 8080");
    } catch (error) {
        console.log(error);
    }
})
