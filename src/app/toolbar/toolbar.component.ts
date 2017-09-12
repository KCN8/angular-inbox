import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../messages/message/message.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() messages: Message[];
  @Input() changeButton: () => string;
  @Input() toggleForm: () => string;
  @Input() allRead: () => number;
  @Input() onSelect: () => void;
  @Input() displayRead: () => void;
  @Input() displayUnread: () => void;
  @Input() deleteMessage: () => void;
  @Input() addLabel: () => void;
  @Input() deleteLabel: () => void;
  @Input() onSubmit: () => void;

  constructor() { }

  ngOnInit() {
  }

}
