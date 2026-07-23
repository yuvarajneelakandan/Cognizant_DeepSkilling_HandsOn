import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  private notifications: string[] = [];

  addNotification(message: string): void {

    this.notifications.push(message);

  }

  getNotifications(): string[] {

    return this.notifications;

  }

  clearNotifications(): void {

    this.notifications = [];

  }

}