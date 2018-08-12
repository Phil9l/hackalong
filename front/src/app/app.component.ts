import { ChangeDetectorRef, Component } from '@angular/core';
import { UserAppService } from './common/services/app/user/user.app.service';
import { User } from './common/entities/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hello';
  logged: boolean;
  user: User;

  constructor(private userService: UserAppService,
              private changeDetector: ChangeDetectorRef) {
    if (this.userService.hasLoggedStory()) {
      this.userService.login();
    }

    this.userService.userChanged$.subscribe(user => {
      this.user = user;
      this.changeDetector.detectChanges();
    });
    this.userService.loggedChanged$.subscribe(logged => {
      this.logged = logged;
      this.changeDetector.detectChanges();
    });
  }

  signIn(): void {
    this.userService.signIn();
  }

  signOut(): void {
    this.userService.signOut();
  }
}
