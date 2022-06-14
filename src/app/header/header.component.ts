import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../shared/currency.service';

export interface CurrencyArr {
  txt: string;
  cc: string;
  rate: number;
  exchangedate: string;
  r030: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
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

  constructor(public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.setCurrencies();
  }

  setCurrencies = () => {
    this.currencyService.fetchCurrency().subscribe(() => {
      this.loading = false;

      this.currencyService.currencyArr.forEach((el) => {
        switch (el.cc) {
          case 'USD':
            this.USD = el;
            break;
          case 'EUR':
            this.EUR = el;
            break;

          default:
            break;
        }
      });
    });
  };
}
