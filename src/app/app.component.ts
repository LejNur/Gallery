import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { MapComponent } from './pages/map/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GalleryComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Gallery';
  constructor() {}

  ngOnInit() {}
}
