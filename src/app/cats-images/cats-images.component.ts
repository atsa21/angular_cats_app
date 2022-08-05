import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Cat } from '../models/cat.model';
import { Image } from '../models/image.model';
import { CatsapidataService } from '../services/catsapidata.service';


@Component({
  selector: 'app-cats-images',
  templateUrl: './cats-images.component.html',
  styleUrls: ['./cats-images.component.css']
})
export class CatsImagesComponent implements OnInit {

  catsList: Cat[] = [];
  cats: Cat[] = [];
  imagesList: Image[] = [];
  images: Image[] = [];

  // MatPaginator Inputs
  length: number = 0;
  pageSize: number = 10;  
  pageSizeOptions: number[] = [10, 20, 40];
  pageEvent: PageEvent | undefined;
  breakpoint: number = 10;  

  constructor(private api: CatsapidataService) {}

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 5;
    this.api.getCats()
    .subscribe((cats: Cat[]) => {
      this.catsList = cats;
      this.cats = this.catsList;
      this.length = this.cats.length;
      this.cats = this.catsList.slice(0, 10);
    });
  }

  getImages(breedId: string | undefined){
    if(typeof breedId === 'string'){
      this.api.getImages(breedId)
      .subscribe((images: Image[]) => {
        this.imagesList = images;
        this.images = this.imagesList;
        this.length = this.images.length;
        this.images = this.imagesList.slice(0, 10);
      });
    } else {
      alert ('Breed Id is not defined')
    }
  }

  OnPageChange(event: PageEvent){

    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if(endIndex > this.length) {
        endIndex = this.length;
    }
    this.cats = this.catsList.slice(startIndex, endIndex);
    this.images = this.imagesList.slice(startIndex, endIndex);
  }

  onResize(event: any) { 
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 5;
  }

}
