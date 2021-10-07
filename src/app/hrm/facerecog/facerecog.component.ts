import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import $ = require('jquery');
@Component({
  selector: 'app-facerecog',
  templateUrl: './facerecog.component.html',
  styleUrls: ['./facerecog.component.css']
})
export class FacerecogComponent implements OnInit {
  // WIDTH = 640;
  // HEIGHT = 480;
   url: any;
   player: any;
   video: any;


   
  // @ViewChild("video")
  // public video: ElementRef;

  // @ViewChild("canvas")
  // public canvas: ElementRef;

  // captures: string[] = [];
  // error: any;
  // isCaptured: boolean;

  // async ngAfterViewInit() {
  //   await this.setupDevices();
  // }

  // async setupDevices() {
  //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: true
  //       });
  //       if (stream) {
  //         this.video.nativeElement.srcObject = stream;
  //         this.video.nativeElement.play();
  //         this.error = null;
  //       } else {
  //         this.error = "You have no output video device";
  //       }
  //     } catch (e) {
  //       this.error = e;
  //     }
  //   }
  // }

  // capture() {
  //   this.drawImageToCanvas(this.video.nativeElement);
  //   this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  //   this.isCaptured = true;
  // }

  // removeCurrent() {
  //   this.isCaptured = false;
  // }

  // setPhoto(idx: number) {
  //   this.isCaptured = true;
  //   var image = new Image();
  //   image.src = this.captures[idx];
  //   this.drawImageToCanvas(image);
  // }

  // drawImageToCanvas(image: any) {
  //   this.canvas.nativeElement
  //     .getContext("2d")
  //     .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  // }
  // name = 'Angular';
  // public lat;
  // public lng;
  //  Position:any;
  // PositionError:any;
  constructor() {
    // if (navigator)
    // {
    // navigator.geolocation.getCurrentPosition( pos => {
    //     this.lng = +pos.coords.longitude;
    //     this.lat = +pos.coords.latitude;
    //   });
    // }


   }

  ngOnInit() {
    // this.getLocation();

    const constraints = {
      video: true,
    };


const video = document.getElementById('video');
   
    const player = document.getElementById('player');
    
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.player.srcObject = stream;
      });

    this.onFileChange("");
  }

  onFileChange(fileInput: any){
    this.url = fileInput.target.files[0];

    let reader = new FileReader();

    reader.onload = (e: any) => {
        this.url = e.target.result;
    }

    reader.readAsDataURL(fileInput.target.files[0]);
};

}
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Not adding `{ audio: true }` since we only want video now
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      //video.src = window.URL.createObjectURL(stream);
      this.video.srcObject = stream;
      this.video.play();
  });
  
}
  // getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position: Position) => {
  //       if (position) {
  //         console.log("Latitude: " + position.coords.latitude +
  //           "Longitude: " + position.coords.longitude);
  //         this.lat = position.coords.latitude;
  //         this.lng = position.coords.longitude;
  //         console.log(this.lat);
  //         console.log(this.lat);
  //       }
  //     }
    
  // }


