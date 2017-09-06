import { Component, OnInit } from '@angular/core';
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

  async displayRead() {
    let read = []
    this.messages.forEach(message => {
      if (!message.read && message.selected) {
        read.push(message.id)
      }
    })
    const body = {
      'messageIds': read,
      'command': 'read',
      'read': read
    }
    const settings = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    const data = await fetch (`${baseUrl}/messages`, settings)
    this.messages.forEach(message => {
      if (!message.read && message.selected) {
        message.read = true
      }
    })
  }

  async displayUnread() {
    let unread = []
    this.messages.forEach(message => {
      if (message.read && message.selected) {
        unread.push(message.id)
      }
    })
    const body = {
      'messageIds': unread,
      'command': 'unread',
      'read': unread
    }

    const settings = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    const data = await fetch (`${baseUrl}/messages`, settings)
    this.messages.forEach(message => {
      if (message.read && message.selected) {
        message.read = false
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

  addLabel(label) {
    let messageSelected = []
    this.messages.forEach(message => {
      if (message.selected) {
        messageSelected.push(message)
      }
    })
    messageSelected.forEach(message => {
      if(message.labels.indexOf(label) === -1) {
        message.labels.push(label)
      }
    })
  }

  deleteLabel(label) {
    let messageSelected = []
    this.messages.forEach(message => {
      if (message.selected) {
        messageSelected.push(message)
      }
    })
    messageSelected.forEach((message, index) => {
      let labelIndex = message.labels.indexOf(label)
      if(message.labels.indexOf(label) !== -1)
        message.labels.splice(labelIndex, 1)
    })
  }
}
