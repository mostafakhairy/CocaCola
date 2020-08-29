
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

export class BaseService {
  public baseUrl = environment.baseUrlConfig || location.origin;


  constructor(public url: string, private httpClient: HttpClient,
      ) {
  }
  getAuthHeader() {
    return  {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer "+localStorage.userToken,
        'accept-language': localStorage.lang || 'en-US'
      })};
  }
  getAll() {
   return this.httpClient.get(this.baseUrl + this.url, this.getAuthHeader());
  }

  getById(id) {
    return this.httpClient.get(this.baseUrl + this.url + '/' + id, this.getAuthHeader());
  }
  Create(object) {
    return this.httpClient.post(this.baseUrl + this.url, object, this.getAuthHeader());
  }
  Edit(object) {
    return this.httpClient.put(this.baseUrl + this.url, object, this.getAuthHeader());
  }
  delete(id) {
    return this.httpClient.delete(this.baseUrl + this.url + '/' + id, this.getAuthHeader());
  }
}
