const createIncidentCard = require("../adaptiveCards/createIncidentCommandResponse.json");
const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { CardFactory, MessageFactory } = require("botbuilder");

class CreateIncidentCommandHandler {
  triggerPatterns = "#create_incident";

  async handleCommandReceived(context, message) {
    console.log(`Bot received message: ${message.text}`);

    // var clone = structuredClone(createIncidentCard);

    // Call ServiceNow to get Category/Assignment Groups

    const cardData = {
      title: "Enter Incident Title"
    };

    const cardJson = AdaptiveCards.declare(createIncidentCard).render(cardData);
    return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
  }
}

module.exports = {
    CreateIncidentCommandHandler,
};
