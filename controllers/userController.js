const { BadRequestError, NotFoundError } = require("../errors")
const UserModel = require("../schema/User")
const jwt = require("jsonwebtoken")
const getEmailMsgTemplate = require("../utils/getEmailMsgTemplate")
const getButtonTemplate = require("../utils/getButtonTemplate")
const sendMail = require("../utils/sendMail")

const signup2 = async (req, res) => {
  const {
    name,
    email,
    contact_number,
    country,
    address,
    role,
    education_qualification,
    work_experience,
    skills,
    job_title,
    department,
    reporting_manager,
    joining_date,
    salary_details,
    emergency_contact_details,
    email_token,
    clientId,
  } = req.body

  if (!name || !email) {
    throw new BadRequestError("please provide all values")
  }
  // check if user already exists
  const userAlreadyExist = await UserModel.findOne({ email: email })

  if (userAlreadyExist) {
    throw new BadRequestError("user already exist")
  }

  const token = jwt.sign({ email, role }, process.env.JWT_SECRET)

  const user = await UserModel.create({
    name,
    email,
    contact_number,
    country,
    address,
    education_qualification,
    work_experience,
    skills,
    job_title,
    department,
    reporting_manager,
    joining_date,
    salary_details,
    emergency_contact_details,
    email_token: token,
    clientId,
    is_active: true,
  })

  // console.log(updateUser)
  //   await defaultProfile(user._id.toString())

  const subject = "Confirmation Mail"
  const buttonContent = await getButtonTemplate(
    `verify_email/${token}`,
    "verify email"
  )
  const html = await getEmailMsgTemplate(
    ` <h4 style="text-align:center;font-weight:500"> Please verify your email address is <br/>${email}</h4>
      ${buttonContent}
    `,
    name
  )
  sendMail(email, subject, html)

  res.status(201).json({ status: true, message: "signup successful", user })
}
const deleteUser = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequestError("please provide user id")
  }
  const user = await UserModel.findOne({
    email: email,
  })
  console.log(user)
  if (!user) {
    throw new NotFoundError("no user with this id")
  }
  const deletedUser = await UserModel.findByIdAndDelete(user._id)
  res.status(200).json({ status: true, msg: "user deleted successfully" })
}
module.exports = { signup2, deleteUser }
