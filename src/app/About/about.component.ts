import { Component, Input } from '@angular/core';
import { ModalService } from '../modal';
//import { EmbedVideoService } from 'ngx-embed-video';
//import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: [ '../lumen.css' ]
})
export class AboutComponent {

  //displayURL;

  constructor( private modalService: ModalService) {  
    //this.displayURL = sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/watch?v=4bZ-MAOLbGc')
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    var iframe = document.getElementsByTagName("iframe")[0];
    var iframeSrc = iframe.src;
		iframe.src = iframeSrc;
    
    this.modalService.close(id);

    //iframe.postMessage('{"event":"command","func":"' + 'stopVideo' +   '","args":""}', '*');
  }

  scrollToInput() {
    window.scrollTo(0, 500);
  }

}