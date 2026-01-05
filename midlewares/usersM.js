import { compare } from "../bcrypt.js"
import { getUser } from "../DAL/usersD.js"
import { checkArraysEqual } from "../services/services.js"
import { verifiedUsers } from "../verifiedUsers.js"

async function validateFieldsInbody(req, res, next) {
    try {
        if (req.body.username && req.body.password) {
            next()
        }
        else res.sendStatus(409)
    } catch (error) {
        console.error({error: error.message})
        res.status(500).json({error: error.message})
    }
}

async function checkIfUserNotExsist(req, res, next) {
    try {
        const result = await getUser(req.body.username)[0]
        console.log(result);
        
        if (!result) next()
        else res.status(409).json({message: "user is exist"})
    } catch (error) {
        console.error({error: error.message})
        res.status(500).json({error: error.message})
    }
}

async function verifyUser(req, res, next) {
    try {
        const {username, password} = req.body
        const user = await getUser(username)
        const Verified = await compare(password.toString(), user.password_hash)
        if (Verified) {
            verifiedUsers[username] = true
            next()
        } 
        else res.status(401).json("Unauthorized");
    } catch (error) {
        console.error({err: error.message})
        res.status(500).json({error: error.message})
    }
} 

async function isVerifiedUser(req, res, next) {
    try {
        if (verifiedUsers[req.body.username]) {
            next()
        }
        else res.sendStatus(401)
    } catch (error) {
        console.error({err: error.message})
        res.status(500).json({error: error.message})
    }
} 

async function checkTrap(req, res, next) {
    try {
        if ((req.body.message) && Array.isArray(req.body.message)) {
            const sortedArray = (req.body.message).toSorted((a, b) => a - b)
            const isArraysEqual = checkArraysEqual(sortedArray, req.body.message)
            if (isArraysEqual) next();
            else res.status(400).json(-1)
        }
        else res.sendStatus(409)
    } catch (error) {
        console.error({err: error.message})
        res.status(500).json({error: error.message})
    }
}



// function isArrayInAscendingOrder(arr) {
//   if (arr.length <= 1) {
//     return true;
//   }

//   for (let i = 0; i < arr.length - 1; i++) {
//     if (arr[i] > arr[i + 1]) {
//       return false;
//     }
//   }

//   return true; 
// }


export {
    validateFieldsInbody,
    checkIfUserNotExsist,
    verifyUser,
    checkTrap,
    isVerifiedUser
}