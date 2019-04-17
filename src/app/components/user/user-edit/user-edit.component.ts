import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../../models/User';
import {AngularFirestore} from '@angular/fire/firestore';
import {HTMLInputEvent} from '../../../models/HtmlInputEvent';
import {AngularFireStorage} from '@angular/fire/storage';

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
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.user = data.user;
    this.url = data.user.photoURL || '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    let photoURL = this.user.photoURL;
    if (this.file !== null && this.isFileChanged) {
      photoURL = `/users/${this.user.uid}/avatar`;
      this.storage.upload(photoURL, this.file);
    }
    if (this.file === null && this.isFileChanged) {
      photoURL = null;
      this.storage.ref(`/users/${this.user.uid}/avatar`).delete();
    }
    this.store.doc(`/users/${this.user.uid}`).update({
      displayName: this.user.displayName,
      info: this.user.info,
      photoURL,
    }).then(() => {
      console.log('success');
    }).catch((error) => {
      console.log('failed', error);
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
