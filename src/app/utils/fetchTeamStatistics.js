import { api } from "./api";
export async function fetchTeamStatistics(id) {
  return api("games/statistics/teams", { id });
}
