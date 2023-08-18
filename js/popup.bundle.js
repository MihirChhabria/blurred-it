(function (e) {
    var t = {};
  
    function r(n) {
      if (t[n]) return t[n].exports;
      var a = t[n] = { i: n, l: !1, exports: {} };
      return e[n].call(a.exports, a, a.exports, r), a.l = !0, a.exports;
    }
  
    r.m = e, r.c = t, r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }, r.r = function (e) {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag)
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
      Object.defineProperty(e, "__esModule", { value: !0 });
    }, r.t = function (e, t) {
      if (1 & t && (e = r(e)), 8 & t) return e;
      if (4 & t && typeof e === "object" && e && e.__esModule) return e;
      var n = Object.create(null);
      r.r(n);
      Object.defineProperty(n, "default", { enumerable: !0, value: e });
      if (2 & t && typeof e !== "string")
        for (var a in e) r.d(n, a, function (t) { return e[t]; }.bind(null, a));
      return n;
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () { return e.default; } : function () { return e; };
      r.d(t, "a", t);
      return t;
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "", r(r.s = 2);
  })({
    2: function (e, t) {
      let r = 8;
      let n = document.querySelector("#menu-desc");
      let a = document.querySelector("#cursor-blur");
      let l = document.querySelector("#exit-blur");
      let u = document.querySelector("#remove-blur");
  
      a.addEventListener("mouseenter", i);
      a.addEventListener("mouseleave", i);
      a.addEventListener("click", (e) => {
        chrome.tabs.query({ active: !0, currentWindow: !0 }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { action: "blur", blurLevel: r });
          let e = r;
          chrome.storage.sync.set({ blurLevel: e }, () => {});
        });
      });
  
      l.addEventListener("mouseenter", i);
      l.addEventListener("mouseleave", i);
      l.addEventListener("click", (e) => {
        chrome.tabs.query({ active: !0, currentWindow: !0 }, (e) => {
          chrome.tabs.sendMessage(e[0].id, { action: "exit", blurLevel: r });
        });
      });
  
      u.addEventListener("mouseenter", i);
      u.addEventListener("mouseleave", i);
      u.addEventListener("click", (e) => {
        chrome.tabs.query({ active: !0, currentWindow: !0 }, (e) => {
          chrome.tabs.sendMessage(e[0].id, { action: "remove", blurLevel: r });
        });
      });
  
      let o = document.getElementById("imageTest");
      let c = document.getElementById("bg-text");
      o.style.setProperty("--blur", r + "px");
      c.style.setProperty("--blur", r + "px");
  
      let d = document.getElementById("rs-range-line");
      let s = document.getElementById("rs-bullet");
  
      function i(e) {
        n.innerHTML = e.target.dataset.name;
      }
  
      function m() {
        s.innerHTML = d.value / 10;
        let e = d.value / d.max;
        s.style.left = 257 * e + "px";
        r = d.value;
        o.style.setProperty("--blur", d.value / 10 + "px");
        c.style.setProperty("--blur", d.value / 10 + "px");
      }
  
      d.value = r;
      d.addEventListener("input", m, !1);
  
      let v = document.querySelector("#menu-container");
      let b = v.querySelectorAll("button");
  
      b.forEach(e => {
        e.dataset.clicked = "false";
      });
  
      v.addEventListener("click", e => {
        if ("menu-container" !== e.target.id && "true" !== e.target.dataset.clicked) {
          b.forEach(e => {
            if ("true" === e.dataset.clicked) {
              e.classList.remove("clicked-menu-bg");
              e.dataset.clicked = "false";
            }
          });
  
          if ("path" === e.target.nodeName) {
            e.target.parentNode.parentNode.classList.add("clicked-menu-bg");
            e.target.parentNode.parentNode.dataset.clicked = "true";
          } else if ("svg" === e.target.nodeName) {
            e.target.parentNode.classList.add("clicked-menu-bg");
            e.target.parentNode.dataset.clicked = "true";
          } else {
            e.target.classList.add("clicked-menu-bg");
            e.target.dataset.clicked = "true";
          }
        }
      });
  
      chrome.storage.sync.get("blurLevel", (e) => {
        e.blurLevel ? (r = e.blurLevel, d.value = e.blurLevel, m()) : m();
      });
    }
  });