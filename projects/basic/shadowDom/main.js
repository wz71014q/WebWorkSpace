import './index.html';
import './style.css';

/* ==========================================================
   Demo 1: 基础概念 — open vs closed mode
   ========================================================== */
(function demoOpenVsClosed() {
  const openHost = document.getElementById('openShadowHost');
  const closedHost = document.getElementById('closedShadowHost');
  const btn = document.getElementById('checkShadowAccess');
  const result = document.getElementById('shadowAccessResult');

  // open 模式
  openHost.attachShadow({ mode: 'open' });
  openHost.shadowRoot.innerHTML = `
    <style>
      .inner {
        padding: 12px;
        background: #e3f2fd;
        border-radius: 6px;
        border: 2px solid #1976d2;
      }
      .inner p { margin: 0; color: #1565c0; }
    </style>
    <div class="inner">
      <p>✅ 我是 <strong>open</strong> 模式的 Shadow DOM 内容</p>
      <p>外部可以通过 <code>element.shadowRoot</code> 访问到我</p>
    </div>
  `;

  // closed 模式 — attachShadow 返回 ShadowRoot 实例，但 host.shadowRoot 为 null
  const closedRoot = closedHost.attachShadow({ mode: 'closed' });
  closedRoot.innerHTML = `
    <style>
      .inner {
        padding: 12px;
        background: #fce4ec;
        border-radius: 6px;
        border: 2px solid #c62828;
      }
      .inner p { margin: 0; color: #c62828; }
    </style>
    <div class="inner">
      <p>🔒 我是 <strong>closed</strong> 模式的 Shadow DOM 内容</p>
      <p style="margin-top: 8px;">外部无法通过 <code>element.shadowRoot</code> 访问到我</p>
    </div>
  `;

  btn.addEventListener('click', () => {
    const openRoot = openHost.shadowRoot;
    const closedRoot = closedHost.shadowRoot;

    result.textContent =
      `// ===== 访问结果 =====\n` +
      `openHost.shadowRoot          => ${openRoot ? 'ShadowRoot ✅ (可访问)' : 'null ❌'}\n` +
      `closedHost.shadowRoot        => ${closedRoot} ❌\n\n` +
      `// 浏览器内部的 <video>、<audio> 等元素\n` +
      `// 都使用 closed 模式来隐藏内部实现细节\n` +
      `document.querySelector('video')?.shadowRoot  => ${'null (无法访问)'}`;
  });
})();

/* ==========================================================
   Demo 2: 样式隔离
   ========================================================== */
(function demoStyleIsolation() {
  const host = document.getElementById('styleIsolationHost');

  const shadow = host.attachShadow({ mode: 'open' });
  shadow.innerHTML = `
    <style>
      /* 这个样式只在 Shadow DOM 内部生效 */
      .should-be-red {
        color: #2e7d32 !important;  /* 绿色 — 覆盖全局的红色 */
        font-weight: bold;
        background: #e8f5e9;
        padding: 12px;
        border-radius: 6px;
        border: 2px solid #2e7d32;
      }
      p {
        margin: 0;
      }
    </style>
    <p class="should-be-red">✅ 我在 Shadow DOM 内部，全局样式 ".should-be-red { color: red }" 对我无效！<br>
    因为 Shadow DOM 将内部和外部样式完全隔离了。</p>
  `;

  // 演示可继承属性穿透
  const inheritHost = document.getElementById('inheritHost');
  const inheritShadow = inheritHost.attachShadow({ mode: 'open' });
  inheritShadow.innerHTML = `
    <style>
      .inner {
        padding: 12px;
        border-radius: 6px;
        border: 2px solid #1e90ff;
      }
    </style>
    <div class="inner">
      <p>我没有设置 color 属性，但父级 #inheritDemo 设置了 color: blue</p>
      <p>因为 color 是 <strong>可继承属性</strong>，所以我可以从父级继承到蓝色</p>
    </div>
  `;
})();

/* ==========================================================
   Demo 3: Custom Element + Shadow DOM — my-tooltip
   ========================================================== */
(function defineTooltipComponent() {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: inline-block;
        position: relative;
        cursor: pointer;
      }
      .trigger {
        color: #1976d2;
        border-bottom: 1px dashed #1976d2;
        font-weight: 500;
      }
      .tooltip-text {
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: #fff;
        padding: 8px 14px;
        border-radius: 6px;
        font-size: 13px;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 10;
      }
      .tooltip-text::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: #333;
      }
      :host(:hover) .tooltip-text {
        opacity: 1;
      }
    </style>
    <span class="trigger">
      <slot></slot>
    </span>
    <span class="tooltip-text" id="tooltipText"></span>
  `;

  class MyTooltip extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      const text = this.getAttribute('text') || '默认提示';
      this._shadowRoot.getElementById('tooltipText').textContent = text;
    }
  }

  if (!customElements.get('my-tooltip')) {
    customElements.define('my-tooltip', MyTooltip);
  }
})();

/* ==========================================================
   Demo 4: Slot 插槽机制 — my-card
   ========================================================== */
(function defineCardComponent() {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        margin: 16px 0;
      }
      .card-header {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: #fff;
        padding: 16px 20px;
        font-size: 18px;
        font-weight: 600;
      }
      .card-body {
        padding: 20px;
        background: #fff;
        line-height: 1.8;
      }
      .card-footer {
        background: #f5f5f5;
        padding: 12px 20px;
        border-top: 1px solid #e0e0e0;
        font-size: 13px;
        color: #888;
      }
      /* ::slotted() 选中投影到 slot 的内容 */
      ::slotted(p) {
        margin: 8px 0;
      }
      ::slotted([slot="footer"]) {
        color: #666;
      }
    </style>
    <div class="card-header">
      <slot name="title">默认标题</slot>
    </div>
    <div class="card-body">
      <slot>默认内容 — 将这里的内容投影到 Shadow DOM 内部展示</slot>
    </div>
    <div class="card-footer">
      <slot name="footer">默认底部</slot>
    </div>
  `;

  class MyCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }
  }

  if (!customElements.get('my-card')) {
    customElements.define('my-card', MyCard);
  }
})();

