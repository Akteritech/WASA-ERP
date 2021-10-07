import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-showsection',
  templateUrl: './showsection.component.html',
  styleUrls: ['./showsection.component.css']
})
export class ShowsectionComponent implements OnInit {
  @Input() id:string;
  showstoremaster: any;

  constructor() { }

  ngOnInit() {
    console.log(this.id);
    this.showstoremaster=JSON.parse(this.id);
  }

}
