import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpAuthInterceptor } from "./http-auth.interceptor";

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
]