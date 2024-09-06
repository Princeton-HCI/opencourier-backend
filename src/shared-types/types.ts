export type JsonObject = { [Key in string]?: JsonValue }
export type JsonValue = string | number | boolean | JsonObject | JsonArray
export interface JsonArray extends Array<JsonValue> {}
