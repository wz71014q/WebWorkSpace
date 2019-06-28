import './index.html';
import './style.css';

function init() {
  const wrapper = document.querySelector('.wrapper');
  const content = document.querySelector('.content');
  console.log('wrapper的offsetHeight: ' + wrapper.offsetHeight + ': ' + typeof wrapper.offsetHeight);
  console.log('wrapper的offsetWidth: ' + wrapper.offsetWidth + ': ' + typeof wrapper.offsetWidth);
  console.log('wrapper的offsetTop: ' + wrapper.offsetTop + ': ' + typeof wrapper.offsetTop);
  console.log('wrapper的offsetLeft: ' + wrapper.offsetLeft + ': ' + typeof wrapper.offsetLeft);
  console.log('wrapper的clientWidth: ' + wrapper.clientWidth + ': ' + typeof wrapper.clientWidth);
  console.log('wrapper的clientHeight: ' + wrapper.clientHeight + ': ' + typeof wrapper.clientHeight);
  console.log(getComputedStyle(wrapper).width)

  console.log('\n\ncontent的offsetHeight: ' + content.offsetHeight + ': ' + typeof content.offsetHeight);
  console.log('content的offsetWidth: ' + content.offsetWidth + ': ' + typeof content.offsetWidth);
  console.log('content的offsetTop: ' + content.offsetTop + ': ' + typeof content.offsetTop);
  console.log('content的offsetLeft: ' + content.offsetLeft + ': ' + typeof content.offsetLeft);
  console.log('content的clientWidth: ' + content.clientWidth + ': ' + typeof content.clientWidth);
  console.log('content的clientHeight: ' + content.clientHeight + ': ' + typeof content.clientHeight);

  console.log('content的scrollHeight: ' + content.scrollHeight + ': ' + typeof content.scrollHeight);
  console.log('content的scrollWidth: ' + content.scrollWidth + ': ' + typeof content.scrollWidth);
  console.log('content的scrollTop: ' + content.scrollTop + ': ' + typeof content.scrollTop);
  console.log('content的scrollLeft: ' + content.scrollLeft + ': ' + typeof content.scrollLeft);
}

init();

