"use strict";(self.webpackChunkbanana=self.webpackChunkbanana||[]).push([[74],{62900:function(Oe,M,r){r.d(M,{Z:function(){return B}});var L=r(52319),I=r(79685),l={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"},R=l,W=r(53582),z=function(k,P){return I.createElement(W.Z,(0,L.Z)({},k,{ref:P,icon:R}))},B=I.forwardRef(z)},52641:function(Oe,M,r){r.d(M,{Z:function(){return he}});var L=r(40749),I=r(87841),l=r(79685),R=r(82187),W=r.n(R),z=r(97520),B=r(39738),_=r(78917),k=r(15458),P=r(78289),ee=r(50304);const ue=d=>{const{componentCls:p,colorText:g,fontSize:c,lineHeight:N,fontFamily:H}=d;return{[p]:{color:g,fontSize:c,lineHeight:N,fontFamily:H}}},pe=()=>({});var me=(0,ee.I$)("App",ue,pe);const V=()=>l.useContext(P.Z),ne=d=>{const{prefixCls:p,children:g,className:c,rootClassName:N,message:H,notification:oe,style:re,component:J="div"}=d,{getPrefixCls:ae}=(0,l.useContext)(z.E_),K=ae("app",p),[Ce,h,se]=me(K),Z=W()(h,K,c,N,se),E=(0,l.useContext)(P.J),A=l.useMemo(()=>({message:Object.assign(Object.assign({},E.message),H),notification:Object.assign(Object.assign({},E.notification),oe)}),[H,oe,E.message,E.notification]),[G,le]=(0,B.Z)(A.message),[Y,ie]=(0,k.Z)(A.notification),[q,ce]=(0,_.Z)(),de=l.useMemo(()=>({message:G,notification:Y,modal:q}),[G,Y,q]),ge=J===!1?l.Fragment:J,ye={className:Z,style:re};return Ce(l.createElement(P.Z.Provider,{value:de},l.createElement(P.J.Provider,{value:A},l.createElement(ge,Object.assign({},J===!1?void 0:ye),ce,le,ie,g))))};ne.useApp=V;var Q=ne,U=r(70222),X=r(63342),ve=["children"];function fe(d,p){var g=Object.keys(d);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(d);p&&(c=c.filter(function(N){return Object.getOwnPropertyDescriptor(d,N).enumerable})),g.push.apply(g,c)}return g}function te(d){for(var p=1;p<arguments.length;p++){var g=arguments[p]!=null?arguments[p]:{};p%2?fe(Object(g),!0).forEach(function(c){(0,L.Z)(d,c,g[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(d,Object.getOwnPropertyDescriptors(g)):fe(Object(g)).forEach(function(c){Object.defineProperty(d,c,Object.getOwnPropertyDescriptor(g,c))})}return d}var he=function(d){var p=d.children,g=(0,I.Z)(d,ve);return(0,X.jsx)(U.f,te(te({},g),{},{children:(0,X.jsx)(Q,{children:p})}))}},67855:function(Oe,M,r){r.d(M,{Z:function(){return He}});var L=r(40749),I=r(62900),l=r(79685),R=r(77686),W=r(82187),z=r.n(W),B=r(59872),_=r(59164),k=r(75861),P=r(97520),ee=r(23565),ue=r(99978),pe=r(42556),me=r(61510),V=r(50304);const ne=e=>{const{paddingXXS:t,lineWidth:n,tagPaddingHorizontal:o,componentCls:a,calc:s}=e,i=s(o).sub(n).equal(),C=s(t).sub(n).equal();return{[a]:Object.assign(Object.assign({},(0,pe.Wf)(e)),{display:"inline-block",height:"auto",marginInlineEnd:e.marginXS,paddingInline:i,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",background:e.defaultBg,border:`${(0,ee.bf)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${a}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${a}-close-icon`]:{marginInlineStart:C,fontSize:e.tagIconSize,color:e.colorTextDescription,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},[`&${a}-has-color`]:{borderColor:"transparent",[`&, a, a:hover, ${e.iconCls}-close, ${e.iconCls}-close:hover`]:{color:e.colorTextLightSolid}},["&-checkable"]:{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${a}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive}},["&-hidden"]:{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:i}}),[`${a}-borderless`]:{borderColor:"transparent",background:e.tagBorderlessBg}}},Q=e=>{const{lineWidth:t,fontSizeIcon:n,calc:o}=e,a=e.fontSizeSM;return(0,me.TS)(e,{tagFontSize:a,tagLineHeight:(0,ee.bf)(o(e.lineHeightSM).mul(a).equal()),tagIconSize:o(n).sub(o(t).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.colorFillTertiary})},U=e=>({defaultBg:new ue.C(e.colorFillQuaternary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText});var X=(0,V.I$)("Tag",e=>{const t=Q(e);return ne(t)},U),ve=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n},te=l.forwardRef((e,t)=>{const{prefixCls:n,style:o,className:a,checked:s,onChange:i,onClick:C}=e,u=ve(e,["prefixCls","style","className","checked","onChange","onClick"]),{getPrefixCls:v,tag:b}=l.useContext(P.E_),S=w=>{i==null||i(!s),C==null||C(w)},x=v("tag",n),[y,f,$]=X(x),O=z()(x,`${x}-checkable`,{[`${x}-checkable-checked`]:s},b==null?void 0:b.className,a,f,$);return y(l.createElement("span",Object.assign({},u,{ref:t,style:Object.assign(Object.assign({},o),b==null?void 0:b.style),className:O,onClick:S})))}),he=r(62439);const d=e=>(0,he.Z)(e,(t,n)=>{let{textColor:o,lightBorderColor:a,lightColor:s,darkColor:i}=n;return{[`${e.componentCls}${e.componentCls}-${t}`]:{color:o,background:s,borderColor:a,"&-inverse":{color:e.colorTextLightSolid,background:i,borderColor:i},[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}});var p=(0,V.bk)(["Tag","preset"],e=>{const t=Q(e);return d(t)},U);function g(e){return typeof e!="string"?e:e.charAt(0).toUpperCase()+e.slice(1)}const c=(e,t,n)=>{const o=g(n);return{[`${e.componentCls}${e.componentCls}-${t}`]:{color:e[`color${n}`],background:e[`color${o}Bg`],borderColor:e[`color${o}Border`],[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}};var N=(0,V.bk)(["Tag","status"],e=>{const t=Q(e);return[c(t,"success","Success"),c(t,"processing","Info"),c(t,"error","Error"),c(t,"warning","Warning")]},U),H=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]]);return n};const oe=(e,t)=>{const{prefixCls:n,className:o,rootClassName:a,style:s,children:i,icon:C,color:u,onClose:v,closeIcon:b,closable:S,bordered:x=!0}=e,y=H(e,["prefixCls","className","rootClassName","style","children","icon","color","onClose","closeIcon","closable","bordered"]),{getPrefixCls:f,direction:$,tag:O}=l.useContext(P.E_),[w,T]=l.useState(!0);l.useEffect(()=>{"visible"in y&&T(y.visible)},[y.visible]);const be=(0,B.o2)(u),D=(0,B.yT)(u),xe=be||D,Ae=Object.assign(Object.assign({backgroundColor:u&&!xe?u:void 0},O==null?void 0:O.style),s),j=f("tag",n),[De,Fe,Me]=X(j),Le=z()(j,O==null?void 0:O.className,{[`${j}-${u}`]:xe,[`${j}-has-color`]:u&&!xe,[`${j}-hidden`]:!w,[`${j}-rtl`]:$==="rtl",[`${j}-borderless`]:!x},o,a,Fe,Me),Te=F=>{F.stopPropagation(),v==null||v(F),!F.defaultPrevented&&T(!1)},[,Re]=(0,_.Z)(S,b,F=>F===null?l.createElement(R.Z,{className:`${j}-close-icon`,onClick:Te}):l.createElement("span",{className:`${j}-close-icon`,onClick:Te},F),null,!1),We=typeof y.onClick=="function"||i&&i.type==="a",$e=C||null,ke=$e?l.createElement(l.Fragment,null,$e,i&&l.createElement("span",null,i)):i,Ne=l.createElement("span",Object.assign({},y,{ref:t,className:Le,style:Ae}),ke,Re,be&&l.createElement(p,{key:"preset",prefixCls:j}),D&&l.createElement(N,{key:"status",prefixCls:j}));return De(We?l.createElement(k.Z,{component:"Tag"},Ne):Ne)},re=l.forwardRef(oe);re.CheckableTag=te;var J=re,ae=r(60204),K=r(81057),Ce=r(24819),h=r(16759),se=r(45910),Z=r(97980),E,A,G,le,Y,ie,q,ce,de,ge,ye=(0,se.kc)(function(e,t){var n=e.token,o=e.prefixCls,a=e.responsive,s=e.css,i=e.stylish,C=e.isDarkMode,u=e.cx,v=t.rowNum,b=t.hasLink,S="".concat(o,"-features"),x="".concat(S,"-cover"),y="".concat(S,"-description"),f="".concat(S,"-title"),$="".concat(S,"-img"),O=20,w=function(D){return s(E||(E=(0,h.Z)([`
      width: `,`px;
      height: `,`px;
      font-size: `,`px;
    `])),D,D,D*(22/24))},T=s(A||(A=(0,h.Z)([`
      transition: all `," ",`;
    `])),n.motionDurationSlow,n.motionEaseInOutCirc);return{cell:s(G||(G=(0,h.Z)([`
        overflow: hidden;
      `]))),container:s(le||(le=(0,h.Z)([`
        `,`;

        z-index: 1;
        padding: 24px;
        border-radius: 24px;

        background: linear-gradient(
          135deg,
          `,`,
          `,`
        );

        position: relative;

        &:hover {
          scale: 1.03;

          background: linear-gradient(
            135deg,
            `,`,
            `,`
          );

          box-shadow: inset 0 0 0 1px `,", ",`;

          .`,` {
            height: `,`px;
            width: 100%;
            padding: 0;
          }

          .`,` {
            `,`;
          }

          .`,` {
            position: absolute;
            visibility: hidden;
            opacity: 0;
          }

          .`,` {
            font-size: `,`px;
          }
        }
      `])),T,n.colorFillContent,n.colorFillQuaternary,(0,Z.$n)(.5,n.colorFillContent),(0,Z.$n)(.5,n.colorFillQuaternary),n.colorBorder,n.boxShadowSecondary,x,O*v,$,w(100),y,f,b?14:20),title:u(f,T,s(Y||(Y=(0,h.Z)([`
          pointer-events: none;
          font-size: 20px;
          line-height: `,`;
          margin: 16px 0;
          color: `,`;
        `])),n.lineHeightHeading3,n.colorText)),desc:u(y,T,s(ie||(ie=(0,h.Z)([`
          color: `,`;

          pointer-events: none;
          quotient {
            color: `,`;
            display: block;
            margin: 12px 0;
            padding-left: 12px;
            position: relative;
            &:before {
              position: absolute;
              content: '';
              left: 0;
              display: block;
              border-radius: 2px;
              width: 4px;
              height: 100%;
              background: `,`;
            }
          }
        `])),n.colorTextSecondary,n.colorTextDescription,C?n.colorPrimary:n.colorPrimaryBgHover)),imgContainer:u(x,T,s(q||(q=(0,h.Z)([`
          background: `,`;
          border-radius: 8px;
          opacity: 0.8;

          `,`;
          padding: 4px;

          &[image-style='primary'] {
            background: linear-gradient(135deg, `,", ",`);
          }

          &[image-style='light'] {
            background: `,`;
          }

          &[image-style='soon'] {
            opacity: 0.5;
            background: linear-gradient(
              135deg,
              `,`,
              `,` 50%,
              `,`
            );
          }
        `])),n.colorFillContent,w(24),n.gradientColor1,n.gradientColor2,n.colorBgContainer,(0,Z.m4)(n.gradientColor2,.3),(0,Z.m4)(n.gradientColor2,.3),(0,Z.m4)(n.gradientColor1,.3))),img:u($,T,s(ce||(ce=(0,h.Z)([`
          `,`;
          color: `,`;
        `])),w(20),n.colorWhite)),link:s(de||(de=(0,h.Z)([`
        `,`;

        margin-top: 24px;

        a {
          `,`;

          color: `,`;
          &:hover {
            color: `,`;
          }
        }
      `])),T,i.resetLinkColor,n.colorTextDescription,n.colorPrimaryHover),blur:s(ge||(ge=(0,h.Z)([`
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        `,`;
        scale: 2;
        opacity: `,`;
        `,` {
          display: none;
        }
      `])),i.heroBlurBall,C?.05:.08,a.mobile)}}),m=r(63342),Ze=function(t){var n=t.image,o=t.className,a=t.title,s=/(\.png|\.jpg|\.jpeg|\.gif|\.svg|\.webp)$/;return n.startsWith("http")||s.test(n)?(0,m.jsx)("img",{className:o,src:n,alt:a}):(0,m.jsx)(K.Z,{className:o,children:n})},Ee=function(t){var n=t.imageType,o=t.row,a=t.column,s=t.hero,i=t.description,C=t.image,u=t.title,v=t.link,b=t.imageStyle,S=t.openExternal,x=o||7,y=ye({rowNum:x,hasLink:!!v}),f=y.styles,$=y.theme;return(0,m.jsxs)("div",{className:f.container,style:{gridRow:"span ".concat(x),gridColumn:"span ".concat(a||1),cursor:v?"pointer":"default"},onClick:function(){v&&(S?window.open(v):ae.m8.push(v))},children:[(0,m.jsxs)("div",{className:f.cell,children:[C&&(0,m.jsx)(K.Z,{"image-style":n,className:f.imgContainer,style:b,children:(0,m.jsx)(Ze,{className:f.img,image:C,title:u})}),u&&(0,m.jsxs)(Ce.D,{as:"h3",horizontal:!0,gap:8,align:"center",className:f.title,children:[u,n==="soon"?(0,m.jsx)(J,{color:$.isDarkMode?"pink-inverse":"cyan-inverse",children:"SOON"}):null]}),i&&(0,m.jsx)("p",{dangerouslySetInnerHTML:{__html:i},className:f.desc}),v&&(0,m.jsx)("div",{className:f.link,children:(0,m.jsxs)(ae.rU,{to:v,children:["\u7ACB\u5373\u4E86\u89E3 ",(0,m.jsx)(I.Z,{})]})})]}),s&&(0,m.jsx)("div",{className:f.blur})]})},we=Ee,je,Se,Ie=(0,se.kc)(function(e){var t=e.token,n=e.prefixCls,o=e.responsive,a=e.css,s=e.cx,i="".concat(n,"-features");return{container:s(i,a(je||(je=(0,h.Z)([`
        max-width: `,`px;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: row dense;
        grid-auto-rows: 24px;
        gap: 16px;

        `,`
      `])),t.contentMaxWidth,o({mobile:a(Se||(Se=(0,h.Z)([`
            flex-direction: column;
            display: flex;
          `]))),laptop:{gridTemplateColumns:"repeat(2, 1fr)"}})))}});function Pe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,o)}return n}function ze(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Pe(Object(n),!0).forEach(function(o){(0,L.Z)(e,o,n[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Pe(Object(n)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o))})}return e}var Be=function(t){var n=t.items,o=t.style,a=Ie(),s=a.styles;return n!=null&&n.length?(0,m.jsx)("div",{className:s.container,style:o,children:n.map(function(i){return(0,m.jsx)(we,ze({},i),i.title)})}):null},He=Be}}]);
