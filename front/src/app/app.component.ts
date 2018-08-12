import { Component } from '@angular/core';
import { UserAppService } from './common/services/app/user/user.app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private userService: UserAppService) {
    if (this.userService.hasLoggedStory()) {
      this.userService.login();
    }
  }
}
