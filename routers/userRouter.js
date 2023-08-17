const { signup2 } = require("../controllers/userController")
// const auth = require("../middleware/authenticate")
// const checkPermissions = require("../utils/checkPermissions")
// const customPermission = require("../middleware/customPermission")
// const { USERS } = require("../actions")
const express = require("express")
const router = express.Router()

router.route("/signup").post(signup2)

module.exports = router
