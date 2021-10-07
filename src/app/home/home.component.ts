import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  viewList: string[];
  constructor() { }

  ngOnInit() {
    this.viewList = JSON.parse(sessionStorage.getItem('viewList'));
  }

  getIndentRoute(){
    window.open('http://192.168.13.3:3500/inventory/indent');
  }

  getInventoryRoute(){
    window.open('http://192.168.13.3:3500/home');
  }

}
