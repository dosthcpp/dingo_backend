require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
app.use(cors());
const router = express.Router();
router.post("/chatbot_reaction", async (req, res) => {
  const { message } = req.body;
  const url = "...";
  axios
    .post(
      url,
      {
        message,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    )
    .then((result) => {
      res.json({
        message: result.text,
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

app.use("/", router);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

const server = http.createServer(app).listen(process.env.PORT || 3000, () => {
  console.log("server listening on PORT 3000");
});
