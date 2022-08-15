import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable, startWith } from 'rxjs';
import { Cat } from '../models/cat.model';
import { Image } from '../models/image.model';
import { CatsapidataService } from '../services/catsapidata.service';

@Component({
  selector: 'app-cats-images',
  templateUrl: './cats-images.component.html',
  styleUrls: ['./cats-images.component.css']
})
export class CatsImagesComponent implements OnInit {

  breedsControl = new FormControl<string | Cat>('');
  filteredOptions: Observable<Cat[]> | undefined;

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
  breedId = '';

  constructor(private api: CatsapidataService) {}

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 5;
    this.api.getCats()
    .subscribe((cats: Cat[]) => {
      this.catsList = cats;
      this.cats = this.catsList;
    });
    this.getImages(this.breedId);
  }

  displayBreeds(){
    this.filteredOptions = this.breedsControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.catsList.slice();
      }),
    );
  }

  displayFn(user: Cat): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Cat[] {
    const filterValue = name.toLowerCase();

    return this.catsList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getImages(breedId: string | undefined) {
    if(breedId){
      this.api.getBreedImages(breedId)
      .subscribe((images: Image[]) => {
        this.imagesList = images;
        this.images = this.imagesList;
        this.length = this.images.length;
        this.images = this.imagesList.slice(0, 10);
      });
    } else {
      this.api.getAllImages()
      .subscribe((images: Image[]) => {
        this.imagesList = images;
        this.images = this.imagesList;
        this.length = this.images.length;
        this.images = this.imagesList.slice(0, 10);
      });
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
