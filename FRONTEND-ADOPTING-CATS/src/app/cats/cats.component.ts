import { Router } from '@angular/router';

import { Component, Inject, OnInit } from '@angular/core';
import { Cat } from '../shared/cat';
import { CatService } from '../services/cat.service';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent  implements OnInit{

  cats!:Cat[]
  errMsg!:string  
  isWaiting : boolean = true ;
  isWaitingDelete :boolean = false ;
  // Shows admin functions if user has admin role
  showAdminFn = false;
  authUserSub!: Subscription; // Subscription to the authenticated user observable
  constructor(private router : Router , 
    private catService : CatService  ,
    private authService: AuthServiceService,
     @Inject('BaseURL') public baseURL:any
  ){}
 
  ngOnInit(): void {
    // this.cats = this.catService.getCats();
    // observer
    this.catService.getCats().subscribe(
      {
        next:(cats:Cat[])=>{this.cats = cats; this.isWaiting = false ; this.errMsg = ""},
        error : (err)=>{this.cats =[],this.isWaiting = false ;this.errMsg=err}
      }
    )

     // Subscribe to the AuthenticatedUser$ observable
     this.authUserSub=this.authService.AuthenticatedUser$.subscribe({
      next: user => {
        // If user is authenticated
        if (user) {
          // Show admin Fn if user has admin role
          this.showAdminFn = user.role.name === 'ROLE_ADMIN';
          console.log(this.showAdminFn);

        } else {
          this.showAdminFn = false;
        }
      }
    })
  }
 

  onDelete(id: any){
    this.isWaitingDelete = true ;
   
    this.catService.deleteCatById(id).subscribe(
      {
        next:(res:any)=>{
          this.isWaitingDelete = false 
          let index = this.cats.findIndex(cat=>cat.id === id);
             if(index != -1 ){
              this.cats.splice(index, 1);
            }
        }
      }
    ) ;
  }

  onAbout(){
    // navigate vers un lien interne (seulement interne)
     this.router.navigate(['/about']);
   
  }
  OnAddCat(){
    this.router.navigateByUrl('/cats/edit/-1');
  }

  ngOnDestroy(): void {
    // Unsubscribe from the AuthenticatedUser$ observable to prevent memory leaks
    this.authUserSub.unsubscribe();
   }
  

}
