import { TLatLng } from "../typings";

export function isLocInCircle(
  center: TLatLng | null,
  position: TLatLng | undefined,
  radius: number
) {
  if (!center || !position) return false;

  const ky = 40000 / 360;
  const kx = Math.cos((Math.PI * center.lat()) / 180.0) * ky;
  const dx = Math.abs(center.lng() - position.lng()) * kx;
  const dy = Math.abs(center.lat() - position.lat()) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= radius / 1000;
}
