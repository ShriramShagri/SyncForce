const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { InvokeResponseFactory } = require("@microsoft/teamsfx");
const responseCard = require("../adaptiveCards/createIncidentSuccessResponse.json");
const { default: axios } = require("axios");

class ConfirmActionHandler {
  /**
   * A global unique string associated with the `Action.Execute` action.
   * The value should be the same as the `verb` property which you define in your adaptive card JSON.
   */
  triggerVerb = "incidentConfirmSubmit";

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

    let headers = {}
    headers['Content-Type'] = "application/json"

    let data = {
      action : "create",
      short_description : context.activity.value.action.data.shortDescription,
      urgency : context.activity.value.action.data.urgency,
      impact : context.activity.value.action.data.impact,
      assignment_group : context.activity.value.action.data.assignmentGroup,
    } 
    let auth = {
      username: 'admin',
      password: 'h*sH3%rNoS7T'
    }
    
    const resp = await axios.post('http://localhost:8080', data);
    console.log(resp.data)
    
    const cardData = {
      incidentNumber : resp.data.message,
      category: context.activity.value.action.data.category,
      shortDescription: context.activity.value.action.data.shortDescription,
      description: context.activity.value.action.data.description,
      impact: context.activity.value.action.data.impact,
      urgency: context.activity.value.action.data.urgency,
      assignmentGroup: context.activity.value.action.data.assignmentGroup,
    };
    const cardJson = AdaptiveCards.declare(responseCard).render(cardData);
    return InvokeResponseFactory.adaptiveCard(cardJson);
  }
}

module.exports = {
  ConfirmActionHandler,
};
