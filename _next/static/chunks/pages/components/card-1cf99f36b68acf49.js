(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6332],{1866:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/card",function(){return t(6415)}])},6415:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return a},title:function(){return i}});var r=t(5250),o=t(8570),a=!0;let i="Card";function s(e){let n=Object.assign({p:"p",code:"code",h2:"h2",a:"a",h3:"h3",pre:"pre"},(0,o.ah)(),e.components),{Toc:t,Preview:a,CardDemo:s,AppearanceTable:l,PropsTable:p,CardFieldDemo:c,CardInformations:h}=n;return l||d("AppearanceTable",!0),s||d("CardDemo",!0),c||d("CardFieldDemo",!0),h||d("CardInformations",!0),a||d("Preview",!0),p||d("PropsTable",!0),t||d("Toc",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t,{selector:"#toc",items:'[{"anchor":"#usage","title":"Usage"},{"anchor":"#import","title":"Import"},{"anchor":"#appearance","title":"Appearance"},{"anchor":"#props","title":"Props"},{"anchor":"#examples","title":"Examples"},{"anchor":"#card-with-form-fields","title":"Card with form fields"},{"anchor":"#card-with-some-text","title":"Card with some Text"}]'}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"<Card>"})," is a content component to group informations inside the UI, as well it provides a better readability and helps the user to find relevant informations in an easy way."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"<Card>"})," components usually contain images, text, links or action components like buttons."]}),"\n",(0,r.jsxs)(n.p,{children:["If you want, you can style the ",(0,r.jsx)(n.code,{children:"<Card>"})," and create custom variants and sizes."]}),"\n",(0,r.jsx)(a,{children:(0,r.jsx)(s,{})}),"\n",(0,r.jsx)(n.h2,{id:"usage",children:(0,r.jsx)(n.a,{href:"#usage",children:"Usage"})}),"\n",(0,r.jsx)(n.h3,{id:"import",children:(0,r.jsx)(n.a,{href:"#import",children:"Import"})}),"\n",(0,r.jsx)(n.p,{children:"To import the component you just have to use this code below."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"import { Card } from '@marigold/components';\n"})}),"\n",(0,r.jsx)(n.h3,{id:"appearance",children:(0,r.jsx)(n.a,{href:"#appearance",children:"Appearance"})}),"\n",(0,r.jsx)(l,{component:i}),"\n",(0,r.jsx)(n.h3,{id:"props",children:(0,r.jsx)(n.a,{href:"#props",children:"Props"})}),"\n",(0,r.jsx)(p,{props:[{property:"p",type:"ResponsiveStyleValue<number⎮string>",description:"Padding of the component.",default:"none"},{property:"px",type:"ResponsiveStyleValue<number⎮string>",description:"Padding horizontal (left and right) of the component.",default:"none"},{property:"py",type:"ResponsiveStyleValue<number⎮string>",description:"Padding vertical (top and bottom) of the component.",default:"none"},{property:"pt",type:"ResponsiveStyleValue<number⎮string>",description:"Padding top of the component.",default:"none"},{property:"pr",type:"ResponsiveStyleValue<number⎮string>",description:"Padding right of the component.",default:"none"},{property:"pl",type:"ResponsiveStyleValue<number⎮string>",description:"Padding left of the component.",default:"none"},{property:"pb",type:"ResponsiveStyleValue<number⎮string>",description:"Padding bottom of the component.",default:"none"}]}),"\n",(0,r.jsx)(n.h2,{id:"examples",children:(0,r.jsx)(n.a,{href:"#examples",children:"Examples"})}),"\n",(0,r.jsx)(n.h3,{id:"card-with-form-fields",children:(0,r.jsx)(n.a,{href:"#card-with-form-fields",children:"Card with form fields"})}),"\n",(0,r.jsxs)(n.p,{children:["The Example shows how to use the ",(0,r.jsx)(n.code,{children:"<Card>"})," in a common use case with form fields."]}),"\n",(0,r.jsx)(a,{children:(0,r.jsx)(c,{})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'import {\n  Button,\n  Card,\n  Headline,\n  Stack,\n  Split,\n  TextField,\n} from \'@marigold/components\';\n\nexport const CardFieldDemo = () => (\n  <Card>\n    <Stack space="medium">\n      <Headline level="3">Personal Settings</Headline>\n      <TextField label="Firstname" />\n      <TextField label="Lastname" />\n      <Split />\n      <Button variant="primary">Save</Button>\n    </Stack>\n  </Card>\n);\n'})}),"\n",(0,r.jsx)(n.h3,{id:"card-with-some-text",children:(0,r.jsx)(n.a,{href:"#card-with-some-text",children:"Card with some Text"})}),"\n",(0,r.jsxs)(n.p,{children:["On this example you can see an imformation card with used prop ",(0,r.jsx)(n.code,{children:"p"}),"."]}),"\n",(0,r.jsx)(a,{children:(0,r.jsx)(h,{})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'import { Card, Link, Headline, Stack, Text } from \'@marigold/components\';\n\nexport const CardInformations = () => (\n  <Card p="large">\n    <Stack space="small">\n      <Headline level="3">Professor Severus Snape</Headline>\n      <Text>\n        <strong>Professor Severus Snape</strong> (9 January, 1960[1] - 2 May,\n        1998)[2] was an English half-blood[3] wizard serving as Potions Master\n        (1981-1996), Head of Slytherin House (1981-1997), Defence Against the\n        Dark Arts professor (1996-1997), and Headmaster (1997-1998) of the\n        Hogwarts School of Witchcraft and Wizardry as well as a member of the\n        Order of the Phoenix and a Death Eater. His double life played an\n        extremely important role in both of the Wizarding Wars against\n        Voldemort.\n      </Text>\n      <Link\n        href="https://harrypotter.fandom.com/wiki/Severus_Snape"\n        target="blank"\n      >\n        Source\n      </Link>\n    </Stack>\n  </Card>\n);\n'})})]})}function d(e,n){throw Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}n.default=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:n}=Object.assign({},(0,o.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(s,e)})):s(e)}}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=1866)}),_N_E=e.O()}]);