import axios from "axios";

export async function load() {
  const response = await axios.get(
    'http://saraht04.pythonanywhere.com/'
  )
  return {
    data: response.data
  }
}
