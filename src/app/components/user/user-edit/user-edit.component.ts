import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {User} from '@app-root/models/User';
import {AngularFirestore} from '@angular/fire/firestore';
import {HTMLInputEvent} from '@app-root/models/HtmlInputEvent';
import {AngularFireStorage} from '@angular/fire/storage';
import {UserServiceService} from '@app-root/services/user-service.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  private user: User;
  private url = '';
  private file: any;
  private isFileChanged: boolean;

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    private store: AngularFirestore,
    private storage: AngularFireStorage,
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.user = data.user;
    this.url = data.user.photoURL || '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.userService.save({
      photoURL: this.user.photoURL,
      file: this.file,
      isFileChanged: this.isFileChanged,
      user: this.user
    }).then(() => {
      this.snackBar.open('Updated successfully!', undefined, {
        duration: 2000
      });
    });
    this.dialogRef.close();
  }

  ngOnInit(): void {
    document.getElementById('input-file-id-button').addEventListener('click', () => {
      document.getElementById('input-file-id').click();
    });
    document.getElementById('input-file-id').addEventListener('change', (event?: HTMLInputEvent) => {
      this.file = event.target.files[0];
      this.isFileChanged = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.addEventListener('load', (event1: any) => {
        this.url = event1.target.result;
      });
    });
  }

  deleteAvatar() {
    this.url = '';
    this.file = null;
    this.isFileChanged = true;
  }
}
