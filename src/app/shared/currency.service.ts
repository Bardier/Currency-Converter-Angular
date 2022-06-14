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

  public loading: boolean = true;

  public allCurrencies = [
    {
      r030: 0,
      txt: 'Гривна',
      rate: 1,
      cc: 'UAH',
      exchangedate: '',
    },
  ];

  constructor(private httpRequest: HttpClient) {}

  fetchCurrency(): Observable<Currency[]> {
    return this.httpRequest
      .get<Currency[]>(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
      )
      .pipe(tap((arr) => (this.currencyArr = arr)));
  }

  setCurrencies = () => {
    this.fetchCurrency().subscribe(() => {
      this.loading = false;

      this.currencyArr.forEach((el, i) => {
        if (el.cc === 'USD' || el.cc === 'EUR') {
          this.allCurrencies.push(el);
        }
      });

      this.allCurrencies.forEach((el) => {
        el.rate = +el.rate.toFixed(2);
      });
    });
  };
}
