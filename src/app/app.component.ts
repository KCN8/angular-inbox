import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
const localUrl = 'http://localhost:8082/api'
const baseUrl = 'https://shrouded-journey-20674.herokuapp.com/api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  async ngOnInit() {
    try {
      const data = await fetch(`${baseUrl}/messages`)
      const res = await data.json()
      const messages = res._embedded.messages
      this.messages = messages
    } catch(err) {
      console.log("ERROR FOOL")
    }
  }

  messages = this.messages

  async onSubmit(form: NgForm) {
    let emailBody = form.value.body;
    let emailSubject = form.value.subject
    const post = {
      "body": emailBody,
      "subject": emailSubject
    }
    const settings = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(post)
    }
    const data = await fetch(`${baseUrl}/messages`, settings)
    const refresh = await fetch(`${baseUrl}/messages`)
    const res = await refresh.json()
    const messages = res._embedded.messages
    this.messages = messages
    form.reset();
  }

  toggleForm() {
    if (this.messages){
      return ''
    }
  }

  changeButton() {
    if (this.messages) {
      let messageSelected = []
      this.messages.forEach(message => {
        if(message.selected) {
          messageSelected.push(message)
        }
      })
      if(messageSelected.length === 0) {
        return 'fa fa-square-o'
      } else if(this.messages.length === messageSelected.length) {
        return 'fa fa-check-square-o'
      } else {
        return 'fa fa-minus-square-o'
      }
    }
  }

  allRead() {
      let read = [];
      if (this.messages) {
      this.messages.forEach(message => {
        if(!message.read) {
          read.push(message.id)
        }
      })
      return read.length
    }
  }
  async deleteMessage() {
    let messagesSelected = [];
    this.messages.forEach(message => {
      if(message.selected) {
        messagesSelected.push(message.id)
      }
    })
    const body = {
      "messageIds": messagesSelected,
      "command": "delete"
    }
    const settings = {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    }
    const data = await fetch(`${baseUrl}/messages`, settings)
    const refresh = await fetch(`${baseUrl}/messages`)
    const res = await refresh.json()
    const messages = res._embedded.messages
    this.messages = messages
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

  async displayRead() {
    let read = [];
    this.messages.forEach(message => {
      if(message.selected && !message.read) {
        read.push(message.id)
      }
    })
    const body = {
      "messageIds": read,
      "command": "read",
      "read": true
    }
    const settings = {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    }
    const data = await fetch(`${baseUrl}/messages`, settings)
    this.messages.forEach(message => {
      if(!message.read && message.selected) {
        message.read = true;
      }
    })
  }

  async displayUnread() {
    let unRead = [];
    this.messages.forEach(message => {
      if(message.selected && message.read) {
        unRead.push(message.id)
      }
    })
    const body = {
        "messageIds": unRead,
        "command": "read",
        "read": false
      }
    const settings = {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    }
    const data = await fetch(`${baseUrl}/messages`, settings)
    this.messages.forEach(message => {
      if(message.read && message.selected) {
        message.read = false;
      }
    })
  }

  async toggleStar(id) {
    let starred
    this.messages.forEach(message => {
      if (message.id === id) {
        starred = !message.starred
      }
    })
    const body = {
      'messageIds': [ id ],
      'command': 'star',
      'star': starred
    }
    const settings = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    const data = await fetch(`${baseUrl}/messages`, settings)
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

  async addLabel(label) {
    let messageSelected = []
    this.messages.forEach(message => {
      if(message.selected) {
        messageSelected.push(message.id)
      }
    })
    const body = {
        "messageIds": messageSelected,
        "command": "addLabel",
        "label": label
      }
    const settings = {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    }
    const data = await fetch(`${baseUrl}/messages`, settings)
    this.messages.forEach((message, index) => {
      if(message.labels.indexOf(label) === -1 && message.selected) {
        message.labels.push(label);
      }
    })
  }

  async deleteLabel(label) {
    let messageSelected = []
    this.messages.forEach(message => {
      if (message.selected) {
        messageSelected.push(message.id)
      }
    })
    const body = {
        "messageIds": messageSelected,
        "command": "removeLabel",
        "label": label
      }
    const settings = {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    }
    const data = await fetch(`${baseUrl}/messages`, settings)
    this.messages.forEach((message, index) => {
      let removeIndex = message.labels.indexOf(label)
      if(message.labels.indexOf(label) !== -1 && message.selected) {
        message.labels.splice(removeIndex, 1);
      }
    })
  }
}
