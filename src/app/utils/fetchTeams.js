import { api } from "./api";
export async function fetchTeams(season) {
  return api("teams", { season, league: 1 });
}
