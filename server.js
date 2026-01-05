import { config } from "dotenv"
import express from "express"
import { checkIfUserNotExsist, validateFieldsInbody } from "./midlewares/usersM.js"
import { addUser } from "./controllers/usersC.js"
config()

const app = express()
const port = process.env.PORT

app.use(express.json())

app.post("/signup", validateFieldsInbody, checkIfUserNotExsist, addUser)
app.post("/verify", ()=> {})
app.post("/decode-message", ()=> {})

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`);
})
