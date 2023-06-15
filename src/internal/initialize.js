const { BotBuilderCloudAdapter } = require("@microsoft/teamsfx");
const ConversationBot = BotBuilderCloudAdapter.ConversationBot;
const { DoStuffActionHandler } = require("../cardActions/doStuffActionHandler");
const { SubmitActionHandler } = require("../cardActions/submitActionHandler");
const { HelloWorldCommandHandler } = require("../commands/helloworldCommandHandler");
const config = require("./config");
const { CreateIncidentCommandHandler } = require("../commands/createIncidentCommandHandler");
const { ConfirmActionHandler } = require("../cardActions/confirmActionHandler");

// Create the conversation bot and register the command and card action handlers for your app.
const workflowApp = new ConversationBot({
  // The bot id and password to create CloudAdapter.
  // See https://aka.ms/about-bot-adapter to learn more about adapters.
  adapterConfig: {
    MicrosoftAppId: config.botId,
    MicrosoftAppPassword: config.botPassword,
    MicrosoftAppType: "MultiTenant",
  },
  command: {
    enabled: true,
    commands: [new HelloWorldCommandHandler(), new CreateIncidentCommandHandler()],
  },
  cardAction: {
    enabled: true,
    actions: [new DoStuffActionHandler(), new SubmitActionHandler(), new ConfirmActionHandler()],
  },
});

module.exports = {
  workflowApp,
};
