const moment = require('moment');

module.exports = {
    addDays:(date, addition) => {
        const additionDate = moment(date).add(addition, 'days');
        return additionDate.toDate();
    },
    formatToFrontend: (date) => {
        return moment(date).format('DD-MM-YYYY hh:mm:ss')
    }
}