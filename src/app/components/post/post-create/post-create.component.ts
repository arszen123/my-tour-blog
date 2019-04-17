import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../../../models/Post';
import {Coords} from '../../../models/Coords';
import {PostService} from '../../../services/post.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  @Output() onSave: EventEmitter<any>;
  @Input() post: Post|null;
  @Input() location: Coords;

  constructor(
    private postService: PostService
  ) {
  }

  ngOnInit() {
    this.onSave = new EventEmitter();
    if (!this.post) {
      this.post = {
        id: null,
        title: '',
        content: '',
        images: [],
        location: new firebase.firestore.GeoPoint(this.location.lat, this.location.lng),
      };
    }
  }

  save() {
    console.log(this.post);
    // this.postService.savePost(this.post);
    this.onSave.emit();
  }

}
