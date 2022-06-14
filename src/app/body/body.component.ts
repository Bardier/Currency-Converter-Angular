import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../shared/currency.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  firstInput: string = '';
  secondInput: string = '';

  constructor(public currencyService: CurrencyService) {}

  onInput(
    inputValue: string,
    firstSel: string,
    secondSel: string,
    flag: boolean
  ) {
    this.firstInput = inputValue.replace(/[^0-9\.]/g, '');
    if (!inputValue) {
      return;
    }

    let x = 0;
    let y = 0;
    let res = '';

    this.currencyService.allCurrencies.forEach((el) => {
      if (el.cc === firstSel) x = el.rate;
      if (el.cc === secondSel) y = el.rate;
    });

    if (flag) {
      switch (firstSel) {
        case 'UAH':
          if (secondSel === 'UAH') res = inputValue;
          else res = parseFloat(inputValue) / y + '';
          break;
        case 'EUR':
          if (secondSel === 'EUR') res = inputValue;
          else if (secondSel === 'UAH') res = parseFloat(inputValue) * x + '';
          else if (secondSel === 'USD')
            res = (x / y) * parseFloat(inputValue) + '';
          break;
        case 'USD':
          if (secondSel === 'USD') res = inputValue;
          else if (secondSel === 'UAH') res = parseFloat(inputValue) * x + '';
          else if (secondSel === 'EUR')
            res = (x / y) * parseFloat(inputValue) + '';
          break;
      }

      this.secondInput = isNaN(parseFloat(res))
        ? ''
        : parseFloat(res).toFixed(2);
    } else {
      switch (secondSel) {
        case 'UAH':
          if (firstSel === 'UAH') res = inputValue;
          else res = parseFloat(inputValue) / x + '';
          break;
        case 'EUR':
          if (firstSel === 'EUR') res = inputValue;
          else if (firstSel === 'UAH') res = parseFloat(inputValue) * y + '';
          else if (firstSel === 'USD')
            res = (y / x) * parseFloat(inputValue) + '';
          break;
        case 'USD':
          if (firstSel === 'USD') res = inputValue;
          else if (firstSel === 'UAH') res = parseFloat(inputValue) * y + '';
          else if (firstSel === 'EUR')
            res = (y / x) * parseFloat(inputValue) + '';
          break;
      }

      this.firstInput = isNaN(parseFloat(res))
        ? ''
        : parseFloat(res).toFixed(2);
    }
  }

  ngOnInit(): void {}
}
