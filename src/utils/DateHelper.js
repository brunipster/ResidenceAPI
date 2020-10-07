const moment = require('moment');

// console.log(localLocale.format('L')); 
var d = new Date('01/12/2016 00:00:00.0');
var a = new Date('01/12/2016 00:00:00.0');
var momentDate = moment(new Date('01/12/2016'))
var momentDate2 = moment(new Date('01/30/2016'))
console.log(momentDate.toDate());
console.log(d)
console.log(momentDate.diff(momentDate2, 'minutes'))

module.exports = {
    addDays: (date, addition) => {
        const additionDate = moment(date).add(addition, 'days');
        return additionDate.toDate();
    }
}