const express = require("express");
const { getContributors } = require("../controllers/contributor.controller");

const router = express.Router();

router.get("/", getContributors);

module.exports = router;
