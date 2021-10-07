import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../../../api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-employee-profile',
  templateUrl: './show-employee-profile.component.html',
  styleUrls: ['./show-employee-profile.component.css']
})
export class ShowEmployeeProfileComponent implements OnInit {

  emp: any;
  @Input() id: string;
  constructor(public api: ApiService , private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.getEmpLoyees(this.id);
  }
  async getEmpLoyees (id) {
    await this.api.getdata('employee-profiles/' +id).subscribe((res: any) => {
      this.emp = res;
      this.api.getBlobThumbnail(`FileUploads/employees/download/${id.replace(/000+/, '')}.jpg`).subscribe((Response: any) => {
        this.api.createImageFromBlob(Response);
      }, error => {
        console.log(error);
      });
      console.log(res);
    }, err => {  console.log(err);});
  }
  // searchRecord(id) {
  //   this.api.getdata('employee-profiles/searchdata?cardno=' + id).subscribe((res: any) => {
  //     this.emp = res[0];
  //     this.api.getBlobThumbnail(`FileUploads/employees/download/${id.replace(/000+/, '')}.jpg`).subscribe((Response: any) => {
  //       console.log(Response);
  //       this.api.createImageFromBlob(Response);
  //     }, error => {
  //       this.api.showWarningToast('Remove Starting Zeros')
  //       console.log(error);
  //     });
  //     console.log(this.emp);
  //   }, error2 => {
  //     console.log(error2);
  //   });
  // }
}
