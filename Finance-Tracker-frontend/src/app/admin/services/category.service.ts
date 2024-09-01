import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryoService {

  constructor(private http:HttpClient) { }

  listCategories(): Observable<category[]>{
    return this.http.get<category[]>(`http://localhost:8080/category`);
  }
}
