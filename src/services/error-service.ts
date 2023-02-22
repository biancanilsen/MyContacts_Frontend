import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  handleError(error: HttpErrorResponse): Observable<any> {
    // Aqui você pode adicionar sua lógica de tratamento de erros, como enviar um log de erro para o servidor
    console.error('Ocorreu um erro:', error);
    return throwError(error);
  }
}