const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { InvokeResponseFactory } = require("@microsoft/teamsfx");
const responseCard = require("../adaptiveCards/createIncidentSuccessResponse.json");

class SubmitActionHandler {
  /**
   * A global unique string associated with the `Action.Execute` action.
   * The value should be the same as the `verb` property which you define in your adaptive card JSON.
   */
  triggerVerb = "incidentDetailsSubmit";

  async handleActionInvoked(context, message) {
    /**
     * You can send an adaptive card to respond to the card action invoke.
     */
    console.log(`Category: ${context.activity.value.action.data.category}`);
    console.log(`Short description: ${context.activity.value.action.data.shortDescription}`);
    console.log(`Description: ${context.activity.value.action.data.description}`);
    console.log(`Impact: ${context.activity.value.action.data.impact}`);
    console.log(`Urgency: ${context.activity.value.action.data.urgency}`);
    console.log(`Assignment group: ${context.activity.value.action.data.assignmentGroup}`);
    
    
    const cardData = {
      category: context.activity.value.action.data.category,
      shortDescription: context.activity.value.action.data.shortDescription,
      description: context.activity.value.action.data.description,
      impact: context.activity.value.action.data.impact,
      urgency: context.activity.value.action.data.urgency,
      assignmentGroup: context.activity.value.action.data.assignmentGroup,
    };
    const cardJson = AdaptiveCards.declare(responseCard).render(cardData);
    return InvokeResponseFactory.adaptiveCard(cardJson);
    // return InvokeResponseFactory.textMessage("[ACK] Successfully!");

    /**
     * If you want to send invoke response with text message, you can:
     * 
     return InvokeResponseFactory.textMessage("[ACK] Successfully!");
     */

    /**
     * If you want to send invoke response with error message, you can:
     *
     * return InvokeResponseFactory.errorResponse(InvokeResponseErrorCode.BadRequest, "The incoming request is invalid.");
     */
  }
}

module.exports = {
  SubmitActionHandler,
};
