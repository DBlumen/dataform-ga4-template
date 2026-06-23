// Declares the GA4 raw export as a Dataform source (no table creation).
// Reference elsewhere with ref("events_*")

declare({
  database: constants.GCP_PROJECT,
  schema:   constants.GA4_DATASET,
  name:     "events_*",
});

// Comment out if your property does not have intraday exports
declare({
  database: constants.GCP_PROJECT,
  schema:   constants.GA4_DATASET,
  name:     "events_intraday_*",
});
