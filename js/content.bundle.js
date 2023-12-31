(function (e) {
    var t = {};
  
    function r(o) {
      if (t[o]) return t[o].exports;
      var n = t[o] = { i: o, l: !1, exports: {} };
      return e[o].call(n.exports, n, n.exports, r), n.l = !0, n.exports;
    }
  
    r.m = e, r.c = t, r.d = function (e, t, o) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }, r.r = function (e) {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag)
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
      Object.defineProperty(e, "__esModule", { value: !0 });
    }, r.t = function (e, t) {
      if (1 & t && (e = r(e)), 8 & t) return e;
      if (4 & t && typeof e === "object" && e && e.__esModule) return e;
      var o = Object.create(null);
      r.r(o);
      Object.defineProperty(o, "default", { enumerable: !0, value: e });
      if (2 & t && typeof e !== "string")
        for (var n in e) r.d(o, n, function (t) { return e[t]; }.bind(null, n));
      return o;
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () { return e.default; } : function () { return e; };
      r.d(t, "a", t);
      return t;
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "", r(r.s = 1);
  })([
    ,
    function (e, t) {
      let r;
  
      function o(e) {
        e.stopPropagation();
        let t = e.target;
        t.classList.add("border-element");
        (t.hasAttribute("src") || t.hasAttribute("href") || t.hasAttribute("onclick") || "BUTTON" == t.nodeName) && (t.style.border = "1px dashed red");
      }
  
      function n(e) {
        e.stopPropagation();
        let t = e.target;
        t.classList.remove("border-element");
        (t.hasAttribute("src") || t.hasAttribute("href") || t.hasAttribute("onclick") || "BUTTON" == t.nodeName) && (t.style.border = "");
      }
  
      function l(e) {
        e.stopPropagation();
        let t = e.target;
        (t.hasAttribute("src") || t.hasAttribute("href") || t.hasAttribute("onclick") || "BUTTON" == t.nodeName) && (t.border = "1px dashed red", e.preventDefault());
        if ("false" === t.dataset.blur) {
          t.dataset.blur = "true";
          t.classList.add("blur-element");
          t.style.setProperty("--blur", r + "px");
        } else {
          t.dataset.blur = "false";
          t.classList.remove("blur-element");
        }
      }
  
      let s = () => {
        document.body.querySelectorAll("*").forEach((e, t) => {
          e.removeEventListener("mouseover", o, !0);
          e.removeEventListener("mouseout", n, !0);
          e.removeEventListener("click", l, !0);
          e.classList.contains("blur-tooltip") && e.classList.remove("blur-tooltip");
          e.classList.contains("blur-tooltip-text") && (e.classList.remove("blur-tooltip-text"), e.style.display = "none");
        });
      };
  
      chrome.runtime.onMessage.addListener(e => {
        if ("blur" === e.action) {
          r = e.blurLevel / 10;
          document.body.querySelectorAll("*").forEach(e => {
            if ("true" === e.dataset.ig) return;
            let t = document.createElement("SPAN");
            let r = document.createTextNode("This element contains a link, click on it will disable the link");
            t.appendChild(r);
            t.classList.add("blur-tooltip-text");
            if (e.hasAttribute("src") || e.hasAttribute("href") || e.hasAttribute("onclick") || "BUTTON" == e.nodeName) {
              e.classList.add("blur-tooltip");
              e.appendChild(t);
            }
            e.dataset.blur = "false";
            e.addEventListener("mouseover", o, !0);
            e.addEventListener("mouseout", n, !0);
            e.addEventListener("click", l, !0);
          });
        } else if ("remove" === e.action) {
          document.body.querySelectorAll("*").forEach(e => {
            if ("true" === e.dataset.blur || e.classList.contains("blur-element")) {
              e.classList.remove("blur-element");
              e.dataset.blur = "false";
            }
          });
          s();
        } else if ("exit" === e.action) {
          s();
        }
      });
    }
  ]);
  