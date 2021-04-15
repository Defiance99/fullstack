import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterseptor implements HttpInterceptor {
    
    constructor(private authService: AuthService, private router: Router) {}

    private token: any

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.getToken() == null) {
            this.token = '';
        }else {
            this.token = this.authService.getToken();
        }

        if (this.authService) {
            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
        }
        return next.handle(req).pipe(
            catchError(
                (error: HttpErrorResponse) => this.handleAuthError(error)
            )
        )
    }

    private handleAuthError(error: HttpErrorResponse) {
        if (error.status === 401) {
            /* this.authService.updateTokens(); */
            /* this.router.navigate(['/admin-panel/login'], {
                queryParams: {
                    'sessionFailed': true
                }
            }) */
        }

        return throwError(error)
    }
}