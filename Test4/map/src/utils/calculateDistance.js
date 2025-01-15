export function calculateDistance(route) {
  const R = 6371 // Radius bumi km

  if (!route || !Array.isArray(route.points) || route.points.length < 2) {
    return 0
  }

  const points = route.points
  let totalDistance = points.reduce((sum, currentPoint, index) => {
    if (index === points.length - 1) return sum
    const [lat1, lon1] = [currentPoint.latitude, currentPoint.longitude]
    const [lat2, lon2] = [points[index + 1].latitude, points[index + 1].longitude]

    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return sum + R * c
  }, 0)

  if (route.sub_routes) {
    for (const subRoute of route.sub_routes) {
      totalDistance += calculateDistance(subRoute)
    }
  }

  return totalDistance
}
