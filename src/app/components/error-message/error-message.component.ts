import { Component, Input } from '@angular/core';
import { ErrorItem } from 'src/utils/api-response';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})

export class ErrorMessageComponent {

  @Input() errorListFromRequest: ErrorItem[] = [];

  get hasErrors(): boolean {
    return this.errorListFromRequest.length > 0;
  }

  trackByFn(index: number, item: any) {
    return item.message;
  }
  
}
