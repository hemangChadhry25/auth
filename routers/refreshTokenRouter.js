const express = require("express")
const { logout, getNewAccessToken } = require("../controllers/refreshToken")
const router = express.Router()

router.route("/").post(getNewAccessToken).delete(logout)

module.exports = router
