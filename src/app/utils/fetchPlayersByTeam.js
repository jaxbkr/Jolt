import { api } from "./api";
export default async function fetchPlayersByTeam(team, season) {
  return api("players", { team, season });
}
