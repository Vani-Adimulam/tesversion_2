const {createLogger,transports,format} = require('winston')

const ViewPara =  createLogger({
    transports:[
        new transports.File({
            filename:"viewpara.log",
            level:"info",
            format:format.combine(
                format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
                format.json()
                )
        }),
        new transports.File({
            filename:"viewpara-error.log",
            level:"error",
            format:format.combine(format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),format.json())
        })
        
    ]
})
module.exports ={ViewPara}