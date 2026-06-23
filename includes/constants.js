// =============================================================================
// constants.js
// Central configuration — replace all placeholder values before deploying.
// =============================================================================

const GCP_PROJECT          = "YOUR_GCP_PROJECT_ID";
const GA4_DATASET          = "YOUR_GA4_EXPORT_DATASET";   // e.g. analytics_123456789
const GA4_TABLE            = "events_*";
const START_DATE           = "2024-01-01";                 // earliest backfill date
const FINALITY_DELAY_DAYS  = 3;                            // GA4 72h back-fill window

const STAGING_DATASET        = "ga4_flattened_staging";
const TRANSFORMATIONS_DATASET = "ga4_transformations";
const DASHBOARDS_DATASET      = "ga4_dashboards";

const STAGING_TABLE_NAME   = "ga4_events_flat";

module.exports = {
  GCP_PROJECT,
  GA4_DATASET,
  GA4_TABLE,
  START_DATE,
  FINALITY_DELAY_DAYS,
  STAGING_DATASET,
  TRANSFORMATIONS_DATASET,
  DASHBOARDS_DATASET,
  STAGING_TABLE_NAME,
};
