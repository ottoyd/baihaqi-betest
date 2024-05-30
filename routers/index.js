const router = require('express').Router()
const userRouter = require('./user')
const path = require('path');
const serviceRouter = require('./service')

router.get('/', (req, res) => {
    res.send(`
        <h1>Welcome,</h1>
        <p>Click the button below to view the Postman documentation:</p>
        <a href="https://github.com/ottoyd/baihaqi-betest/blob/main/BE_MICRO_BAIHAQI.postman_collection.json" class="btn btn-primary">Download Postman Collection</a>
        <h2>List Of API</h2>
        
        <p>/service/getToken</p>
        <p>/user/allUser</p>
        <p>/user/userByAccountNum/:num</p>
        <p>/user/userByIdentityNum/:num</p>
        <p>/user/create</p>
        <p>/user/edit/:id</p>
        <p>/user/delete/:id</p>

        <i>remember you need to get token from "/service/getToken"</i>
    `);
})

router.use('/user', userRouter)
router.use('/service', serviceRouter)

module.exports = router