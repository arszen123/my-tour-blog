import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '@app-root/models/Post';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Output() editPost: EventEmitter<any>;
  private height = 250;
  private width = 250;
  private readonly user: firebase.User;
  private isMyPost: boolean;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.auth.currentUser;
    this.isMyPost = false;
    this.editPost = new EventEmitter();
  }

  ngOnInit() {
    this.isMyPost = typeof this.post !== 'undefined' && this.user.uid === this.post.uid;
  }

  doEditPost() {
    this.editPost.emit();
  }
}
