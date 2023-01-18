import {
    HttpClient,
    HttpHeaders,
    HttpParams,
    HttpXsrfTokenExtractor,
  } from '@angular/common/http';
  import { EventEmitter, Injectable, Output } from '@angular/core';
  import { environment } from './environments/environment';
  import { Observable, Subject, throwError } from 'rxjs';
  import { catchError, finalize } from 'rxjs/operators';
  
  export declare const enum RequestMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
    Options = 'OPTIONS',
    Head = 'HEAD',
    Patch = 'PATCH',
  }
  
  export class ApiGatewayOptions {
    baseUrl!: string;
    method!: RequestMethod;
    url!: string;
    headers!: HttpHeaders;
    params = {};
    data = {};
  }
  
  @Injectable({
    providedIn: 'root',
  })
  export class ApiGateway {
    public instanceNumber: number =
      Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  
    private errorsSubject = new Subject<any>();
  
    errors$: Observable<any>;
  
    private pendingCommandsSubject = new Subject<number>();
    private pendingCommandCount = 0;
  
    pendingCommands$: Observable<number>;
  
    @Output() tokenExpired: EventEmitter<any> = new EventEmitter();
  
    constructor(
      public http: HttpClient,
      private tokenExtractor: HttpXsrfTokenExtractor
    ) {
      this.errors$ = this.errorsSubject.asObservable();
      this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
    }
  
    get(url: string, params?: any, showLoading?: boolean): Observable<any> {
      let options = new ApiGatewayOptions();
      options.baseUrl = environment.baseUrl;
      options.method = RequestMethod.Get;
      options.url = url;
      options.params = params;
  
      this.http.request(options.method, options.url, options.params);
      return this.request(options, showLoading);
    }
  
    post(url: string, params?: any, data?: any): Observable<any> {
      if (!data) {
        data = params;
        params = {};
      }
      let options = new ApiGatewayOptions();
      options.baseUrl = environment.baseUrl;
      options.method = RequestMethod.Post;
      options.url = url;
      options.params = params;
      options.data = data;
      return this.request(options);
    }
  
    put(url: string, params?: any, data?: any) {
      if (!data) {
        data = params;
        params = {};
      }
      let options = new ApiGatewayOptions();
      options.baseUrl = environment.baseUrl;
      options.method = RequestMethod.Put;
      options.url = url;
      options.params = params;
      options.data = data;
  
      return this.request(options);
    }
  
    delete(url: string, params?: any, data?: any) {
      if (!data) {
        data = params;
        params = {};
      }
      let options = new ApiGatewayOptions();
      options.baseUrl = environment.baseUrl;
      options.method = RequestMethod.Delete;
      options.url = url;
      options.params = params;
      options.data = data;
  
      return this.request(options);
    }
  
    patch(url: string, params?: any, data?: any) {
      if (!data) {
        data = params;
        params = {};
      }
      let options = new ApiGatewayOptions();
      options.baseUrl = environment.baseUrl;
      options.method = RequestMethod.Patch;
      options.url = url;
      options.params = params;
      options.data = data;
  
      return this.request(options);
    }
  
    head(url: string, params: any, data: any) {
      if (!data) {
        data = params;
        params = {};
      }
      let options = new ApiGatewayOptions();
      options.baseUrl = environment.baseUrl;
      options.method = RequestMethod.Head;
      options.url = url;
      options.params = params;
      options.data = data;
      return this.request(options);
    }
  
    private request(
      options: ApiGatewayOptions,
      showLoading?: boolean
    ): Observable<any> {
      options.method = options.method || RequestMethod.Get;
      options.url = options.url || '';
      options.headers = options.headers || new HttpHeaders();
      options.params = options.params || {};
      options.data = options.data || {};
  
      this.interpolateUrl(options);
      this.addXsrfToken(options);
  
      if (!(options.data instanceof FormData)) {
        this.addContentType(options);
      }
      this.addAuthToken(options);
  
      let requestOptions = {
        method: options.method,
        url: options.baseUrl + options.url,
        headers: options.headers,
        search: this.buildUrlSearchParams(options.params),
        body: JSON.stringify(options.data),
        // withCredentials:  true,
        observe: 'response' as 'response',
      };
  
      let isCommand =
        showLoading === true || options.method !== RequestMethod.Get;
  
      if (isCommand) {
        this.pendingCommandsSubject.next(++this.pendingCommandCount);
      }
  
      if (isCommand) {
        // this.loader.show();
      }
  
      let stream = this.http
        .request(requestOptions.method, requestOptions.url, requestOptions)
        .pipe(
          catchError((error) => {
            this.errorsSubject.next(error);
            return throwError(error);
          }),
          catchError((error) => {
            return throwError(this.unwrapHttpError(error));
          }),
          finalize(() => {
            if (isCommand) {
              this.pendingCommandsSubject.next(--this.pendingCommandCount);
            }
  
            if (isCommand) {
              // this.loader.hide();
            }
          })
        );
      return stream;
    }
  
    private addContentType(options: ApiGatewayOptions): ApiGatewayOptions {
      if (options.method !== RequestMethod.Get) {
        options.headers = options.headers.append(
          'Content-Type',
          'application/json;  charset=UTF-8'
        );
      }
      return options;
    }
  
    private extractValue(collection: any, key: string): any {
      var value = collection[key];
      delete collection[key];
      return value;
    }
  
    private addXsrfToken(options: ApiGatewayOptions): ApiGatewayOptions {
      this.tokenExtractor.getToken();
      var xsrfCookie = this.getXsrfCookie();
      const csrf = localStorage.getItem('xsrfToken');
      if (csrf) {
        options.headers = options.headers.append('X-CSRF-TOKEN', csrf);
      }
      // options.data = { ...options.data, _token: xsrfToken, csrf_token: xsrfToken }
      return options;
    }
    private addAuthToken(options: ApiGatewayOptions): ApiGatewayOptions {
      const token = localStorage.getItem('token');
      if (token) {
        options.headers = options.headers.append(
          'Authorization',
          'Bearer ' + token
        );
      }
      return options;
    }
  
    private getXsrfCookie(): string {
      // this.cookieService.set('XSRF-TOKEN', 'eyJpdiI6IkQyWmtpZTBPempDOHgyZEQ5QmExVWc9PSIsInZhbHVlIjoiTFUwV1RSNlVvOWpoeFRRcHJieGFNZ3VaTTNsU3hQMDRZeVFyQndpYVFVSmVWM2lBOWRMaHZXM1k3cmt6WkpZNDZWb0QxSHpqeWpwYVFjSmdtUVlvdTRPQUFSdEF5cXhDZ3hOTVQ1a2NqOEZsanpxVWRlMGphLys4N0NIb3dUMVkiLCJtYWMiOiJhY2NmY2QwMmEwNTYyZWI3Nzc4ODE0YTUyNTFmMTllMGQ2Yjk0YTdiYjg5MDQwNmRlY2Y0NzVhZTJmZTc4NGFjIiwidGFnIjoiIn0%3D')
      // this.cookieService.set('laravel_session', 'eyJpdiI6IlEvNUJNVmRERlRrSG5KN20rK3BHTkE9PSIsInZhbHVlIjoieXhRL2o0VnhKVG9sNG0wQW9heElIYnlOSGE1aHA2WCtZSElGbWZ6ckpZbW5xcXdOd3AyV3BvSmtGWXJBbzIwUit1SUl4MUU4NS9rbTh2UzkrTC94L0NSc2F5ellKZFZSWmNIVCtOSEZEdWhFaDBDNXArK0p2dWxncHovOGFCdlAiLCJtYWMiOiJkZmQxMGUzODc5MmMyZTk3YTk0MTc4OTc1YjU2NzZmOTA4MTRlOTQ4NmJmMjY3MjRhZWJkMGUyNjI1ZWRkY2Q1IiwidGFnIjoiIn0%3D')
      var matches = document.cookie.match(/\bXSRF-TOKEN=([^\s;]+)/);
      try {
        return (matches && decodeURIComponent(matches[1]))!;
      } catch (decodeError) {
        return '';
      }
    }
  
    private buildUrlSearchParams(params: any): HttpParams {
      var searchParams = new HttpParams();
      for (var key in params) {
        searchParams.append(key, params[key]);
      }
      return searchParams;
    }
  
    private interpolateUrl(options: ApiGatewayOptions): ApiGatewayOptions {
      options.url = options.url.replace(/:([a-zA-Z]+[\w-]*)/g, ($0, token) => {
        if (options.params.hasOwnProperty(token)) {
          return this.extractValue(options.params, token);
        }
        if (options.data.hasOwnProperty(token)) {
          return this.extractValue(options.data, token);
        }
        return '';
      });
      options.url = options.url.replace(/\/{2,}/g, '/');
  
      return options;
    }
  
    private unwrapHttpError(error: any): any {
      try {
        if (!error.message) {
          error = { message: 'Erro ao conectar-se ao servidor.', _error: error };
        }
        const excepetion = error.error;
        if (error.status == 401) {
          // this.snackBar.errorMessage('Não autorizado');
          setTimeout(() => {
            // TODO - Remove only necessary
            localStorage.clear();
            location.replace('');
          }, 2000);
        } else if (!excepetion.code) {
          // this.snackBar.unexpectedMessage();
        } else {
          console.log('error: ' + excepetion);
          // this.snackBar.errorMessage(error.message);
        }
        return error;
      } catch (jsonError) {
        // this.snackBar.errorMessage('Erro ao conectar-se ao servidor. Tente novamente mais tarde.');
        return {
          code: -1,
          message: 'Erro ao conectar-se ao servidor. Tente novamente mais tarde.',
          jsonError,
        };
      }
    }
  
    private unwrapHttpValue(res: any): any {
      if (res.text()) {
        let result = res.json();
        result['headers'] = res.headers;
        return result;
      }
      return { headers: res.headers };
    }
  }
  