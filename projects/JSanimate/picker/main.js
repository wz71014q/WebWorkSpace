import './index.html';
import './style.css';

const handleManager = {
  startEvent: 'ontouchstart' in window ? 'touchstart' : 'mousedown',
  moveEvent: 'ontouchstart' in window ? 'touchmove' : 'mousemove',
  stopEvent: 'ontouchstart' in window ? 'touchend' : 'mouseup',
  addHandle(obj, event, handle) {
    obj.addEventListener(event, handle);
  },
  removeHandle(obj, event, handle) {
    obj.removeEventListener(event, handle);
  }
};
class CubeObject {
  constructor() {
    this.itemContent = document.getElementsByClassName('container')[0];
    this.itemWidth = window.getComputedStyle(this.itemContent).width;
  }
}
const container = new CubeObject();
let startPoint = [];
let angleXCache = 0;
let angleYCache = 0;
const touchEvent = {
  touchStart(eve) {
    let _eve = eve || window.event;
    startPoint = [_eve.clientX, _eve.clientY];
    console.log('touchStart', _eve.clientX);
    console.log('startPoint', startPoint);
    handleManager.addHandle(container.itemContent, handleManager.moveEvent, touchEvent.touching);
  },
  touching(eve) {
    let _eve = eve || window.event;
    const movingPoint = [_eve.clientX, _eve.clientY];
    let angelX = 0;
    let angelY = 0;
    angelX = movingPoint[0] - startPoint[0];
    angelY = startPoint[1] - movingPoint[1];
    rotate(container.itemContent, angelX, angelY);
  },
  touchEnd(eve) {
    let _eve = eve || window.event;
    const endPoint = [_eve.clientX, _eve.clientY];
    console.log('touchEnd', [_eve.clientX, _eve.clientY]);
    angleXCache += endPoint[0] - startPoint[0];
    console.log('angleXCache', angleXCache);
    // angleXCache = Math.abs(endPoint[0] - startPoint[0] >= 360) ? 0 : (endPoint[0] - startPoint[0]);
    angleYCache = Math.abs(endPoint[1] - startPoint[1] >= 360) ? 0 : (startPoint[1] - endPoint[1]);
    handleManager.removeHandle(container.itemContent, handleManager.moveEvent, touchEvent.touching);
  }
};
handleManager.addHandle(container.itemContent, handleManager.startEvent, touchEvent.touchStart);
handleManager.addHandle(container.itemContent, handleManager.stopEvent, touchEvent.touchEnd);

function hasClass(obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(obj, cls) {
  if (!hasClass(obj, cls)) {
    obj.className += ` ${cls}`;
  }
}
function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    obj.className = obj.className.replace(reg, ' ');
  }
}
function rotate(obj, angelX, angelY) {
  // console.info('angleXCache', angleXCache, 'angelX', angelX);
  // angelX = Math.abs(angleXCache + angelX >= 360) ? 0 : (angleXCache + angelX);
  obj.style.transform = `rotateY(${angelX + angleXCache}deg)`;
  // obj.style.transform = `rotateY(${angleXCache + angelX}deg) rotateX(${angleYCache + angelY}deg)`;
}