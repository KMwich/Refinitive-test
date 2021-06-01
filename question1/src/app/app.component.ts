import { Component } from '@angular/core';
import { CalculatorType } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _primeNumber: number[] = []
  
  public num: number;
  public calculatorType = CalculatorType.Prime
  public result: boolean = false

  CalculatorType = CalculatorType

  calculator() {
    if (typeof this.num === 'number') {
      if (this.num < 0) {
        this.num = 1;
      } else {
        this.num = Math.round(this.num);
      }
      switch (this.calculatorType) {
        case CalculatorType.Prime:
          this.result = this._isPrime(this.num)
          break;
        case CalculatorType.Fibonacci:
          this.result = this._isFibonacci(this.num)
          break;
      }
    } else {
      this.result = false;
    }
  }

  private _isPrime(n: number): boolean {
    return this._sieveOfEratosthenes(n);
  }

  private _sieveOfEratosthenes(n: number): boolean {
    if (this._primeNumber.includes(n)) {
      return true;
    } else {
      const lastPrimeNumber = this._primeNumber.pop() || 2
      if (n < lastPrimeNumber) {
        return false;
      }
      let numbers = new Array(n - lastPrimeNumber + 1).fill(0).map((_, i) => i + lastPrimeNumber)
      numbers = [...this._primeNumber, ...numbers]
      for (let i = 0; i < numbers.length; i++) {
        const currentNumber = numbers[i];
        numbers = numbers.filter(prime => prime === currentNumber || prime % currentNumber !== 0)
      }
      this._primeNumber = numbers;
      return numbers.includes(n);
    }
  }

  private _isFibonacci(n: number): boolean {
    return this._isPerfectSquare(5 * n * n + 4) || this._isPerfectSquare(5 * n * n - 4);
  }

  private _isPerfectSquare(x: number) {
    const s = Math.floor(Math.sqrt(x));
    return s * s === x;
  }
  
}
