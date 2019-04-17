import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Post} from '../models/Post';
import {AngularFireAuth} from '@angular/fire/auth';
import {LatLng, LatLngBounds} from '@agm/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private user: firebase.User;
  private result: Array<Post>;
  constructor(
    private store: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {
    this.user = afAuth.auth.currentUser;
  }

  public async savePost(post: Post): Promise<void> {
    if (post === null) {
      return;
    }
    post.uid = this.user.uid;
    console.log({post});
    if (post.id === null) {
      const id = this.store.createId();
      console.log({id, post});
      post.id = id;
      post.images = await this.saveImages(post);
      return this.store.doc(`/posts/${id}`).set(post);
    }
    post.images = await this.saveImages(post);
    return this.updatePost(post);
  }

  public updatePost(post: Post) {
    const id = post.id;
    this.store.doc(`/posts/${id}`).update(post);
  }

  private async saveImages(post: Post): Promise<Array<string>> {
    const images = [];
    for (const idx in post.images) {
      if (post.images[idx]) {
        await this.storage.upload(`/posts/${post.id}/${idx}`, post.images[idx]).then((k) => {
          images.push(k.ref.getDownloadURL());
        });
      }
    }
    return images;
  }

  public getPostsByBounds(bounds: LatLngBounds) {
    this.store.collection(`/posts`).ref.doc().onSnapshot(doc => {
      const data = doc.data();
      // @ts-ignore
      if (!bounds.contains({
        lat: data.location.latitude,
        lng: data.location.longitude
      })) {
        return;
      }
      this.result.push({
        id: doc.id,
        title: data.title,
        content: data.content,
        images: data.images,
        location: data.location,
        uid: data.uid
      });
    }, null, () => console.log('done'));
  }
}
