import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Cat } from '../models/cat.model';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class CatsapidataService {

  myapikey="write-your-api-code";  //write your API key

  constructor(private http: HttpClient) { }

  getCats(): Observable<Cat[]> {
    const headers = new HttpHeaders({
      'x-api-key': this.myapikey
    });
    return this.http.get<Cat[]>('https://api.thecatapi.com/v1/breeds/', {headers});
  }

  getImages(breedId: string): Observable<Image[]> {
    const headers = new HttpHeaders({
      'x-api-key': this.myapikey
    });

    let query_params = {
      breed_ids: breedId,
      limit: 60,
    }
    return this.http.get<Image[]>('https://api.thecatapi.com/v1/images/search', {headers, params: query_params});
  }


}
