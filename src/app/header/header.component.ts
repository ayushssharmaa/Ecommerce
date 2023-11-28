import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName:string="";
  constructor(private route: Router) {}

  isloggedIn=false;
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller')) {
          console.log('Seller Name:', this.sellerName);
         let sellerStore=localStorage.getItem('seller');
         let sellerData =sellerStore && JSON.parse(sellerStore)[0];
         this.sellerName=sellerData.name;
          this.menuType = 'loggedIn';
        }
        else {
          this.menuType = 'default';
        }
      }
    });
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/seller-auth'])
  }
}
