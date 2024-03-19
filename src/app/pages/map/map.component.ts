import { Component, Injectable, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { marker } from 'leaflet';
import { InputComponent } from '../../components/input/input.component';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule, FormsModule, InputComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
@Injectable()
export class MapComponent implements OnInit {
  // geocoding
  map!: L.Map;
  lat!: number;
  lon!: number;
  options = {};
  layers: any[] = [];
  showMap: boolean = false;
  imgUrl: string = '';
  center = L.latLng(0, 0);
  zoom!: number;
  zoomOptions: boolean = false;

  placeholderText = 'Search city name';

  inputValue: string = '';

  constructor(private galleryApi: ApiService) {}

  ngOnInit() {
    this.geoCoding();
  }

  // geocode latest photos
  async geoCoding() {
    var geocode: any;
    let latestP = this.galleryApi.latestPictures();

    this.options = {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...',
        }),
      ],
      zoom: 2,
      center: L.latLng(0, 0),
    };

    await latestP.then(async (res) => {
      let cityNames = res.data;

      for (let i = 0; i < cityNames.length; i++) {
        var city = cityNames[i].user.location;
        city = city?.split(',')[0];

        this.imgUrl = cityNames[i].urls.small;

        if (city) {
          geocode = this.galleryApi.geocodeCityName(city);

          await geocode.then((res: any) => {
            let lat = res.data[0].lat;
            let lon = res.data[0].lon;

            let myIcon = L.icon({
              iconUrl: 'assets/camera-icon.png',
              iconSize: [24, 24],
            });

            let popupImg = `<img src="${this.imgUrl}" alt="Image"> <br> <p class="text-base font-mono font-medium">Taken in: ${city}</p> <p class="text-base font-mono font-medium">By: ${cityNames[i].user.first_name}</p>`;
            let popupOptions = {
              minWidth: 400,
              keepInView: true,
            };

            this.layers.push(
              marker([lat, lon], { icon: myIcon }).bindPopup(
                popupImg,
                popupOptions
              )
            );

            this.showMap = true;
          });
        }
      }
    });
  }

  //map on city search
  onSearch(input: string) {
    let newInput = this.galleryApi.geocodeCityName(input);
    console.log(input);

    newInput
      .then((res) => {
        let searchLat = res.data[0].lat;
        let searchLon = res.data[0].lon;
        // console.log(searchLat, searchLon, res.data[0].name);
        this.center = L.latLng(searchLat, searchLon);
        this.zoom = 8;
        this.zoomOptions = true;
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
}
