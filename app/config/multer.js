const path = require('path')

const config = {
    images: {
        destination: path.join(__dirname, '/../../public/images/'),
        path: 'images/',
        maxFileSize: 8 * 1000 * 1000 // 8 MB
    },
}

module.exports = {
    config: config
}
