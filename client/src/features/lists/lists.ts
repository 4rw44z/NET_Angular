import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-lists',
  imports: [],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lists {}
