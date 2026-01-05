import { getUser } from "../DAL/usersD.js"

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



export {
    validateFieldsInbody,
    checkIfUserNotExsist
}