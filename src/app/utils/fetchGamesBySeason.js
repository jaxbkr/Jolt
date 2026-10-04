import { api } from "./api";
export async function fetchGamesBySeason(season) {
  return api("games", { season, league: 1 });
}
