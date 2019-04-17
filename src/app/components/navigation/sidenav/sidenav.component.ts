import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthUserService} from '../../../services/auth-user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() closeEmitter = new EventEmitter<void>();
  private isAuth: boolean;

  constructor(private auth: AuthUserService) { }

  ngOnInit() {
    this.isAuth = this.auth.isAuthenticated();
  }

  sidenavCloser() {
    this.closeEmitter.emit();
  }

  logout() {
    this.auth.logout();
  }
}
