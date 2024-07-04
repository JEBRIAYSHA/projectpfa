import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cat } from '../shared/cat';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private key = 'cart'; // Clé pour le LocalStorage
  private cartSubject = new BehaviorSubject<Cat[]>([]);
  constructor() {
    // Initialisation of BehaviorSubject and existing cat
    this.cartSubject.next(this.getCartItems());
  }
  

  addToCart(cat: Cat) {
    
    
    let cart: Cat[] = this.getCartItems();

    // Vérifie si le produit est déjà dans le panier
    let existingCat = cart.find(p => p.id === cat.id);

    if (existingCat) {
      // Si le produit existe déjà, augmentez la quantité
      existingCat.quantity++;
     
    } else {
      // Sinon, ajoutez le produit au panier avec une quantité initiale de 1
      cat.quantity = 1;
     
      cart.push(cat);
    }

    // Mettez à jour le panier dans le LocalStorage et le BehaviorSubject
    localStorage.setItem(this.key, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  getCartItems(): Cat[] {
    let cartItems = localStorage.getItem(this.key);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  clearCart() {
    localStorage.removeItem(this.key);
    this.cartSubject.next([]);
  }

  removeFromPanier(id: number) {
    let cart: Cat[] = this.getCartItems();
    let index = cart.findIndex(p => p.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem(this.key, JSON.stringify(cart));
      this.cartSubject.next(cart);
    }
  }

  // Méthode pour récupérer le nombre total de produits dans le panier
  getTotalCat(): number {
    let cart: Cat[] = this.getCartItems();
    return cart.reduce((total, cat) => total + cat.quantity, 0);
  }

  // Observable pour écouter les changements de panier
  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  
}