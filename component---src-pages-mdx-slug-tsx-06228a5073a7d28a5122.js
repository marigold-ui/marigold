(self.webpackChunk_marigold_docs=self.webpackChunk_marigold_docs||[]).push([[342],{79374:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n},e.exports.__esModule=!0,e.exports.default=e.exports},81241:function(e,t,r){var n=r(79374);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.__esModule=!0,e.exports.default=e.exports},69694:function(e,t,r){var n=r(18186),a=r(61269);function o(t,r,c){return a()?(e.exports=o=Reflect.construct,e.exports.__esModule=!0,e.exports.default=e.exports):(e.exports=o=function(e,t,r){var a=[null];a.push.apply(a,t);var o=new(Function.bind.apply(e,a));return r&&n(o,r.prototype),o},e.exports.__esModule=!0,e.exports.default=e.exports),o.apply(null,arguments)}e.exports=o,e.exports.__esModule=!0,e.exports.default=e.exports},61269:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.__esModule=!0,e.exports.default=e.exports},21951:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},39773:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},78358:function(e,t,r){var n=r(81241),a=r(21951),o=r(3053),c=r(39773);e.exports=function(e){return n(e)||a(e)||o(e)||c()},e.exports.__esModule=!0,e.exports.default=e.exports},3053:function(e,t,r){var n=r(79374);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},27810:function(e,t,r){var n=r(87566);e.exports={MDXRenderer:n}},87566:function(e,t,r){var n=r(69694),a=r(78358),o=r(3645),c=r(32862),i=["scope","children"];function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u=r(49231),p=r(99473).mdx,f=r(56931).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,o=c(e,i),s=f(t),d=u.useMemo((function(){if(!r)return null;var e=l({React:u,mdx:p},s),t=Object.keys(e),o=t.map((function(t){return e[t]}));return n(Function,["_fn"].concat(a(t),[""+r])).apply(void 0,[{}].concat(a(o)))}),[r,t]);return u.createElement(d,l({},o))}},16252:function(e,t,r){"use strict";r.d(t,{T:function(){return c}});var n=r(49231),a=r(39746),o={small:function(){return n.createElement(a.S,{src:"./logo.png",placeholder:"none",alt:"Marigold Logo",width:140,height:60,__imageData:r(10154)})},large:function(){return n.createElement(a.S,{src:"./logo.png",placeholder:"none",alt:"Marigold Logo",width:750,__imageData:r(76794)})},fit:function(){return n.createElement(a.S,{src:"./logo.png",placeholder:"none",alt:"Marigold Logo",__imageData:r(49453)})}},c=function(e){var t=e.size,r=o[void 0===t?"fit":t];return n.createElement(r,null)}},68761:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return S}});var n=r(49231),a=r(27810),o=r(22471),c=r(89251),i=r(18896),s=r(38645),l=r(16252),u=r(35643),p=r(24273);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){(0,u.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=function e(t,r){var n,a=r.path,o=a[0],c=a.slice(1);if(!c.length)return t.push({title:r.frontmatter.title||r.headings[0].value,slug:(n=r.slug,n.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase())}),t;var i=t.find((function(e){return"name"in e&&e.name===o}));return i||(i={name:o,children:[]},t.push(i)),e(i.children,d(d({},r),{},{path:c}))},b=function(){var e=(0,p.useStaticQuery)("3402178641"),t=e.allMdx.nodes,r=e.site,n=[];return t.map((function(e){return d({path:e.slug.split("/")},e)})).forEach((function(e){return g(n,e)})),function(e,t){return e.sort((function(e,r){var n="slug"in e?e.slug:e.name,a=t.indexOf(n),o="slug"in r?r.slug:r.name,c=t.indexOf(o);return-1===a&&-1===c?n.localeCompare(o):a-c}))}(n,r.siteMetadata.navigation)},m=function(e){var t=e.title,r=e.slug;return n.createElement(o.x,{variant:"navigation.item"},n.createElement(s.r,{to:r.startsWith("/")||r.startsWith("http")?r:"/"+r},t))},h=function e(t){var r=t.name,a=t.children;return n.createElement("div",null,Boolean(r.length)&&n.createElement(o.x,{as:"h2",variant:"navigation.header"},r.split("/")[0].split("-").map((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})).join(" ")),n.createElement(o.x,{as:"ul",variant:"navigation.list"},a.map((function(t){return"title"in t?n.createElement(m,Object.assign({key:t.slug},t)):n.createElement(e,Object.assign({key:t.name},t))}))))},x=function(){var e=b();return n.createElement(o.x,{as:"nav",variant:"navigation.wrapper","aria-labelledby":"primary-navigation"},n.createElement(h,{name:"",children:e}),n.createElement(h,{name:"Useful Links",children:[{title:"Github",slug:"https://github.com/marigold-ui/marigold/"},{title:"Issues",slug:"https://github.com/marigold-ui/marigold/issues"},{title:"Changelog",slug:"https://github.com/marigold-ui/marigold/blob/main/packages/components/CHANGELOG.md"},{title:"Slack Channel",slug:"https://reservix.slack.com/archives/C02727BNZ3J"}]}))},w=r(82175),v=r(73944),y=r(29877),O=function(){var e=(0,w.G0)(),t=e.current,r=e.themes,a=e.setTheme;return n.createElement(v.P,{id:"theme-select",selectedKey:t,value:t,onSelectionChange:function(e){return a(e)},width:160,"aria-label":"theme-select"},Object.keys(r).map((function(e){return n.createElement(y.ck,{key:e},e)})))},E=r(64707),_=function(){var e,t={version:(e=(0,p.useStaticQuery)("2300692853").site).siteMetadata.version,hash:e.siteMetadata.hash},r=t.version,a=t.hash;return n.createElement(E.x,{variant:"muted",display:"block",align:"right",p:"xsmall"},"v",r," (",a.slice(0,7),")")},j=function(e){var t=e.children;return n.createElement(n.Fragment,null,n.createElement(c.o,{columns:[2,10],space:"xsmall",collapseAt:"60em"},n.createElement(i.K,{space:"small"},n.createElement(o.x,{p:"medium"},n.createElement(s.r,{to:"/"},n.createElement(l.T,{size:"small"}))),n.createElement(O,null),n.createElement(x,null)),n.createElement(o.x,null,t)),n.createElement(_,null))},S=function(e){var t=e.data.mdx.body;return n.createElement(j,null,n.createElement(o.x,{as:"main",maxWidth:"700px",pt:"medium"},n.createElement(a.MDXRenderer,null,t)))}},10154:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","images":{"fallback":{"src":"/static/801911852016f936a29f302182bd71cb/20f89/logo.png","srcSet":"/static/801911852016f936a29f302182bd71cb/2a634/logo.png 35w,\\n/static/801911852016f936a29f302182bd71cb/9c5be/logo.png 70w,\\n/static/801911852016f936a29f302182bd71cb/20f89/logo.png 140w,\\n/static/801911852016f936a29f302182bd71cb/be767/logo.png 280w","sizes":"(min-width: 140px) 140px, 100vw"},"sources":[{"srcSet":"/static/801911852016f936a29f302182bd71cb/e190c/logo.webp 35w,\\n/static/801911852016f936a29f302182bd71cb/4619d/logo.webp 70w,\\n/static/801911852016f936a29f302182bd71cb/83ee8/logo.webp 140w,\\n/static/801911852016f936a29f302182bd71cb/8bd9a/logo.webp 280w","type":"image/webp","sizes":"(min-width: 140px) 140px, 100vw"}]},"width":140,"height":59.99999999999999}')},49453:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","images":{"fallback":{"src":"/static/801911852016f936a29f302182bd71cb/436a4/logo.png","srcSet":"/static/801911852016f936a29f302182bd71cb/13289/logo.png 247w,\\n/static/801911852016f936a29f302182bd71cb/b50a6/logo.png 494w,\\n/static/801911852016f936a29f302182bd71cb/436a4/logo.png 988w","sizes":"(min-width: 988px) 988px, 100vw"},"sources":[{"srcSet":"/static/801911852016f936a29f302182bd71cb/5cf3d/logo.webp 247w,\\n/static/801911852016f936a29f302182bd71cb/a4682/logo.webp 494w,\\n/static/801911852016f936a29f302182bd71cb/1791e/logo.webp 988w","type":"image/webp","sizes":"(min-width: 988px) 988px, 100vw"}]},"width":988,"height":425.99999999999994}')},76794:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","images":{"fallback":{"src":"/static/801911852016f936a29f302182bd71cb/82ab3/logo.png","srcSet":"/static/801911852016f936a29f302182bd71cb/9f3a5/logo.png 188w,\\n/static/801911852016f936a29f302182bd71cb/cc318/logo.png 375w,\\n/static/801911852016f936a29f302182bd71cb/82ab3/logo.png 750w","sizes":"(min-width: 750px) 750px, 100vw"},"sources":[{"srcSet":"/static/801911852016f936a29f302182bd71cb/7598d/logo.webp 188w,\\n/static/801911852016f936a29f302182bd71cb/7c992/logo.webp 375w,\\n/static/801911852016f936a29f302182bd71cb/68425/logo.webp 750w","type":"image/webp","sizes":"(min-width: 750px) 750px, 100vw"}]},"width":750,"height":323}')}}]);
//# sourceMappingURL=component---src-pages-mdx-slug-tsx-06228a5073a7d28a5122.js.map