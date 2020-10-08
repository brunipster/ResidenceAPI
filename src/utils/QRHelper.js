const QRCode = require('qrcode')
// const path = require('path');
// const qrvp_path = path.join(__dirname,'..', '..', 'public', 'QRVirtualpass')

  module.exports = {
    generate: (code)=>{
        return new Promise((resolve, reject) =>{
            QRCode.toDataURL(code, { errorCorrectionLevel: 'H', scale: 6 }, function (err, path) {
                if(err) return reject(err)
                resolve(path);
            })
        })
    }
}