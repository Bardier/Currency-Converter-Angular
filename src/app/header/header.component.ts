import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../shared/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.setCurrencies();
  }
}
