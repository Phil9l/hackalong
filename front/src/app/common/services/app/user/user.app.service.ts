import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../entities/user';

@Injectable()
export class UserAppService {
  user: User;
  logged: boolean;
  loggedChanged$ = new EventEmitter<boolean>();
  userChanged$ = new EventEmitter<User>();

  constructor(private fireAuth: AngularFireAuth) {
  }

  login() {
    const credential = firebase.auth.GithubAuthProvider.credential(this.loadToken());
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInAndRetrieveDataWithCredential(credential)
        .then(res => {
          console.log('login:', res);
          const user = new User({ ...res.user, name: res.user.displayName, nickname: res.additionalUserInfo.username });
          this.userChanged$.emit(user);
          this.user = user;
          this.loggedChanged$.emit(true);
          this.logged = true;
          resolve(user);
        })
        .catch(error => reject(error));
    });
  }

  signIn(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GithubAuthProvider();
      this.fireAuth.auth
        .signInWithPopup(provider)
        .then(res => {
            const user = new User({ ...res.user, name: res.user.displayName });
            this.loggedChanged$.emit(true);
            this.userChanged$.emit(user);
            this.user = user;
            this.logged = true;
            this.saveToken((res.credential as any).accessToken);
            console.log('signIn', res);
            resolve(res);
          },
          error => reject(error)
        )
    })
  }

  signOut() {
    this.fireAuth.auth.signOut().then(() => {
      localStorage.removeItem(environment.auth.tokenKey);
      this.loggedChanged$.emit(false);
      this.logged = false;
      this.userChanged$.emit(null);
      this.user = null;
    });
  }

  hasLoggedStory(): boolean {
    return Boolean(this.loadToken());
  }

  loadToken(): string {
    return localStorage.getItem(environment.auth.tokenKey);
  }

  private saveToken(token: string): void {
    localStorage.setItem(environment.auth.tokenKey, token);
  }
}
