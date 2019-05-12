import {MatDialog} from '@angular/material';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '@app-root/models/User';
import {UserServiceService} from '@app-root/services/user-service.service';
import {UserEditComponent} from '@app-components/user/user-edit/user-edit.component';
import {AuthUserService} from '@app-root/services/auth-user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  private user: User;
  private isCurrentUser = false;

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private afAuth: AuthUserService
  ) {
  }

  ngOnInit() {
    this.user = {
      uid: null,
      displayName: '',
      info: ''
    };
    let uid = this.route.snapshot.params.uid;
    if (typeof uid === 'undefined') {
      uid = this.afAuth.getUserId();
    }
    this.userService.getUser(uid).then(value => {
      this.user = value;
      this.isCurrentUser = this.afAuth.getUserId() === this.user.uid;
    });
  }

  showEditForm() {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '75%',
      data: {user: this.user}
    });

    dialogRef.afterClosed().subscribe();
  }

}
