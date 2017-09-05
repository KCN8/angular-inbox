import { Component } from '@angular/core';
import data from './app.data'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages = data

  deleteMessage() {
      let messageSelected = []
      this.messages.forEach(message =>{
        if(message.selected) {
          messageSelected.push(message)
        }
      })
      messageSelected.forEach(message => {
        message.hidden = true
        message.read = true
      })
  }

  onSelect() {
    let messagesLength = this.messages.length
    let trueLength = this.messages.filter((messages) => messages.selected).length
    this.messages.forEach(message => {
      if (!message.selected) {
        message.selected = true
      } else if (messagesLength === trueLength){
        message.selected = false
      }
    })
  }

  displayRead() {
    this.messages.forEach(message => {
      if (!message.read && message.selected) {
        message.read = true;
      }
    })
  }

  displayUnread() {
    this.messages.forEach(message => {
      if (message.read && message.selected) {
        message.read = !message.read;
      }
    })
  }

  toggleStar(id) {
    this.messages.forEach(message => {
      if (id === message.id) {
        message.starred = !message.starred;
      }
    })
  }

  toggleCheckbox(id) {
    this.messages.forEach(message => {
      if (id === message.id) {
        message.selected = !message.selected;
      }
    })
  }

  addLabel(label) {
    let messageSelected = []
    this.messages.forEach(message => {
      if (message.selected) {
        messageSelected.push(message)
      }
    })
  }

}
