import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient:HttpClient) {}

  listarTransactions(): Observable<transaction[]>{
    return this.httpClient.get<transaction[]>("http://localhost:8080/transactions");
  }

  seeTransaction(id:number): Observable<transaction>{
    return this.httpClient.get<transaction>(`http://localhost:8080/transactions/${id}`);
  }

  createTransaction(cliente:any): Observable<transaction>{
    console.log(cliente);
    return this.httpClient.post<transaction>(`http://localhost:8080/transactions`, cliente);
  }
  updateTransaction(id:number,proyecto:any): Observable<transaction>{
    console.log(proyecto);
    return this.httpClient.put<transaction>(`http://localhost:8080/transactions/${id}`, proyecto);
  }
  deleteTransaction(id:number): Observable<transaction>{
    return this.httpClient.delete<transaction>(`http://localhost:8080/transactions/${id}`);
  }
}
