// services/user.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'http://localhost:3000';
  private httpClient = inject(HttpClient);

  constructor() {}

  getUsers() {
    return this.httpClient.get<User[]>(`${this.apiURL}/users`);
  }
  getUsersById(id: string) {
    return this.httpClient.get<User>(`${this.apiURL}/users/${id}`);
  }
  addUsers(model: User) {
    return this.httpClient.post(`${this.apiURL}/users`, model);
  }
  updateUsersById(id: string, model: User) {
    return this.httpClient.put<User>(`${this.apiURL}/users/${id}`, model);
  }
  deleteUsersById(id: string) {
    return this.httpClient.delete<User>(`${this.apiURL}/users/${id}`);
  }
}
