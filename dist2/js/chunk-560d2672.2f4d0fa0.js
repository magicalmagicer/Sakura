(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-560d2672"],{"0b68":function(t,e,r){},1e3:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"main"},[r("div",{staticClass:"left"},[r("article-contents",{attrs:{id:"article",data:t.data,"v-loading":t.loading,likeCount:t.likeCount}}),r("comment",{attrs:{article_id:t.id,author_id:t.data.author_id,id:"comment"}})],1)])},a=[],i=r("a34a"),o=r.n(i),s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"contents"},[r("div",{staticClass:"articleBody"},[r("div",{staticClass:"header"},[r("h1",[t._v(t._s(t.data.title))]),r("div",{staticClass:"info"},[r("span",{staticClass:"el-icon-time"},[t._v(" 发表时间:"+t._s(t._f("timer")(t.data.time))+" ")]),r("span",{staticClass:"el-icon-view"},[t._v(" 阅读 ("+t._s(t.data.visited_count)+")")]),r("span",{staticClass:"icon el-icon-thumb"},[t._v(" 点赞 ("+t._s(t.likeCount)+")")]),r("span",{staticClass:"icon el-icon-edit"},[t._v(" 作者: "),r("span",{staticClass:"black"},[t._v(t._s(t.data.nickname?t.data.nickname:t.data.username))])])]),r("el-button",{staticClass:"back",attrs:{type:"text",size:"mini"},on:{click:t.backward}},[t._v("<返回")]),t.myArticle?r("el-button",{staticClass:"edit",attrs:{type:"text",size:"mini"},on:{click:t.toEditor}},[t._v("感觉不满意？再改改吧")]):t._e()],1),r("div",{staticClass:"body"},[r("mavon-editor",{attrs:{defaultOpen:"preview",toolbarsFlag:!1,subfield:!1,codeStyle:"atom-one-dark",boxShadow:!1},model:{value:t.data.content,callback:function(e){t.$set(t.data,"content",e)},expression:"data.content"}})],1)])])},c=[],u={created:function(){},props:["data","loading","likeCount"],filters:{timer:function(t){return null!=t?t.substring(0,10):""}},computed:{myArticle:function(){return this.data.author_id==this.$store.state.id}},data:function(){return{navTree:[]}},methods:{toEditor:function(){this.$router.push("/write/"+this.$route.params.id)},backward:function(){this.$router.go(-1)}}},l=u,d=(r("1a40"),r("2877")),f=Object(d["a"])(l,s,c,!1,null,null,null),h=f.exports,p=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"commentTitle"},[r("p",[t._v("留下你的足迹吧~")]),r("div",{staticClass:"praise el-icon-star-off",on:{click:t.praise}},[t._v("觉得不错？点个赞吧")])]),r("div",{staticClass:"commentAction"},[r("div",{staticClass:"reply"},[r("el-input",{attrs:{type:"textarea",autosize:"",placeholder:"写下你的评论....."},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}}),r("el-button",{staticClass:"submit",on:{click:function(e){return t.SendComment()}}},[t._v("提交")])],1),0==t.isEmpty?r("ul",t._l(t.commentArray,(function(e,n){return r("li",{key:n,staticClass:"commentItem"},[r("div",{staticClass:"content"},[r("div",{staticClass:"info"},[r("div",{staticClass:"name"},[r("div",{staticClass:"information"},[r("el-avatar",{staticClass:"user",attrs:{src:e.avatar?e.avatar:"#",icon:e.avatar?"":"el-icon-user-solid"}}),t._v(" "+t._s(e.nickname?e.nickname:e.username)+" ")],1),r("div",{staticClass:"time"},[t._v(t._s(t._f("changeShow")(e.time)))])])]),r("div",{staticClass:"detail"},[t._v(t._s(e.content))]),r("div",{staticClass:"button"},[r("el-input",{directives:[{name:"show",rawName:"v-show",value:t.showReplyBox==e.comment_id,expression:"showReplyBox == item.comment_id"}],ref:"iptRef",refInFor:!0,attrs:{clearable:"",width:"200px",size:"small",placeholder:"回复 @"+(e.nickname?e.nickname:e.username)},on:{blur:function(e){t.showReplyBox=0}},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&t._k(r.keyCode,"enter",13,r.key,"Enter")?null:t.replyToComment(e.comment_id,e.from_id)}},model:{value:t.reply,callback:function(e){t.reply=e},expression:"reply"}}),r("el-button",{attrs:{type:"text el-icon-chat-dot-square",disabled:null!==e.reply||t.author_id!==t.visitor_id},on:{click:function(r){return t.showReplyIpt(e.comment_id,n)}}},[t._v("回复")]),r("el-button",{staticClass:"delete",attrs:{type:"text",disabled:t.author_id!==t.visitor_id},on:{click:function(r){return t.handleDelect(e.comment_id)}}},[t._v("删除")])],1)]),e.reply?r("div",{staticClass:"replyToComemnt content"},[r("div",{staticClass:"info"},[r("div",{staticClass:"time"},[t._v(t._s(t._f("changeShow")(e.reply_time)))])]),r("div",{staticClass:"details"},[t._v("作者回复："+t._s(e.reply))])]):t._e()])})),0):r("div",{staticClass:"emptyBox"},[r("p",[t._v("暂无评论，可惜~")])])])])},m=[],v=r("a78e"),y=r.n(v);function g(t,e,r,n,a,i,o){try{var s=t[i](o),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,a)}function w(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var i=t.apply(e,r);function o(t){g(i,n,a,o,s,"next",t)}function s(t){g(i,n,a,o,s,"throw",t)}o(void 0)}))}}var _={inject:["reload"],props:["article_id","author_id"],filters:{changeShow:function(t){if(t){var e=t.split("T");return e[0]+" "+e[1].substring(0,8)}return""}},data:function(){return{reply:"",textarea:"",commentArray:[],isEmpty:!1,username:y.a.get("username"),defaultImgUrl:"../assets/user.png",showReplyBox:0}},computed:{visitor_id:function(){return this.$store.state.id}},methods:{praise:function(){var t=this;return w(o.a.mark((function e(){var r,n,a,i;return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get(t.$originUrl+"/article/likeStatus",{params:{id:t.$route.params.id,liker_id:y.a.get("user_id")}});case 2:if(r=e.sent,n=r.data,!n.like_status){e.next=8;break}return e.abrupt("return",t.$message.info("已经为该文章点赞！"));case 8:return e.next=10,t.$http.get(t.$originUrl+"/article/like",{params:{id:t.$route.params.id,liker_id:y.a.get("user_id")}});case 10:if(a=e.sent,i=a.data,0!=i.status){e.next=17;break}return e.abrupt("return",t.$message.success("点赞成功！"));case 17:return e.abrupt("return",t.$message.warning("点赞失败！"));case 18:case"end":return e.stop()}}),e)})))()},showReplyIpt:function(t,e){var r=this;this.showReplyBox=t,this.$nextTick((function(){r.$refs.iptRef[e].focus()}))},replyToComment:function(t,e){var r=this;return w(o.a.mark((function n(){var a,i;return o.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,r.$http.post(r.$originUrl+"/article/replycomment",r.$qs.stringify({comment_id:t,content:r.reply,article_id:r.article_id,to_id:e}));case 2:if(a=n.sent,i=a.data,1!==i.status){n.next=6;break}return n.abrupt("return",r.$message.warning("回复评论失败！"));case 6:r.$message.success("回复评论成功！"),r.reply="",r.showReplyBox=0,r.GetArticleComment();case 10:case"end":return n.stop()}}),n)})))()},handleDelect:function(t){var e=this;this.$confirm("此操作将永久删除该评论, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(w(o.a.mark((function r(){var n,a;return o.a.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.$http.post(e.$originUrl+"/article/deletecomment",e.$qs.stringify({comment_id:t,visitor_id:e.visitor_id,article_id:e.article_id}));case 2:if(n=r.sent,a=n.data,0===a.status){r.next=6;break}return r.abrupt("return",e.$message.warning("删除评论失败！"));case 6:e.$message.success("删除评论成功！"),e.GetArticleComment();case 8:case"end":return r.stop()}}),r)})))).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},GetArticleComment:function(){var t=this;return w(o.a.mark((function e(){var r,n;return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.article_id){e.next=7;break}return e.next=3,t.$http.get(t.$originUrl+"/article/getcomment",{params:{article_id:t.article_id}});case 3:r=e.sent,n=r.data,t.commentArray=n.data,0==t.commentArray.length&&(t.isEmpty=!0);case 7:case"end":return e.stop()}}),e)})))()},SendComment:function(){var t=this;return w(o.a.mark((function e(){var r,n;return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!y.a.get("token")){e.next=14;break}if(""!=t.textarea){e.next=3;break}return e.abrupt("return",t.$message.warning("请写下评论再提交吧~"));case 3:return e.next=5,t.$http.post(t.$originUrl+"/article/comment",t.$qs.stringify({content:t.textarea,article_id:t.article_id,from_id:t.$store.state.id,to_id:t.author_id}));case 5:if(r=e.sent,n=r.data,1!==n.status){e.next=9;break}return e.abrupt("return",t.$message.warning("评论失败！"));case 9:t.$message.success("评论成功！"),setTimeout((function(){location.reload()}),700),t.textarea="",e.next=16;break;case 14:t.$message({message:"请登录后进行操作,即将跳转到登录页面",type:"warning"}),setTimeout((function(){t.$router.push({name:"Log"})}),2e3);case 16:case"end":return e.stop()}}),e)})))()}},created:function(){this.GetArticleComment()}},x=_,k=(r("5068"),Object(d["a"])(x,p,m,!1,null,null,null)),b=k.exports;function $(t,e,r,n,a,i,o){try{var s=t[i](o),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,a)}function C(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var i=t.apply(e,r);function o(t){$(i,n,a,o,s,"next",t)}function s(t){$(i,n,a,o,s,"throw",t)}o(void 0)}))}}var L={components:{articleContents:h,comment:b},provide:function(){return{reload:this.reload}},data:function(){return{id:this.$route.params.id,data:[],likeCount:0,changeStyle:!1,isClick:!0,loading:!0,catalog:[],catalogProps:{container:".left"}}},created:function(){this.GetArticleDetail(),this.getLikeStatus(),this.visit()},methods:{visit:function(){var t=this;return C(o.a.mark((function e(){var r;return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get(t.$originUrl+"/article/visit",{params:{id:t.$route.params.id}});case 2:r=e.sent,r.data;case 4:case"end":return e.stop()}}),e)})))()},getLikeStatus:function(){var t=this;return C(o.a.mark((function e(){var r,n;return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get(t.$originUrl+"/article/likeStatus",{params:{id:t.$route.params.id,liker_id:t.$store.state.id}});case 2:r=e.sent,n=r.data,!0===n.like_status?t.isClick=!0:t.isClick=!1;case 5:case"end":return e.stop()}}),e)})))()},GetArticleDetail:function(){var t=this;return C(o.a.mark((function e(){var r,n,a;return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t,e.next=3,t.$http.get(t.$originUrl+"/article/details",{params:{id:r.id}});case 3:n=e.sent,a=n.data,t.data=a.data[0],t.likeCount=a.data[0].like_count;case 7:case"end":return e.stop()}}),e)})))()},addLike:function(){var t=this;return C(o.a.mark((function e(){var r,n;return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!y.a.get("token")){e.next=15;break}if(1!=t.isClick){e.next=3;break}return e.abrupt("return",t.$message.info("您已经为该文章点赞！"));case 3:return e.next=5,t.$http.get(t.$originUrl+"/article/like",{params:{id:t.$route.params.id,liker_id:t.$store.state.id}});case 5:if(r=e.sent,n=r.data,0===n.status){e.next=10;break}return e.abrupt("return");case 10:t.$message.success("点赞成功！"),t.likeCount=t.likeCount+1,t.isClick=!0,e.next=17;break;case 15:t.$message({message:"请登录后进行操作,即将跳转到登录页面",type:"warning"}),setTimeout((function(){t.$router.push({name:"Log"})}),3e3);case 17:case"end":return e.stop()}}),e)})))()},toComment:function(){}}},E=L,O=(r("6f49"),Object(d["a"])(E,n,a,!1,null,null,null));e["default"]=O.exports},"1a40":function(t,e,r){"use strict";r("0b68")},5068:function(t,e,r){"use strict";r("9416")},"6f49":function(t,e,r){"use strict";r("ec2c")},9416:function(t,e,r){},"98b8":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",o=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(A){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var a=e&&e.prototype instanceof v?e:v,i=Object.create(a.prototype),o=new S(n||[]);return i._invoke=C(t,r,o),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(A){return{type:"throw",arg:A}}}t.wrap=u;var d="suspendedStart",f="suspendedYield",h="executing",p="completed",m={};function v(){}function y(){}function g(){}var w={};w[i]=function(){return this};var _=Object.getPrototypeOf,x=_&&_(_(T([])));x&&x!==r&&n.call(x,i)&&(w=x);var k=g.prototype=v.prototype=Object.create(w);function b(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function $(t,e){function r(a,i,o,s){var c=l(t[a],t,i);if("throw"!==c.type){var u=c.arg,d=u.value;return d&&"object"===typeof d&&n.call(d,"__await")?e.resolve(d.__await).then((function(t){r("next",t,o,s)}),(function(t){r("throw",t,o,s)})):e.resolve(d).then((function(t){u.value=t,o(u)}),(function(t){return r("throw",t,o,s)}))}s(c.arg)}var a;function i(t,n){function i(){return new e((function(e,a){r(t,n,e,a)}))}return a=a?a.then(i,i):i()}this._invoke=i}function C(t,e,r){var n=d;return function(a,i){if(n===h)throw new Error("Generator is already running");if(n===p){if("throw"===a)throw i;return j()}r.method=a,r.arg=i;while(1){var o=r.delegate;if(o){var s=L(o,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===d)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var c=l(t,e,r);if("normal"===c.type){if(n=r.done?p:f,c.arg===m)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}function L(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,L(t,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var a=l(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,m;var i=a.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function T(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,o=function r(){while(++a<t.length)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return o.next=o}}return{next:j}}function j(){return{value:e,done:!0}}return y.prototype=k.constructor=g,g.constructor=y,y.displayName=c(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,s,"GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},b($.prototype),$.prototype[o]=function(){return this},t.AsyncIterator=$,t.async=function(e,r,n,a,i){void 0===i&&(i=Promise);var o=new $(u(e,r,n,a),i);return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},b(k),c(k,s,"Generator"),k[i]=function(){return this},k.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=T,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return s.type="throw",s.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),u=n.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;O(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:T(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},t}(t.exports);try{regeneratorRuntime=n}catch(a){Function("r","regeneratorRuntime = r")(n)}},a34a:function(t,e,r){t.exports=r("98b8")},ec2c:function(t,e,r){}}]);