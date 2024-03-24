import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity = 1
  quantityInBasket = 0

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService, private basketService: BasketService) {
    this.bcService.set('@productDetails', '')
  }
  ngOnInit(): void {
    this.loadProduct()

  }
  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // we leave the breadcrumb trail with the property of id  (id of a product)
    if (id) this.shopService.getProduct(+id).subscribe({  //+ casts the id as a number -----  // subscribe to whatever getProduct gets after it makes a http request
      next: product => { // next we know that we are going to get an object of type Product 
        this.product = product; // so we assign the value
        this.bcService.set('@productDetails', product.name); // so that we have a nice url with a product name when we click on the product
        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next: basket => {
            const item = basket?.items.find(x => x.id === +id)
            if (item) {
              this.quantity = item.quantity;
              this.quantityInBasket = item.quantity; // it is used so we can get basket data concerning this particular product
            }
          }
        })
      },
      error: error => console.log(error)
    })
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    this.quantity--
  }
  updateBasket() {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket
        this.quantityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.product, itemsToAdd)
      } else {
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.product.id, itemsToRemove)
      }
    }

  }

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket'
  }



}
