const { createLogger, transports, format } = require('winston')

const addMCQLogger = createLogger({
    transports:[
        new transports.File({
            filename:"addMcq.log",
            level:"info",
            format:format.combine(
                format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
                format.json()
                )
        }),
        new transports.File({
            filename:"addMcq-error.log",
            level:"error",
            format:format.combine(format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),format.json())
        })
        
    ]
})
module.exports ={addMCQLogger}