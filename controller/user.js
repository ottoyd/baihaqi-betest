const User = require('../models/user')
const USER_CACHE_KEY = 'USER_CACHE'

const userByAccountNum = async (req, res, next) => {
    try {
        const { num } = req.params
        // THIS PROCESS CAN ALSO GET DATA FROM CACHE, FIND FROM JSON PARSED REDIS KEY
        const user = await User.getByAccountNum(num, req.db)
        return res.status(200).json({ data: user })
    } catch (error) {
        next(error)
    }
}
const userByIdentityNum = async (req, res, next) => {
    try {
        const { num } = req.params
        // THIS PROCESS CAN ALSO GET DATA FROM CACHE, FIND FROM JSON PARSED REDIS KEY
        const user = await User.getIdentityNum(num, req.db)
        return res.status(200).json({ data: user })
    } catch (error) {
        next(error)
    }
}
const getAllUser = async (req, res, next) => {
    try {
        const USER_CACHE = JSON.parse(await req.redis.get(USER_CACHE_KEY))
        if (USER_CACHE) return res.status(200).json({ data: USER_CACHE })

        const allUser = await User.getAll(req.db)
        await req.redis.set(USER_CACHE_KEY, JSON.stringify(allUser));
        return res.status(200).json({ data: allUser })
    } catch (error) {
        next(error)
    }
}
const createUser = async (req, res, next) => {
    try {
        const createUserData = {
            userName: req.body.userName,
            accountNumber: req.body.accountNumber,
            identityNumber: req.body.identityNumber,
            emailAddress: req.body.emailAddress,
        }
        await User.create(createUserData, req.db)
        await req.redis.del(USER_CACHE_KEY);
        return res.status(201).json({ data: createUserData })
    } catch (error) {
        console.log(error);
        next(error)
    }
}
const editUser = async (req, res, next) => {
    try {
        const editUserData = {
            userName: req.body.userName,
            accountNumber: req.body.accountNumber,
            identityNumber: req.body.identityNumber,
            emailAddress: req.body.emailAddress,
        }
        const { id } = req.params
        await User.edit(editUserData, id, req.db)
        await req.redis.del(USER_CACHE_KEY);
        return res.status(200).json({ data: editUserData })
    } catch (error) {
        next(error)
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedUser = await User.delete(id, req.db)
        await req.redis.del(USER_CACHE_KEY);
        return res.status(200).json({ data: deletedUser })
    } catch (error) {
        next(error)
    }
}

const deleteUserTest = async (req, res, next) => {
    try {
        const { userName } = req.params
        const deletedUser = await User.deleteTest(userName, req.db)
        await req.redis.del(USER_CACHE_KEY);
        return res.status(200).json({ data: deletedUser })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    userByAccountNum,
    userByIdentityNum,
    getAllUser,
    createUser,
    editUser,
    deleteUser,
    deleteUserTest
}