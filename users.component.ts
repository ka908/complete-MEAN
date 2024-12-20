import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../types/user';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users: User[] = [];
  userService = inject(UserService);

  ngOnInit() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data.msg;
      console.log(this.users);
    });
  }
  deleteUser(id: string) {
    const ok = confirm('Are you sure you want to delete this user?');
    if (ok) {
      this.userService.deleteUsersById(id).subscribe((data: any) => {
        console.log(data);
        this.users = this.users.filter((user) => user._id !== id);
      });
    }
  }
}
