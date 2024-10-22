import { Component, Injectable, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { CardComponent } from '../../components/card/card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';




@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    FormsModule,
    InputComponent,
    CardComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  imgUrl: any = [];
  queryUrl: any = [];
  searchInput: string = '';
  singleImg: string | null = null;
  isFullscreen: boolean = false;

  //scroll to section
  @ViewChild('searchPhotoSection', { static: false })
  searchPhotoSection!: ElementRef;

  scrollToNewPhotos() {

  setTimeout(()=> {
      if (this.searchPhotoSection) {
        // Scroll to the top of the new photos section
        this.searchPhotoSection.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);


  }

  //input component
  placeholderText = 'Search Photo';

  textHover = 'Hello';

  constructor(private galleryApi: ApiService) {}

  ngOnInit() {
    let gallery = this.galleryApi.latestPictures();
    console.log(gallery);

    gallery
      .then((res) => {
        this.imgUrl = res.data;
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  onSearchPicture(input: string) {
   let result = this.galleryApi.searchPictures(input);

    result
      .then((res) => {
        this.queryUrl = res.data.results;
      })
      .catch((error) => {
        console.log('error', error);
      });

      //scrolling
     this.scrollToNewPhotos();

  }

  onFullscreen(img: string) {
    this.singleImg = img;

    setTimeout(() => {
      this.isFullscreen = !this.isFullscreen;
    }, 100);
  }

  closeFullscreen() {
    this.singleImg = null;
    this.isFullscreen = !this.isFullscreen;
  }

  
}
