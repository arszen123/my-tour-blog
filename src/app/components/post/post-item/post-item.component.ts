import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../models/Post';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  private height = 250;
  private width = 250;

  constructor() { }

  ngOnInit() {
  }

}
