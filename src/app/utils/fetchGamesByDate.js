import { api } from "./api";
export default async function fetchGamesByDate(date) {
  return api("games", { date, league: 1 });
}
