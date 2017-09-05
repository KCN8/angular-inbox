import { Component, Input, OnInit } from '@angular/core';
import { Message } from './message/message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() messages: Message[];
  @Input() toggleStar: (id: number) => void;
  @Input() toggleCheckbox: (id: number) => void;
  constructor() { }
  ngOnInit(){

  }

}
