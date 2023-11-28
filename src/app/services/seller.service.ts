import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, Signup } from '../data-types';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false)
  isLoginError= new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, public router: Router) { }

  userSignUp(data:Signup){
   this.http.post('http://localhost:3000/seller', data, { observe: 'response'})
   .subscribe((result) => {
    this.isSellerLoggedIn.next(true);
    if(result){
    localStorage.setItem('seller', JSON.stringify(result.body))
    this.router.navigate(['seller-home']);
    }
   });
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-add-product']);
    }
  }

  userLogin(data:login){
    console.warn(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
   {observe:'response'}).subscribe((result:any)=>{
    console.warn(result)
    if(result && result.body && result.body.length){
      console.warn("user logged")
      localStorage.setItem('seller', JSON.stringify(result.body))
      this.isSellerLoggedIn.next(true);
    this.router.navigateByUrl('/seller-add-product');
    }
    else{
      console.warn("user login failed")
      this.isLoginError.emit(true)
    }
   });
  }
}
