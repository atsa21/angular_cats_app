import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Cat } from '../models/cat.model';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class CatsapidataService {

  myapikey="write-your-api-key"; //write your API key

  headers = new HttpHeaders({
    'x-api-key': this.myapikey
  });

  constructor(private http: HttpClient) { }

  getCats(): Observable<Cat[]> {
    
    let headers = this.headers;
    
    return this.http.get<Cat[]>('https://api.thecatapi.com/v1/breeds/', {headers});
  }

  getAllImages(): Observable<Image[]> {
    
    let headers = this.headers;
    let query_params = {
      limit: 30,
    }

    return this.http.get<Image[]>(`https://api.thecatapi.com/v1/images/search`, {headers, params: query_params});
  }

  getBreedImages(breedId: string): Observable<Image[]> {
    
    let headers = this.headers;
    let query_params = {
      breed_ids: breedId,
      limit: 30,
    }

    return this.http.get<Image[]>(`https://api.thecatapi.com/v1/images/search`, {headers, params: query_params});
  }

}
