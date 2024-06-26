import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [MatMenuModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(private _router: Router, private _authService: AuthService) {}

  private _value: any;
  public get permission(): any {
    return this._value;
  }
  @Input() set permission(v: any) {
    this._value = v;
  }

  role: any;
  ngOnInit() {
    let storedRole = localStorage.getItem('role');
    if (storedRole) {
      storedRole = storedRole.replace(/"/g, '');

      if (storedRole === 'admin' || storedRole === 'user') {
        this.permission = storedRole;
      }
    }
  }
  addHabit() {
    this._router.navigate(['add-habit']);
  }

  teamManagement() {
    this._router.navigate(['team-management']);
  }

  teamStatisticst() {
    this._router.navigate(['statistics']);
  }

  backHome() {
    this._router.navigate(['home']);
  }

  signOut() {
    this._authService.signOut().subscribe((response: any) => {
      console.log('respo logout', response);
    });
  }
}
