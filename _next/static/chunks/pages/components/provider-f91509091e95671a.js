(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3771],{1308:function(e,o,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/provider",function(){return r(5590)}])},5590:function(e,o,r){"use strict";r.r(o),r.d(o,{__N_SSG:function(){return i},title:function(){return s}});var t=r(5250),n=r(7160),i=!0,s="Provider";function d(e){var o=Object.assign({p:"p",code:"code",a:"a",pre:"pre",h2:"h2",h3:"h3"},(0,n.ah)(),e.components),r=o.Toc,i=o.PropsTable,s=o.Preview,d=o.Button;return d||a("Button",!0),s||a("Preview",!0),i||a("PropsTable",!0),r||a("Toc",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r,{selector:"#toc",items:'[{"anchor":"#usage","title":"Usage"},{"anchor":"#import","title":"Import"},{"anchor":"#props","title":"Props"},{"anchor":"#examples","title":"Examples"},{"anchor":"#provider-with-button","title":"Provider with Button"},{"anchor":"#provider-with-nested-provider","title":"Provider with nested Provider"}]'}),"\n",(0,t.jsxs)(o.p,{children:[(0,t.jsx)(o.code,{children:"<MarigoldProvider>"})," is the container for all Marigold applications. It defines the theme and other application level settings.\nWithout the ",(0,t.jsx)(o.code,{children:"<MarigoldProvider>"})," you can't get the theme on your components. So it is necessary to use."]}),"\n",(0,t.jsxs)(o.p,{children:["You just have to wrap your components around the ",(0,t.jsx)(o.code,{children:"<MarigoldProvider>"})," to make it work.\nIt is not possible to wrap up a ",(0,t.jsx)(o.code,{children:"<MarigoldProvider>"})," into another ",(0,t.jsx)(o.code,{children:"<MarigoldProvider>"})," without a ",(0,t.jsx)(o.code,{children:"selector"}),". The ",(0,t.jsx)(o.code,{children:"selector"})," is necessary so that the global styles are not overwritten. So the inner ",(0,t.jsx)(o.code,{children:"<MarigoldProvider>"})," must have a ",(0,t.jsx)(o.code,{children:"selector"}),"."]}),"\n",(0,t.jsxs)(o.p,{children:["If you want to get more information about the setup go to ",(0,t.jsx)(o.a,{href:"/introduction/getting-started/#bootstrapping",children:"Getting Started"}),"."]}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-tsx",children:'<MarigoldProvider theme={theme} selector="theme">\n  <Button variant="primary">Hello World!</Button>\n</MarigoldProvider>\n'})}),"\n",(0,t.jsx)(o.h2,{id:"usage",children:(0,t.jsx)(o.a,{href:"#usage",children:"Usage"})}),"\n",(0,t.jsx)(o.h3,{id:"import",children:(0,t.jsx)(o.a,{href:"#import",children:"Import"})}),"\n",(0,t.jsx)(o.p,{children:"To import the component you just have to use this code below."}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-tsx",children:"import { MarigoldProvider } from '@marigold/components';\n"})}),"\n",(0,t.jsx)(o.h3,{id:"props",children:(0,t.jsx)(o.a,{href:"#props",children:"Props"})}),"\n",(0,t.jsx)(i,{props:[{property:"children",type:"ReactNode",default:"none",description:"The children of the component."},{property:"theme",type:"Theme",default:"none",description:"The use that should be used within the provider context."},{property:"selector",type:"string",default:"none",description:"By default normalization is applied globally. By specifying a selector you can scope normalization and other CSS from `theme.root` to a certain element in the DOM. This is useful if you want to run your app only on a portion of the page or are cascading themes."},{property:"normalizeDocument",type:"boolean",default:"true",description:"Apply CSS normalization to the document (`html` and `body`)"}]}),"\n",(0,t.jsx)(o.h2,{id:"examples",children:(0,t.jsx)(o.a,{href:"#examples",children:"Examples"})}),"\n",(0,t.jsx)(o.h3,{id:"provider-with-button",children:(0,t.jsx)(o.a,{href:"#provider-with-button",children:"Provider with Button"})}),"\n",(0,t.jsxs)(o.p,{children:["The example shows how the ",(0,t.jsx)(o.code,{children:"<MarigoldProvider>"})," works. As simple as it is you just have to wrap the component around the provider and import a theme. You can click on the theme select on top of the page to see how the ",(0,t.jsx)(o.code,{children:"<Button>"})," changes its theme."]}),"\n",(0,t.jsx)(s,{children:(0,t.jsx)(d,{variant:"primary",children:"Hello World!"})}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-tsx",children:"import { Button, MarigoldProvider } from '@marigold/components';\n\n<MarigoldProvider theme={theme}>\n  <Button variant=\"primary\">Hello World!</Button>\n</MarigoldProvider>;\n"})}),"\n",(0,t.jsx)(o.h3,{id:"provider-with-nested-provider",children:(0,t.jsx)(o.a,{href:"#provider-with-nested-provider",children:"Provider with nested Provider"})}),"\n",(0,t.jsxs)(o.p,{children:["If you want to use a ",(0,t.jsx)(o.code,{children:"<MarigoldProvider>"})," in another ",(0,t.jsx)(o.code,{children:"<MarigoldProvider>"})," you have to set a selector on the inner one. It's necessary because you have to make clear what theme to use, without it the styles would be overwritten."]}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-tsx",children:'import { MarigoldProvider } from \'@marigold/components\';\n\n<MarigoldProvider theme={outerTheme}>\n  <MarigoldProvider theme={innerTheme} selector="#root">\n    <div id="root" />\n  </MarigoldProvider>\n</MarigoldProvider>;\n'})})]})}function a(e,o){throw new Error("Expected "+(o?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}o.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=Object.assign({},(0,n.ah)(),e.components),r=o.wrapper;return r?(0,t.jsx)(r,Object.assign({},e,{children:(0,t.jsx)(d,e)})):d(e)}}},function(e){e.O(0,[9774,2888,179],(function(){return o=1308,e(e.s=o);var o}));var o=e.O();_N_E=o}]);