import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService, TokenPayload } from '../../authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  //@ViewChild('f') login: NgForm;

  emailInvalid = true;
  passwordInvalid = true;

  credentials: TokenPayload = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }

  
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { }


  //  On submit click, reset field value
  onSubmit() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        document.getElementById('lblError').innerHTML = "User not found";
      }
    )
  }
    
  // On ResetPassword link click
  onResetpassword1() {
    //this.router.navigate(['reset-password1'], { relativeTo: this.route.parent });
  }

  ngOnInit() {
  }

}
