(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{167:function(t,e,r){var content=r(169);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(36).default)("c22e4acc",content,!0,{sourceMap:!1})},168:function(t,e,r){"use strict";var n=r(167);r.n(n).a},169:function(t,e,r){(e=r(35)(!1)).push([t.i,".container[data-v-0d83a698]{min-height:100vh;display:flex;justify-content:center;align-items:center;text-align:center}",""]),t.exports=e},170:function(t,e,r){"use strict";r.r(e);r(81),r(20),r(21),r(9),r(64),r(16);var n=r(2),o=r(59),c=r(32);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",h=d.split(""),O={name:"loading",components:{},data:function(){return{counter:0,progress:0}},methods:f(f({},Object(c.b)(["getStrings","addStringToDb","deleteDB"])),{},{addString:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=[];case 1:if(!(t.counter<100)){e.next=9;break}for(i=0;i<1e5;i++)r.push(t.makeString());return e.next=5,t.addStringToDb(r);case 5:t.progress=parseInt(100*(++t.counter/100).toFixed(2)),r=[],e.next=1;break;case 9:t.$emit("loaded",!0);case 10:case"end":return e.stop()}}),e)})))()},makeString:function(){for(var text=[],i=0;i<100;i++)text.push(h[Math.floor(Math.random()*d.length)]);return text.join("")}}),mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return window.indexedDB||window.alert("Ваш браузер не поддерживает стабильную версию IndexedDB. Такие-то функции будут недоступны"),e.next=3,t.deleteDB();case 3:t.addString();case 4:case"end":return e.stop()}}),e)})))()}},m=r(31),v=Object(m.a)(O,(function(){var t=this.$createElement;return(this._self._c||t)("v-progress-circular",{attrs:{rotate:-90,size:100,width:15,value:this.progress,color:"primary"}},[this._v("\n  "+this._s(this.progress)+"\n")])}),[],!1,null,"8eff9eb2",null).exports;function j(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function w(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?j(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):j(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var x={name:"inputText",components:{},data:function(){return{text:""}},computed:w({},Object(c.d)({strings:function(t){return t.strings}})),methods:w(w(w({},Object(c.b)(["getStrings"])),Object(c.c)(["SET_STRINGS"])),{},{search:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.SET_STRINGS(0),t.text&&t.getStrings(t.text);case 2:case"end":return e.stop()}}),e)})))()}})},y={components:{Loading:v,InputText:Object(m.a)(x,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-col",{attrs:{cols:"12",sm:"6",md:"3"}},[r("v-text-field",{attrs:{label:"Text",solo:""},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}),t._v(" "),r("v-btn",{attrs:{color:"primary"},on:{click:t.search}},[t._v("Search")]),t._v("\n  "+t._s("Total: "+t.strings)+"\n")],1)}),[],!1,null,"bcd19a82",null).exports},data:function(){return{loaded:!1}},methods:{finishLoading:function(t){this.loaded=t}}},S=(r(168),Object(m.a)(y,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-app",[e("section",{staticClass:"container"},[this.loaded?this._e():e("loading",{on:{loaded:this.finishLoading}}),this._v(" "),this.loaded?e("input-text"):this._e()],1)])}),[],!1,null,"0d83a698",null));e.default=S.exports}}]);