import { api } from "./api";
export async function fetchGameById(id) {
  return api("games", { id });
}
