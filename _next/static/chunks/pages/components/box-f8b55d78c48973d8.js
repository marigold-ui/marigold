(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1045],{968:function(e,n,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/box",function(){return o(8443)}])},8443:function(e,n,o){"use strict";o.r(n),o.d(n,{__N_SSG:function(){return s},title:function(){return i}});var t=o(5250),r=o(7160),s=!0,i="Box";function p(e){var n=Object.assign({p:"p",code:"code",h2:"h2",a:"a",h3:"h3",pre:"pre"},(0,r.ah)(),e.components),o=n.Toc,s=n.Preview,i=n.BasicBoxDemo,p=n.PropsTable,c=n.ButtonAsBoxDemo,l=n.BoxAsComponentDemo,h=n.CssPropBoxDemo;return i||a("BasicBoxDemo",!0),l||a("BoxAsComponentDemo",!0),c||a("ButtonAsBoxDemo",!0),h||a("CssPropBoxDemo",!0),s||a("Preview",!0),p||a("PropsTable",!0),o||a("Toc",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o,{selector:"#toc",items:'[{"anchor":"#usage","title":"Usage"},{"anchor":"#import","title":"Import"},{"anchor":"#props","title":"Props"},{"anchor":"#examples","title":"Examples"},{"anchor":"#polymorphic-component","title":"Polymorphic Component"},{"anchor":"#the-css-prop","title":"The CSS Prop"}]'}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"<Box>"})," component serves as the foundation of Marigold, acting as the bridge that connects the logic of components with their visual design. Through the use of ",(0,t.jsx)(n.code,{children:"<Box>"}),", theme-based values can be bound to components and utilized for styling. Every component in Marigold is composed of ",(0,t.jsx)(n.code,{children:"<Box>"})," components."]}),"\n",(0,t.jsx)(n.p,{children:"Ideally, you should not need this component frequently, unless you are building a design system component or a custom component that is specific to your app and you want to use the design tokens."}),"\n",(0,t.jsx)(s,{children:(0,t.jsx)(i,{})}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:(0,t.jsx)(n.a,{href:"#usage",children:"Usage"})}),"\n",(0,t.jsx)(n.h3,{id:"import",children:(0,t.jsx)(n.a,{href:"#import",children:"Import"})}),"\n",(0,t.jsx)(n.p,{children:"To import the component you just have to use this code below."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import { Box } from '@marigold/components';\n"})}),"\n",(0,t.jsx)(n.h3,{id:"props",children:(0,t.jsx)(n.a,{href:"#props",children:"Props"})}),"\n",(0,t.jsx)(p,{props:[{property:"as",type:"HTMLElement | MarigoldComponent",description:"Behaves like a HTMLElement or a Marigold component if used.",default:"div"},{property:"css",type:"CSSObject | CSSObject",description:"Set CSS for the component.",default:""},{property:"...",type:"",description:"HTML attributes based on the rendered element.",default:""}]}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:(0,t.jsx)(n.a,{href:"#examples",children:"Examples"})}),"\n",(0,t.jsx)(n.h3,{id:"polymorphic-component",children:(0,t.jsx)(n.a,{href:"#polymorphic-component",children:"Polymorphic Component"})}),"\n",(0,t.jsxs)(n.p,{children:["When using the ",(0,t.jsx)(n.code,{children:"<Box>"})," component, it will render a div element by default. However, you have the option to customize this by using the ",(0,t.jsx)(n.code,{children:"as"})," prop. All regular HTML props will be forwarded to the underlying element. Typescript will ensure that only correct HTML attributes are used by limiting the props based on the ",(0,t.jsx)(n.code,{children:"as"})," prop. This polymorphic type inference will work not only with HTML elements, but also with any React component."]}),"\n",(0,t.jsxs)(n.p,{children:["Using the ",(0,t.jsx)(n.code,{children:"<Box>"})," element to render an element will also apply CSS normalization, ensuring that the element is displayed consistently across all browsers."]}),"\n",(0,t.jsx)(s,{children:(0,t.jsx)(c,{})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import { Center } from '@marigold/components';\nimport { Box } from '@marigold/system';\n\nexport const ButtonAsBoxDemo = () => (\n  <Center>\n    <Box as=\"button\">I am a button!</Box>\n  </Center>\n);\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Passing another React component to the ",(0,t.jsx)(n.code,{children:"<Box>"})," component can help with styling and integrating third-party components seamlessly into the design system. To achieve this, you can pass the third-party component into the ",(0,t.jsx)(n.code,{children:"as"})," prop (ensure that it forwards the ",(0,t.jsx)(n.code,{children:"className"}),"). By defining styles in the css prop, these styles will apply to the third-party component. The ",(0,t.jsx)(n.code,{children:"<Box>"})," component will inherit props from the third-party component in addition to its own props."]}),"\n",(0,t.jsx)(s,{children:(0,t.jsx)(l,{})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import { ReactNode } from 'react';\nimport { Box } from '@marigold/system';\nimport { Center } from '@marigold/components';\n\nexport const BoxAsComponentDemo = () => {\n  /**\n   * Image this is the <Link> component from a lib\n   * like `react-router`.\n   */\n  const RouterLink = ({\n    to,\n    children,\n    ...props\n  }: {\n    to: string;\n    children: ReactNode;\n    className?: string;\n  }) => (\n    <a href={to} {...props}>\n      {children}\n    </a>\n  );\n\n  return (\n    <Center>\n      <Box\n        css={{ '&:hover': { color: '#fa8005' } }}\n        as={RouterLink}\n        to=\"https://karriere.reservix.net/\"\n      >\n        Reservix\n      </Box>\n    </Center>\n  );\n};\n"})}),"\n",(0,t.jsx)(n.h3,{id:"the-css-prop",children:(0,t.jsx)(n.a,{href:"#the-css-prop",children:"The CSS Prop"})}),"\n",(0,t.jsx)(n.p,{children:"Arbitrary styles can be applied to the underlying element via the css prop. All CSS rules are supported. Values for the rules are extended with the design tokens from the theme. When a design token is used the corresponding value will be applied."}),"\n",(0,t.jsx)(s,{children:(0,t.jsx)(h,{})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import { Box, Center } from '@marigold/components';\nimport { keyframes } from '@marigold/system';\n\nexport const CssPropBoxDemo = () => {\n  const shiny = keyframes({\n    '0%': { WebkitTransform: 'scale(0) rotate(45deg)', opacity: 0 },\n    '80%': { WebkitTransform: 'scale(0) rotate(45deg)', opacity: 0.5 },\n    '81%': { WebkitTransform: 'scale(4) rotate(45deg)', opacity: 1 },\n    '100%': { WebkitTransform: 'scale(50) rotate(45deg)', opacity: 0 },\n  });\n  return (\n    <Center>\n      <Box\n        as=\"button\"\n        css={{\n          display: 'inline-block',\n          position: 'relative',\n          px: 24,\n          py: 12,\n          color: '#fff',\n          borderRadius: 5,\n          fontSize: 16,\n          fontWeight: 700,\n          cursor: 'pointer',\n          transition: 'all 0.3s ease',\n          boxShadow:\n            'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',\n          outline: 'none',\n\n          border: 'none',\n          background:\n            'linear-gradient(0deg, rgba(251,33,117,1) 0%, rgba(234,76,137,1) 100%)',\n          overflow: 'hidden',\n\n          '&:before': {\n            position: 'absolute',\n            content: \"''\",\n            display: 'inline-block',\n            top: '-180px',\n            left: '0',\n            width: '30px',\n            height: '100%',\n            backgroundColor: '#fff',\n            animation: `${shiny} 3s ease-in-out infinite`,\n          },\n\n          '&:hover': { color: '#fff', opacity: 0.7 },\n          '&:active': {\n            boxShadow:\n              '4px 4px 6px 0 rgba(255,255,255,.3), -4px -4px 6px 0 rgba(116, 125, 136, .2), inset -4px -4px 6px 0 rgba(255,255,255,.2), inset 4px 4px 6px 0 rgba(0, 0, 0, .2)',\n          },\n        }}\n      >\n        Hover Me\n      </Box>\n    </Center>\n  );\n};\n"})})]})}function a(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,r.ah)(),e.components),o=n.wrapper;return o?(0,t.jsx)(o,Object.assign({},e,{children:(0,t.jsx)(p,e)})):p(e)}}},function(e){e.O(0,[9774,2888,179],(function(){return n=968,e(e.s=n);var n}));var n=e.O();_N_E=n}]);