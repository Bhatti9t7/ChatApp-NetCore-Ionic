import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getAll(entity: string) {
    return this.httpClient.get(`${environment.baseURL}/api/${entity}`);
  }
  getSingle(entity: string, id: number) {    
    return this.httpClient.get(`${environment.baseURL}/api/${entity}/${id}`);
  }
  create(entity: string, data: any) {
    return this.httpClient.post(`${environment.baseURL}/api/${entity}`, data);
  }
  update(entity: string, id: number, data: any) {
    return this.httpClient.put(`${environment.baseURL}/api/${entity}/${id}`, data);
  }
  delete(entity: string, id: number) {
    return this.httpClient.delete(`${environment.baseURL}/api/${entity}/${id}`); 
  }
}

