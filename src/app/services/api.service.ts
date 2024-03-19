import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

   latestPictures() {
    return axios.get('https://api.unsplash.com/photos/?', {
      params: {
        client_id: 'W-rethzqZc5kEnmrKRcwHz62-uWMKWU1mbHh5fK79vs',
        per_page: '20',
        order_by: 'latest',
      },
    });
  }

  searchPictures(query: string) {
    return axios.get('https://api.unsplash.com/search/photos/?', {
      params: {
        client_id: 'W-rethzqZc5kEnmrKRcwHz62-uWMKWU1mbHh5fK79vs',
        query: query,
        per_page: '20',
      },
    });
  }

  geocodeCityName(cityName: string) {
    return axios.get(
      `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json`
    );
  }
}