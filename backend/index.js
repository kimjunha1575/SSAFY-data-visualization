const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

const PORT = 8081;

// cors policy
app.use(cors());
// logging
app.use(morgan("dev"));
// data parsing
app.use(express.json());
// test route
app.get("/", (req, res) => {
  return res.json({
    test: "HELLO",
  });
});

app.post("/data", async (req, res) => {
  try {
    const url = "https://openapi.naver.com/v1/datalab/search";
    const headers = {
      "X-Naver-Client-Id": process.env.CLIENT_ID,
      "X-Naver-Client-Secret": process.env.CLIENT_SECRET,
      "Content-Type": "application/json",
    };
    const request_body = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      timeUnit: req.body.timeUnit,
      keywordGroups: req.body.keywordGroups,
    };

    const response = await axios.post(url, request_body, { headers });

    fs.writeFile("./uploads/chart.json", JSON.stringify(response.data.results), (error) => {
      if (error) console.log(error);
    });

    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.get("/data", (req, res) => {
  fs.readFile("./uploads/chart.json", (error, data) => {
    if (error) {
      console.log(error);
    }

    return res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
