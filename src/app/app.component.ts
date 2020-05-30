import * as $ from 'jquery';

import { Component, OnInit } from '@angular/core';
import { ElementRef,  Renderer2, ViewChild } from '@angular/core';
import { Message } from './models/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public message : Message;
  public messages : Message[];
  show: boolean = false;

  title = 'ok';
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  videoWidth = 0;
videoHeight = 0;
  constraints = {
    video: {
        facingMode: "environment",
        width: { ideal: 320 },
        height: { ideal: 240 }
    }
};
  constructor(private renderer: Renderer2) {
    this.message = new Message('' ,'assets/images/user.png');
    this.messages = [
      new Message( 'Welcome to chatbot universe', 'assets/images/bot.png', new Date())
    ];
  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { 
 navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
        alert('Sorry, camera not available.');
    }
  }
handleError(error) {
  console.log('Error: ', error);
}
attachVideo(stream) {
  this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
  this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
    this.videoHeight = this.videoElement.nativeElement.videoHeight;
    this.videoWidth = this.videoElement.nativeElement.videoWidth;
});

}
capture() {
  this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
  this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
  this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
  
}
ngOnInit() {

$(document).ready(function(){
  $(".chat_on").click(function(){
      $(".Layout").toggle();
      $(".chat_on").hide(300);
  });
  
     $(".chat_close_icon").click(function(){
      $(".Layout").hide();
         $(".chat_on").show(300);
  });
  
});
}
login(){
  this.startCamera();

}

}
