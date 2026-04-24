export const config = {
  airtable: {
    apiKey: process.env.AIRTABLE_API_KEY ?? "",
    baseId: process.env.AIRTABLE_BASE_ID ?? "",
    messagesTable: process.env.AIRTABLE_MESSAGES_TABLE ?? "Messages",
    subscribersTable: process.env.AIRTABLE_SUBSCRIBERS_TABLE ?? "Subscribers",
    sendLogTable: process.env.AIRTABLE_SENDLOG_TABLE ?? "SendLog",
    missionMatrixBaseId: process.env.AIRTABLE_MISSION_MATRIX_BASE_ID ?? "",
    missionMatrixAssessmentsTable:
      process.env.AIRTABLE_MM_ASSESSMENTS_TABLE ?? "Assessments",
    missionMatrixItemsTable:
      process.env.AIRTABLE_MM_ITEMS_TABLE ?? "AssessmentItems",
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID ?? "",
    authToken: process.env.TWILIO_AUTH_TOKEN ?? "",
    fromNumber: process.env.TWILIO_FROM_NUMBER ?? "",
    mock: process.env.TWILIO_MOCK === "1" || !process.env.TWILIO_ACCOUNT_SID,
  },
  cronSecret: process.env.CRON_SECRET ?? "",
  defaultTimezone: process.env.DEFAULT_TIMEZONE ?? "America/Los_Angeles",
  deliveryHour: Number(process.env.DELIVERY_HOUR ?? "10"),
  programLengthDays: Number(process.env.PROGRAM_LENGTH_DAYS ?? "28"),
};
