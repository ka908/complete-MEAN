import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import User from '../../types/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userService = inject(UserService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  editUserId!: string;
  ngOnInit() {
    this.editUserId = this.route.snapshot.params['id'];
    if (this.editUserId) {
      this.userService.getUsersById(this.editUserId).subscribe((data: any) => {
        console.log(data);
        this.userForm.patchValue(data.msg);
      });
    }
  }
  userForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });
  addUser() {
    if (this.userForm.invalid) {
      alert('Please fill out the form before submitting!');
      return;
    }
    const model: User = this.userForm.value;
    this.userService.addUsers(model).subscribe((data: any) => {
      console.log(data);
      alert('User added successfully!');
      this.router.navigateByUrl('/users');
    });
  }
  updateUser() {
    if (this.userForm.invalid) {
      alert('Please fill out the form before submitting!');
      return;
    }
    const model: User = this.userForm.value;
    this.userService
      .updateUsersById(this.editUserId, model)
      .subscribe((data: any) => {
        console.log(data);
        alert('User updated successfully!');
        this.router.navigateByUrl('/users');
      });
  }
}
