import './index.html';

initBroadcastChannel();

// BroadcastChannel只能在同源网站使用
function initBroadcastChannel() {
  var bc = new BroadcastChannel('test_channel');
  bc.postMessage('This is a BroadcastChannel message.');
  bc.onmessage = function (ev) {
    console.log(ev.data);
  };
}
