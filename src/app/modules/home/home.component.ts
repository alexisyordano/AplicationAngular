import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/app.models';
import _ from 'lodash';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home',
  standalone: true,
  imports: [ToolbarComponent, CommonModule, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private _authService: AuthService) {}
  role: any;
  ngOnInit() {
    this._authService.role$.subscribe((res) => {
      let userData = new User(res);
      this.role = userData.role;
    });
  }
}
