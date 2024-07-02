import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Title of the project
  title = 'FRONTEND-ADOPTING-CATS';

  // Indicates if the user is authenticated
  isAuth: boolean = false;

  // Shows admin board if user has admin role
  showAdminBoard = false;

  // Injecting AuthService and Router into the component
  constructor(private authService: AuthServiceService, private router:Router) { }

  // Initialization logic
  ngOnInit(): void {
    // Attempt to auto-login the user
    this.authService.autoLogin();

    // Subscribe to the AuthenticatedUser$ observable
    this.authService.AuthenticatedUser$.subscribe({
      next: user => { 
        // If user is authenticated
        if(user) {
          // Show admin board if user has admin role
          this.showAdminBoard = user.role.name === 'ROLE_ADMIN';
          this.isAuth = true;
        } else {
          // For sign out
          this.showAdminBoard=false;
          this.isAuth = false;
        }
      }
    })
  }

  // Sign out logic
  onSignOut() {
    this.authService.logout();
  }
}