var f=Object.defineProperty,d=Object.defineProperties;var i=Object.getOwnPropertyDescriptors;var _=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var u=(e,t,o)=>t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,c=(e,t)=>{for(var o in t||(t={}))m.call(t,o)&&u(e,o,t[o]);if(_)for(var o of _(t))v.call(t,o)&&u(e,o,t[o]);return e},l=(e,t)=>d(e,i(t));import{f as s,o as p,c as b,g,u as k}from"../app.957df75c.js";var y=(e,t)=>{const o=e.__vccOpts||e;for(const[n,r]of t)o[n]=r;return o},B=s({name:"Button",props:{type:{type:String,default:"default"}},setup(){}}),$={class:"default"};function h(e,t,o,n,r,j){return p(),b("button",$,"click")}var a=y(B,[["render",h]]);a.install=e=>{e.component(a.name,a)};var x=a;const O={name:"ButtonDemo",title:"\u57FA\u672C"},S=s(l(c({},O),{setup(e){return(t,o)=>(p(),g(k(x)))}}));var A=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"}));export{A as _};
