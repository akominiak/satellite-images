import { Component, OnInit } from '@angular/core';
import { ImageService } from './services/image.service';
import * as L from 'leaflet';
import { latLng, tileLayer } from 'leaflet';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private imageService: ImageService) { }
  title = 'Satellite Images';
  textSearch: string = "";
  imageToShow: any;
  //started values of lattitude and longitudde
  name = "województwo śląskie, Polska"
  lat = 50.5687422;
  lon = 19.2343995;
  map?: L.Map;
  isLoaded: boolean = false;

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 11,
    center: latLng([this.lat, this.lon])
  };

  ngOnInit(): void {
    this.imageService.getImage(this.lat.toString(), this.lon.toString()).subscribe((response) => {
      this.createImageFromBlob(response);
    });
  }

  getFilteredLocalization(img: any) {
    this.isLoaded = false;
    this.imageToShow = img;
    if (this.imageToShow.lon && this.imageToShow.lat) {
      this.name = this.imageToShow.display_name;
      this.lat = this.imageToShow.lat;
      this.lon = this.imageToShow.lon;
      if (this.map) {
        this.map.flyTo(new L.LatLng(this.lat, this.lon));
      }
      //getting satellite image
      this.imageService.getImage(this.imageToShow.lat, this.imageToShow.lon).subscribe((response) => {
        this.createImageFromBlob(response);
      });
    }
  }

  createImageFromBlob(image: Blob) {
    //converting blob to an image
    let src;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = function () {
      src = reader.result;
      //setting image
      const bg = document.querySelector('.photo') as HTMLElement;
      if (bg)
        bg.style.backgroundImage = `url(${src})`;
    }
    this.isLoaded = true;
  }

  onMapReady(map: L.Map) {
    //getting map instance
    this.map = map;
  }
}


