export class XElement {
  constructor(props) {
    this.props = props;
    this.states = {};
  }

  addState(stateName, initValue) {
    let val = initValue;
    const self = this;
    Object.defineProperty(this.states, stateName, {
      get() {
        return val;
      },
      set(value) {
        val = value;
        self.whenStateChange();
      },
    });
  }
  render() {}
}

export function createElement(type, t, ...children) {
  const newChildren = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      newChildren.push(...child);
    } else {
      newChildren.push(child);
    }
  });
  children = newChildren;
  if (type.prototype instanceof XElement) {
    t = t || {};
    const e = new type(Object.assign(t, { children: children }));
    let elem = e.render();
    e.whenStateChange = () => {
      const newElem = e.render();

      elem.replaceWith(newElem);
      elem = newElem;
      console.log(elem);
    };

    return elem;
  }
  var elem = document.createElement(type);
  let { eventListeners, ...attrs } = t || {};
  eventListeners = eventListeners || {};
  Object.keys(attrs).forEach((v) => elem.setAttribute(v, attrs[v]));
  Object.keys(eventListeners).forEach((e) =>
    elem.addEventListener(e, eventListeners[e])
  );
  elem.replaceChildren(...children);
  return elem;
}
