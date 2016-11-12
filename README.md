## SES Mail utility

A wrapper for ses mail send function of aws-sdk

## Installation
```
npm i --save ses-mail
```

## Usage
 Refer [SES Documentation](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendEmail-property)

```javascript
new SesMail(awsKey,awsSecret,awsRegion)
.to('abc@example.com') //Sender
.cc('bbc@example.com') 
.bcc('cbc@example.com')
.from('a@example.com')
.html('<p>Hello World</p>')
.text('Hello World')
.subject('Hello World Subject')
.configurationSetName(ConfigurationSetName) // refer documentation
.replyToAddresses(ReplyToAddresses) // refer documentation
.returnPath(ReturnPath) // refer documentation
.tags(Tags) // refer documentation
.send()
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.log(err);
});
```
