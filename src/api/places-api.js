import axios from "axios";

export async function getPlaceById(placeId) {
  const response = await axios.get(`http://localhost:3000/places/${placeId}`);
  return response.data;
}
