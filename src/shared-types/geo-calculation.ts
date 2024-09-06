export enum EnumGeoCalculationType {
  HAVERSINE = 'HAVERSINE',
  GOOGLE_MATRIX_API = 'GOOGLE_MATRIX_API',
  RANDOM = 'RANDOM',
}

export const GEO_CALCULATION_TYPE_TO_HUMAN: Record<EnumGeoCalculationType, string> = {
  HAVERSINE: 'Haversine distance (Areal distance)',
  GOOGLE_MATRIX_API: 'Google Matrix API',
  RANDOM: 'Random distance (For development)',
}
