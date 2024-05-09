import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket, BasketItem } from '../models/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit{
 
 // basket$: Observable<Basket>;
  
  @Output() addItem=new EventEmitter<BasketItem>();
  @Output() removeItem=new EventEmitter<{id:number,quantity:number}>();
  @Input() isBasket = true;

  constructor(public basketService: BasketService) { }

  ngOnInit() {
    //this.basket$ = this.basketService.basket$;
  }

  addBasketItem(item:BasketItem){
    this.addItem.emit(item)
  }

  removeBasketItem(id: number, quantity=1) {
    this.removeItem.emit({id,quantity});
  }

}
