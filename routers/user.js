const router = require('express').Router()
const { authentification } = require('./../middlewares/auth')
const userController = require('../controller/user')

router.use(authentification)
router.get('/userByAccountNum/:num', userController.userByAccountNum)
router.get('/userByIdentityNum/:num', userController.userByIdentityNum)
router.get('/allUser', userController.getAllUser)

router.post('/create', userController.createUser)
router.put('/edit/:id', userController.editUser)
router.delete('/delete/:id', userController.deleteUser)

module.exports = router