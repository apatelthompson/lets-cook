export const config = {
  airtable: {
    apiKey: process.env.AIRTABLE_API_KEY ?? "",
    baseId: process.env.AIRTABLE_BASE_ID ?? "",
    messagesTable: process.env.AIRTABLE_MESSAGES_TABLE ?? "Messages",
    subscribersTable: process.env.AIRTABLE_SUBSCRIBERS_TABLE ?? "Subscribers",
    sendLogTable: process.env.AIRTABLE_SENDLOG_TABLE ?? "SendLog",
  },
  sendblue: {
    apiKey: process.env.SENDBLUE_API_KEY ?? "",
    apiSecret: process.env.SENDBLUE_API_SECRET ?? "",
    fromNumber: process.env.SENDBLUE_FROM_NUMBER ?? "",
    mock: process.env.SENDBLUE_MOCK === "1" || !process.env.SENDBLUE_API_KEY,
  },
  cronSecret: process.env.CRON_SECRET ?? "",
  defaultTimezone: process.env.DEFAULT_TIMEZONE ?? "America/Los_Angeles",
  deliveryHour: Number(process.env.DELIVERY_HOUR ?? "10"),
  programLengthDays: Number(process.env.PROGRAM_LENGTH_DAYS ?? "28"),
};
