const express = require("express");
const router = express.Router();
const { saveAnswer, getResult } = require("../controllers/quizController");

router.post("/save", saveAnswer);
router.get("/result", getResult);

module.exports = router;
