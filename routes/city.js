const express = require("express");
const router = express.Router();
const { postCity,putCity,getCities,getCity} = require("../controllers/city");


router.post("/city", postCity);
router.put("/city", putCity);
router.get('/cities',getCities)
router.get('/city/:id',getCity)

module.exports = router;
