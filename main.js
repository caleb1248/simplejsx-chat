import { createElement, XElement } from './jsx.js';
import { io } from 'https://cdn.socket.io/4.5.4/socket.io.esm.min.js';
let name = '';
const socket = io();
while (true) {
  const nname = prompt('Enter a name');
  if (nname == null || nname == '') {} else {
    name = nname;
    break;
  }
}
class Chat extends XElement {
  constructor() {
    super();
    this.addState('texts', []);
    socket.on('text', data => this.states.texts = [...this.states.texts, data]);
  }
  render() {
    return createElement("div", {
      style: "height: 300px",
      id: "msgs"
    }, this.states.texts.map(({
      sender,
      message
    }) => createElement("p", null, "(", sender, "): ", message)), createElement("input", {
      type: "text",
      eventListeners: {
        change: ({
          target
        }) => socket.emit('text', {
          sender: name,
          message: target.value
        })
      }
    }));
  }
}
document.body.appendChild(createElement(Chat, null));
