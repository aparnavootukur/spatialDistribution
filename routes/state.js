const express = require("express");
const router = express.Router();
const { postState,getState,putState,getStates } = require("../controllers/state");

// Routes beginning with /api/auth
router.post("/state", postState);
router.put("/state", putState);
router.get('/states/:id',getState)
router.get('/states',getStates)

module.exports = router;

