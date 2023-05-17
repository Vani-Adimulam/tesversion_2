const {createLogger,transports,format} = require('winston')

const TestStatus =  createLogger({
    transports:[
        new transports.File({
            filename:"TestStatus.log",
            level:"info",
            format:format.combine(
                format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
                format.json()
                )
        }),
        new transports.File({
            filename:"TestStatus-error.log",
            level:"error",
            format:format.combine(format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),format.json())
        })
        
    ]
})
module.exports ={TestStatus}