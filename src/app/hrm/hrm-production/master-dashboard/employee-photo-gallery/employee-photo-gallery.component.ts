import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Observable, Observer} from "rxjs";
import {Location} from "@angular/common";
import {ApiService} from "../../../../api.service";
import {SuiModalService} from "ng2-semantic-ui";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {EmployeeProfile} from "../employee-profile/add-employee-profile/add-employee-profile.component";
import {error} from "util";

@Component({
  selector: 'app-employee-photo-gallery',
  templateUrl: './employee-photo-gallery.component.html',
  styleUrls: ['./employee-photo-gallery.component.css']
})


export class EmployeePhotoGalleryComponent implements OnInit {
  meta: {
    totalItemCount: number,
    totalPageCount: number,
    itemsPerPage: number,
    currentPage: number,
    nextPage: number,
  };
  array = [];
  allemployees: any;
  genderlist: any;
  base64DefaultURL: string;
  windowOPen: boolean;
  showSearchForm: any;

  base64TrimmedURL: string;
  generatedImage: string;
  empphoto: any;
  empImage: any;
  allDataList: any;
  dataList: any;
  empf: any;
  allPhotoData: any;
   collapse= true;
   currentRoute: string;
   photo: any;
   cardno: string;
   employees: any;
   employeehistory: any;
  constructor(private _location: Location , public api: ApiService,
              public modalService: SuiModalService, private route: ActivatedRoute ,
              private router: Router, public sanitizer: DomSanitizer) {
    this.meta = {
      totalItemCount: 0,
      totalPageCount: 0,
      itemsPerPage: 10,
      currentPage: 1,
      nextPage: 0,
    };
    this.route.params.subscribe( params => {
      if (params.id) {
        this.collapse = false;
      }
    });
    this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.currentRoute = this.router.url;
          }
        }
    );
  }
  pageChange1() {
    const start = (this.meta.currentPage - 1) * this.meta.itemsPerPage;
    const end = start + this.meta.itemsPerPage
    this.dataList = this.allDataList.slice(start, end);
    console.log(this.dataList);
  }

  getEmpPhoto =  (id) => {
    this.api.getdata('employee-profiles/empphoto?cardno='+ id).subscribe((res: any) => {
      this.allDataList = res;
      // this.meta.totalItemCount = this.allDataList.length;
      // this.dataList = this.allDataList.slice(0, this.meta.itemsPerPage);
      console.log(this.allDataList);
      this.allPhotoData = this.allDataList.map(item => {
        let array = new Uint8Array(item.EMP_PHOTO.data);
        const char = array.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');
        let base64String = btoa(char);
        this.empImage = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + base64String);
        console.log(this.empImage);
      });
      this.empf = res;
      // setTimeout(() => {
      this.empf.forEach(item => {
        let phot = item.empImage.changingThisBreaksApplicationSecurity;
        this.windowOPen = false;
        this.getBase64ImageFromURL(phot).subscribe((base64Data: string) => {
          this.base64TrimmedURL = base64Data;
          this.dataURItoBlob(this.base64TrimmedURL).subscribe((blob: Blob) => {
            const imageBlob: Blob = blob;
            const imageName: string = 'ivaka';
            const imageFile: File = new File([imageBlob], imageName, {
              type: "image/jpeg"
            });
            this.generatedImage = window.URL.createObjectURL(imageFile);
            let image = document.createElement("img");
            let image1 = document.createElement("p");
            var att = document.createAttribute("src");
            var att1 = document.createAttribute("height");
            var att2 = document.createAttribute("width");
            att.value = this.generatedImage;
            image1.innerText = item.EMP_CARD_NO;
            att1.value = '100px';
            att2.value = '100px';
            image.setAttributeNode(att);
            image.setAttributeNode(att1);
            image.setAttributeNode(att2);
            document.getElementById('generatedImage').appendChild(image);
            document.getElementById('generatedImage').appendChild(image1);
          });
        });
        console.log(this.photo);
      });
      // }, 1000)
    });
  }

  sanatizeUrl(generatedImageUrl): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(generatedImageUrl);
  }

  getBase64ImageFromURL(url: string): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement): string {
    var canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL: string = canvas.toDataURL("image/png");
    this.base64DefaultURL = dataURL;
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  getImage(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.base64TrimmedURL = base64Data;
      this.createBlobImageFileAndShow();
    });
  }

  getImageWithoutWindowOpen(imageUrl: string) {
    this.windowOPen = false;
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.base64TrimmedURL = base64Data;
      this.createBlobImageFileAndShow();
    });
  }

  createBlobImageFileAndShow(): void {
    this.dataURItoBlob(this.base64TrimmedURL).subscribe((blob: Blob) => {
      const imageBlob: Blob = blob;
      const imageName: string = this.toExportFileName1(this.cardno,'jpeg');
      const imageFile: File = new File([imageBlob], imageName, {
        type: "image/jpeg"
      });
      this.generatedImage = window.URL.createObjectURL(imageFile);
      if(this.windowOPen) {
        window.open(this.generatedImage);
      }
    });
  }
  toExportFileName1(fileName: string, type: string): string {
    console.log('df');
    this.dataList.map(item => {
      this.cardno= item.EMP_CARD_NO
    })
    return `${this.cardno}.${type}`;
  }

  generateName(): string {
    const date: number = new Date().valueOf();
    let text: string = "";
    const possibleText: string =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(
          Math.floor(Math.random() * possibleText.length)
      );
    }
    return date + "." + text + ".jpeg";
  }

  dataURItoBlob(dataURI: string): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString: string = window.atob(dataURI);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: "image/jpeg" });
      observer.next(blob);
      observer.complete();
    });
  }
  ngOnInit() {
    // this.getEmpPhoto()
  }

   printEmployeeHistory = async (id) => {
     // const count = id.match(/,/g);
    // console.log(count);
    let cardnos = id.split(',');
    console.log(cardnos);
    await cardnos.forEach(item => {
       this.api.getBlobThumbnail(`FileUploads/employees/download/${item.replace(/\s/g, '')}.jpg`).subscribe((Response: any) => {
         console.log(Response);
         // if (error.status === 404) {
         //
         // } else {
         // }
         this.api.createImageFromBlob(Response);
         // let image = document.createElement("img");
         // var att = document.createAttribute("src");
         // // var att1 = document.createAttribute("height");
         // // var att2 = document.createAttribute("width");
         // att.value = this.api.imageToShow;
         // // att1.value = '100px';
         // // att2.value = '100px';
         // image.setAttributeNode(att);
         // // image.setAttributeNode(att1);
         // // image.setAttributeNode(att2);
         // document.getElementById('image').appendChild(image);
       }, error => {
         this.api.showWarningToast('Remove Starting Zeros')
         console.log(error);
        // if (error.status === 404)  {
          // var array1 = [];
          // this.api.array1.push(error.message.replace('Http failure response for http://localhost:3000/api/FileUploads/employees/download/', ''));
          // console.log(this.api.array1);
          // return array1;
         // }
       });
     });
  }
  key() {
    this.getEmpPhoto(this.cardno);
  }

  reset() {
    this.empImage = null;
  }

}
