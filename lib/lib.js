// load aws sdk
var aws = require('aws-sdk');

// Create SesMail Function
var SesMail= function (accessKeyId,secretAccessKey,region) {
	if(accessKeyId)
		aws.config.update({accessKeyId:accessKeyId});
	if(secretAccessKey)
		aws.config.update({secretAccessKey:secretAccessKey});
	if(region)
		aws.config.update({region:region});
}

SesMail.prototype.awsRegion = function(region) {
	if(region)
		aws.config.update({region:region});

	return this;
};


SesMail.prototype.awsAccessKeyId = function(accessKeyId) {
	if(accessKeyId)
		aws.config.update({accessKeyId:accessKeyId});

	return this;
};


SesMail.prototype.awsSecretAccessKey = function(secretAccessKey) {
	if(secretAccessKey)
		aws.config.update({secretAccessKey:secretAccessKey});

	return this;
};

SesMail.prototype.to = function(to) {
	this._to= to;

	return this;
};

SesMail.prototype.cc = function(cc) {
	this._cc= cc;

	return this;
};

SesMail.prototype.bcc = function(bcc) {
	this._bcc= bcc;

	return this;
};

SesMail.prototype.from = function(from) {
	this._from= from;

	return this;
};

SesMail.prototype.html = function(html) {
	this._html= html;

	return this;
};

SesMail.prototype.text = function(text) {
	this._text= text;

	return this;
};

SesMail.prototype.subject = function(subject) {
	this._subject= subject;

	return this;
};

SesMail.prototype.replyToAddresses = function(replyToAddresses) {
	this._replyToAddresses= replyToAddresses;

	return this;
};

SesMail.prototype.configurationSetName = function(configurationSetName) {
	this._configurationSetName= configurationSetName;

	return this;
};

SesMail.prototype.returnPath = function(returnPath) {
	this._returnPath= returnPath;

	return this;
};

SesMail.prototype.tags = function(tags) {
	this._tags= tags;

	return this;
};

SesMail.prototype.send = function() {

	var ses = new aws.SES();
	var self= this;
	if( !(self._to && self._from && self._subject && (self._html || self._text) ) )
		return new Promise(function (resolve,reject) {reject('Required properties not set')});

	var params = {
		Destination: 
		{ /* required */
			ToAddresses: self._to
		},
		Message:
		{ /* required */
			Body: 
			{ /* required */
			},
			Subject: 
			{ /* required */
				Data: self._subject, /* required */
				Charset: 'UTF-8'
			}
		},

		Source: self._from, /* required */
	};

	if(self.hasOwnProperty('_html'))
		params.Message.Body.Html={Data:self._html,Charset: 'UTF-8'};
	if(self.hasOwnProperty('_text'))
		params.Message.Body.Text={Data:self._text,Charset: 'UTF-8'};

	if(self.hasOwnProperty('_cc'))
		params.Destination.CcAddresses=self._cc;
	if(self.hasOwnProperty('_bcc'))
		params.Destination.BccAddresses=self._bcc;

	if(self.hasOwnProperty('_tags'))
		params.Tags=self._tags;

	if(self.hasOwnProperty('_configurationSetName'))
		params.ConfigurationSetName=self._configurationSetName;

	if(self.hasOwnProperty('_replyToAddresses'))
		params.ReplyToAddresses=self._replyToAddresses;

	if(self.hasOwnProperty('_returnPath'))
		params.ReturnPath=self._returnPath;

	

	return new Promise(function (resolve,reject) {
		ses.sendEmail(params, function(err, data) {
		    if(err) reject(err);
		    else
		    {
		    	resolve(data);
		    }
		});
	});
};

SesMail.prototype.print = function() {

	var self= this;
	if( !(self._to && self._from && self._subject && (self._html || self._text) ) )
		return new Promise(function (resolve,reject) {reject('Required properties not set')});

	var params = {
		Destination: 
		{ /* required */
			ToAddresses: self._to
		},
		Message:
		{ /* required */
			Body: 
			{ /* required */
			},
			Subject: 
			{ /* required */
				Data: self._subject, /* required */
				Charset: 'UTF-8'
			}
		},

		Source: self._from, /* required */
	};

	if(self.hasOwnProperty('_html'))
		params.Message.Body.Html={Data:self._html,Charset: 'UTF-8'};
	if(self.hasOwnProperty('_text'))
		params.Message.Body.Text={Data:self._text,Charset: 'UTF-8'};

	if(self.hasOwnProperty('_cc'))
		params.Destination.CcAddresses=self._cc;
	if(self.hasOwnProperty('_bcc'))
		params.Destination.BccAddresses=self._bcc;

	if(self.hasOwnProperty('_tags'))
		params.Tags=self._tags;

	if(self.hasOwnProperty('_configurationSetName'))
		params.ConfigurationSetName=self._configurationSetName;

	if(self.hasOwnProperty('_replyToAddresses'))
		params.ReplyToAddresses=self._replyToAddresses;

	if(self.hasOwnProperty('_returnPath'))
		params.ReturnPath=self._returnPath;

	

	return new Promise(function (resolve,reject) {
    	resolve(params);
	});
};

module.exports= SesMail;