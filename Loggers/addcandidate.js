const { createLogger, transports, format } = require('winston')

const addCandidateLogger = createLogger({
    transports:[
        new transports.File({
            filename:"addCandidate.log",
            level:"info",
            format:format.combine(
                format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
                format.json()
                )
        }),
        new transports.File({
            filename:"addCandidate-error.log",
            level:"error",
            format:format.combine(format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),format.json())
        })
        
    ]
})
module.exports ={addCandidateLogger}