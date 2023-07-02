import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AuthService } from './../../auth/services/auth.service';
import { LoaderService } from './loader.service';
import {MessageService} from 'primeng/api';
@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor(protected authService: AuthService, private cookieService: CookieService,
    private loaderService: LoaderService,private messageService: MessageService
  ) { }
  private activeRequests = 0;

  /**
   * @param {HttpRequest<any>} req - The http request
   * @param {HttpHandler} next - The http handler
   * @return {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers.append('Accept: "*/*"', 'no-cache');
    headers = req.headers.append('Cache-control', 'no-store');
    headers = req.headers.append('Expires', '0');
    headers = req.headers.append('Pragma', 'no-cache');

    if (this.cookieService.get('token')) {
      headers = req.headers.append('Authorization', `Bearer ${this.cookieService.get('token')}`);
    }
    const requests = req.clone({ headers: headers, withCredentials: true });

    this.loaderService.show();
    this.activeRequests++;
    const handledRequest = next.handle(requests);
    return handledRequest.pipe(
      catchError((error: any) => {
        // Handle the error
        let errors = this.handleError(error);
        this.messageService.add({severity:'error', summary:errors.summary, detail:errors.detail});
        return throwError(error);
      }),
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loaderService.hide();
        }
      })
    );
  }

  private handleError(error: any): any {
    return {
      summary:error.error.message,
      detail:error.message
    }
  }
}
export const requestInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RequestInterceptorService,
  multi: true
};
