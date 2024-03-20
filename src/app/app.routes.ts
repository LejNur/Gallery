import { Routes } from '@angular/router';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { MapComponent } from './pages/map/map.component';

export const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'map', component: MapComponent },
];
