'use strict';

require('dotenv').config();
var Alexa = require('alexa-sdk');
var languageStrings = require('./languageStrings.js');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetNewJimFactIntent': function () {
        this.emit('GetJimFact');
    },
    'GetFact': function () {
        // Get a random fact from the fact list
        // Use this.t() to get corresponding language data
        var factArr = this.t('FACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        var getANewFactQuestion = " Say get a line to get another michael scott line or stop to finish for today.";
        var speechOutput = randomFact + getANewFactQuestion;
        this.emit(':askWithCard', speechOutput, getANewFactQuestion, this.t("SKILL_NAME"), randomFact);
    },
    'GetJimFact': function () {
        // Get a random fact from the fact list
        // Use this.t() to get corresponding language data
        var factArr = this.t('JIMFACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        var getANewFactQuestion = " Say get a line to get another Jim line or stop to finish for today.";
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
