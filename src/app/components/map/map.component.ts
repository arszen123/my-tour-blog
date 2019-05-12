import {Component, Input, OnInit} from '@angular/core';
import {Coords} from '@app-root/models/Coords';
import {NavigatorService} from '@app-root/services/navigator.service';
import {PostService} from '@app-root/services/post.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() userId: string | null;
  private center: Coords;
  private newMarker: Coords | null;
  private posts: Array<any>;
  private timeout: any;
  private editPostId: string;

  constructor(
    private navigatorService: NavigatorService,
    private postService: PostService
  ) {
    this.center = this.navigatorService.getPosition();
  }

  ngOnInit() {
    this.center = this.navigatorService.getPosition();
    this.newMarker = null;
    this.posts = [];
    this.userId = typeof this.userId === 'undefined' ? null : this.userId;
  }

  mapRightClick({coords}) {
    this.newMarker = coords;
  }

  mapClick() {
    this.newMarker = null;
  }

  onMapBoundChanged(mapBound) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.processPosts(mapBound), 3000);
  }

  private processPosts(mapBound) {
    this.postService
      .getPostsByBoundForUser(mapBound, this.userId)
      .subscribe(s => {
        const tmp = {};
        const tmpDelete = [];
        for (const i of s) {
          tmp[i.id] = i;
        }
        for (const i of this.posts) {
          if (typeof tmp[i.id] !== 'undefined') {
            delete tmp[i.id];
          } else {
            tmpDelete.push(i.id);
          }
        }
        for (const i in tmp) {
          if (tmp[i]) {
            this.posts.push(tmp[i]);
          }
        }
      });
  }

  postSaved($event: any, isNew) {
    console.log(isNew, $event);
    if (isNew) {
      this.posts.push($event);
      this.newMarker = null;
      return;
    }
    for (const i in this.posts) {
      if (this.posts[i].id === $event.id) {
        this.posts[i] = $event;
        return;
      }
    }
  }

  doEditPost(id: any) {
    this.editPostId = id;
  }

  postDeleted(postId: string | null) {
    for (const i in this.posts) {
      if (this.posts[i] && this.posts[i].id === postId) {
        delete this.posts[i];
      }
    }
  }
}
