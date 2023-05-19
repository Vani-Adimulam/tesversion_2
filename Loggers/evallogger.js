const {createLogger,transports,format}= require('winston')
const WinstonCloudWatch = require('winston-aws-cloudwatch');
 

const EvalLogger = createLogger({
    transports:[
        new transports.File({
            filename:"evaluator.log",
            level:"info",
            format:format.combine(
                format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
                format.json()
                )
        }),
        new transports.File({
            filename:"evaluator-error.log",
            level:"error",
            format:format.combine(format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),format.json())
        }),
        new WinstonCloudWatch({
            logGroupName: 'P2F-onlineassessment-logs',
            logStreamName: 'online-assessment-logs-stream',
            awsRegion: 'ap-south-1', // Replace with your desired AWS region
            awsAccessKeyId: 'p2f-online-logger-user', // Replace with your AWS access key ID
            awsSecretKey: 'f7PS7}IP' // Replace with your AWS secret access key
          })
        
    ]
})
module.exports ={EvalLogger}