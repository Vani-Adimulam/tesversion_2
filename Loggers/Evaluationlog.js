const {createLogger,transports,format}= require('winston')

const Evaluation = createLogger({
    transports:[
        new transports.File({
            filename:"evaluated.log",
            level:"info",
            format:format.combine(
                format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
                format.json()
                )
        }),
        new transports.File({
            filename:"evaluated-error.log",
            level:"error",
            format:format.combine(format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),format.json())
        })
        
    ]
})
module.exports ={Evaluation}