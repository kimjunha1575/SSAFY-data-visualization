const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
const e = require("express");
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
    const { startDate, endDate, timeUnit, devide, gender, keywordGroups } = req.body;
    const request_body = {
      startDate: startDate,
      endDate: endDate,
      timeUnit: timeUnit,
      devide: devide === "all" ? "" : devide,
      gender: gender === "all" ? "" : gender,
      keywordGroups: keywordGroups,
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

app.delete("/data", (req, res) => {
  try {
    // 파일 삭제
    fs.unlink("./uploads/chart.json", (error) => {
      if (error) return res.json(error);
    });
    return res.json({
      delete: true,
    });
  } catch {
    return res.json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const tmp = 
{
  "startDate": "2022-06-01",
  "endDate": "2022-08-01",
  "timeUnit": "month",
  "keywordGroups": [
    {
      "groupName": "코로나",
      "keywords": ["코로나", "covid", "백신", "거리두기"],
    },
    {
      "groupName": "금리",
      "keywords": ["금리", "빅스텝", "파월"],
    },
    {
      "groupName": "누리호",
      "keywords": ["누리호", "항우연"],
    },
  ],
};
