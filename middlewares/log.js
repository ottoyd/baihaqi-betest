const logCollection = require('./../libs/mongo').mongoInstance("log")

async function log(req, res, next) {
    try {
        await logCollection.insertOne({
            status: 'Normal',
            notes: '-',
            src: req.ip,
            endpoint: req.originalUrl,
            date: new Date()
        })
        next()
    } catch (err) {
        await logCollection.insertOne({
            status: 'Error',
            notes: err,
            src: req.ip,
            endpoint: req.originalUrl,
            date: new Date()
        })
        logCollection.insertOne()
    }
}

module.exports = { log }