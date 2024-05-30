const router = require('express').Router()
const userRouter = require('./user')
const path = require('path');
const serviceRouter = require('./service')

router.use('/user', userRouter)
router.use('/service', serviceRouter)

module.exports = router