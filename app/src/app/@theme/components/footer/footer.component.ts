import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
    VVMJ ® est une application éditée par les Hospices Civils de Lyon
    </span>
    <span>Tous droits de reproduction interdits</span>
  `,
})
export class FooterComponent {
}
