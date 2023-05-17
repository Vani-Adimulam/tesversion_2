const {createLogger,transports,format} = require('winston')


const ViewCandidate =  createLogger({
    transports:[
        new transports.File({
            filename:"viewcandidate.log",
            level:"info",
            format:format.combine(
                format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
                format.json()
                )
        }),
        new transports.File({
            filename:"viewcandidate-error.log",
            level:"error",
            format:format.combine(format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),format.json())
        })
        
    ]
})
module.exports ={ViewCandidate}