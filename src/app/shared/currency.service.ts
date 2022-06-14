import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface Currency {
  txt: string;
  cc: string;
  rate: number;
  exchangedate: string;
  r030: number;
}

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  public currencyArr: Currency[] = [];

  constructor(private httpRequest: HttpClient) {}

  fetchCurrency(): Observable<Currency[]> {
    return this.httpRequest
      .get<Currency[]>(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
      )
      .pipe(tap((arr) => (this.currencyArr = arr)));
  }
}
