/**
 * Converts a FeatureCollection to a single Geometry (Polygon or MultiPolygon)
 * suitable for PostGIS storage via ST_GeomFromGeoJSON
 */
export function normalizeRegionForPostGIS(region: any): any {
  if (!region || typeof region !== 'object') {
    return region
  }

  // Handle FeatureCollection - extract and merge geometries
  if (region.type === 'FeatureCollection' && region.features?.length > 0) {
    const geometries = region.features
      .map((f: any) => f.geometry)
      .filter((g: any) => g) // Filter out null geometries

    if (geometries.length === 0) {
      return null
    }

    if (geometries.length === 1) {
      // Single geometry - return as-is
      return geometries[0]
    }

    // Multiple geometries - check if all are Polygons
    const allPolygons = geometries.every((g: any) => g.type === 'Polygon')

    if (allPolygons) {
      // Create a MultiPolygon from all polygon geometries
      return {
        type: 'MultiPolygon',
        coordinates: geometries.map((g: any) => g.coordinates),
      }
    }

    // Mixed geometry types - fall back to first geometry
    return geometries[0]
  }

  // Handle single Feature - extract geometry
  if (region.type === 'Feature') {
    return region.geometry
  }

  // Assume it's already a geometry object (Polygon, MultiPolygon, etc.)
  return region
}
