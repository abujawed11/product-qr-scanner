export function mapCodeToCity(code: string): string {
  switch (code) {
    case "RH":
      return "Ranchi";
    case "BS":
      return "Boisar";
    case "CN":
      return "Chennai";
    default:
      return "Unknown";
  }
}