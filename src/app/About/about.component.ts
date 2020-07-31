import { Component, Input } from '@angular/core';
import { ModalService } from '../modal';
//import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: [ '../lumen.css' ]
})
export class AboutComponent {

  constructor( private modalService: ModalService) {  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}

