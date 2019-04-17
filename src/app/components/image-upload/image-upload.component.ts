import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HTMLInputEvent} from '../../models/HtmlInputEvent';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() multiple = false;
  @Input() width = '250';
  @Input() height = '250';
  files: any;
  @Output('images') imagesChange = new EventEmitter<any>();
  private urls: Array<string> | null;

  @Input('images')
  get images() {
    return this.files;
  }

  set images(files) {
    this.files = files;
    this.imagesChange.emit(this.files);
  }

  constructor() {
  }

  ngOnInit() {
    console.log(this.images);
    document.getElementById('files-button').addEventListener('click', () => {
      document.getElementById('files').click();
    });
    document.getElementById('files').addEventListener('change', (event?: HTMLInputEvent) => {
      const files = event.target.files;
      for (const idx in files) {
        if (files[idx] instanceof File) {
          this.images.push(files[idx]);
        }
      }
      const urls = [];
      for (const file of this.images) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', (event1: any) => {
          urls.push(event1.target.result);
        });
      }
      this.urls = urls;
    });
  }

  delete(i: number) {
    this.urls = this.urls.filter((value, index) => {
      return index !== i;
    });
    console.log(this.images);
    this.images = this.images.filter((value, index) => {
      return index !== i;
    });
  }
}
