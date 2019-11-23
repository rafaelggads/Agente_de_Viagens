import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Hotel } from '../models/hotel';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  url = 'http://localhost:3000/hoteis'; // api rest fake
  constructor(   private httpClient: HttpClient
    ) { }
  
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  
    // Obtem todos os hotels
    getHoteis(): Observable<Hotel[]> {
      return this.httpClient.get<Hotel[]>(this.url)
        .pipe(
          retry(2),
          catchError(this.handleError))
    }
  
    // Obtem um hotel pelo id
    getHotelById(id: number): Observable<Hotel> {
      return this.httpClient.get<Hotel>(this.url + '/' + id)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  
    // salva um hotel
    saveHotel(hotel: Hotel): Observable<Hotel> {
      return this.httpClient.post<Hotel>(this.url, JSON.stringify(hotel), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  
    // utualiza um hotel
    updateHotel(hotel: Hotel): Observable<Hotel> {
      return this.httpClient.put<Hotel>(this.url + '/' + hotel.id, JSON.stringify(hotel), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }
  
    // deleta um hotel
    deleteHotel(hotel: Hotel) {
      return this.httpClient.delete<Hotel>(this.url + '/' + hotel.id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }
  
    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    };
}
