import { api } from "./api";
export default async function fetchPlayerStatisticById(id, season) {
  return api("players/statistics", { id, season });
}
