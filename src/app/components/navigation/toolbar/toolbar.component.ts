import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthUserService} from '@app-root/services/auth-user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleEmitter = new EventEmitter<void>();
  private isAuth: boolean;

  constructor(private auth: AuthUserService) {
  }

  ngOnInit() {
    this.isAuth = this.auth.isAuthenticated();
  }

  sidenavToggle() {
    this.toggleEmitter.emit();
  }

  logout() {
    this.auth.logout();
  }
}