/* ==========================================================
   Demo 5: 事件重定向 (Event Retargeting)
   ========================================================== */
(function defineEventDemoComponent() {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
        padding: 20px;
        background: #fff3e0;
        border-radius: 8px;
        border: 2px solid #ff9800;
        text-align: center;
      }
      .inner-btn {
        background: #ff9800;
        color: #fff;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        margin: 8px;
      }
      .inner-btn:hover {
        background: #f57c00;
      }
    </style>
    <p>🔽 点击下面的按钮</p>
    <button class="inner-btn" id="shadowBtn">Shadow DOM 内部的按钮</button>
    <p style="margin-top: 12px; font-size: 13px; color: #888;" id="internalLog">
      事件将在 Shadow DOM 内部和外部同时捕获
    </p>
  `;

  class MyEventDemo extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.appendChild(template.content.cloneNode(true));

      const btn = shadow.getElementById('shadowBtn');
      const log = shadow.getElementById('internalLog');

      // 在 Shadow DOM 内部监听 — target 是按钮本身
      btn.addEventListener('click', (e) => {
        log.textContent = `[Shadow 内部] event.target 是: ${e.target.tagName}.${e.target.className}`;
      });
    }
  }

  if (!customElements.get('my-event-demo')) {
    customElements.define('my-event-demo', MyEventDemo);
  }
})();

(function bindEventRetargeting() {
  const host = document.getElementById('eventDemoHost');
  const result = document.getElementById('eventResult');
  const btn = document.getElementById('addOuterListener');

  btn.addEventListener('click', () => {
    // 先在 Light DOM 上添加监听
    host.addEventListener(
      'click',
      (e) => {
        // 关键：event.target 被重定向为 host 元素，而不是内部的 button
        result.textContent =
          `[Light DOM 外部] 捕获到 Shadow DOM 内部的事件！\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `event.target          => ${e.target.tagName}.${e.target.className || '(no class)'}\n` +
          `event.target.id       => ${e.target.id || '(无)'}\n` +
          `event.currentTarget   => ${e.currentTarget.tagName}.${
            e.currentTarget.className || '(no class)'
          }\n\n` +
          `🔑 关键：虽然点击的是 Shadow 内部的按钮，\n` +
          `   但外部的 event.target 指向的是 host 元素 <my-event-demo>！\n` +
          `   这就是事件重定向（Event Retargeting）！`;
      },
      false
    );

    // 探测 Shadow 内部结构（open 模式可访问）
    const shadowRoot = host.shadowRoot;
    result.textContent =
      `✅ 已绑定 click 事件监听器到 <my-event-demo>\n` +
      `现在点击 Shadow DOM 内部的按钮试试 👆\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Shadow 内部按钮: ${
        shadowRoot.querySelector('#shadowBtn')
          ? shadowRoot.querySelector('#shadowBtn').tagName
          : 'null'
      }\n` +
      `(open 模式下，我们可以从外部探测 Shadow 结构)`;

    btn.disabled = true;
    btn.textContent = '✅ 监听已添加';
    btn.style.opacity = '0.6';
  });
})();

/* ==========================================================
   Demo 6: Shadow DOM CSS 伪类展示
   ========================================================== */
(function demoCSSPseudoClasses() {
  const host = document.getElementById('pseudoDemoHost');
  const shadow = host.attachShadow({ mode: 'open' });

  shadow.innerHTML = `
    <style>
      /* :host — 选中 shadow host 元素本身 */
      :host {
        display: block;
        padding: 20px;
        background: #f3e5f5;
        border-radius: 8px;
        border: 2px solid #9c27b0;
        transition: all 0.3s ease;
        text-align: center;
      }

      /* :host() — 根据条件选择 host */
      :host(:hover) {
        background: #e1bee7;
        border-color: #7b1fa2;
        transform: scale(1.02);
      }

      ::slotted(p) {
        color: #7b1fa2;
        font-weight: 500;
      }

      p {
        color: #333;
        margin: 8px 0;
      }
      .key {
        display: inline-block;
        background: #9c27b0;
        color: #fff;
        padding: 2px 8px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 13px;
      }
    </style>
    <p><span class="key">:host</span> 选中了我自己（<code>#pseudoDemoHost</code>）</p>
    <p><span class="key">:host(:hover)</span> 鼠标悬停时改变背景色</p>
    <p><span class="key">::slotted()</span> 用于样式化投影内容</p>
    <p><span class="key">::part()</span> 暴露 shadow 内部的部件给外部样式化</p>
  `;
})();

/* ==========================================================
   初始化完成后在控制台输出提示
   ========================================================== */
console.log('🛡️ Shadow DOM Demo 已加载');
console.log('📖 覆盖知识点：');
console.log('  1. attachShadow — open vs closed');
console.log('  2. 样式隔离机制');
console.log('  3. Custom Element 定义');
console.log('  4. Slot 插槽投影');
console.log('  5. 事件重定向 (Event Retargeting)');
console.log('  6. Shadow DOM CSS 特性 (:host, ::slotted, ::part)');
