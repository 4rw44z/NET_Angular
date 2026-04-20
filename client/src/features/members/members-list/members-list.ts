import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-members-list',
  imports: [],
  templateUrl: './members-list.html',
  styleUrl: './members-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersList {}
