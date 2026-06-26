import express from "express";
const app = express();
app.all("*", (req, res) => {
  res.json({ message: "Invalid path specified in request URL" });
});
app.listen(3001, () => {
  console.log("Listening");
});
