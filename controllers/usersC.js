import { compare, hash } from "../bcrypt.js";
import { getUser, insertUser } from "../DAL/usersD.js";

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

async function isVerifyUser(req, res) {
    try {
        res.status(201).json("Verified")
    } catch (error) {
        console.error({err: error.message})
        res.status(500).json({err: error.message})
    }
} 

async function getSum(req, res) {
    try {
        const sum = (req.body.message).reduce((
            (sum, num) => {
                if (typeof num === "number") sum += num;
                else res.status(401).json({err: "value is not numeric"});
                return sum
            }),0)
        res.status(201).json({sum: sum})
    } catch (error) {
        console.error({err: error.message})
        res.status(500).json({err: error.message})
    }
}


export {
    addUser,
    isVerifyUser,
    getSum
}