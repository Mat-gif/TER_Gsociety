(function(){"use strict";var e={9792:function(e,t,o){var n=o(9242),r=o(3396),s=o(7139);const i={key:0,style:{color:"red"}};function a(e,t,o,n,a,u){const l=(0,r.up)("NewRoomComponent"),m=(0,r.up)("JoinRoomComponent"),c=(0,r.up)("ListeRoomComponent"),d=(0,r.up)("ListeUserComponent"),h=(0,r.up)("PlateauComponent");return(0,r.wg)(),(0,r.iD)(r.HY,null,[a.myTurn?((0,r.wg)(),(0,r.iD)("h1",i,(0,s.zw)(a.myTurn),1)):(0,r.kq)("",!0),a.playGame?(0,r.kq)("",!0):((0,r.wg)(),(0,r.j4)(l,{key:1,socket:a.socket,onEventRoomId:u.setRoomId},null,8,["socket","onEventRoomId"])),a.playGame?(0,r.kq)("",!0):((0,r.wg)(),(0,r.j4)(m,{key:2,socket:a.socket,onEventRoomId:u.setRoomId},null,8,["socket","onEventRoomId"])),a.playGame?(0,r.kq)("",!0):((0,r.wg)(),(0,r.j4)(c,{key:3,socket:a.socket},null,8,["socket"])),a.roomId&&!a.playGame?((0,r.wg)(),(0,r.j4)(d,{key:4,roomID:a.roomId,socket:a.socket},null,8,["roomID","socket"])):(0,r.kq)("",!0),a.playGame?((0,r.wg)(),(0,r.j4)(h,{key:5,onEventTurn:u.changeturn,myTurn:a.myTurn,color:a.color,nbSquares:a.nbSquares,myInitGame:a.myInitGame,otherInitGame:a.otherInitGame},null,8,["onEventTurn","myTurn","color","nbSquares","myInitGame","otherInitGame"])):(0,r.kq)("",!0)],64)}o(7658);var u=o(2066);function l(e,t,o,s,i,a){return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.wy)((0,r._)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>i.player.username=e)},null,512),[[n.nr,i.player.username]]),(0,r._)("button",{onClick:t[1]||(t[1]=(...e)=>a.createRoom&&a.createRoom(...e))},"Créer une nouvelle salle")])}const{Player:m}=o(4287),{Game:c}=o(6739);var d={props:{socket:{required:!0}},data(){return{player:new m,game:new c}},methods:{createRoom(){this.player.isHost(this.socket.id),this.socket.emit("playerData",this.player,this.game),this.socket.on("room id",(e=>{this.player.roomId=e,this.$emit("event-roomId",{roomId:e})})),console.log(this.player)}}},h=o(89);const p=(0,h.Z)(d,[["render",l]]);var y=p;function f(e,t,o,s,i,a){return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.wy)((0,r._)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>i.player.username=e)},null,512),[[n.nr,i.player.username]]),(0,r.wy)((0,r._)("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=e=>i.player.roomId=e)},null,512),[[n.nr,i.player.roomId]]),(0,r._)("button",{onClick:t[2]||(t[2]=(...e)=>a.joinRoom&&a.joinRoom(...e))},"Rejoindre un salon")])}const{Player:k}=o(4287);var v={props:{socket:{required:!0}},data(){return{player:new k}},methods:{joinRoom(){this.player.socketId=this.socket.id,this.socket.emit("playerData",this.player),this.$emit("event-roomId",{roomId:this.player.roomId}),console.log(this.player)}}};const g=(0,h.Z)(v,[["render",f]]);var I=g;const w=(0,r._)("h2",null,"Liste des salons disponibles ",-1),b={id:"room-list"};function q(e,t,o,n,i,a){return(0,r.wg)(),(0,r.iD)("div",null,[w,(0,r._)("ul",b,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(i.rooms,(e=>((0,r.wg)(),(0,r.iD)("li",{key:e.id},(0,s.zw)(e.id),1)))),128))])])}var G={props:{socket:{required:!0}},data(){return{rooms:[]}},created(){this.socket.emit("get rooms",this.roomID),this.socket.on("list rooms",(e=>{this.rooms=e}))}};const j=(0,h.Z)(G,[["render",q]]);var R=j;const D=(0,r._)("h2",null,"Liste des joueurs en attentes",-1),T={id:"user-list"};function _(e,t,o,n,i,a){return(0,r.wg)(),(0,r.iD)("div",null,[D,(0,r._)("ul",T,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(i.players,(e=>((0,r.wg)(),(0,r.iD)("li",{key:e.username},(0,s.zw)(e.username),1)))),128))])])}var S={props:{socket:{required:!0},roomID:void 0},data(){return{players:[]}},created(){this.roomID&&(this.socket.emit("get users",this.roomID),this.socket.on("list users",(e=>{this.players=e})))}};const C=(0,h.Z)(S,[["render",_]]);var O=C;const P={ref:"container"};function x(e,t,o,n,s,i){return(0,r.wg)(),(0,r.iD)("div",P,null,512)}var E=o(6229),L={name:"PlateauComponent",props:{nbSquares:{default:0,required:!0,type:Number},myInitGame:{required:!0},otherInitGame:{required:!0},myTurn:{required:!0}},mounted(){const e=this;this.createGame(e)},methods:{createGame(e){const t=this.myInitGame.color,o=new E["default"].Stage({container:this.$refs.container,width:500,height:500}),n=new E["default"].Layer;o.add(n);let r=null;for(let s=0;s<this.nbSquares;s++)for(let o=0;o<this.nbSquares;o++){const i=new E["default"].Rect({id:s+o,x:50*s,y:50*o,width:40,height:40,fill:"blue",listening:!0});i.on("click",(function(o){e.myTurn&&(r&&r.fill("blue"),o.target.fill(t),r=o.target,console.log("event-turn"),e.$emit("event-turn",{myTurn:!1}),n.draw())})),n.add(i)}o.draw()}}};const Z=(0,h.Z)(L,[["render",x]]);var H=Z,U={data(){return{socket:(0,u.ZP)(),roomId:null,playGame:!1,color:null,nbSquares:null,myInitGame:null,otherInitGame:[],myTurn:!1,start:!1}},components:{NewRoomComponent:y,JoinRoomComponent:I,ListeRoomComponent:R,ListeUserComponent:O,PlateauComponent:H},created(){this.socket.on("start game",(({info:e,initGame:t})=>{alert("Début du game !"),this.nbSquares=e.nb_Squares,this.start=!0,this.socket.emit("game",this.roomId),t.forEach((e=>{e.socketId===this.socket.id?this.myInitGame=e:this.otherInitGame.push(e)})),this.playGame=!0})),this.socket.on("my turn",(e=>{this.myTurn=e,console.log("my turn "+this.myTurn)}))},methods:{setRoomId(e){this.roomId=e.roomId,console.log("[App.vue] : "+this.roomId)},changeturn(e){this.myTurn=e.myTurn,this.socket.emit("nextplayer",this.roomId),console.log("payload "+this.myTurn)}}};const $=(0,h.Z)(U,[["render",a]]);var z=$,M=o(3571),N=o.n(M);const V=(0,n.ri)(z);V.use(N()),V.mount("#app")},6739:function(e,t,o){o.r(t),o.d(t,{Game:function(){return r}});var n=o(4870);class r{constructor(){const e=(0,n.qj)({nb_Players:2,nb_Squares:9,nb_Walls:5});Object.assign(this,e)}}},4287:function(e,t,o){o.r(t),o.d(t,{Player:function(){return r}});var n=o(4870);class r{constructor(){const e=(0,n.qj)({host:!1,roomId:null,username:"",socketId:"",turn:!1,color:null,positionStart:null,win:!1});Object.assign(this,e)}isHost(e){this.host=!0,this.turn=!0,this.socketId=e}}}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,o),s.exports}o.m=e,function(){var e=[];o.O=function(t,n,r,s){if(!n){var i=1/0;for(m=0;m<e.length;m++){n=e[m][0],r=e[m][1],s=e[m][2];for(var a=!0,u=0;u<n.length;u++)(!1&s||i>=s)&&Object.keys(o.O).every((function(e){return o.O[e](n[u])}))?n.splice(u--,1):(a=!1,s<i&&(i=s));if(a){e.splice(m--,1);var l=r();void 0!==l&&(t=l)}}return t}s=s||0;for(var m=e.length;m>0&&e[m-1][2]>s;m--)e[m]=e[m-1];e[m]=[n,r,s]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,s,i=n[0],a=n[1],u=n[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);if(u)var m=u(o)}for(t&&t(n);l<i.length;l++)s=i[l],o.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return o.O(m)},n=self["webpackChunkter_server"]=self["webpackChunkter_server"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(9792)}));n=o.O(n)})();
//# sourceMappingURL=app.78b5a904.js.map