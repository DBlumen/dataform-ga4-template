# Dataform GA4 Blueprint

## Setup

1. Fill in `includes/constants.js` with client values
2. Set `defaultDatabase` and `defaultLocation` in `dataform.json`
3. Run full refresh on first deployment
4. Schedule daily incremental runs in Dataform

## Incremental strategy

Delete + checkpoint (Salonen method). Rows within the 72h GA4 back-fill
window are flagged `data_is_final = false` and re-fetched on the next run.

## Structure

```
includes/
  constants.js       ← config: project, dataset, dates
  helpers.js         ← JS helpers for unnesting event_params

definitions/
  00_sources/        ← GA4 raw export source declarations
  01_staging/        ← flat incremental table (ga4_events_flat)
  02_transformations/← silver layer: sessions, items, transactions
  03_dashboards/     ← gold layer: report-ready tables
```
