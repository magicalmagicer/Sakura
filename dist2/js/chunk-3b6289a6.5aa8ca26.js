(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b6289a6"],{"1a93":function(e,t,n){},"1d95":function(e,t,n){"use strict";n("1a93")},9588:function(e,t,n){},ab08:function(e,t,n){},bb51:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"w"},[n("el-menu",{directives:[{name:"show",rawName:"v-show",value:e.editorFullScreen,expression:"editorFullScreen"}],staticClass:"header-container",attrs:{id:"header","default-active":e.$route.path,mode:"horizontal","active-text-color":"rgb(219, 165, 183)",router:""}},[n("el-menu-item",{attrs:{index:"/index"}},[e._v("首页")]),n("el-menu-item",{attrs:{index:"/music"}},[e._v("听歌")]),n("el-menu-item",{attrs:{index:"/write"}},[e._v("写文章")]),n("el-menu-item",{attrs:{index:"/about"}},[e._v("关于我")]),n("el-menu-item",[n("el-dropdown",{attrs:{trigger:"hover",szie:"mini"}},[n("span",[n("img",{staticClass:"user",attrs:{src:e.userAvatar?e.userAvatar:e.userImg}})]),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{index:"/myworld"},nativeOn:{click:function(t){return e.toMyWorld.apply(null,arguments)}}},[e._v("个人中心")]),n("el-dropdown-item",{nativeOn:{click:function(t){return e.exit.apply(null,arguments)}}},[e._v("退出")])],1)],1)],1)],1),"/about"!=e.$route.path?n("banner"):e._e(),n("el-container",[n("router-view")],1),n("div",{staticClass:"footerBar"},[n("FooterBar")],1),n("Footer")],1)},a=[],i=n("a34a"),o=n.n(i),s=n("bc1b"),c=n.n(s),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"footer"},[n("span",{staticClass:"scroll"}),n("el-divider"),n("span",[e._v("法律声明")]),n("el-divider",{attrs:{direction:"vertical"}}),n("span",[e._v("友情链接")]),n("el-divider",{attrs:{direction:"vertical"}}),n("span",{on:{click:function(t){e.drawer=!0}}},[e._v("联系我")]),n("br"),n("br"),e._m(0),n("el-drawer",{attrs:{title:"联系我",visible:e.drawer,direction:"btt",modal:!1,size:"7%"},on:{"update:visible":function(t){e.drawer=t}}},[n("p",{staticClass:"info"},[n("i",{staticClass:"el-icon-phone"}),e._v("电话：151****0055"),n("br"),n("i",{staticClass:"el-icon-message"}),e._v("邮箱：miaolf19@lzu.edu.cn"),n("br")])])],1)},u=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"copyright"},[n("b",[e._v("版权所有")]),e._v(" 水煮今生")])}],d={data:function(){return{drawer:!1}}},v=d,m=(n("ed3a"),n("2877")),f=Object(m["a"])(v,l,u,!1,null,"7d437e5a",null),p=f.exports,h=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},w=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"header"},[n("div",{staticClass:"banner wow zoomIn"})])}],b=(n("bf41"),{}),g=Object(m["a"])(b,h,w,!1,null,null,null),_=g.exports,x=n("a78e"),$=n.n(x),y=n("5c64");function C(e,t,n,r,a,i,o){try{var s=e[i](o),c=s.value}catch(l){return void n(l)}s.done?t(c):Promise.resolve(c).then(r,a)}function S(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function o(e){C(i,r,a,o,s,"next",e)}function s(e){C(i,r,a,o,s,"throw",e)}o(void 0)}))}}var k={components:{Footer:p,banner:_,FooterBar:y["a"]},computed:{editorFullScreen:function(){return!this.$store.state.fullScreen}},created:function(){this.getUserAvatar()},data:function(){return{userAvatar:"",userImg:n("c121"),activeIndex:"/",username:$.a.get("username"),oldScrollTop:0}},beforeRouteUpdate:function(e,t,n){var r=this;return S(o.a.mark((function t(){var a,i;return o.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("/write"!=e.path){t.next=8;break}return t.next=3,r.$http.get(r.$originUrl+"/my/power",{params:{id:$.a.get("user_id")}});case 3:a=t.sent,i=a.data,i.data.power?n():r.$message.info("您的无权限进入该页面！"),t.next=9;break;case 8:n();case 9:case"end":return t.stop()}}),t)})))()},methods:{exit:function(){$.a.remove("token"),$.a.remove("username"),sessionStorage.clear(),this.$router.push({path:"/log"}),this.$store.commit("changIsSignIn",0)},getUserAvatar:function(){var e=this;return S(o.a.mark((function t(){var n,r;return o.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get(e.$originUrl+"/my/userinfo",{params:{id:$.a.get("user_id")}});case 2:n=t.sent,r=n.data,e.userAvatar=r.data.avatar;case 5:case"end":return t.stop()}}),t)})))()},toMyWorld:function(){this.$router.push("/myworld/"+$.a.get("user_id"))},handleSelect:function(e,t){"/log"===e&&this.exit()},handleScroll:function(){var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,t=document.getElementById("header"),n=e-this.oldScrollTop;this.oldScrollTop=e,n>0?t.getAttribute("class").includes("not-top")||(t.className="header-container not-top"):t.className="header-container"}},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll,!1)},mounted:function(){var e=new c.a.WOW({boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!1});e.init(),window.addEventListener("scroll",this.handleScroll,!1)}},E=k,A=(n("1d95"),Object(m["a"])(E,r,a,!1,null,"76df4598",null));t["default"]=A.exports},bf41:function(e,t,n){"use strict";n("ab08")},c121:function(e,t,n){e.exports=n.p+"img/user.9608a2c4.png"},ed3a:function(e,t,n){"use strict";n("9588")}}]);