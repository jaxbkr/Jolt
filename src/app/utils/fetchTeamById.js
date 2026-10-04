import { api } from "./api";
export default async function fetchTeamById(id) {
  return api("teams", { id });
}
