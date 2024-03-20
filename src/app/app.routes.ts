import { Routes } from '@angular/router';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { MapComponent } from './pages/map/map.component';

export const routes: Routes = [
  { path: '', component: GalleryComponent, pathMatch: 'full' },
  { path: 'map', component: MapComponent },
];
