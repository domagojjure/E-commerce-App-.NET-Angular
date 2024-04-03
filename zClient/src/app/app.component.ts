import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';

  constructor(private basketService: BasketService, private accountService: AccountService) {

  }
  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();

  }

  loadBasket(){
    const basketId =localStorage.getItem('basket_id');
    if (basketId) this.basketService.getBasket(basketId); // we dont use subscribe here because it is already used in getBasket Method 
  }

  loadCurrentUser(){
    const token =localStorage.getItem('token');
   this.accountService.loadCurrentUser(token).subscribe(); //subscribe actually calls the method and recieves new values

  }
}
