import { Component, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'inappopener',
  template: `<span (click)="open($event)" [innerHtml]="linkedContent"></span>`
})
export class InappopenerComponent {

  @Input()
  linkedContent: string = null;

  constructor(private iab: InAppBrowser) { }

  open(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    // check if clicked element has a href property which
    if (ev.target.href) {
      const browser = this.iab.create(ev.target.href);
      browser.show();
    };
  }

}
