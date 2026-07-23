import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],

  // Component-level provider.
  // A new NotificationService instance is created
  // for every NotificationComponent instance.
  providers: [NotificationService],

  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  constructor(
    public notificationService: NotificationService
  ) { }

  addNotification(): void {

    const message =
      `Notification ${this.notificationService.getNotifications().length + 1}`;

    this.notificationService.addNotification(message);

  }

}