import {Component, Input, OnInit} from '@angular/core';
import {Coords} from '@app-root/models/Coords';
import {NavigatorService} from '@app-root/services/navigator.service';
import {PostService} from '@app-root/services/post.service';
import {AuthUserService} from '@app-root/services/auth-user.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

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
    private postService: PostService,
    private afAuth: AuthUserService,
    private snackBar: MatSnackBar,
    private router: Router
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
    if (!this.afAuth.isAuthenticated()) {
      this.snackBar.open('You must log in, to create post.', 'Ok', {
        duration: 2000
      }).onAction().subscribe(() => this.router.navigate(['/login']));
      return;
    }
    this.newMarker = coords;
  }

  mapClick({coords}) {
    this.newMarker = null;
    if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
      this.mapRightClick({coords});
    }
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
    const tempPost = [];
    for (const i in this.posts) {
      if (!(this.posts[i] && this.posts[i].id === postId)) {
        tempPost.push(this.posts[i]);
      }
    }
    this.posts = tempPost;
  }
}
