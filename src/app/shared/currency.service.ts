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
  public USD = {
    cc: '',
    exchangedate: '',
    r030: 0,
    rate: 0,
    txt: '',
  };
  public EUR = {
    cc: '',
    exchangedate: '',
    r030: 0,
    rate: 0,
    txt: '',
  };

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

      this.currencyArr.forEach((el) => {
        switch (el.cc) {
          case 'USD':
            this.USD = el;
            this.USD.rate = +this.USD.rate.toFixed(2);
            break;
          case 'EUR':
            this.EUR = el;
            this.EUR.rate = +this.EUR.rate.toFixed(2);
            break;

          default:
            break;
        }
      });
    });
  };
}
