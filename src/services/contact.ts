import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface ContactFormPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  website: string;
  company_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class Contact {
  // ⬇️ REPLACE with your actual Apps Script Web App URL
  private apiUrl = environment.apiUrl + '?route=contact';

  constructor(private http: HttpClient) {}

  submitForm(data: ContactFormPayload): Observable<any> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain;charset=utf-8',
    });

    const body = JSON.stringify(data);

    return this.http.post(this.apiUrl, body, {
      headers,
      responseType: 'text' as 'json' // Apps Script returns text; we treat it as JSON string
    });
  }
}