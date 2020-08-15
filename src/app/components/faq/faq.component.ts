import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private router: Router) { }

  isCollapsed = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true;

  goShop() 
  {
    this.router.navigateByUrl('dashboard/shop');
  }

  ngOnInit() {}

}
