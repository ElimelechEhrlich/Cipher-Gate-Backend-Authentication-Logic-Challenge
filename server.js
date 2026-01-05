import { config } from "dotenv"
import express from "express"
import { checkIfUserNotExsist, checkTrap, isVerifiedUser, validateFieldsInbody, verifyUser } from "./midlewares/usersM.js"
import { addUser, getSum, isVerifyUser } from "./controllers/usersC.js"
config()

const app = express()
const port = process.env.PORT

app.use(express.json())

app.post("/signup", validateFieldsInbody, checkIfUserNotExsist, addUser)
app.post("/verify", validateFieldsInbody, verifyUser, isVerifyUser)
app.post("/decode-message", isVerifiedUser, checkTrap, getSum)

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`);
})
