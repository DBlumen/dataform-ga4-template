// =============================================================================
// helpers.js
// JS helper functions for unnesting and cleaning GA4 export fields.
// Use in .sqlx files via: ${helpers.getEventParam('page_location', 'string')}
// =============================================================================

// Unnest a single key from event_params ARRAY<STRUCT>
// valueType: 'string' | 'int' | 'float' | 'double'
const getEventParam = (key, valueType = "string", alias = null) => {
  const valueField = {
    string: "string_value",
    int:    "int_value",
    float:  "float_value",
    double: "double_value",
  }[valueType];

  if (!valueField) {
    throw new Error(`helpers.getEventParam: unknown valueType "${valueType}" for key "${key}".`);
  }

  const outputAlias = alias || key;
  return `(
    SELECT ep.value.${valueField}
    FROM UNNEST(event_params) AS ep
    WHERE ep.key = '${key}'
    LIMIT 1
  ) AS ${outputAlias}`;
};

// Unnest a single key from user_properties ARRAY<STRUCT>
// valueType: 'string' | 'int' | 'float' | 'double' | 'set_timestamp'
const getUserProperty = (key, valueType = "string", alias = null) => {
  const valueField = {
    string:        "string_value",
    int:           "int_value",
    float:         "float_value",
    double:        "double_value",
    set_timestamp: "set_timestamp_micros",
  }[valueType];

  if (!valueField) {
    throw new Error(`helpers.getUserProperty: unknown valueType "${valueType}" for key "${key}".`);
  }

  const outputAlias = alias || `user_property_${key}`;
  return `(
    SELECT up.value.${valueField}
    FROM UNNEST(user_properties) AS up
    WHERE up.key = '${key}'
    LIMIT 1
  ) AS ${outputAlias}`;
};

// Batch generate multiple event_params columns from an array of {name, type, alias?}
const getEventParams = (paramsList) =>
  paramsList.map((p) => getEventParam(p.name, p.type, p.alias || null)).join(",\n  ");

module.exports = {
  getEventParam,
  getEventParams,
  getUserProperty,
};
