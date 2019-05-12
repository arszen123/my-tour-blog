import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Post} from '@app-root/models/Post';
import {AngularFireAuth} from '@angular/fire/auth';
import {LatLngBounds} from '@agm/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private user: firebase.User;

  constructor(
    private store: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {
    this.user = afAuth.auth.currentUser;
  }

  public async savePost(post: Post, oldImages): Promise<any> {
    if (post === null) {
      return;
    }
    post.uid = this.user.uid;
    if (post.id === null) {
      const id = this.store.createId();
      post.id = id;
      post.images = await this.saveImages(post, 0);
      this.store.doc(`/posts/${id}`).set(post);
      return post;
    }
    post.images = await this.saveImages(post, oldImages.length);
    post.images = [...post.images, ...oldImages];
    this.updatePost(post);
    return post;
  }

  private async updatePost(post: Post) {
    const id = post.id;
    await this.store.doc(`/posts/${id}`).update(post);
  }

  private async saveImages(post: Post, from): Promise<Array<string>> {
    const images = [];
    for (const idx in post.images) {
      if (post.images[idx]) {
        const i = idx + from;
        await this.storage.upload(`/posts/${post.uid}/${post.id}/${i}`, post.images[idx]).then(async (k) => {
          await k.ref.getDownloadURL().then(value => images.push(value));
        });
      }
    }
    return images;
  }

  public getPostsByBoundForUser(bounds: LatLngBounds, uid: string|null) {
    return new Observable<Array<any>>(subscriber => {
      const result1 = [];
      const observable = this.store.collection(`/posts`).get();
      observable.subscribe(snapshot => {
        const docs = snapshot.docs;
        for (const docSnap of docs) {
          const doc = docSnap.data();
          if (typeof doc.location === 'undefined') {
            continue;
          }
          // @ts-ignore
          if (!bounds.contains({
            lat: doc.location.latitude,
            lng: doc.location.longitude
          }) || (uid !== null && uid !== doc.uid)) {
            continue;
          }
          const item = {
            id: doc.id,
            title: doc.title,
            content: doc.content,
            images: doc.images,
            location: doc.location,
            uid: doc.uid
          };
          result1.push(item);
        }
        subscriber.next(result1);
      });
    });
  }

  deletePost(id: string) {
    return this.store.doc(`/posts/${id}`).delete();
  }
}
