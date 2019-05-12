import * as firebase from 'firebase';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '@app-root/models/Post';
import {Coords} from '@app-root/models/Coords';
import {PostService} from '@app-root/services/post.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  @Output() onSave: EventEmitter<any>;
  @Output() onDelete: EventEmitter<any>;
  @Input() post: Post | null;
  @Input() location: Coords;
  private canDelete: boolean;
  private images: any;
  private urls: any;

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {
    this.onSave = new EventEmitter();
    this.onDelete = new EventEmitter();
  }

  ngOnInit() {
    this.canDelete = true;
    if (!this.post) {
      this.canDelete = false;
      this.post = {
        id: null,
        title: '',
        content: '',
        images: [],
        location: new firebase.firestore.GeoPoint(this.location.lat, this.location.lng),
      };
    }
    this.images = [];
    this.urls = this.post.images;
  }

  save() {
    this.postService.savePost({...this.post, images: this.images}, this.urls).then((post) => {
      console.log(post, this.post);
      this.post = post;
      this.onSave.emit(this.post);
      this.snackBar.open('Post saved successfully!', 'Ok', {
        duration: 2000
      });
    });
  }

  delete() {
    this.postService.deletePost(this.post.id).then(() => {
      this.onDelete.emit(this.post.id);
      this.snackBar.open('Post deleted successfully!', 'Ok', {
        duration: 2000
      });
    });
  }

  deleteUrl(i) {
    const tmpImages = [];
    for (const idx in this.urls) {
      if (i != idx) {
        tmpImages.push(this.urls[idx]);
      }
    }
    this.urls = tmpImages;
  }
}
