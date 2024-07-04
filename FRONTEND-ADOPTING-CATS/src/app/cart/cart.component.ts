import { Component, Inject, OnInit } from '@angular/core';


import { CartService } from '../services/cart.service';
import { Cat } from '../shared/cat';
import { Router } from '@angular/router';
import { CatService } from '../services/cat.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  

cart: Cat[] = [];

  constructor(private  router : Router , 
    private catService : CatService  ,
    private cartService : CartService,

    @Inject('BaseURL') public baseURL:any) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCartItems();
  }

  rmvFrmCart(id: number) {
    this.cartService.removeFromPanier(id);
    this.cart = this.cartService.getCartItems();
  }

  resetCart() {
    this.cartService.clearCart();
    this.cart = [];
  }
goToCats(){
  this.router.navigateByUrl("/cats") ;
  }

}