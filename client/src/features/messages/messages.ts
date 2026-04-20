import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Messages {}
