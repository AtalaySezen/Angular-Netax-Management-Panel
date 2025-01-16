import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, FormsModule, CommonModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  login() {
    if (this.loginForm.valid) {
      this.authService.Login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
        next: data => {
          this.authService.SetLocalStorageToken(data.accessToken);
          this.router.navigate(['home']);
        }, error: (err) => {
          console.error(err.error.message)
        }
      })
    }
  }

}
