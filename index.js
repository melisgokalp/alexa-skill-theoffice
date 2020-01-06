'use strict';

require('dotenv').config();
var Alexa = require('alexa-sdk');
var languageStrings = require('./lines.js');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context); 
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    }, 
    'Unhandled': function () {
        this.emit('AMAZON.HelpIntent');
    }, 
    'GetNewFactIntent': function () {
        this.emit('GetFact', "FACTS");
    },
    'GetNewJimFactIntent': function () {
        this.emit('GetFact', "JIMFACTS");
    },
    'GetNewDWFactIntent': function () {
        this.emit('GetFact', "DWFACTS");
    },
    'GetFact': function (input) {
        var dchar = 'FACTS';
        if(input != null) {
            dchar =  input;
        }
        var factArr = this.t(dchar);
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        var getANewFactQuestion = " Say get a line to get another line or stop.";
        var speechOutput = randomFact + getANewFactQuestion;
        this.emit(':askWithCard', speechOutput, getANewFactQuestion, this.t("SKILL_NAME"), randomFact);
    },  
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
    
};
