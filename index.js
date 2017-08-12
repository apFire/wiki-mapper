'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

restService.post('/webhook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';
        var messages = [];
        
        
        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

               /* if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' awesome hook ';	
                }

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;	
                }*/
                
                if(requestBody.result.action === 'projectData') { 
                    if (requestBody.result.parameters.i1project === 'Intraday') {
                    if(requestBody.result.parameters.i1ProjectArtifact === 'Quickbase') { 
                        speech += 'Here are the Quickbase projects for ' + requestBody.result.parameters.i1project;
                        messages.push({ "type": 0,"platform":"skype","speech": speech});
                        messages.push({ "type": 0,"platform":"skype","speech": 'QB111111 Intraday description'});
                        messages.push({ "type": 0,"platform":"skype","speech": 'QB111112 Intraday description'});
                        speech += 'QB111111 Intraday description and QB111112 Intraday description';
                        messages.push({ "type": 0,"platform":"default","speech": speech});
                    } else if(requestBody.result.parameters.i1ProjectArtifact === 'Documentation') { 
                        speech += 'Here is the documentation I found on ' + requestBody.result.parameters.i1project + '. Hope this helps.';
                        messages.push({ "type": 0, "platform": "skype","speech": speech});
                        messages.push({ "type": 0, "platform": "skype","speech": 'QB111111 Intraday description 1'});
                        messages.push({ "type": 0, "platform": "skype","speech": 'QB111112 Intraday description 2'});
                        speech += 'Intraday description 1 and Intraday description 2';
                        messages.push({ "type": 0,"platform":"default","speech": speech});
                    } else if(requestBody.result.parameters.i1ProjectArtifact === 'SME') { 
                        speech += 'SME for ' + requestBody.result.parameters.i1project + ' projects are';
                        messages.push({ "type": 0,"platform": "skype","speech": speech});
                        messages.push({ "type": 0,"platform": "skype","speech": 'Jayant (9999)'});
                        messages.push({ "type": 0,"platform": "skype","speech": 'Gaurav (9999)'});
                        messages.push({ "type": 0,"platform": "skype","speech": 'Niranjan (9999)'});
                        messages.push({ "type": 0,"platform": "skype","speech": 'These guys will help you'});
                        speech += 'Jayant (9999) Gaurav (9999) Niranjan (9999). These guys will help you.';
                        messages.push({ "type": 0,"platform":"default","speech": speech});
                    } else { 
                       messages.push({ "type": 0,"platform":"skype","speech": 'Sorry I can not help you with this but I guess Jayant can. you should get in touch'});   
                       speech += 'Sorry I can not help you with this but I guess Jayant can. you should get in touch';
                       messages.push({ "type": 0,"platform":"default","speech": speech}); 
                    }
                    }
                }
                
                if(requestBody.result.action === 'Buddy') {
                    console.log(requestBody);
                    
                    if(requestBody.result.parameters.Extension === 'Jayant') {
                        speech = 'Jayant\'s extension is 7887';
                        messages.push({ "type": 0, "platform": "skype","speech": speech});
                        //messages.push({ "type": 0,"speech": speech});
                    }  else {
                        speech = 'Sorry, could not find extension for ' + requestBody.result.parameters.Extension;
                        messages.push({ "type": 0, "platform": "skype","speech": speech});
                        //messages.push({ "type": 0,"speech": speech});
                    }
                }        
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            "messages": messages,    
            source: 'apiai-webhook-sample'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
