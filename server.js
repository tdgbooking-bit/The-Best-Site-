const express = require("express");
const bodyParser = require("body-parser");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Placeholder route (no Twilio)
app.post("/send-text", (req, res) => {
  res.status(200).send("SMS functionality removed for deployment. Add Twilio code after deployment.");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
});
