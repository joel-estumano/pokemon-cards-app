import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const token = '1a2cd4fa-06ca-4dd8-8dd3-782203876a16';
		const request = req.clone({
			setHeaders: { 'X-Api-Key': `${token}` },
		});
		return next.handle(request);
	}
}
