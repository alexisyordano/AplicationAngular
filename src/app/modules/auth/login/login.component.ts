import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('signInNgForm') signInNgForm: NgForm | undefined;
  signInForm: UntypedFormGroup;
  showAlert: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm?.invalid) {
      return;
    }

    // Disable the form
    this.signInForm?.disable();

    // Sign in
    this._authService.signIn(this.signInForm?.value).subscribe(
      () => {
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
          '/home';

        // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
      },
      (response) => {
        // Re-enable the form
        this.signInForm?.enable();

        // Reset the form
        this.signInNgForm?.resetForm();
        const config = new MatSnackBarConfig();
        config.duration = 3000; // Duración en milisegundos
        config.verticalPosition = 'top'; // Posición vertical (top o bottom)
        config.horizontalPosition = 'center';
        this._snackBar.open('incorrect username or password', 'Close', config);
      }
    );
  }
}
