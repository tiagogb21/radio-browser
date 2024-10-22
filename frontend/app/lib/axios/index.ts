import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://de1.api.radio-browser.info/json/stations/search?limit=10',
})
