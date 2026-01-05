import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'basic-page',
  imports: [],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicPageComponent {}
