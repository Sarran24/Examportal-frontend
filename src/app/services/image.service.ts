import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private _http: HttpClient) {}

  public uploadImage(image: any) {
    return this._http.post(`${baseUrl}/api/image`, image);
  }

  downloadImage(fileName: string): Observable<ArrayBuffer> {
    const headers = new HttpHeaders({
      'Content-Type': 'image/png',
      Accept: 'image/png',
    });
    const options = { headers: headers, responseType: 'arraybuffer' as 'json' };
    return this._http.get<ArrayBuffer>(
      `${baseUrl}/api/image/${fileName}`,
      options
    );
  }
}
