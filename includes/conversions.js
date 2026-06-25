// =============================================================================
// conversions.js
// -----------------------------------------------------------------------------
// Defines which GA4 event names count as conversions for the sessions model.
//
// By default only 'purchase' is included. Populate this list per client based
// on their key events / conversion events in GA4.
//
// Used by definitions/02_transformations/sessions.sqlx to:
//   - count conversion events per session  -> `conversions` metric
//   - flag converting sessions             -> `is_converting_session`
//
// Later models can then derive:
//   - raw conversions      = SUM(conversions)
//   - conversion rate      = COUNTIF(is_converting_session) / COUNT(session_id)
// =============================================================================

// Add client-specific conversion event names here, e.g.:
//   "generate_lead", "sign_up", "form_submit", "begin_checkout"
const CONVERSION_EVENTS = [
  "purchase",
];

// -----------------------------------------------------------------------------
// Helper: builds a SQL IN-list string from the array above.
// Produces: 'purchase', 'generate_lead', ...
// Used inside sessions.sqlx via ${conversions.sqlInList()}
// -----------------------------------------------------------------------------
const sqlInList = () => {
  return CONVERSION_EVENTS.map((e) => `'${e}'`).join(", ");
};

module.exports = {
  CONVERSION_EVENTS,
  sqlInList,
};