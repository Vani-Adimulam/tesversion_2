const {createLogger,transports,format} = require('winston')


const TestResult =  createLogger({
    transports:[
        new transports.File({
            filename:"testresult.log",
            level:"info",
            format:format.combine(
                format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
                format.json()
                )
        }),
        new transports.File({
            filename:"testresult-error.log",
            level:"error",
            format:format.combine(format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),format.json())
        })
        
    ]
})
module.exports ={TestResult}