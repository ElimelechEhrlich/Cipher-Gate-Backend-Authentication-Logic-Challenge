import { hash } from "../bcrypt.js";
import { insertUser } from "../DAL/usersD.js";

async function addUser(req, res) {
    try {
        const password_hash = await hash(req.body.password.toString())
        const result = await insertUser(req.body.username, password_hash)
        if (result) res.status(201).json()
    } catch (error) {
        console.error({err: error.message})
        res.status(500).json({err: error.message})
    }
}

export {
    addUser
}