import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '@app-root/models/Post';
import {AuthUserService} from '@app-root/services/auth-user.service';

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
  private isMyPost: boolean;

  constructor(private auth: AuthUserService) {
    this.isMyPost = false;
    this.editPost = new EventEmitter();
  }

  ngOnInit() {
    this.isMyPost = typeof this.post !== 'undefined' && this.auth.getUserId() === this.post.uid;
  }

  doEditPost() {
    this.editPost.emit();
  }
}
