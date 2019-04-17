import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../../../services/user-service.service';
import {User} from '../../../models/User';
import {ActivatedRoute, Router} from '@angular/router';
import {UserEditComponent} from '../user-edit/user-edit.component';
import {MatDialog} from '@angular/material';
import {AngularFireAuth} from '@angular/fire/auth';

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
    private afAuth: AngularFireAuth
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
      uid = this.afAuth.auth.currentUser.uid;
    }
    this.userService.getUser(uid).then(value => {
      this.user = value;
      this.isCurrentUser = this.afAuth.auth.currentUser.uid === this.user.uid;
      this.isCurrentUser = true;
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
