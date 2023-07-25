import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  host: { 'class': 'app-user-info-custom' }

})
export class UserInfoComponent implements OnInit {
  items: MenuItem[];
  name: string;
  @Output() logoutEvt = new EventEmitter();
  @ViewChild('menu', { static: false }) menu;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.name = this.authService.getName();
    this.items = [
      {
        label: "logout" ,
        command: (event) => {
          this.menu.toggle('hide');
          this.logoutEvt.emit();
        }
      }
    ];
  }

  menuToggle($event) {
    this.menu.toggle($event)
  }
}
