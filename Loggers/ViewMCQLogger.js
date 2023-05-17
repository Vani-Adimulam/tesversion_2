const {createLogger,transports,format} = require('winston')

const ViewMCQLogger =  createLogger({
    transports:[
        new transports.File({
            filename:"viewmcq.log",
            level:"info",
            format:format.combine(
                format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
                format.json()
                )
        }),
        new transports.File({
            filename:"viewmcq-error.log",
            level:"error",
            format:format.combine(format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),format.json())
        })
        
    ]
})
module.exports ={ViewMCQLogger}