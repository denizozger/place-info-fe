import axios from "axios";

const PLACE_API_ENDPOINT = 'http://localhost:3000/places'

export async function getPlaceById(placeId) {
  const response = await axios.get(`${PLACE_API_ENDPOINT}/${placeId}`);
  return response.data;
}
