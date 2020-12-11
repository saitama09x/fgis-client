import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailInvalid = true;
  passwordInvalid = true;

  credentials: TokenPayload = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onEmailChange(event, loginFormControl) {
    if (loginFormControl.form.controls["email"].status == "VALID") {
      this.emailInvalid = false;
    } else {
      this.emailInvalid = true;
    }
  }

  onPasswordChange(event, loginFormControl) {
    if (loginFormControl.form.controls["password"].status == "VALID") {
      this.passwordInvalid = false;
    } else {
      this.passwordInvalid = true;
    }
  }

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        if (this.auth.getUserDetails()?.roleID == 1) {
          this.router.navigateByUrl('/clients')
        } else {
          this.router.navigateByUrl('/registration')
        }
      },
      err => {
        document.getElementById('lblError').innerHTML = "User not found";
      }
    )
  }
}
