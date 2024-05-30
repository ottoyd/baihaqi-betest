async function main() {
    require('dotenv').config()
    await require('./../libs/mongo').connect()
    await require('./../libs/redis').connect()

    let app = require('./../index')
    let http = require('http')
    let port = process.env.PORT || 3000

    let server = http.createServer(app)

    server.listen(port, () => {
        console.log('Tis on port', port);
    })
}

main()