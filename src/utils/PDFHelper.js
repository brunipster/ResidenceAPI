var pdf = require("pdf-creator-node");
var fs = require('fs');
const path = require('path');
const template_path = path.join(__dirname,'templatevp.html')
var html = fs.readFileSync(template_path, 'utf8');

module.exports = {
    generatePDF: async (virtualpass, code)=>{
        var options = {
            height: "15cm",
            width: "9cm",
            orientation: "portrait",
            border: "2mm"
        };
                
        var document = {
            html: html,
            data: {
                virtualpass
            },
            path: path.join(__dirname,'..', '..','private','virtualpass',`${code}.pdf`)
        };
        
        return await pdf.create(document, options)
    }
}