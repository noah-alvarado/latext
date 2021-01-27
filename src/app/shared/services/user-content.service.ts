import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

interface UserContent {
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserContentService {

  dbContent$: Observable<string | undefined>;

  private _content: any;
  get content() {
    return this._content;
  }
  set content(value: any) {
    this._content = value;
    this.saveContent();
  }

  private document: AngularFirestoreDocument<UserContent>;

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore
  ) {
    // my uid: KF03C5YtAjQHgVR4k9Dy53zGOd23
    this.document = this.firestore.doc<UserContent>(`userContent/${this.auth.user.uid}`);
    this.dbContent$ = this.document.valueChanges().pipe(map(doc => doc?.content));
  }

  saveContent() {
    this.document.set({ content: this.content });
  }
}
