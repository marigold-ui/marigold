(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6785],{6245:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useResponsiveValue",function(){return s(867)}])},867:function(e,n,s){"use strict";s.r(n),s.d(n,{__N_SSG:function(){return t},title:function(){return i}});var o=s(5250),r=s(7160),t=!0,i="useResponsiveValue";function a(e){var n=Object.assign({p:"p",code:"code",ul:"ul",li:"li",strong:"strong",pre:"pre",h2:"h2",a:"a",h3:"h3"},(0,r.ah)(),e.components),s=n.Toc,t=n.Preview,i=n.ResponsiveValue;return t||h("Preview",!0),i||h("ResponsiveValue",!0),s||h("Toc",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s,{selector:"#toc",items:'[{"anchor":"#usage","title":"Usage"},{"anchor":"#import","title":"Import"},{"anchor":"#examples","title":"Examples"},{"anchor":"#useresponsivevalue-with-breakpoints","title":"useResponsiveValue with breakpoints"}]'}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"useResponsiveValue"})," is a client side hook. It can be used to return values based on the current screen size, using breakpoints from the theme ",(0,o.jsx)(n.code,{children:"theme.breakpoints"}),".\nYou can set as many ",(0,o.jsx)(n.code,{children:"breakpoints"})," as you want.\nTo add ",(0,o.jsx)(n.code,{children:"breakpoints"})," to your theme you have to write them as an array."]}),"\n",(0,o.jsxs)(n.p,{children:["You can pass the following parameters to your ",(0,o.jsx)(n.code,{children:"useResponsiveValue"})," hook:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"First:"})," the values as array which defines the ",(0,o.jsx)(n.code,{children:"breakpoints"})]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Second:"})," the ",(0,o.jsx)(n.code,{children:"defaultIndex"})," which points on the default ",(0,o.jsx)(n.code,{children:"breakpoint"})]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"const value = useResponsiveValue(\n  [\n    'no breakpoint',\n    'larger than 40em',\n    'larger than 50em',\n    'larger than 60em',\n    'larger than 70em',\n  ],\n  2\n);\n"})}),"\n",(0,o.jsx)(n.h2,{id:"usage",children:(0,o.jsx)(n.a,{href:"#usage",children:"Usage"})}),"\n",(0,o.jsx)(n.h3,{id:"import",children:(0,o.jsx)(n.a,{href:"#import",children:"Import"})}),"\n",(0,o.jsx)(n.p,{children:"To import the hook you just have to use this code below."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"import { useResponsiveValue } from '@marigold/system';\n"})}),"\n",(0,o.jsx)(n.h2,{id:"examples",children:(0,o.jsx)(n.a,{href:"#examples",children:"Examples"})}),"\n",(0,o.jsx)(n.h3,{id:"useresponsivevalue-with-breakpoints",children:(0,o.jsx)(n.a,{href:"#useresponsivevalue-with-breakpoints",children:"useResponsiveValue with breakpoints"})}),"\n",(0,o.jsxs)(n.p,{children:["Here you can see an example where the ",(0,o.jsx)(n.code,{children:"useResponisveValue"})," hook is used. If you change the size of the screen you will see how the colors and text changes."]}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"background-color"})," from the ",(0,o.jsx)(n.code,{children:"<Box>"})," has some values for each breakpoint one. So if the next ",(0,o.jsx)(n.code,{children:"breakpoint"})," is reached, it will change the value for the background."]}),"\n",(0,o.jsx)(t,{children:(0,o.jsx)(i,{})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"import { Box, ThemeProvider, useResponsiveValue } from '@marigold/system';\n\nexport const ResponsiveValue = () => {\n  const theme = {\n    breakpoints: ['40em', '50em', '60em', '70em'],\n  };\n  const SomeComponent = () => {\n    const value = useResponsiveValue(\n      [\n        'no breakpoint',\n        'larger than 40em',\n        'larger than 50em',\n        'larger than 60em',\n        'larger than 70em',\n      ],\n      2\n    );\n    return <strong>{value}</strong>;\n  };\n\n  return (\n    <ThemeProvider theme={theme}>\n      <Box css={{ bg: ['red', 'blue', 'green', 'yellow', 'hotpink'] }}>\n        <SomeComponent />\n      </Box>\n    </ThemeProvider>\n  );\n};\n"})})]})}function h(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,r.ah)(),e.components),s=n.wrapper;return s?(0,o.jsx)(s,Object.assign({},e,{children:(0,o.jsx)(a,e)})):a(e)}}},function(e){e.O(0,[9774,2888,179],(function(){return n=6245,e(e.s=n);var n}));var n=e.O();_N_E=n}]);