import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private readonly apiURL: string;

    constructor(private httpClient: HttpClient) {
        this.apiURL = 'https://api.pokemontcg.io/v2/';
    }

    public getData<T>(url: string): Observable<T> {
        return this.httpClient
            .get<any>(`${this.apiURL}${url}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .pipe();
    }
}
