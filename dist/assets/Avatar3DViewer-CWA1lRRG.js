var oh=Object.defineProperty;var lh=(i,e,t)=>e in i?oh(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Le=(i,e,t)=>lh(i,typeof e!="symbol"?e+"":e,t);import{r as ae,c as ch,R as ao,j as rt}from"./vendor-BefW7Bxj.js";import{l as A,s as hh}from"./page-fridge-Cp-W9isk.js";import{g as uh,P as dh}from"./signedUrlService-DUv0zqbl.js";import{isSkinToneV2 as fh,resolveSkinTone as cc}from"./normalizeSkinTone-BhVF89EQ.js";import{s as ph}from"./stores-Dp3vmZ5-.js";import{I as ni,S as is}from"./ui-components-lrK_WhZu.js";import{m as ua}from"./motion-BQvLDPOm.js";/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oo="180",mh=0,Uo=1,gh=2,hc=1,uc=2,bn=3,cn=0,Bt=1,pn=2,Vn=0,Ci=1,Fo=2,Bo=3,ko=4,_h=5,ii=100,Mh=101,yh=102,xh=103,vh=104,Sh=200,Eh=201,Th=202,bh=203,da=204,fa=205,Ah=206,Rh=207,wh=208,Ch=209,Lh=210,Ih=211,Ph=212,Dh=213,Nh=214,pa=0,ma=1,ga=2,Pi=3,_a=4,Ma=5,ya=6,xa=7,ms=0,Oh=1,Uh=2,Gn=0,dc=1,Fh=2,Bh=3,fc=4,kh=5,Hh=6,zh=7,Ho="attached",Vh="detached",pc=300,Di=301,Ni=302,va=303,Sa=304,dr=306,kt=1e3,Hn=1001,ar=1002,Ot=1003,mc=1004,ts=1005,Wt=1006,Qs=1007,Rn=1008,gn=1009,gc=1010,_c=1011,os=1012,lo=1013,ai=1014,rn=1015,gs=1016,co=1017,ho=1018,ls=1020,Mc=35902,yc=35899,xc=1021,vc=1022,Ct=1023,cs=1026,hs=1027,uo=1028,fo=1029,Sc=1030,po=1031,mo=1033,er=33776,tr=33777,nr=33778,ir=33779,Ea=35840,Ta=35841,ba=35842,Aa=35843,Ra=36196,wa=37492,Ca=37496,La=37808,Ia=37809,Pa=37810,Da=37811,Na=37812,Oa=37813,Ua=37814,Fa=37815,Ba=37816,ka=37817,Ha=37818,za=37819,Va=37820,Ga=37821,Wa=36492,Xa=36494,Ya=36495,ja=36283,qa=36284,Ka=36285,$a=36286,us=2300,ds=2301,xr=2302,zo=2400,Vo=2401,Go=2402,Gh=2500,Wh=0,Ec=1,Za=2,Xh=3200,Yh=3201,fr=0,jh=1,kn="",_t="srgb",Lt="srgb-linear",or="linear",ot="srgb",ui=7680,Wo=519,qh=512,Kh=513,$h=514,Tc=515,Zh=516,Jh=517,Qh=518,eu=519,Ja=35044,Xo="300 es",mn=2e3,lr=2001;class Hi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Yo=1234567;const ss=Math.PI/180,Oi=180/Math.PI;function an(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]).toLowerCase()}function We(i,e,t){return Math.max(e,Math.min(t,i))}function go(i,e){return(i%e+e)%e}function tu(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function nu(i,e,t){return i!==e?(t-i)/(e-i):0}function rs(i,e,t){return(1-t)*i+t*e}function iu(i,e,t,n){return rs(i,e,1-Math.exp(-t*n))}function su(i,e=1){return e-Math.abs(go(i,e*2)-e)}function ru(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function au(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function ou(i,e){return i+Math.floor(Math.random()*(e-i+1))}function lu(i,e){return i+Math.random()*(e-i)}function cu(i){return i*(.5-Math.random())}function hu(i){i!==void 0&&(Yo=i);let e=Yo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function uu(i){return i*ss}function du(i){return i*Oi}function fu(i){return(i&i-1)===0&&i!==0}function pu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function mu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function gu(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*u,l*d,o*c);break;case"YZY":i.set(l*d,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*d,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function nn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function it(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const An={DEG2RAD:ss,RAD2DEG:Oi,generateUUID:an,clamp:We,euclideanModulo:go,mapLinear:tu,inverseLerp:nu,lerp:rs,damp:iu,pingpong:su,smoothstep:ru,smootherstep:au,randInt:ou,randFloat:lu,randFloatSpread:cu,seededRandom:hu,degToRad:uu,radToDeg:du,isPowerOfTwo:fu,ceilPowerOfTwo:pu,floorPowerOfTwo:mu,setQuaternionFromProperEuler:gu,normalize:it,denormalize:nn};class ze{constructor(e=0,t=0){ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-o;const p=l*d+c*f+h*g+u*_,v=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const b=Math.sqrt(M),C=Math.atan2(b,p*v);m=Math.sin(m*C)/b,o=Math.sin(o*C)/b}const y=o*v;if(l=l*m+d*y,c=c*m+f*y,h=h*m+g*y,u=u*m+_*y,m===1-o){const b=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=b,c*=b,h*=b,u*=b}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(jo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(jo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return vr.copy(this).projectOnVector(e),this.sub(vr)}reflect(e){return this.sub(vr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(We(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const vr=new I,jo=new Xn;class He{constructor(e,t,n,s,r,a,o,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],v=s[1],M=s[4],y=s[7],b=s[2],C=s[5],L=s[8];return r[0]=a*_+o*v+l*b,r[3]=a*m+o*M+l*C,r[6]=a*p+o*y+l*L,r[1]=c*_+h*v+u*b,r[4]=c*m+h*M+u*C,r[7]=c*p+h*y+u*L,r[2]=d*_+f*v+g*b,r[5]=d*m+f*M+g*C,r[8]=d*p+f*y+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Sr.makeScale(e,t)),this}rotate(e){return this.premultiply(Sr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Sr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Sr=new He;function bc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function fs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function _u(){const i=fs("canvas");return i.style.display="block",i}const qo={};function ps(i){i in qo||(qo[i]=!0,console.warn(i))}function Mu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Ko=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$o=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function yu(){const i={enabled:!0,workingColorSpace:Lt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ot&&(s.r=Ln(s.r),s.g=Ln(s.g),s.b=Ln(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(s.r=Li(s.r),s.g=Li(s.g),s.b=Li(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===kn?or:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ps("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ps("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Lt]:{primaries:e,whitePoint:n,transfer:or,toXYZ:Ko,fromXYZ:$o,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:_t},outputColorSpaceConfig:{drawingBufferColorSpace:_t}},[_t]:{primaries:e,whitePoint:n,transfer:ot,toXYZ:Ko,fromXYZ:$o,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:_t}}}),i}const qe=yu();function Ln(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Li(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let di;class xu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{di===void 0&&(di=fs("canvas")),di.width=e.width,di.height=e.height;const s=di.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=di}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ln(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ln(t[n]/255)*255):t[n]=Ln(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let vu=0;class _o{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=an(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Er(s[a].image)):r.push(Er(s[a]))}else r=Er(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Er(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?xu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Su=0;const Tr=new I;class bt extends Hi{constructor(e=bt.DEFAULT_IMAGE,t=bt.DEFAULT_MAPPING,n=Hn,s=Hn,r=Wt,a=Rn,o=Ct,l=gn,c=bt.DEFAULT_ANISOTROPY,h=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=an(),this.name="",this.source=new _o(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Tr).x}get height(){return this.source.getSize(Tr).y}get depth(){return this.source.getSize(Tr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case kt:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case ar:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case kt:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case ar:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}bt.DEFAULT_IMAGE=null;bt.DEFAULT_MAPPING=pc;bt.DEFAULT_ANISOTROPY=1;class Je{constructor(e=0,t=0,n=0,s=1){Je.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,y=(f+1)/2,b=(p+1)/2,C=(h+d)/4,L=(u+_)/4,D=(g+m)/4;return M>y&&M>b?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=C/n,r=L/n):y>b?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=C/s,r=D/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=L/r,s=D/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-_)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=We(this.x,e.x,t.x),this.y=We(this.y,e.y,t.y),this.z=We(this.z,e.z,t.z),this.w=We(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=We(this.x,e,t),this.y=We(this.y,e,t),this.z=We(this.z,e,t),this.w=We(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(We(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Eu extends Hi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Je(0,0,e,t),this.scissorTest=!1,this.viewport=new Je(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new bt(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Wt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new _o(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends Eu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ac extends bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Tu extends bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xt{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Qt):Qt.fromBufferAttribute(r,a),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vs.copy(n.boundingBox)),vs.applyMatrix4(e.matrixWorld),this.union(vs)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yi),Ss.subVectors(this.max,Yi),fi.subVectors(e.a,Yi),pi.subVectors(e.b,Yi),mi.subVectors(e.c,Yi),In.subVectors(pi,fi),Pn.subVectors(mi,pi),qn.subVectors(fi,mi);let t=[0,-In.z,In.y,0,-Pn.z,Pn.y,0,-qn.z,qn.y,In.z,0,-In.x,Pn.z,0,-Pn.x,qn.z,0,-qn.x,-In.y,In.x,0,-Pn.y,Pn.x,0,-qn.y,qn.x,0];return!br(t,fi,pi,mi,Ss)||(t=[1,0,0,0,1,0,0,0,1],!br(t,fi,pi,mi,Ss))?!1:(Es.crossVectors(In,Pn),t=[Es.x,Es.y,Es.z],br(t,fi,pi,mi,Ss))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const yn=[new I,new I,new I,new I,new I,new I,new I,new I],Qt=new I,vs=new Xt,fi=new I,pi=new I,mi=new I,In=new I,Pn=new I,qn=new I,Yi=new I,Ss=new I,Es=new I,Kn=new I;function br(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Kn.fromArray(i,r);const o=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),l=e.dot(Kn),c=t.dot(Kn),h=n.dot(Kn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const bu=new Xt,ji=new I,Ar=new I;class _n{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):bu.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ji.subVectors(e,this.center);const t=ji.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ji,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ar.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ji.copy(e.center).add(Ar)),this.expandByPoint(ji.copy(e.center).sub(Ar))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const xn=new I,Rr=new I,Ts=new I,Dn=new I,wr=new I,bs=new I,Cr=new I;class pr{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xn.copy(this.origin).addScaledVector(this.direction,t),xn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Rr.copy(e).add(t).multiplyScalar(.5),Ts.copy(t).sub(e).normalize(),Dn.copy(this.origin).sub(Rr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ts),o=Dn.dot(this.direction),l=-Dn.dot(Ts),c=Dn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Rr).addScaledVector(Ts,d),f}intersectSphere(e,t){xn.subVectors(e.center,this.origin);const n=xn.dot(this.direction),s=xn.dot(xn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,xn)!==null}intersectTriangle(e,t,n,s,r){wr.subVectors(t,e),bs.subVectors(n,e),Cr.crossVectors(wr,bs);let a=this.direction.dot(Cr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Dn.subVectors(this.origin,e);const l=o*this.direction.dot(bs.crossVectors(Dn,bs));if(l<0)return null;const c=o*this.direction.dot(wr.cross(Dn));if(c<0||l+c>a)return null;const h=-o*Dn.dot(Cr);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ge{constructor(e,t,n,s,r,a,o,l,c,h,u,d,f,g,_,m){Ge.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,u,d,f,g,_,m)}set(e,t,n,s,r,a,o,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ge().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/gi.setFromMatrixColumn(e,0).length(),r=1/gi.setFromMatrixColumn(e,1).length(),a=1/gi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Au,e,Ru)}lookAt(e,t,n){const s=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),Nn.crossVectors(n,Vt),Nn.lengthSq()===0&&(Math.abs(n.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),Nn.crossVectors(n,Vt)),Nn.normalize(),As.crossVectors(Vt,Nn),s[0]=Nn.x,s[4]=As.x,s[8]=Vt.x,s[1]=Nn.y,s[5]=As.y,s[9]=Vt.y,s[2]=Nn.z,s[6]=As.z,s[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],M=n[7],y=n[11],b=n[15],C=s[0],L=s[4],D=s[8],T=s[12],E=s[1],P=s[5],O=s[9],z=s[13],j=s[2],G=s[6],Y=s[10],Q=s[14],V=s[3],oe=s[7],fe=s[11],Ee=s[15];return r[0]=a*C+o*E+l*j+c*V,r[4]=a*L+o*P+l*G+c*oe,r[8]=a*D+o*O+l*Y+c*fe,r[12]=a*T+o*z+l*Q+c*Ee,r[1]=h*C+u*E+d*j+f*V,r[5]=h*L+u*P+d*G+f*oe,r[9]=h*D+u*O+d*Y+f*fe,r[13]=h*T+u*z+d*Q+f*Ee,r[2]=g*C+_*E+m*j+p*V,r[6]=g*L+_*P+m*G+p*oe,r[10]=g*D+_*O+m*Y+p*fe,r[14]=g*T+_*z+m*Q+p*Ee,r[3]=v*C+M*E+y*j+b*V,r[7]=v*L+M*P+y*G+b*oe,r[11]=v*D+M*O+y*Y+b*fe,r[15]=v*T+M*z+y*Q+b*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*o*d+n*c*d+s*o*f-n*l*f)+_*(+t*l*f-t*c*d+r*a*d-s*a*f+s*c*h-r*l*h)+m*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-s*o*h-t*l*u+t*o*d+s*a*u-n*a*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],v=u*m*c-_*d*c+_*l*f-o*m*f-u*l*p+o*d*p,M=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,y=h*_*c-g*u*c+g*o*f-a*_*f-h*o*p+a*u*p,b=g*u*l-h*_*l-g*o*d+a*_*d+h*o*m-a*u*m,C=t*v+n*M+s*y+r*b;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/C;return e[0]=v*L,e[1]=(_*d*r-u*m*r-_*s*f+n*m*f+u*s*p-n*d*p)*L,e[2]=(o*m*r-_*l*r+_*s*c-n*m*c-o*s*p+n*l*p)*L,e[3]=(u*l*r-o*d*r-u*s*c+n*d*c+o*s*f-n*l*f)*L,e[4]=M*L,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*L,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*L,e[7]=(a*d*r-h*l*r+h*s*c-t*d*c-a*s*f+t*l*f)*L,e[8]=y*L,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*L,e[10]=(a*_*r-g*o*r+g*n*c-t*_*c-a*n*p+t*o*p)*L,e[11]=(h*o*r-a*u*r-h*n*c+t*u*c+a*n*f-t*o*f)*L,e[12]=b*L,e[13]=(h*_*s-g*u*s+g*n*d-t*_*d-h*n*m+t*u*m)*L,e[14]=(g*o*s-a*_*s-g*n*l+t*_*l+a*n*m-t*o*m)*L,e[15]=(a*u*s-h*o*s+h*n*l-t*u*l-a*n*d+t*o*d)*L,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,_=a*h,m=a*u,p=o*u,v=l*c,M=l*h,y=l*u,b=n.x,C=n.y,L=n.z;return s[0]=(1-(_+p))*b,s[1]=(f+y)*b,s[2]=(g-M)*b,s[3]=0,s[4]=(f-y)*C,s[5]=(1-(d+p))*C,s[6]=(m+v)*C,s[7]=0,s[8]=(g+M)*L,s[9]=(m-v)*L,s[10]=(1-(d+_))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=gi.set(s[0],s[1],s[2]).length();const a=gi.set(s[4],s[5],s[6]).length(),o=gi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],en.copy(this);const c=1/r,h=1/a,u=1/o;return en.elements[0]*=c,en.elements[1]*=c,en.elements[2]*=c,en.elements[4]*=h,en.elements[5]*=h,en.elements[6]*=h,en.elements[8]*=u,en.elements[9]*=u,en.elements[10]*=u,t.setFromRotationMatrix(en),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=mn,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let g,_;if(l)g=r/(a-r),_=a*r/(a-r);else if(o===mn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===lr)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=mn,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,_;if(l)g=1/(a-r),_=a/(a-r);else if(o===mn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===lr)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const gi=new I,en=new Ge,Au=new I(0,0,0),Ru=new I(1,1,1),Nn=new I,As=new I,Vt=new I,Zo=new Ge,Jo=new Xn;class Zt{constructor(e=0,t=0,n=0,s=Zt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jo.setFromEuler(this),this.setFromQuaternion(Jo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Zt.DEFAULT_ORDER="XYZ";class Rc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wu=0;const Qo=new I,_i=new Xn,vn=new Ge,Rs=new I,qi=new I,Cu=new I,Lu=new Xn,el=new I(1,0,0),tl=new I(0,1,0),nl=new I(0,0,1),il={type:"added"},Iu={type:"removed"},Mi={type:"childadded",child:null},Lr={type:"childremoved",child:null};class ft extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=an(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new I,t=new Zt,n=new Xn,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ge},normalMatrix:{value:new He}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _i.setFromAxisAngle(e,t),this.quaternion.multiply(_i),this}rotateOnWorldAxis(e,t){return _i.setFromAxisAngle(e,t),this.quaternion.premultiply(_i),this}rotateX(e){return this.rotateOnAxis(el,e)}rotateY(e){return this.rotateOnAxis(tl,e)}rotateZ(e){return this.rotateOnAxis(nl,e)}translateOnAxis(e,t){return Qo.copy(e).applyQuaternion(this.quaternion),this.position.add(Qo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(el,e)}translateY(e){return this.translateOnAxis(tl,e)}translateZ(e){return this.translateOnAxis(nl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Rs.copy(e):Rs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(qi,Rs,this.up):vn.lookAt(Rs,qi,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),_i.setFromRotationMatrix(vn),this.quaternion.premultiply(_i.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(il),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Iu),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(il),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qi,e,Cu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qi,Lu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}ft.DEFAULT_UP=new I(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tn=new I,Sn=new I,Ir=new I,En=new I,yi=new I,xi=new I,sl=new I,Pr=new I,Dr=new I,Nr=new I,Or=new Je,Ur=new Je,Fr=new Je;class sn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),tn.subVectors(e,t),s.cross(tn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){tn.subVectors(s,t),Sn.subVectors(n,t),Ir.subVectors(e,t);const a=tn.dot(tn),o=tn.dot(Sn),l=tn.dot(Ir),c=Sn.dot(Sn),h=Sn.dot(Ir),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,En.x),l.addScaledVector(a,En.y),l.addScaledVector(o,En.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Or.setScalar(0),Ur.setScalar(0),Fr.setScalar(0),Or.fromBufferAttribute(e,t),Ur.fromBufferAttribute(e,n),Fr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Or,r.x),a.addScaledVector(Ur,r.y),a.addScaledVector(Fr,r.z),a}static isFrontFacing(e,t,n,s){return tn.subVectors(n,t),Sn.subVectors(e,t),tn.cross(Sn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return tn.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),tn.cross(Sn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return sn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;yi.subVectors(s,n),xi.subVectors(r,n),Pr.subVectors(e,n);const l=yi.dot(Pr),c=xi.dot(Pr);if(l<=0&&c<=0)return t.copy(n);Dr.subVectors(e,s);const h=yi.dot(Dr),u=xi.dot(Dr);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(yi,a);Nr.subVectors(e,r);const f=yi.dot(Nr),g=xi.dot(Nr);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(xi,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return sl.subVectors(r,s),o=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(sl,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(yi,a).addScaledVector(xi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const wc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},ws={h:0,s:0,l:0};function Br(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class pe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=go(e,1),t=We(t,0,1),n=We(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Br(a,r,e+1/3),this.g=Br(a,r,e),this.b=Br(a,r,e-1/3)}return qe.colorSpaceToWorking(this,s),this}setStyle(e,t=_t){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_t){const n=wc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ln(e.r),this.g=Ln(e.g),this.b=Ln(e.b),this}copyLinearToSRGB(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_t){return qe.workingToColorSpace(wt.copy(this),e),Math.round(We(wt.r*255,0,255))*65536+Math.round(We(wt.g*255,0,255))*256+Math.round(We(wt.b*255,0,255))}getHexString(e=_t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(wt.copy(this),t);const n=wt.r,s=wt.g,r=wt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=_t){qe.workingToColorSpace(wt.copy(this),e);const t=wt.r,n=wt.g,s=wt.b;return e!==_t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(ws);const n=rs(On.h,ws.h,t),s=rs(On.s,ws.s,t),r=rs(On.l,ws.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new pe;pe.NAMES=wc;let Pu=0;class $t extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pu++}),this.uuid=an(),this.name="",this.type="Material",this.blending=Ci,this.side=cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=da,this.blendDst=fa,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pe(0,0,0),this.blendAlpha=0,this.depthFunc=Pi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ui,this.stencilZFail=ui,this.stencilZPass=ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ci&&(n.blending=this.blending),this.side!==cn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==da&&(n.blendSrc=this.blendSrc),this.blendDst!==fa&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Pi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ui&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ui&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ui&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class zn extends $t{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zt,this.combine=ms,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Mt=new I,Cs=new ze;let Du=0;class At{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Du++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ja,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cs.fromBufferAttribute(this,t),Cs.applyMatrix3(e),this.setXY(t,Cs.x,Cs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),s=it(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),s=it(s,this.array),r=it(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ja&&(e.usage=this.usage),e}}class Cc extends At{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Lc extends At{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class on extends At{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Nu=0;const qt=new Ge,kr=new ft,vi=new I,Gt=new Xt,Ki=new Xt,Et=new I;class Jt extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=an(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bc(e)?Lc:Cc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new He().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,n){return qt.makeTranslation(e,t,n),this.applyMatrix4(qt),this}scale(e,t,n){return qt.makeScale(e,t,n),this.applyMatrix4(qt),this}lookAt(e){return kr.lookAt(e),kr.updateMatrix(),this.applyMatrix4(kr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new on(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Gt.setFromBufferAttribute(r),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Gt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Gt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Gt.min),this.boundingBox.expandByPoint(Gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _n);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Gt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ki.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Gt.min,Ki.min),Gt.expandByPoint(Et),Et.addVectors(Gt.max,Ki.max),Gt.expandByPoint(Et)):(Gt.expandByPoint(Ki.min),Gt.expandByPoint(Ki.max))}Gt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Et.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Et));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Et.fromBufferAttribute(o,c),l&&(vi.fromBufferAttribute(e,c),Et.add(vi)),s=Math.max(s,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new At(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<n.count;D++)o[D]=new I,l[D]=new I;const c=new I,h=new I,u=new I,d=new ze,f=new ze,g=new ze,_=new I,m=new I;function p(D,T,E){c.fromBufferAttribute(n,D),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,E),d.fromBufferAttribute(r,D),f.fromBufferAttribute(r,T),g.fromBufferAttribute(r,E),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[D].add(_),o[T].add(_),o[E].add(_),l[D].add(m),l[T].add(m),l[E].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let D=0,T=v.length;D<T;++D){const E=v[D],P=E.start,O=E.count;for(let z=P,j=P+O;z<j;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const M=new I,y=new I,b=new I,C=new I;function L(D){b.fromBufferAttribute(s,D),C.copy(b);const T=o[D];M.copy(T),M.sub(b.multiplyScalar(b.dot(T))).normalize(),y.crossVectors(C,T);const P=y.dot(l[D])<0?-1:1;a.setXYZW(D,M.x,M.y,M.z,P)}for(let D=0,T=v.length;D<T;++D){const E=v[D],P=E.start,O=E.count;for(let z=P,j=P+O;z<j;z+=3)L(e.getX(z+0)),L(e.getX(z+1)),L(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new At(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,h=new I,u=new I;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new At(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Jt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rl=new Ge,$n=new pr,Ls=new _n,al=new I,Is=new I,Ps=new I,Ds=new I,Hr=new I,Ns=new I,ol=new I,Os=new I;class Tt extends ft{constructor(e=new Jt,t=new zn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ns.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Hr.fromBufferAttribute(u,e),a?Ns.addScaledVector(Hr,h):Ns.addScaledVector(Hr.sub(t),h))}t.add(Ns)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ls.copy(n.boundingSphere),Ls.applyMatrix4(r),$n.copy(e.ray).recast(e.near),!(Ls.containsPoint($n.origin)===!1&&($n.intersectSphere(Ls,al)===null||$n.origin.distanceToSquared(al)>(e.far-e.near)**2))&&(rl.copy(r).invert(),$n.copy(e.ray).applyMatrix4(rl),!(n.boundingBox!==null&&$n.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,$n)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],v=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,b=M;y<b;y+=3){const C=o.getX(y),L=o.getX(y+1),D=o.getX(y+2);s=Us(this,p,e,n,c,h,u,C,L,D),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const v=o.getX(m),M=o.getX(m+1),y=o.getX(m+2);s=Us(this,a,e,n,c,h,u,v,M,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],v=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=v,b=M;y<b;y+=3){const C=y,L=y+1,D=y+2;s=Us(this,p,e,n,c,h,u,C,L,D),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const v=m,M=m+1,y=m+2;s=Us(this,a,e,n,c,h,u,v,M,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Ou(i,e,t,n,s,r,a,o){let l;if(e.side===Bt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===cn,o),l===null)return null;Os.copy(o),Os.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Os);return c<t.near||c>t.far?null:{distance:c,point:Os.clone(),object:i}}function Us(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Is),i.getVertexPosition(l,Ps),i.getVertexPosition(c,Ds);const h=Ou(i,e,t,n,Is,Ps,Ds,ol);if(h){const u=new I;sn.getBarycoord(ol,Is,Ps,Ds,u),s&&(h.uv=sn.getInterpolatedAttribute(s,o,l,c,u,new ze)),r&&(h.uv1=sn.getInterpolatedAttribute(r,o,l,c,u,new ze)),a&&(h.normal=sn.getInterpolatedAttribute(a,o,l,c,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new I,materialIndex:0};sn.getNormal(Is,Ps,Ds,d.normal),h.face=d,h.barycoord=u}return h}class _s extends Jt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new on(c,3)),this.setAttribute("normal",new on(h,3)),this.setAttribute("uv",new on(u,2));function g(_,m,p,v,M,y,b,C,L,D,T){const E=y/L,P=b/D,O=y/2,z=b/2,j=C/2,G=L+1,Y=D+1;let Q=0,V=0;const oe=new I;for(let fe=0;fe<Y;fe++){const Ee=fe*P-z;for(let Be=0;Be<G;Be++){const Qe=Be*E-O;oe[_]=Qe*v,oe[m]=Ee*M,oe[p]=j,c.push(oe.x,oe.y,oe.z),oe[_]=0,oe[m]=0,oe[p]=C>0?1:-1,h.push(oe.x,oe.y,oe.z),u.push(Be/L),u.push(1-fe/D),Q+=1}}for(let fe=0;fe<D;fe++)for(let Ee=0;Ee<L;Ee++){const Be=d+Ee+G*fe,Qe=d+Ee+G*(fe+1),tt=d+(Ee+1)+G*(fe+1),$e=d+(Ee+1)+G*fe;l.push(Be,Qe,$e),l.push(Qe,tt,$e),V+=6}o.addGroup(f,V,T),f+=V,d+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ui(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Dt(i){const e={};for(let t=0;t<i.length;t++){const n=Ui(i[t]);for(const s in n)e[s]=n[s]}return e}function Uu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ic(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Fu={clone:Ui,merge:Dt};var Bu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ku=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends $t{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bu,this.fragmentShader=ku,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ui(e.uniforms),this.uniformsGroups=Uu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Pc extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Un=new I,ll=new ze,cl=new ze;class Nt extends Pc{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Oi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ss*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Oi*2*Math.atan(Math.tan(ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Un.x,Un.y).multiplyScalar(-e/Un.z),Un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Un.x,Un.y).multiplyScalar(-e/Un.z)}getViewSize(e,t){return this.getViewBounds(e,ll,cl),t.subVectors(cl,ll)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ss*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Si=-90,Ei=1;class Hu extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Nt(Si,Ei,e,t);s.layers=this.layers,this.add(s);const r=new Nt(Si,Ei,e,t);r.layers=this.layers,this.add(r);const a=new Nt(Si,Ei,e,t);a.layers=this.layers,this.add(a);const o=new Nt(Si,Ei,e,t);o.layers=this.layers,this.add(o);const l=new Nt(Si,Ei,e,t);l.layers=this.layers,this.add(l);const c=new Nt(Si,Ei,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===lr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Dc extends bt{constructor(e=[],t=Di,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zu extends oi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Dc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new _s(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:Ui(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Bt,blending:Vn});r.uniforms.tEquirect.value=t;const a=new Tt(s,r),o=t.minFilter;return t.minFilter===Rn&&(t.minFilter=Wt),new Hu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class ri extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vu={type:"move"};class zr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vu)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ri;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Nc extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zt,this.environmentIntensity=1,this.environmentRotation=new Zt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Gu{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ja,this.updateRanges=[],this.version=0,this.uuid=an()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=an()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=an()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Pt=new I;class Mo{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=nn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),s=it(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),s=it(s,this.array),r=it(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new At(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Mo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const hl=new I,ul=new Je,dl=new Je,Wu=new I,fl=new Ge,Fs=new I,Vr=new _n,pl=new Ge,Gr=new pr;class wn extends Tt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ho,this.bindMatrix=new Ge,this.bindMatrixInverse=new Ge,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Xt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fs),this.boundingBox.expandByPoint(Fs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new _n),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fs),this.boundingSphere.expandByPoint(Fs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vr.copy(this.boundingSphere),Vr.applyMatrix4(s),e.ray.intersectsSphere(Vr)!==!1&&(pl.copy(s).invert(),Gr.copy(e.ray).applyMatrix4(pl),!(this.boundingBox!==null&&Gr.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Gr)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Je,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ho?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Vh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;ul.fromBufferAttribute(s.attributes.skinIndex,e),dl.fromBufferAttribute(s.attributes.skinWeight,e),hl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=dl.getComponent(r);if(a!==0){const o=ul.getComponent(r);fl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Wu.copy(hl).applyMatrix4(fl),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Oc extends ft{constructor(){super(),this.isBone=!0,this.type="Bone"}}class zi extends bt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Ot,h=Ot,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ml=new Ge,Xu=new Ge;class yo{constructor(e=[],t=[]){this.uuid=an(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ge)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ge;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Xu;ml.multiplyMatrices(o,t[r]),ml.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new yo(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new zi(t,e,e,Ct,rn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Oc),this.bones.push(a),this.boneInverses.push(new Ge().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class Qa extends At{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ti=new Ge,gl=new Ge,Bs=[],_l=new Xt,Yu=new Ge,$i=new Tt,Zi=new _n;class ju extends Tt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Qa(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Yu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ti),_l.copy(e.boundingBox).applyMatrix4(Ti),this.boundingBox.union(_l)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _n),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ti),Zi.copy(e.boundingSphere).applyMatrix4(Ti),this.boundingSphere.union(Zi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if($i.geometry=this.geometry,$i.material=this.material,$i.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zi.copy(this.boundingSphere),Zi.applyMatrix4(n),e.ray.intersectsSphere(Zi)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ti),gl.multiplyMatrices(n,Ti),$i.matrixWorld=gl,$i.raycast(e,Bs);for(let a=0,o=Bs.length;a<o;a++){const l=Bs[a];l.instanceId=r,l.object=this,t.push(l)}Bs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Qa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new zi(new Float32Array(s*this.count),s,this.count,uo,rn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Wr=new I,qu=new I,Ku=new He;class Bn{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Wr.subVectors(n,t).cross(qu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Wr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ku.getNormalMatrix(e),s=this.coplanarPoint(Wr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zn=new _n,$u=new ze(.5,.5),ks=new I;class xo{constructor(e=new Bn,t=new Bn,n=new Bn,s=new Bn,r=new Bn,a=new Bn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=mn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],v=r[12],M=r[13],y=r[14],b=r[15];if(s[0].setComponents(c-a,f-h,p-g,b-v).normalize(),s[1].setComponents(c+a,f+h,p+g,b+v).normalize(),s[2].setComponents(c+o,f+u,p+_,b+M).normalize(),s[3].setComponents(c-o,f-u,p-_,b-M).normalize(),n)s[4].setComponents(l,d,m,y).normalize(),s[5].setComponents(c-l,f-d,p-m,b-y).normalize();else if(s[4].setComponents(c-l,f-d,p-m,b-y).normalize(),t===mn)s[5].setComponents(c+l,f+d,p+m,b+y).normalize();else if(t===lr)s[5].setComponents(l,d,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zn)}intersectsSprite(e){Zn.center.set(0,0,0);const t=$u.distanceTo(e.center);return Zn.radius=.7071067811865476+t,Zn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ks.x=s.normal.x>0?e.max.x:e.min.x,ks.y=s.normal.y>0?e.max.y:e.min.y,ks.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ks)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class vo extends $t{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const cr=new I,hr=new I,Ml=new Ge,Ji=new pr,Hs=new _n,Xr=new I,yl=new I;class So extends ft{constructor(e=new Jt,t=new vo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)cr.fromBufferAttribute(t,s-1),hr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=cr.distanceTo(hr);e.setAttribute("lineDistance",new on(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hs.copy(n.boundingSphere),Hs.applyMatrix4(s),Hs.radius+=r,e.ray.intersectsSphere(Hs)===!1)return;Ml.copy(s).invert(),Ji.copy(e.ray).applyMatrix4(Ml);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){const p=h.getX(_),v=h.getX(_+1),M=zs(this,e,Ji,l,p,v,_);M&&t.push(M)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=zs(this,e,Ji,l,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){const p=zs(this,e,Ji,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=zs(this,e,Ji,l,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function zs(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(cr.fromBufferAttribute(o,s),hr.fromBufferAttribute(o,r),t.distanceSqToSegment(cr,hr,Xr,yl)>n)return;Xr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Xr);if(!(c<e.near||c>e.far))return{distance:c,point:yl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const xl=new I,vl=new I;class Uc extends So{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)xl.fromBufferAttribute(t,s),vl.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+xl.distanceTo(vl);e.setAttribute("lineDistance",new on(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Zu extends So{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Fc extends $t{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Sl=new Ge,eo=new pr,Vs=new _n,Gs=new I;class Ju extends ft{constructor(e=new Jt,t=new Fc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(s),Vs.radius+=r,e.ray.intersectsSphere(Vs)===!1)return;Sl.copy(s).invert(),eo.copy(e.ray).applyMatrix4(Sl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);Gs.fromBufferAttribute(u,m),El(Gs,m,l,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)Gs.fromBufferAttribute(u,g),El(Gs,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function El(i,e,t,n,s,r,a){const o=eo.distanceSqToPoint(i);if(o<t){const l=new I;eo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Bc extends bt{constructor(e,t,n=ai,s,r,a,o=Ot,l=Ot,c,h=cs,u=1){if(h!==cs&&h!==hs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _o(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class kc extends bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class mr extends Jt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=e/o,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const v=p*d-a;for(let M=0;M<c;M++){const y=M*u-r;g.push(y,-v,0),_.push(0,0,1),m.push(M/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<o;v++){const M=v+c*p,y=v+c*(p+1),b=v+1+c*(p+1),C=v+1+c*p;f.push(M,y,C),f.push(y,b,C)}this.setIndex(f),this.setAttribute("position",new on(g,3)),this.setAttribute("normal",new on(_,3)),this.setAttribute("uv",new on(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ft extends $t{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fr,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dt extends Ft{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ze(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return We(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new pe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new pe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new pe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Qu extends $t{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new pe(16777215),this.specular=new pe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fr,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zt,this.combine=ms,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Hc extends $t{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fr,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zt,this.combine=ms,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ed extends $t{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class td extends $t{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Ws(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function nd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function id(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Tl(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function zc(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class Ms{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class sd extends Ms{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:zo,endingEnd:zo}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Vo:r=e,o=2*t-n;break;case Go:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Vo:a=e,l=2*n-t;break;case Go:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,v=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,M=(-1-f)*m+(1.5+f)*_+.5*g,y=f*m-f*_;for(let b=0;b!==o;++b)r[b]=p*a[h+b]+v*a[c+b]+M*a[l+b]+y*a[u+b];return r}}class rd extends Ms{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}}class ad extends Ms{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class hn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ws(t,this.TimeBufferType),this.values=Ws(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ws(e.times,Array),values:Ws(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ad(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new rd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new sd(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case us:t=this.InterpolantFactoryMethodDiscrete;break;case ds:t=this.InterpolantFactoryMethodLinear;break;case xr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return us;case this.InterpolantFactoryMethodLinear:return ds;case this.InterpolantFactoryMethodSmooth:return xr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&nd(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===xr,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}hn.prototype.ValueTypeName="";hn.prototype.TimeBufferType=Float32Array;hn.prototype.ValueBufferType=Float32Array;hn.prototype.DefaultInterpolation=ds;class Vi extends hn{constructor(e,t,n){super(e,t,n)}}Vi.prototype.ValueTypeName="bool";Vi.prototype.ValueBufferType=Array;Vi.prototype.DefaultInterpolation=us;Vi.prototype.InterpolantFactoryMethodLinear=void 0;Vi.prototype.InterpolantFactoryMethodSmooth=void 0;class Vc extends hn{constructor(e,t,n,s){super(e,t,n,s)}}Vc.prototype.ValueTypeName="color";class Fi extends hn{constructor(e,t,n,s){super(e,t,n,s)}}Fi.prototype.ValueTypeName="number";class od extends Ms{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t);let c=e*o;for(let h=c+o;c!==h;c+=4)Xn.slerpFlat(r,0,a,c-o,a,c,l);return r}}class Bi extends hn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new od(this.times,this.values,this.getValueSize(),e)}}Bi.prototype.ValueTypeName="quaternion";Bi.prototype.InterpolantFactoryMethodSmooth=void 0;class Gi extends hn{constructor(e,t,n){super(e,t,n)}}Gi.prototype.ValueTypeName="string";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=us;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;class ki extends hn{constructor(e,t,n,s){super(e,t,n,s)}}ki.prototype.ValueTypeName="vector";class ld{constructor(e="",t=-1,n=[],s=Gh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=an(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(hd(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(hn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=id(l);l=Tl(l,1,h),c=Tl(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Fi(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];zc(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let v=0;v!==d[g].morphTargets.length;++v){const M=d[g];m.push(M.time),p.push(M.morphTarget===_?1:0)}s.push(new Fi(".morphTargetInfluence["+_+"]",m,p))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(ki,f+".position",d,"pos",s),n(Bi,f+".quaternion",d,"rot",s),n(ki,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function cd(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Fi;case"vector":case"vector2":case"vector3":case"vector4":return ki;case"color":return Vc;case"quaternion":return Bi;case"bool":case"boolean":return Vi;case"string":return Gi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function hd(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=cd(i.type);if(i.times===void 0){const t=[],n=[];zc(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Cn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class ud{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const dd=new ud;class ci{constructor(e){this.manager=e!==void 0?e:dd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}ci.DEFAULT_MATERIAL_NAME="__DEFAULT";const Tn={};class fd extends Error{constructor(e,t){super(e),this.response=t}}class ur extends ci{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Cn.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Tn[e]!==void 0){Tn[e].push({onLoad:t,onProgress:n,onError:s});return}Tn[e]=[],Tn[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Tn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){v();function v(){u.read().then(({done:M,value:y})=>{if(M)p.close();else{_+=y.byteLength;const b=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let C=0,L=h.length;C<L;C++){const D=h[C];D.onProgress&&D.onProgress(b)}p.enqueue(y),v()}},M=>{p.error(M)})}}});return new Response(m)}else throw new fd(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Cn.add(`file:${e}`,c);const h=Tn[e];delete Tn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Tn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Tn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const bi=new WeakMap;class pd extends ci{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Cn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=bi.get(a);u===void 0&&(u=[],bi.set(a,u)),u.push({onLoad:t,onError:s})}return a}const o=fs("img");function l(){h(),t&&t(this);const u=bi.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}bi.delete(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),Cn.remove(`image:${e}`);const d=bi.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(u)}bi.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Cn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class md extends ci{constructor(e){super(e)}load(e,t,n,s){const r=new bt,a=new pd(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class li extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Eo extends li{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Yr=new Ge,bl=new I,Al=new I;class To{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.mapType=gn,this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xo,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new Je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;bl.setFromMatrixPosition(e.matrixWorld),t.position.copy(bl),Al.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Al),t.updateMatrixWorld(),Yr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yr,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Yr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class gd extends To{constructor(){super(new Nt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Oi*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class _d extends li{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new gd}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Rl=new Ge,Qi=new I,jr=new I;class Md extends To{constructor(){super(new Nt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ze(4,2),this._viewportCount=6,this._viewports=[new Je(2,1,1,1),new Je(0,1,1,1),new Je(3,1,1,1),new Je(1,1,1,1),new Je(3,0,1,1),new Je(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Qi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Qi),jr.copy(n.position),jr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(jr),n.updateMatrixWorld(),s.makeTranslation(-Qi.x,-Qi.y,-Qi.z),Rl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rl,n.coordinateSystem,n.reversedDepth)}}class yd extends li{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Md}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class bo extends Pc{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class xd extends To{constructor(){super(new bo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yt extends li{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new xd}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class gr extends li{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class as{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const qr=new WeakMap;class vd extends ci{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Cn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{if(qr.has(a)===!0)s&&s(qr.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Cn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),qr.set(l,c),Cn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Cn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Sd extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Ao="\\[\\]\\.:\\/",Ed=new RegExp("["+Ao+"]","g"),Ro="[^"+Ao+"]",Td="[^"+Ao.replace("\\.","")+"]",bd=/((?:WC+[\/:])*)/.source.replace("WC",Ro),Ad=/(WCOD+)?/.source.replace("WCOD",Td),Rd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ro),wd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ro),Cd=new RegExp("^"+bd+Ad+Rd+wd+"$"),Ld=["material","materials","bones","map"];class Id{constructor(e,t,n){const s=n||st.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class st{constructor(e,t,n){this.path=t,this.parsedPath=n||st.parseTrackName(t),this.node=st.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new st.Composite(e,t,n):new st(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ed,"")}static parseTrackName(e){const t=Cd.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Ld.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=st.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}st.Composite=Id;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Ai{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=We(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(We(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Pd extends Uc{constructor(e=10,t=10,n=4473924,s=8947848){n=new pe(n),s=new pe(s);const r=t/2,a=e/t,o=e/2,l=[],c=[];for(let d=0,f=0,g=-o;d<=t;d++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const _=d===r?n:s;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}const h=new Jt;h.setAttribute("position",new on(l,3)),h.setAttribute("color",new on(c,3));const u=new vo({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function wl(i,e,t,n){const s=Dd(n);switch(t){case xc:return i*e;case uo:return i*e/s.components*s.byteLength;case fo:return i*e/s.components*s.byteLength;case Sc:return i*e*2/s.components*s.byteLength;case po:return i*e*2/s.components*s.byteLength;case vc:return i*e*3/s.components*s.byteLength;case Ct:return i*e*4/s.components*s.byteLength;case mo:return i*e*4/s.components*s.byteLength;case er:case tr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case nr:case ir:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ta:case Aa:return Math.max(i,16)*Math.max(e,8)/4;case Ea:case ba:return Math.max(i,8)*Math.max(e,8)/2;case Ra:case wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case La:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ia:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Pa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Da:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Na:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Oa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ua:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Fa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ka:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case za:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Va:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ga:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Wa:case Xa:case Ya:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ja:case qa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ka:case $a:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dd(i){switch(i){case gn:case gc:return{byteLength:1,components:1};case os:case _c:case gs:return{byteLength:2,components:1};case co:case ho:return{byteLength:2,components:4};case ai:case lo:case rn:return{byteLength:4,components:1};case Mc:case yc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Gc(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Nd(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Od=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ud=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Vd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Wd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Kd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ef=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,sf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,rf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,af=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,of=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,lf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,df="gl_FragColor = linearToOutputTexel( gl_FragColor );",ff=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,mf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_f=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,yf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ef=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Tf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Af=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Cf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,If=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Df=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Nf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Of=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Uf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ff=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Xf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$f=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Jf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ep=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,tp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,np=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ip=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ap=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,op=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,up=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_p=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Mp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,yp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,vp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ep=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,bp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ap=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Lp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Np=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Op=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Up=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Vp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Gp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Wp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,$p=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,em=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,nm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,im=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,am=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,om=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,um=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:Od,alphahash_pars_fragment:Ud,alphamap_fragment:Fd,alphamap_pars_fragment:Bd,alphatest_fragment:kd,alphatest_pars_fragment:Hd,aomap_fragment:zd,aomap_pars_fragment:Vd,batching_pars_vertex:Gd,batching_vertex:Wd,begin_vertex:Xd,beginnormal_vertex:Yd,bsdfs:jd,iridescence_fragment:qd,bumpmap_pars_fragment:Kd,clipping_planes_fragment:$d,clipping_planes_pars_fragment:Zd,clipping_planes_pars_vertex:Jd,clipping_planes_vertex:Qd,color_fragment:ef,color_pars_fragment:tf,color_pars_vertex:nf,color_vertex:sf,common:rf,cube_uv_reflection_fragment:af,defaultnormal_vertex:of,displacementmap_pars_vertex:lf,displacementmap_vertex:cf,emissivemap_fragment:hf,emissivemap_pars_fragment:uf,colorspace_fragment:df,colorspace_pars_fragment:ff,envmap_fragment:pf,envmap_common_pars_fragment:mf,envmap_pars_fragment:gf,envmap_pars_vertex:_f,envmap_physical_pars_fragment:wf,envmap_vertex:Mf,fog_vertex:yf,fog_pars_vertex:xf,fog_fragment:vf,fog_pars_fragment:Sf,gradientmap_pars_fragment:Ef,lightmap_pars_fragment:Tf,lights_lambert_fragment:bf,lights_lambert_pars_fragment:Af,lights_pars_begin:Rf,lights_toon_fragment:Cf,lights_toon_pars_fragment:Lf,lights_phong_fragment:If,lights_phong_pars_fragment:Pf,lights_physical_fragment:Df,lights_physical_pars_fragment:Nf,lights_fragment_begin:Of,lights_fragment_maps:Uf,lights_fragment_end:Ff,logdepthbuf_fragment:Bf,logdepthbuf_pars_fragment:kf,logdepthbuf_pars_vertex:Hf,logdepthbuf_vertex:zf,map_fragment:Vf,map_pars_fragment:Gf,map_particle_fragment:Wf,map_particle_pars_fragment:Xf,metalnessmap_fragment:Yf,metalnessmap_pars_fragment:jf,morphinstance_vertex:qf,morphcolor_vertex:Kf,morphnormal_vertex:$f,morphtarget_pars_vertex:Zf,morphtarget_vertex:Jf,normal_fragment_begin:Qf,normal_fragment_maps:ep,normal_pars_fragment:tp,normal_pars_vertex:np,normal_vertex:ip,normalmap_pars_fragment:sp,clearcoat_normal_fragment_begin:rp,clearcoat_normal_fragment_maps:ap,clearcoat_pars_fragment:op,iridescence_pars_fragment:lp,opaque_fragment:cp,packing:hp,premultiplied_alpha_fragment:up,project_vertex:dp,dithering_fragment:fp,dithering_pars_fragment:pp,roughnessmap_fragment:mp,roughnessmap_pars_fragment:gp,shadowmap_pars_fragment:_p,shadowmap_pars_vertex:Mp,shadowmap_vertex:yp,shadowmask_pars_fragment:xp,skinbase_vertex:vp,skinning_pars_vertex:Sp,skinning_vertex:Ep,skinnormal_vertex:Tp,specularmap_fragment:bp,specularmap_pars_fragment:Ap,tonemapping_fragment:Rp,tonemapping_pars_fragment:wp,transmission_fragment:Cp,transmission_pars_fragment:Lp,uv_pars_fragment:Ip,uv_pars_vertex:Pp,uv_vertex:Dp,worldpos_vertex:Np,background_vert:Op,background_frag:Up,backgroundCube_vert:Fp,backgroundCube_frag:Bp,cube_vert:kp,cube_frag:Hp,depth_vert:zp,depth_frag:Vp,distanceRGBA_vert:Gp,distanceRGBA_frag:Wp,equirect_vert:Xp,equirect_frag:Yp,linedashed_vert:jp,linedashed_frag:qp,meshbasic_vert:Kp,meshbasic_frag:$p,meshlambert_vert:Zp,meshlambert_frag:Jp,meshmatcap_vert:Qp,meshmatcap_frag:em,meshnormal_vert:tm,meshnormal_frag:nm,meshphong_vert:im,meshphong_frag:sm,meshphysical_vert:rm,meshphysical_frag:am,meshtoon_vert:om,meshtoon_frag:lm,points_vert:cm,points_frag:hm,shadow_vert:um,shadow_frag:dm,sprite_vert:fm,sprite_frag:pm},ce={common:{diffuse:{value:new pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new pe(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},fn={basic:{uniforms:Dt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Dt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new pe(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Dt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new pe(0)},specular:{value:new pe(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Dt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Dt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new pe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Dt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Dt([ce.points,ce.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Dt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Dt([ce.common,ce.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Dt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Dt([ce.sprite,ce.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Dt([ce.common,ce.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Dt([ce.lights,ce.fog,{color:{value:new pe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};fn.physical={uniforms:Dt([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new pe(0)},specularColor:{value:new pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Xs={r:0,b:0,g:0},Jn=new Zt,mm=new Ge;function gm(i,e,t,n,s,r,a){const o=new pe(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?t:e).get(y)),y}function _(M){let y=!1;const b=g(M);b===null?p(o,l):b&&b.isColor&&(p(b,1),y=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,y){const b=g(y);b&&(b.isCubeTexture||b.mapping===dr)?(h===void 0&&(h=new Tt(new _s(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:Ui(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,L,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Jn.copy(y.backgroundRotation),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(mm.makeRotationFromEuler(Jn)),h.material.toneMapped=qe.getTransfer(b.colorSpace)!==ot,(u!==b||d!==b.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=b,d=b.version,f=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Tt(new mr(2,2),new Wn({name:"BackgroundMaterial",uniforms:Ui(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=qe.getTransfer(b.colorSpace)!==ot,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=b,d=b.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,y){M.getRGB(Xs,Ic(i)),n.buffers.color.setClear(Xs.r,Xs.g,Xs.b,y,a)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),l=y,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(o,l)},render:_,addToRenderList:m,dispose:v}}function _m(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(E,P,O,z,j){let G=!1;const Y=u(z,O,P);r!==Y&&(r=Y,c(r.object)),G=f(E,z,O,j),G&&g(E,z,O,j),j!==null&&e.update(j,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,y(E,P,O,z),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function l(){return i.createVertexArray()}function c(E){return i.bindVertexArray(E)}function h(E){return i.deleteVertexArray(E)}function u(E,P,O){const z=O.wireframe===!0;let j=n[E.id];j===void 0&&(j={},n[E.id]=j);let G=j[P.id];G===void 0&&(G={},j[P.id]=G);let Y=G[z];return Y===void 0&&(Y=d(l()),G[z]=Y),Y}function d(E){const P=[],O=[],z=[];for(let j=0;j<t;j++)P[j]=0,O[j]=0,z[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:z,object:E,attributes:{},index:null}}function f(E,P,O,z){const j=r.attributes,G=P.attributes;let Y=0;const Q=O.getAttributes();for(const V in Q)if(Q[V].location>=0){const fe=j[V];let Ee=G[V];if(Ee===void 0&&(V==="instanceMatrix"&&E.instanceMatrix&&(Ee=E.instanceMatrix),V==="instanceColor"&&E.instanceColor&&(Ee=E.instanceColor)),fe===void 0||fe.attribute!==Ee||Ee&&fe.data!==Ee.data)return!0;Y++}return r.attributesNum!==Y||r.index!==z}function g(E,P,O,z){const j={},G=P.attributes;let Y=0;const Q=O.getAttributes();for(const V in Q)if(Q[V].location>=0){let fe=G[V];fe===void 0&&(V==="instanceMatrix"&&E.instanceMatrix&&(fe=E.instanceMatrix),V==="instanceColor"&&E.instanceColor&&(fe=E.instanceColor));const Ee={};Ee.attribute=fe,fe&&fe.data&&(Ee.data=fe.data),j[V]=Ee,Y++}r.attributes=j,r.attributesNum=Y,r.index=z}function _(){const E=r.newAttributes;for(let P=0,O=E.length;P<O;P++)E[P]=0}function m(E){p(E,0)}function p(E,P){const O=r.newAttributes,z=r.enabledAttributes,j=r.attributeDivisors;O[E]=1,z[E]===0&&(i.enableVertexAttribArray(E),z[E]=1),j[E]!==P&&(i.vertexAttribDivisor(E,P),j[E]=P)}function v(){const E=r.newAttributes,P=r.enabledAttributes;for(let O=0,z=P.length;O<z;O++)P[O]!==E[O]&&(i.disableVertexAttribArray(O),P[O]=0)}function M(E,P,O,z,j,G,Y){Y===!0?i.vertexAttribIPointer(E,P,O,j,G):i.vertexAttribPointer(E,P,O,z,j,G)}function y(E,P,O,z){_();const j=z.attributes,G=O.getAttributes(),Y=P.defaultAttributeValues;for(const Q in G){const V=G[Q];if(V.location>=0){let oe=j[Q];if(oe===void 0&&(Q==="instanceMatrix"&&E.instanceMatrix&&(oe=E.instanceMatrix),Q==="instanceColor"&&E.instanceColor&&(oe=E.instanceColor)),oe!==void 0){const fe=oe.normalized,Ee=oe.itemSize,Be=e.get(oe);if(Be===void 0)continue;const Qe=Be.buffer,tt=Be.type,$e=Be.bytesPerElement,q=tt===i.INT||tt===i.UNSIGNED_INT||oe.gpuType===lo;if(oe.isInterleavedBufferAttribute){const Z=oe.data,Me=Z.stride,Oe=oe.offset;if(Z.isInstancedInterleavedBuffer){for(let Te=0;Te<V.locationSize;Te++)p(V.location+Te,Z.meshPerAttribute);E.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Te=0;Te<V.locationSize;Te++)m(V.location+Te);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let Te=0;Te<V.locationSize;Te++)M(V.location+Te,Ee/V.locationSize,tt,fe,Me*$e,(Oe+Ee/V.locationSize*Te)*$e,q)}else{if(oe.isInstancedBufferAttribute){for(let Z=0;Z<V.locationSize;Z++)p(V.location+Z,oe.meshPerAttribute);E.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Z=0;Z<V.locationSize;Z++)m(V.location+Z);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let Z=0;Z<V.locationSize;Z++)M(V.location+Z,Ee/V.locationSize,tt,fe,Ee*$e,Ee/V.locationSize*Z*$e,q)}}else if(Y!==void 0){const fe=Y[Q];if(fe!==void 0)switch(fe.length){case 2:i.vertexAttrib2fv(V.location,fe);break;case 3:i.vertexAttrib3fv(V.location,fe);break;case 4:i.vertexAttrib4fv(V.location,fe);break;default:i.vertexAttrib1fv(V.location,fe)}}}}v()}function b(){D();for(const E in n){const P=n[E];for(const O in P){const z=P[O];for(const j in z)h(z[j].object),delete z[j];delete P[O]}delete n[E]}}function C(E){if(n[E.id]===void 0)return;const P=n[E.id];for(const O in P){const z=P[O];for(const j in z)h(z[j].object),delete z[j];delete P[O]}delete n[E.id]}function L(E){for(const P in n){const O=n[P];if(O[E.id]===void 0)continue;const z=O[E.id];for(const j in z)h(z[j].object),delete z[j];delete O[E.id]}}function D(){T(),a=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:T,dispose:b,releaseStatesOfGeometry:C,releaseStatesOfProgram:L,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function Mm(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function ym(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Ct&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const D=L===gs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==gn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==rn&&!D)}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:b,maxSamples:C}}function xm(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Bn,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const v=r?0:n,M=v*4;let y=p.clippingState||null;l.value=y,y=h(g,d,M,f);for(let b=0;b!==M;++b)y[b]=t[b];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,y=f;M!==_;++M,y+=4)a.copy(u[M]).applyMatrix4(v,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function vm(i){let e=new WeakMap;function t(a,o){return o===va?a.mapping=Di:o===Sa&&(a.mapping=Ni),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===va||o===Sa)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new zu(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const wi=4,Cl=[.125,.215,.35,.446,.526,.582],si=20,Kr=new bo,Ll=new pe;let $r=null,Zr=0,Jr=0,Qr=!1;const ti=(1+Math.sqrt(5))/2,Ri=1/ti,Il=[new I(-ti,Ri,0),new I(ti,Ri,0),new I(-Ri,0,ti),new I(Ri,0,ti),new I(0,ti,-Ri),new I(0,ti,Ri),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],Sm=new I;class to{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Sm}=r;$r=this._renderer.getRenderTarget(),Zr=this._renderer.getActiveCubeFace(),Jr=this._renderer.getActiveMipmapLevel(),Qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget($r,Zr,Jr),this._renderer.xr.enabled=Qr,e.scissorTest=!1,Ys(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Di||e.mapping===Ni?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$r=this._renderer.getRenderTarget(),Zr=this._renderer.getActiveCubeFace(),Jr=this._renderer.getActiveMipmapLevel(),Qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Wt,minFilter:Wt,generateMipmaps:!1,type:gs,format:Ct,colorSpace:Lt,depthBuffer:!1},s=Pl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Em(r)),this._blurMaterial=Tm(r,e,t)}return s}_compileMaterial(e){const t=new Tt(this._lodPlanes[0],e);this._renderer.compile(t,Kr)}_sceneToCubeUV(e,t,n,s,r){const l=new Nt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Ll),u.toneMapping=Gn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const _=new zn({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1}),m=new Tt(new _s,_);let p=!1;const v=e.background;v?v.isColor&&(_.color.copy(v),e.background=null,p=!0):(_.color.copy(Ll),p=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):y===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));const b=this._cubeSize;Ys(s,y*b,M>2?b:0,b,b),u.setRenderTarget(s),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Di||e.mapping===Ni;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Tt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ys(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Kr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Il[(s-r-1)%Il.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Tt(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*si-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):si;m>si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${si}`);const p=[];let v=0;for(let L=0;L<si;++L){const D=L/_,T=Math.exp(-D*D/2);p.push(T),L===0?v+=T:L<m&&(v+=2*T)}for(let L=0;L<p.length;L++)p[L]=p[L]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const y=this._sizeLods[s],b=3*y*(s>M-wi?s-M+wi:0),C=4*(this._cubeSize-y);Ys(t,b,C,3*y,2*y),l.setRenderTarget(t),l.render(u,Kr)}}function Em(i){const e=[],t=[],n=[];let s=i;const r=i-wi+1+Cl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-wi?l=Cl[a-i+wi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*f),M=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let C=0;C<f;C++){const L=C%3*2/3-1,D=C>2?0:-1,T=[L,D,0,L+2/3,D,0,L+2/3,D+1,0,L,D,0,L+2/3,D+1,0,L,D+1,0];v.set(T,_*g*C),M.set(d,m*g*C);const E=[C,C,C,C,C,C];y.set(E,p*g*C)}const b=new Jt;b.setAttribute("position",new At(v,_)),b.setAttribute("uv",new At(M,m)),b.setAttribute("faceIndex",new At(y,p)),e.push(b),s>wi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Pl(i,e,t){const n=new oi(i,e,t);return n.texture.mapping=dr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ys(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Tm(i,e,t){const n=new Float32Array(si),s=new I(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Dl(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Nl(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function wo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function bm(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===va||l===Sa,h=l===Di||l===Ni;if(c||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new to(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new to(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Am(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ps("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Rm(i,e,t,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let M=0,y=v.length;M<y;M+=3){const b=v[M+0],C=v[M+1],L=v[M+2];d.push(b,C,C,L,L,b)}}else if(g!==void 0){const v=g.array;_=g.version;for(let M=0,y=v.length/3-1;M<y;M+=3){const b=M+0,C=M+1,L=M+2;d.push(b,C,C,L,L,b)}}else return;const m=new(bc(d)?Lc:Cc)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function wm(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=f[v]*_[v];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Cm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Lm(i,e,t){const n=new WeakMap,s=new Je;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let T=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",T)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let M=0;f===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let y=o.attributes.position.count*M,b=1;y>e.maxTextureSize&&(b=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const C=new Float32Array(y*b*4*u),L=new Ac(C,y,b,u);L.type=rn,L.needsUpdate=!0;const D=M*4;for(let E=0;E<u;E++){const P=m[E],O=p[E],z=v[E],j=y*b*4*E;for(let G=0;G<P.count;G++){const Y=G*D;f===!0&&(s.fromBufferAttribute(P,G),C[j+Y+0]=s.x,C[j+Y+1]=s.y,C[j+Y+2]=s.z,C[j+Y+3]=0),g===!0&&(s.fromBufferAttribute(O,G),C[j+Y+4]=s.x,C[j+Y+5]=s.y,C[j+Y+6]=s.z,C[j+Y+7]=0),_===!0&&(s.fromBufferAttribute(z,G),C[j+Y+8]=s.x,C[j+Y+9]=s.y,C[j+Y+10]=s.z,C[j+Y+11]=z.itemSize===4?s.w:1)}}d={count:u,texture:L,size:new ze(y,b)},n.set(o,d),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Im(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Wc=new bt,Ol=new Bc(1,1),Xc=new Ac,Yc=new Tu,jc=new Dc,Ul=[],Fl=[],Bl=new Float32Array(16),kl=new Float32Array(9),Hl=new Float32Array(4);function Wi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Ul[s];if(r===void 0&&(r=new Float32Array(s),Ul[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function _r(i,e){let t=Fl[e];t===void 0&&(t=new Int32Array(e),Fl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Pm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Dm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2fv(this.addr,e),vt(t,e)}}function Nm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xt(t,e))return;i.uniform3fv(this.addr,e),vt(t,e)}}function Om(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4fv(this.addr,e),vt(t,e)}}function Um(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),vt(t,e)}else{if(xt(t,n))return;Hl.set(n),i.uniformMatrix2fv(this.addr,!1,Hl),vt(t,n)}}function Fm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),vt(t,e)}else{if(xt(t,n))return;kl.set(n),i.uniformMatrix3fv(this.addr,!1,kl),vt(t,n)}}function Bm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),vt(t,e)}else{if(xt(t,n))return;Bl.set(n),i.uniformMatrix4fv(this.addr,!1,Bl),vt(t,n)}}function km(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Hm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2iv(this.addr,e),vt(t,e)}}function zm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3iv(this.addr,e),vt(t,e)}}function Vm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4iv(this.addr,e),vt(t,e)}}function Gm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Wm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2uiv(this.addr,e),vt(t,e)}}function Xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3uiv(this.addr,e),vt(t,e)}}function Ym(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4uiv(this.addr,e),vt(t,e)}}function jm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ol.compareFunction=Tc,r=Ol):r=Wc,t.setTexture2D(e||r,s)}function qm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Yc,s)}function Km(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||jc,s)}function $m(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Xc,s)}function Zm(i){switch(i){case 5126:return Pm;case 35664:return Dm;case 35665:return Nm;case 35666:return Om;case 35674:return Um;case 35675:return Fm;case 35676:return Bm;case 5124:case 35670:return km;case 35667:case 35671:return Hm;case 35668:case 35672:return zm;case 35669:case 35673:return Vm;case 5125:return Gm;case 36294:return Wm;case 36295:return Xm;case 36296:return Ym;case 35678:case 36198:case 36298:case 36306:case 35682:return jm;case 35679:case 36299:case 36307:return qm;case 35680:case 36300:case 36308:case 36293:return Km;case 36289:case 36303:case 36311:case 36292:return $m}}function Jm(i,e){i.uniform1fv(this.addr,e)}function Qm(i,e){const t=Wi(e,this.size,2);i.uniform2fv(this.addr,t)}function eg(i,e){const t=Wi(e,this.size,3);i.uniform3fv(this.addr,t)}function tg(i,e){const t=Wi(e,this.size,4);i.uniform4fv(this.addr,t)}function ng(i,e){const t=Wi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ig(i,e){const t=Wi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function sg(i,e){const t=Wi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function rg(i,e){i.uniform1iv(this.addr,e)}function ag(i,e){i.uniform2iv(this.addr,e)}function og(i,e){i.uniform3iv(this.addr,e)}function lg(i,e){i.uniform4iv(this.addr,e)}function cg(i,e){i.uniform1uiv(this.addr,e)}function hg(i,e){i.uniform2uiv(this.addr,e)}function ug(i,e){i.uniform3uiv(this.addr,e)}function dg(i,e){i.uniform4uiv(this.addr,e)}function fg(i,e,t){const n=this.cache,s=e.length,r=_r(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Wc,r[a])}function pg(i,e,t){const n=this.cache,s=e.length,r=_r(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Yc,r[a])}function mg(i,e,t){const n=this.cache,s=e.length,r=_r(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||jc,r[a])}function gg(i,e,t){const n=this.cache,s=e.length,r=_r(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),vt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Xc,r[a])}function _g(i){switch(i){case 5126:return Jm;case 35664:return Qm;case 35665:return eg;case 35666:return tg;case 35674:return ng;case 35675:return ig;case 35676:return sg;case 5124:case 35670:return rg;case 35667:case 35671:return ag;case 35668:case 35672:return og;case 35669:case 35673:return lg;case 5125:return cg;case 36294:return hg;case 36295:return ug;case 36296:return dg;case 35678:case 36198:case 36298:case 36306:case 35682:return fg;case 35679:case 36299:case 36307:return pg;case 35680:case 36300:case 36308:case 36293:return mg;case 36289:case 36303:case 36311:case 36292:return gg}}class Mg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Zm(t.type)}}class yg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_g(t.type)}}class xg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const ea=/(\w+)(\])?(\[|\.)?/g;function zl(i,e){i.seq.push(e),i.map[e.id]=e}function vg(i,e,t){const n=i.name,s=n.length;for(ea.lastIndex=0;;){const r=ea.exec(n),a=ea.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){zl(t,c===void 0?new Mg(o,i,e):new yg(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new xg(o),zl(t,u)),t=u}}}class sr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);vg(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Vl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Sg=37297;let Eg=0;function Tg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Gl=new He;function bg(i){qe._getMatrix(Gl,qe.workingColorSpace,i);const e=`mat3( ${Gl.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case or:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Wl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Tg(i.getShaderSource(e),o)}else return r}function Ag(i,e){const t=bg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Rg(i,e){let t;switch(e){case dc:t="Linear";break;case Fh:t="Reinhard";break;case Bh:t="Cineon";break;case fc:t="ACESFilmic";break;case Hh:t="AgX";break;case zh:t="Neutral";break;case kh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const js=new I;function wg(){qe.getLuminanceCoefficients(js);const i=js.x.toFixed(4),e=js.y.toFixed(4),t=js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Cg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ns).join(`
`)}function Lg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ig(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ns(i){return i!==""}function Xl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Yl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Pg=/^[ \t]*#include +<([\w\d./]+)>/gm;function no(i){return i.replace(Pg,Ng)}const Dg=new Map;function Ng(i,e){let t=Ve[e];if(t===void 0){const n=Dg.get(e);if(n!==void 0)t=Ve[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return no(t)}const Og=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jl(i){return i.replace(Og,Ug)}function Ug(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ql(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Fg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===hc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===uc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===bn&&(e="SHADOWMAP_TYPE_VSM"),e}function Bg(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Di:case Ni:e="ENVMAP_TYPE_CUBE";break;case dr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function kg(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ni:e="ENVMAP_MODE_REFRACTION";break}return e}function Hg(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ms:e="ENVMAP_BLENDING_MULTIPLY";break;case Oh:e="ENVMAP_BLENDING_MIX";break;case Uh:e="ENVMAP_BLENDING_ADD";break}return e}function zg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Vg(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Fg(t),c=Bg(t),h=kg(t),u=Hg(t),d=zg(t),f=Cg(t),g=Lg(r),_=s.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ns).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ns).join(`
`),p.length>0&&(p+=`
`)):(m=[ql(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ns).join(`
`),p=[ql(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Gn?Rg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Ag("linearToOutputTexel",t.outputColorSpace),wg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ns).join(`
`)),a=no(a),a=Xl(a,t),a=Yl(a,t),o=no(o),o=Xl(o,t),o=Yl(o,t),a=jl(a),o=jl(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Xo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=v+m+a,y=v+p+o,b=Vl(s,s.VERTEX_SHADER,M),C=Vl(s,s.FRAGMENT_SHADER,y);s.attachShader(_,b),s.attachShader(_,C),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function L(P){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(_)||"",z=s.getShaderInfoLog(b)||"",j=s.getShaderInfoLog(C)||"",G=O.trim(),Y=z.trim(),Q=j.trim();let V=!0,oe=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,b,C);else{const fe=Wl(s,b,"vertex"),Ee=Wl(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+G+`
`+fe+`
`+Ee)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(Y===""||Q==="")&&(oe=!1);oe&&(P.diagnostics={runnable:V,programLog:G,vertexShader:{log:Y,prefix:m},fragmentShader:{log:Q,prefix:p}})}s.deleteShader(b),s.deleteShader(C),D=new sr(s,_),T=Ig(s,_)}let D;this.getUniforms=function(){return D===void 0&&L(this),D};let T;this.getAttributes=function(){return T===void 0&&L(this),T};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(_,Sg)),E},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Eg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=C,this}let Gg=0;class Wg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Xg(e),t.set(e,n)),n}}class Xg{constructor(e){this.id=Gg++,this.code=e,this.usedTimes=0}}function Yg(i,e,t,n,s,r,a){const o=new Rc,l=new Wg,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,E,P,O,z){const j=O.fog,G=z.geometry,Y=T.isMeshStandardMaterial?O.environment:null,Q=(T.isMeshStandardMaterial?t:e).get(T.envMap||Y),V=Q&&Q.mapping===dr?Q.image.height:null,oe=g[T.type];T.precision!==null&&(f=s.getMaxPrecision(T.precision),f!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",f,"instead."));const fe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Ee=fe!==void 0?fe.length:0;let Be=0;G.morphAttributes.position!==void 0&&(Be=1),G.morphAttributes.normal!==void 0&&(Be=2),G.morphAttributes.color!==void 0&&(Be=3);let Qe,tt,$e,q;if(oe){const et=fn[oe];Qe=et.vertexShader,tt=et.fragmentShader}else Qe=T.vertexShader,tt=T.fragmentShader,l.update(T),$e=l.getVertexShaderID(T),q=l.getFragmentShaderID(T);const Z=i.getRenderTarget(),Me=i.state.buffers.depth.getReversed(),Oe=z.isInstancedMesh===!0,Te=z.isBatchedMesh===!0,Ye=!!T.map,St=!!T.matcap,R=!!Q,Re=!!T.aoMap,le=!!T.lightMap,we=!!T.bumpMap,ee=!!T.normalMap,Ke=!!T.displacementMap,ge=!!T.emissiveMap,Ie=!!T.metalnessMap,nt=!!T.roughnessMap,lt=T.anisotropy>0,w=T.clearcoat>0,x=T.dispersion>0,B=T.iridescence>0,X=T.sheen>0,$=T.transmission>0,W=lt&&!!T.anisotropyMap,Se=w&&!!T.clearcoatMap,ne=w&&!!T.clearcoatNormalMap,me=w&&!!T.clearcoatRoughnessMap,be=B&&!!T.iridescenceMap,ie=B&&!!T.iridescenceThicknessMap,de=X&&!!T.sheenColorMap,Ne=X&&!!T.sheenRoughnessMap,Ae=!!T.specularMap,he=!!T.specularColorMap,ke=!!T.specularIntensityMap,N=$&&!!T.transmissionMap,se=$&&!!T.thicknessMap,re=!!T.gradientMap,ye=!!T.alphaMap,J=T.alphaTest>0,K=!!T.alphaHash,ve=!!T.extensions;let Fe=Gn;T.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Fe=i.toneMapping);const ht={shaderID:oe,shaderType:T.type,shaderName:T.name,vertexShader:Qe,fragmentShader:tt,defines:T.defines,customVertexShaderID:$e,customFragmentShaderID:q,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:f,batching:Te,batchingColor:Te&&z._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&z.instanceColor!==null,instancingMorph:Oe&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Lt,alphaToCoverage:!!T.alphaToCoverage,map:Ye,matcap:St,envMap:R,envMapMode:R&&Q.mapping,envMapCubeUVHeight:V,aoMap:Re,lightMap:le,bumpMap:we,normalMap:ee,displacementMap:d&&Ke,emissiveMap:ge,normalMapObjectSpace:ee&&T.normalMapType===jh,normalMapTangentSpace:ee&&T.normalMapType===fr,metalnessMap:Ie,roughnessMap:nt,anisotropy:lt,anisotropyMap:W,clearcoat:w,clearcoatMap:Se,clearcoatNormalMap:ne,clearcoatRoughnessMap:me,dispersion:x,iridescence:B,iridescenceMap:be,iridescenceThicknessMap:ie,sheen:X,sheenColorMap:de,sheenRoughnessMap:Ne,specularMap:Ae,specularColorMap:he,specularIntensityMap:ke,transmission:$,transmissionMap:N,thicknessMap:se,gradientMap:re,opaque:T.transparent===!1&&T.blending===Ci&&T.alphaToCoverage===!1,alphaMap:ye,alphaTest:J,alphaHash:K,combine:T.combine,mapUv:Ye&&_(T.map.channel),aoMapUv:Re&&_(T.aoMap.channel),lightMapUv:le&&_(T.lightMap.channel),bumpMapUv:we&&_(T.bumpMap.channel),normalMapUv:ee&&_(T.normalMap.channel),displacementMapUv:Ke&&_(T.displacementMap.channel),emissiveMapUv:ge&&_(T.emissiveMap.channel),metalnessMapUv:Ie&&_(T.metalnessMap.channel),roughnessMapUv:nt&&_(T.roughnessMap.channel),anisotropyMapUv:W&&_(T.anisotropyMap.channel),clearcoatMapUv:Se&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:ne&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:de&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&_(T.sheenRoughnessMap.channel),specularMapUv:Ae&&_(T.specularMap.channel),specularColorMapUv:he&&_(T.specularColorMap.channel),specularIntensityMapUv:ke&&_(T.specularIntensityMap.channel),transmissionMapUv:N&&_(T.transmissionMap.channel),thicknessMapUv:se&&_(T.thicknessMap.channel),alphaMapUv:ye&&_(T.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(ee||lt),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!G.attributes.uv&&(Ye||ye),fog:!!j,useFog:T.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Me,skinning:z.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Be,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Fe,decodeVideoTexture:Ye&&T.map.isVideoTexture===!0&&qe.getTransfer(T.map.colorSpace)===ot,decodeVideoTextureEmissive:ge&&T.emissiveMap.isVideoTexture===!0&&qe.getTransfer(T.emissiveMap.colorSpace)===ot,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===pn,flipSided:T.side===Bt,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:ve&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&T.extensions.multiDraw===!0||Te)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return ht.vertexUv1s=c.has(1),ht.vertexUv2s=c.has(2),ht.vertexUv3s=c.has(3),c.clear(),ht}function p(T){const E=[];if(T.shaderID?E.push(T.shaderID):(E.push(T.customVertexShaderID),E.push(T.customFragmentShaderID)),T.defines!==void 0)for(const P in T.defines)E.push(P),E.push(T.defines[P]);return T.isRawShaderMaterial===!1&&(v(E,T),M(E,T),E.push(i.outputColorSpace)),E.push(T.customProgramCacheKey),E.join()}function v(T,E){T.push(E.precision),T.push(E.outputColorSpace),T.push(E.envMapMode),T.push(E.envMapCubeUVHeight),T.push(E.mapUv),T.push(E.alphaMapUv),T.push(E.lightMapUv),T.push(E.aoMapUv),T.push(E.bumpMapUv),T.push(E.normalMapUv),T.push(E.displacementMapUv),T.push(E.emissiveMapUv),T.push(E.metalnessMapUv),T.push(E.roughnessMapUv),T.push(E.anisotropyMapUv),T.push(E.clearcoatMapUv),T.push(E.clearcoatNormalMapUv),T.push(E.clearcoatRoughnessMapUv),T.push(E.iridescenceMapUv),T.push(E.iridescenceThicknessMapUv),T.push(E.sheenColorMapUv),T.push(E.sheenRoughnessMapUv),T.push(E.specularMapUv),T.push(E.specularColorMapUv),T.push(E.specularIntensityMapUv),T.push(E.transmissionMapUv),T.push(E.thicknessMapUv),T.push(E.combine),T.push(E.fogExp2),T.push(E.sizeAttenuation),T.push(E.morphTargetsCount),T.push(E.morphAttributeCount),T.push(E.numDirLights),T.push(E.numPointLights),T.push(E.numSpotLights),T.push(E.numSpotLightMaps),T.push(E.numHemiLights),T.push(E.numRectAreaLights),T.push(E.numDirLightShadows),T.push(E.numPointLightShadows),T.push(E.numSpotLightShadows),T.push(E.numSpotLightShadowsWithMaps),T.push(E.numLightProbes),T.push(E.shadowMapType),T.push(E.toneMapping),T.push(E.numClippingPlanes),T.push(E.numClipIntersection),T.push(E.depthPacking)}function M(T,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),E.gradientMap&&o.enable(22),T.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),T.push(o.mask)}function y(T){const E=g[T.type];let P;if(E){const O=fn[E];P=Fu.clone(O.uniforms)}else P=T.uniforms;return P}function b(T,E){let P;for(let O=0,z=h.length;O<z;O++){const j=h[O];if(j.cacheKey===E){P=j,++P.usedTimes;break}}return P===void 0&&(P=new Vg(i,E,T,r),h.push(P)),P}function C(T){if(--T.usedTimes===0){const E=h.indexOf(T);h[E]=h[h.length-1],h.pop(),T.destroy()}}function L(T){l.remove(T)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:b,releaseProgram:C,releaseShaderCache:L,programs:h,dispose:D}}function jg(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function qg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Kl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function $l(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||qg),n.length>1&&n.sort(d||Kl),s.length>1&&s.sort(d||Kl)}function h(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Kg(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new $l,i.set(n,[a])):s>=r.length?(a=new $l,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function $g(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new pe};break;case"SpotLight":t={position:new I,direction:new I,color:new pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new pe,groundColor:new pe};break;case"RectAreaLight":t={color:new pe,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function Zg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Jg=0;function Qg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function e_(i){const e=new $g,t=Zg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const s=new I,r=new Ge,a=new Ge;function o(c){let h=0,u=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,v=0,M=0,y=0,b=0,C=0,L=0;c.sort(Qg);for(let T=0,E=c.length;T<E;T++){const P=c[T],O=P.color,z=P.intensity,j=P.distance,G=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=O.r*z,u+=O.g*z,d+=O.b*z;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(P.sh.coefficients[Y],z);L++}else if(P.isDirectionalLight){const Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Q=P.shadow,V=t.get(P);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=G,n.directionalShadowMatrix[f]=P.shadow.matrix,v++}n.directional[f]=Y,f++}else if(P.isSpotLight){const Y=e.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(O).multiplyScalar(z),Y.distance=j,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,n.spot[_]=Y;const Q=P.shadow;if(P.map&&(n.spotLightMap[b]=P.map,b++,Q.updateMatrices(P),P.castShadow&&C++),n.spotLightMatrix[_]=Q.matrix,P.castShadow){const V=t.get(P);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=G,y++}_++}else if(P.isRectAreaLight){const Y=e.get(P);Y.color.copy(O).multiplyScalar(z),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=Y,m++}else if(P.isPointLight){const Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){const Q=P.shadow,V=t.get(P);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,V.shadowCameraNear=Q.camera.near,V.shadowCameraFar=Q.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=Y,g++}else if(P.isHemisphereLight){const Y=e.get(P);Y.skyColor.copy(P.color).multiplyScalar(z),Y.groundColor.copy(P.groundColor).multiplyScalar(z),n.hemi[p]=Y,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const D=n.hash;(D.directionalLength!==f||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==v||D.numPointShadows!==M||D.numSpotShadows!==y||D.numSpotMaps!==b||D.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+b-C,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=L,D.directionalLength=f,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=v,D.numPointShadows=M,D.numSpotShadows=y,D.numSpotMaps=b,D.numLightProbes=L,n.version=Jg++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const M=c[p];if(M.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(M.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function Zl(i){const e=new e_(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function t_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Zl(i),e.set(s,[o])):r>=a.length?(o=new Zl(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const n_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,i_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function s_(i,e,t){let n=new xo;const s=new ze,r=new ze,a=new Je,o=new ed({depthPacking:Yh}),l=new td,c={},h=t.maxTextureSize,u={[cn]:Bt,[Bt]:cn,[pn]:pn},d=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:n_,fragmentShader:i_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Jt;g.setAttribute("position",new At(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Tt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hc;let p=this.type;this.render=function(C,L,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const T=i.getRenderTarget(),E=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Vn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=p!==bn&&this.type===bn,j=p===bn&&this.type!==bn;for(let G=0,Y=C.length;G<Y;G++){const Q=C[G],V=Q.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const oe=V.getFrameExtents();if(s.multiply(oe),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/oe.x),s.x=r.x*oe.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/oe.y),s.y=r.y*oe.y,V.mapSize.y=r.y)),V.map===null||z===!0||j===!0){const Ee=this.type!==bn?{minFilter:Ot,magFilter:Ot}:{};V.map!==null&&V.map.dispose(),V.map=new oi(s.x,s.y,Ee),V.map.texture.name=Q.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const fe=V.getViewportCount();for(let Ee=0;Ee<fe;Ee++){const Be=V.getViewport(Ee);a.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),O.viewport(a),V.updateMatrices(Q,Ee),n=V.getFrustum(),y(L,D,V.camera,Q,this.type)}V.isPointLightShadow!==!0&&this.type===bn&&v(V,D),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,E,P)};function v(C,L){const D=e.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new oi(s.x,s.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(L,null,D,d,_,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(L,null,D,f,_,null)}function M(C,L,D,T){let E=null;const P=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(P!==void 0)E=P;else if(E=D.isPointLight===!0?l:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const O=E.uuid,z=L.uuid;let j=c[O];j===void 0&&(j={},c[O]=j);let G=j[z];G===void 0&&(G=E.clone(),j[z]=G,L.addEventListener("dispose",b)),E=G}if(E.visible=L.visible,E.wireframe=L.wireframe,T===bn?E.side=L.shadowSide!==null?L.shadowSide:L.side:E.side=L.shadowSide!==null?L.shadowSide:u[L.side],E.alphaMap=L.alphaMap,E.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,E.map=L.map,E.clipShadows=L.clipShadows,E.clippingPlanes=L.clippingPlanes,E.clipIntersection=L.clipIntersection,E.displacementMap=L.displacementMap,E.displacementScale=L.displacementScale,E.displacementBias=L.displacementBias,E.wireframeLinewidth=L.wireframeLinewidth,E.linewidth=L.linewidth,D.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const O=i.properties.get(E);O.light=D}return E}function y(C,L,D,T,E){if(C.visible===!1)return;if(C.layers.test(L.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&E===bn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);const z=e.update(C),j=C.material;if(Array.isArray(j)){const G=z.groups;for(let Y=0,Q=G.length;Y<Q;Y++){const V=G[Y],oe=j[V.materialIndex];if(oe&&oe.visible){const fe=M(C,oe,T,E);C.onBeforeShadow(i,C,L,D,z,fe,V),i.renderBufferDirect(D,null,z,fe,C,V),C.onAfterShadow(i,C,L,D,z,fe,V)}}}else if(j.visible){const G=M(C,j,T,E);C.onBeforeShadow(i,C,L,D,z,G,null),i.renderBufferDirect(D,null,z,G,C,null),C.onAfterShadow(i,C,L,D,z,G,null)}}const O=C.children;for(let z=0,j=O.length;z<j;z++)y(O[z],L,D,T,E)}function b(C){C.target.removeEventListener("dispose",b);for(const D in c){const T=c[D],E=C.target.uuid;E in T&&(T[E].dispose(),delete T[E])}}}const r_={[pa]:ma,[ga]:ya,[_a]:xa,[Pi]:Ma,[ma]:pa,[ya]:ga,[xa]:_a,[Ma]:Pi};function a_(i,e){function t(){let N=!1;const se=new Je;let re=null;const ye=new Je(0,0,0,0);return{setMask:function(J){re!==J&&!N&&(i.colorMask(J,J,J,J),re=J)},setLocked:function(J){N=J},setClear:function(J,K,ve,Fe,ht){ht===!0&&(J*=Fe,K*=Fe,ve*=Fe),se.set(J,K,ve,Fe),ye.equals(se)===!1&&(i.clearColor(J,K,ve,Fe),ye.copy(se))},reset:function(){N=!1,re=null,ye.set(-1,0,0,0)}}}function n(){let N=!1,se=!1,re=null,ye=null,J=null;return{setReversed:function(K){if(se!==K){const ve=e.get("EXT_clip_control");K?ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.ZERO_TO_ONE_EXT):ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.NEGATIVE_ONE_TO_ONE_EXT),se=K;const Fe=J;J=null,this.setClear(Fe)}},getReversed:function(){return se},setTest:function(K){K?Z(i.DEPTH_TEST):Me(i.DEPTH_TEST)},setMask:function(K){re!==K&&!N&&(i.depthMask(K),re=K)},setFunc:function(K){if(se&&(K=r_[K]),ye!==K){switch(K){case pa:i.depthFunc(i.NEVER);break;case ma:i.depthFunc(i.ALWAYS);break;case ga:i.depthFunc(i.LESS);break;case Pi:i.depthFunc(i.LEQUAL);break;case _a:i.depthFunc(i.EQUAL);break;case Ma:i.depthFunc(i.GEQUAL);break;case ya:i.depthFunc(i.GREATER);break;case xa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ye=K}},setLocked:function(K){N=K},setClear:function(K){J!==K&&(se&&(K=1-K),i.clearDepth(K),J=K)},reset:function(){N=!1,re=null,ye=null,J=null,se=!1}}}function s(){let N=!1,se=null,re=null,ye=null,J=null,K=null,ve=null,Fe=null,ht=null;return{setTest:function(et){N||(et?Z(i.STENCIL_TEST):Me(i.STENCIL_TEST))},setMask:function(et){se!==et&&!N&&(i.stencilMask(et),se=et)},setFunc:function(et,Mn,un){(re!==et||ye!==Mn||J!==un)&&(i.stencilFunc(et,Mn,un),re=et,ye=Mn,J=un)},setOp:function(et,Mn,un){(K!==et||ve!==Mn||Fe!==un)&&(i.stencilOp(et,Mn,un),K=et,ve=Mn,Fe=un)},setLocked:function(et){N=et},setClear:function(et){ht!==et&&(i.clearStencil(et),ht=et)},reset:function(){N=!1,se=null,re=null,ye=null,J=null,K=null,ve=null,Fe=null,ht=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,v=null,M=null,y=null,b=null,C=null,L=new pe(0,0,0),D=0,T=!1,E=null,P=null,O=null,z=null,j=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,Q=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(V)[1]),Y=Q>=1):V.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),Y=Q>=2);let oe=null,fe={};const Ee=i.getParameter(i.SCISSOR_BOX),Be=i.getParameter(i.VIEWPORT),Qe=new Je().fromArray(Ee),tt=new Je().fromArray(Be);function $e(N,se,re,ye){const J=new Uint8Array(4),K=i.createTexture();i.bindTexture(N,K),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ve=0;ve<re;ve++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,ye,0,i.RGBA,i.UNSIGNED_BYTE,J):i.texImage2D(se+ve,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,J);return K}const q={};q[i.TEXTURE_2D]=$e(i.TEXTURE_2D,i.TEXTURE_2D,1),q[i.TEXTURE_CUBE_MAP]=$e(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[i.TEXTURE_2D_ARRAY]=$e(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),q[i.TEXTURE_3D]=$e(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(i.DEPTH_TEST),a.setFunc(Pi),we(!1),ee(Uo),Z(i.CULL_FACE),Re(Vn);function Z(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function Me(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Oe(N,se){return u[N]!==se?(i.bindFramebuffer(N,se),u[N]=se,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function Te(N,se){let re=f,ye=!1;if(N){re=d.get(se),re===void 0&&(re=[],d.set(se,re));const J=N.textures;if(re.length!==J.length||re[0]!==i.COLOR_ATTACHMENT0){for(let K=0,ve=J.length;K<ve;K++)re[K]=i.COLOR_ATTACHMENT0+K;re.length=J.length,ye=!0}}else re[0]!==i.BACK&&(re[0]=i.BACK,ye=!0);ye&&i.drawBuffers(re)}function Ye(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const St={[ii]:i.FUNC_ADD,[Mh]:i.FUNC_SUBTRACT,[yh]:i.FUNC_REVERSE_SUBTRACT};St[xh]=i.MIN,St[vh]=i.MAX;const R={[Sh]:i.ZERO,[Eh]:i.ONE,[Th]:i.SRC_COLOR,[da]:i.SRC_ALPHA,[Lh]:i.SRC_ALPHA_SATURATE,[wh]:i.DST_COLOR,[Ah]:i.DST_ALPHA,[bh]:i.ONE_MINUS_SRC_COLOR,[fa]:i.ONE_MINUS_SRC_ALPHA,[Ch]:i.ONE_MINUS_DST_COLOR,[Rh]:i.ONE_MINUS_DST_ALPHA,[Ih]:i.CONSTANT_COLOR,[Ph]:i.ONE_MINUS_CONSTANT_COLOR,[Dh]:i.CONSTANT_ALPHA,[Nh]:i.ONE_MINUS_CONSTANT_ALPHA};function Re(N,se,re,ye,J,K,ve,Fe,ht,et){if(N===Vn){_===!0&&(Me(i.BLEND),_=!1);return}if(_===!1&&(Z(i.BLEND),_=!0),N!==_h){if(N!==m||et!==T){if((p!==ii||y!==ii)&&(i.blendEquation(i.FUNC_ADD),p=ii,y=ii),et)switch(N){case Ci:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fo:i.blendFunc(i.ONE,i.ONE);break;case Bo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ko:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ci:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Bo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ko:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}v=null,M=null,b=null,C=null,L.set(0,0,0),D=0,m=N,T=et}return}J=J||se,K=K||re,ve=ve||ye,(se!==p||J!==y)&&(i.blendEquationSeparate(St[se],St[J]),p=se,y=J),(re!==v||ye!==M||K!==b||ve!==C)&&(i.blendFuncSeparate(R[re],R[ye],R[K],R[ve]),v=re,M=ye,b=K,C=ve),(Fe.equals(L)===!1||ht!==D)&&(i.blendColor(Fe.r,Fe.g,Fe.b,ht),L.copy(Fe),D=ht),m=N,T=!1}function le(N,se){N.side===pn?Me(i.CULL_FACE):Z(i.CULL_FACE);let re=N.side===Bt;se&&(re=!re),we(re),N.blending===Ci&&N.transparent===!1?Re(Vn):Re(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const ye=N.stencilWrite;o.setTest(ye),ye&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ge(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):Me(i.SAMPLE_ALPHA_TO_COVERAGE)}function we(N){E!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),E=N)}function ee(N){N!==mh?(Z(i.CULL_FACE),N!==P&&(N===Uo?i.cullFace(i.BACK):N===gh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Me(i.CULL_FACE),P=N}function Ke(N){N!==O&&(Y&&i.lineWidth(N),O=N)}function ge(N,se,re){N?(Z(i.POLYGON_OFFSET_FILL),(z!==se||j!==re)&&(i.polygonOffset(se,re),z=se,j=re)):Me(i.POLYGON_OFFSET_FILL)}function Ie(N){N?Z(i.SCISSOR_TEST):Me(i.SCISSOR_TEST)}function nt(N){N===void 0&&(N=i.TEXTURE0+G-1),oe!==N&&(i.activeTexture(N),oe=N)}function lt(N,se,re){re===void 0&&(oe===null?re=i.TEXTURE0+G-1:re=oe);let ye=fe[re];ye===void 0&&(ye={type:void 0,texture:void 0},fe[re]=ye),(ye.type!==N||ye.texture!==se)&&(oe!==re&&(i.activeTexture(re),oe=re),i.bindTexture(N,se||q[N]),ye.type=N,ye.texture=se)}function w(){const N=fe[oe];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{i.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{i.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Se(){try{i.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{i.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(){try{i.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function be(){try{i.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{i.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function de(N){Qe.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Qe.copy(N))}function Ne(N){tt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),tt.copy(N))}function Ae(N,se){let re=c.get(se);re===void 0&&(re=new WeakMap,c.set(se,re));let ye=re.get(N);ye===void 0&&(ye=i.getUniformBlockIndex(se,N.name),re.set(N,ye))}function he(N,se){const ye=c.get(se).get(N);l.get(se)!==ye&&(i.uniformBlockBinding(se,ye,N.__bindingPointIndex),l.set(se,ye))}function ke(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},oe=null,fe={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,v=null,M=null,y=null,b=null,C=null,L=new pe(0,0,0),D=0,T=!1,E=null,P=null,O=null,z=null,j=null,Qe.set(0,0,i.canvas.width,i.canvas.height),tt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Z,disable:Me,bindFramebuffer:Oe,drawBuffers:Te,useProgram:Ye,setBlending:Re,setMaterial:le,setFlipSided:we,setCullFace:ee,setLineWidth:Ke,setPolygonOffset:ge,setScissorTest:Ie,activeTexture:nt,bindTexture:lt,unbindTexture:w,compressedTexImage2D:x,compressedTexImage3D:B,texImage2D:be,texImage3D:ie,updateUBOMapping:Ae,uniformBlockBinding:he,texStorage2D:ne,texStorage3D:me,texSubImage2D:X,texSubImage3D:$,compressedTexSubImage2D:W,compressedTexSubImage3D:Se,scissor:de,viewport:Ne,reset:ke}}function o_(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ze,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,x){return f?new OffscreenCanvas(w,x):fs("canvas")}function _(w,x,B){let X=1;const $=lt(w);if(($.width>B||$.height>B)&&(X=B/Math.max($.width,$.height)),X<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const W=Math.floor(X*$.width),Se=Math.floor(X*$.height);u===void 0&&(u=g(W,Se));const ne=x?g(W,Se):u;return ne.width=W,ne.height=Se,ne.getContext("2d").drawImage(w,0,0,W,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+W+"x"+Se+")."),ne}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function v(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(w,x,B,X,$=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let W=x;if(x===i.RED&&(B===i.FLOAT&&(W=i.R32F),B===i.HALF_FLOAT&&(W=i.R16F),B===i.UNSIGNED_BYTE&&(W=i.R8)),x===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.R8UI),B===i.UNSIGNED_SHORT&&(W=i.R16UI),B===i.UNSIGNED_INT&&(W=i.R32UI),B===i.BYTE&&(W=i.R8I),B===i.SHORT&&(W=i.R16I),B===i.INT&&(W=i.R32I)),x===i.RG&&(B===i.FLOAT&&(W=i.RG32F),B===i.HALF_FLOAT&&(W=i.RG16F),B===i.UNSIGNED_BYTE&&(W=i.RG8)),x===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.RG8UI),B===i.UNSIGNED_SHORT&&(W=i.RG16UI),B===i.UNSIGNED_INT&&(W=i.RG32UI),B===i.BYTE&&(W=i.RG8I),B===i.SHORT&&(W=i.RG16I),B===i.INT&&(W=i.RG32I)),x===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.RGB8UI),B===i.UNSIGNED_SHORT&&(W=i.RGB16UI),B===i.UNSIGNED_INT&&(W=i.RGB32UI),B===i.BYTE&&(W=i.RGB8I),B===i.SHORT&&(W=i.RGB16I),B===i.INT&&(W=i.RGB32I)),x===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),B===i.UNSIGNED_INT&&(W=i.RGBA32UI),B===i.BYTE&&(W=i.RGBA8I),B===i.SHORT&&(W=i.RGBA16I),B===i.INT&&(W=i.RGBA32I)),x===i.RGB&&(B===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(W=i.R11F_G11F_B10F)),x===i.RGBA){const Se=$?or:qe.getTransfer(X);B===i.FLOAT&&(W=i.RGBA32F),B===i.HALF_FLOAT&&(W=i.RGBA16F),B===i.UNSIGNED_BYTE&&(W=Se===ot?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function y(w,x){let B;return w?x===null||x===ai||x===ls?B=i.DEPTH24_STENCIL8:x===rn?B=i.DEPTH32F_STENCIL8:x===os&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ai||x===ls?B=i.DEPTH_COMPONENT24:x===rn?B=i.DEPTH_COMPONENT32F:x===os&&(B=i.DEPTH_COMPONENT16),B}function b(w,x){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ot&&w.minFilter!==Wt?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function C(w){const x=w.target;x.removeEventListener("dispose",C),D(x),x.isVideoTexture&&h.delete(x)}function L(w){const x=w.target;x.removeEventListener("dispose",L),E(x)}function D(w){const x=n.get(w);if(x.__webglInit===void 0)return;const B=w.source,X=d.get(B);if(X){const $=X[x.__cacheKey];$.usedTimes--,$.usedTimes===0&&T(w),Object.keys(X).length===0&&d.delete(B)}n.remove(w)}function T(w){const x=n.get(w);i.deleteTexture(x.__webglTexture);const B=w.source,X=d.get(B);delete X[x.__cacheKey],a.memory.textures--}function E(w){const x=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let $=0;$<x.__webglFramebuffer[X].length;$++)i.deleteFramebuffer(x.__webglFramebuffer[X][$]);else i.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)i.deleteFramebuffer(x.__webglFramebuffer[X]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const B=w.textures;for(let X=0,$=B.length;X<$;X++){const W=n.get(B[X]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),a.memory.textures--),n.remove(B[X])}n.remove(w)}let P=0;function O(){P=0}function z(){const w=P;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),P+=1,w}function j(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function G(w,x){const B=n.get(w);if(w.isVideoTexture&&Ie(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){const X=w.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(B,w,x);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+x)}function Y(w,x){const B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){q(B,w,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+x)}function Q(w,x){const B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){q(B,w,x);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+x)}function V(w,x){const B=n.get(w);if(w.version>0&&B.__version!==w.version){Z(B,w,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+x)}const oe={[kt]:i.REPEAT,[Hn]:i.CLAMP_TO_EDGE,[ar]:i.MIRRORED_REPEAT},fe={[Ot]:i.NEAREST,[mc]:i.NEAREST_MIPMAP_NEAREST,[ts]:i.NEAREST_MIPMAP_LINEAR,[Wt]:i.LINEAR,[Qs]:i.LINEAR_MIPMAP_NEAREST,[Rn]:i.LINEAR_MIPMAP_LINEAR},Ee={[qh]:i.NEVER,[eu]:i.ALWAYS,[Kh]:i.LESS,[Tc]:i.LEQUAL,[$h]:i.EQUAL,[Qh]:i.GEQUAL,[Zh]:i.GREATER,[Jh]:i.NOTEQUAL};function Be(w,x){if(x.type===rn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Wt||x.magFilter===Qs||x.magFilter===ts||x.magFilter===Rn||x.minFilter===Wt||x.minFilter===Qs||x.minFilter===ts||x.minFilter===Rn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,oe[x.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,oe[x.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,oe[x.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,fe[x.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,fe[x.minFilter]),x.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Ee[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ot||x.minFilter!==ts&&x.minFilter!==Rn||x.type===rn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Qe(w,x){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",C));const X=x.source;let $=d.get(X);$===void 0&&($={},d.set(X,$));const W=j(x);if(W!==w.__cacheKey){$[W]===void 0&&($[W]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),$[W].usedTimes++;const Se=$[w.__cacheKey];Se!==void 0&&($[w.__cacheKey].usedTimes--,Se.usedTimes===0&&T(x)),w.__cacheKey=W,w.__webglTexture=$[W].texture}return B}function tt(w,x,B){return Math.floor(Math.floor(w/B)/x)}function $e(w,x,B,X){const W=w.updateRanges;if(W.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,B,X,x.data);else{W.sort((ie,de)=>ie.start-de.start);let Se=0;for(let ie=1;ie<W.length;ie++){const de=W[Se],Ne=W[ie],Ae=de.start+de.count,he=tt(Ne.start,x.width,4),ke=tt(de.start,x.width,4);Ne.start<=Ae+1&&he===ke&&tt(Ne.start+Ne.count-1,x.width,4)===he?de.count=Math.max(de.count,Ne.start+Ne.count-de.start):(++Se,W[Se]=Ne)}W.length=Se+1;const ne=i.getParameter(i.UNPACK_ROW_LENGTH),me=i.getParameter(i.UNPACK_SKIP_PIXELS),be=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let ie=0,de=W.length;ie<de;ie++){const Ne=W[ie],Ae=Math.floor(Ne.start/4),he=Math.ceil(Ne.count/4),ke=Ae%x.width,N=Math.floor(Ae/x.width),se=he,re=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,ke),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,ke,N,se,re,B,X,x.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ne),i.pixelStorei(i.UNPACK_SKIP_PIXELS,me),i.pixelStorei(i.UNPACK_SKIP_ROWS,be)}}function q(w,x,B){let X=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=i.TEXTURE_3D);const $=Qe(w,x),W=x.source;t.bindTexture(X,w.__webglTexture,i.TEXTURE0+B);const Se=n.get(W);if(W.version!==Se.__version||$===!0){t.activeTexture(i.TEXTURE0+B);const ne=qe.getPrimaries(qe.workingColorSpace),me=x.colorSpace===kn?null:qe.getPrimaries(x.colorSpace),be=x.colorSpace===kn||ne===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);let ie=_(x.image,!1,s.maxTextureSize);ie=nt(x,ie);const de=r.convert(x.format,x.colorSpace),Ne=r.convert(x.type);let Ae=M(x.internalFormat,de,Ne,x.colorSpace,x.isVideoTexture);Be(X,x);let he;const ke=x.mipmaps,N=x.isVideoTexture!==!0,se=Se.__version===void 0||$===!0,re=W.dataReady,ye=b(x,ie);if(x.isDepthTexture)Ae=y(x.format===hs,x.type),se&&(N?t.texStorage2D(i.TEXTURE_2D,1,Ae,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Ae,ie.width,ie.height,0,de,Ne,null));else if(x.isDataTexture)if(ke.length>0){N&&se&&t.texStorage2D(i.TEXTURE_2D,ye,Ae,ke[0].width,ke[0].height);for(let J=0,K=ke.length;J<K;J++)he=ke[J],N?re&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,he.width,he.height,de,Ne,he.data):t.texImage2D(i.TEXTURE_2D,J,Ae,he.width,he.height,0,de,Ne,he.data);x.generateMipmaps=!1}else N?(se&&t.texStorage2D(i.TEXTURE_2D,ye,Ae,ie.width,ie.height),re&&$e(x,ie,de,Ne)):t.texImage2D(i.TEXTURE_2D,0,Ae,ie.width,ie.height,0,de,Ne,ie.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){N&&se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Ae,ke[0].width,ke[0].height,ie.depth);for(let J=0,K=ke.length;J<K;J++)if(he=ke[J],x.format!==Ct)if(de!==null)if(N){if(re)if(x.layerUpdates.size>0){const ve=wl(he.width,he.height,x.format,x.type);for(const Fe of x.layerUpdates){const ht=he.data.subarray(Fe*ve/he.data.BYTES_PER_ELEMENT,(Fe+1)*ve/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,Fe,he.width,he.height,1,de,ht)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,he.width,he.height,ie.depth,de,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,Ae,he.width,he.height,ie.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?re&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,he.width,he.height,ie.depth,de,Ne,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,Ae,he.width,he.height,ie.depth,0,de,Ne,he.data)}else{N&&se&&t.texStorage2D(i.TEXTURE_2D,ye,Ae,ke[0].width,ke[0].height);for(let J=0,K=ke.length;J<K;J++)he=ke[J],x.format!==Ct?de!==null?N?re&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,he.width,he.height,de,he.data):t.compressedTexImage2D(i.TEXTURE_2D,J,Ae,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?re&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,he.width,he.height,de,Ne,he.data):t.texImage2D(i.TEXTURE_2D,J,Ae,he.width,he.height,0,de,Ne,he.data)}else if(x.isDataArrayTexture)if(N){if(se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Ae,ie.width,ie.height,ie.depth),re)if(x.layerUpdates.size>0){const J=wl(ie.width,ie.height,x.format,x.type);for(const K of x.layerUpdates){const ve=ie.data.subarray(K*J/ie.data.BYTES_PER_ELEMENT,(K+1)*J/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,ie.width,ie.height,1,de,Ne,ve)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,de,Ne,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ae,ie.width,ie.height,ie.depth,0,de,Ne,ie.data);else if(x.isData3DTexture)N?(se&&t.texStorage3D(i.TEXTURE_3D,ye,Ae,ie.width,ie.height,ie.depth),re&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,de,Ne,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Ae,ie.width,ie.height,ie.depth,0,de,Ne,ie.data);else if(x.isFramebufferTexture){if(se)if(N)t.texStorage2D(i.TEXTURE_2D,ye,Ae,ie.width,ie.height);else{let J=ie.width,K=ie.height;for(let ve=0;ve<ye;ve++)t.texImage2D(i.TEXTURE_2D,ve,Ae,J,K,0,de,Ne,null),J>>=1,K>>=1}}else if(ke.length>0){if(N&&se){const J=lt(ke[0]);t.texStorage2D(i.TEXTURE_2D,ye,Ae,J.width,J.height)}for(let J=0,K=ke.length;J<K;J++)he=ke[J],N?re&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,de,Ne,he):t.texImage2D(i.TEXTURE_2D,J,Ae,de,Ne,he);x.generateMipmaps=!1}else if(N){if(se){const J=lt(ie);t.texStorage2D(i.TEXTURE_2D,ye,Ae,J.width,J.height)}re&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,Ne,ie)}else t.texImage2D(i.TEXTURE_2D,0,Ae,de,Ne,ie);m(x)&&p(X),Se.__version=W.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function Z(w,x,B){if(x.image.length!==6)return;const X=Qe(w,x),$=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+B);const W=n.get($);if($.version!==W.__version||X===!0){t.activeTexture(i.TEXTURE0+B);const Se=qe.getPrimaries(qe.workingColorSpace),ne=x.colorSpace===kn?null:qe.getPrimaries(x.colorSpace),me=x.colorSpace===kn||Se===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const be=x.isCompressedTexture||x.image[0].isCompressedTexture,ie=x.image[0]&&x.image[0].isDataTexture,de=[];for(let K=0;K<6;K++)!be&&!ie?de[K]=_(x.image[K],!0,s.maxCubemapSize):de[K]=ie?x.image[K].image:x.image[K],de[K]=nt(x,de[K]);const Ne=de[0],Ae=r.convert(x.format,x.colorSpace),he=r.convert(x.type),ke=M(x.internalFormat,Ae,he,x.colorSpace),N=x.isVideoTexture!==!0,se=W.__version===void 0||X===!0,re=$.dataReady;let ye=b(x,Ne);Be(i.TEXTURE_CUBE_MAP,x);let J;if(be){N&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,ke,Ne.width,Ne.height);for(let K=0;K<6;K++){J=de[K].mipmaps;for(let ve=0;ve<J.length;ve++){const Fe=J[ve];x.format!==Ct?Ae!==null?N?re&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve,0,0,Fe.width,Fe.height,Ae,Fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve,ke,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve,0,0,Fe.width,Fe.height,Ae,he,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve,ke,Fe.width,Fe.height,0,Ae,he,Fe.data)}}}else{if(J=x.mipmaps,N&&se){J.length>0&&ye++;const K=lt(de[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,ke,K.width,K.height)}for(let K=0;K<6;K++)if(ie){N?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,de[K].width,de[K].height,Ae,he,de[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,ke,de[K].width,de[K].height,0,Ae,he,de[K].data);for(let ve=0;ve<J.length;ve++){const ht=J[ve].image[K].image;N?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve+1,0,0,ht.width,ht.height,Ae,he,ht.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve+1,ke,ht.width,ht.height,0,Ae,he,ht.data)}}else{N?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ae,he,de[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,ke,Ae,he,de[K]);for(let ve=0;ve<J.length;ve++){const Fe=J[ve];N?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve+1,0,0,Ae,he,Fe.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve+1,ke,Ae,he,Fe.image[K])}}}m(x)&&p(i.TEXTURE_CUBE_MAP),W.__version=$.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function Me(w,x,B,X,$,W){const Se=r.convert(B.format,B.colorSpace),ne=r.convert(B.type),me=M(B.internalFormat,Se,ne,B.colorSpace),be=n.get(x),ie=n.get(B);if(ie.__renderTarget=x,!be.__hasExternalTextures){const de=Math.max(1,x.width>>W),Ne=Math.max(1,x.height>>W);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,W,me,de,Ne,x.depth,0,Se,ne,null):t.texImage2D($,W,me,de,Ne,0,Se,ne,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),ge(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,$,ie.__webglTexture,0,Ke(x)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,$,ie.__webglTexture,W),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(w,x,B){if(i.bindRenderbuffer(i.RENDERBUFFER,w),x.depthBuffer){const X=x.depthTexture,$=X&&X.isDepthTexture?X.type:null,W=y(x.stencilBuffer,$),Se=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=Ke(x);ge(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ne,W,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,W,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,W,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Se,i.RENDERBUFFER,w)}else{const X=x.textures;for(let $=0;$<X.length;$++){const W=X[$],Se=r.convert(W.format,W.colorSpace),ne=r.convert(W.type),me=M(W.internalFormat,Se,ne,W.colorSpace),be=Ke(x);B&&ge(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,be,me,x.width,x.height):ge(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be,me,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,me,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Te(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(x.depthTexture);X.__renderTarget=x,(!X.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G(x.depthTexture,0);const $=X.__webglTexture,W=Ke(x);if(x.depthTexture.format===cs)ge(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(x.depthTexture.format===hs)ge(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Ye(w){const x=n.get(w),B=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){const X=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){const $=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",$)};X.addEventListener("dispose",$),x.__depthDisposeCallback=$}x.__boundDepthTexture=X}if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const X=w.texture.mipmaps;X&&X.length>0?Te(x.__webglFramebuffer[0],w):Te(x.__webglFramebuffer,w)}else if(B){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=i.createRenderbuffer(),Oe(x.__webglDepthbuffer[X],w,!1);else{const $=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,W)}}else{const X=w.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Oe(x.__webglDepthbuffer,w,!1);else{const $=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,W)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function St(w,x,B){const X=n.get(w);x!==void 0&&Me(X.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Ye(w)}function R(w){const x=w.texture,B=n.get(w),X=n.get(x);w.addEventListener("dispose",L);const $=w.textures,W=w.isWebGLCubeRenderTarget===!0,Se=$.length>1;if(Se||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=x.version,a.memory.textures++),W){B.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[ne]=[];for(let me=0;me<x.mipmaps.length;me++)B.__webglFramebuffer[ne][me]=i.createFramebuffer()}else B.__webglFramebuffer[ne]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let ne=0;ne<x.mipmaps.length;ne++)B.__webglFramebuffer[ne]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Se)for(let ne=0,me=$.length;ne<me;ne++){const be=n.get($[ne]);be.__webglTexture===void 0&&(be.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&ge(w)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ne=0;ne<$.length;ne++){const me=$[ne];B.__webglColorRenderbuffer[ne]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ne]);const be=r.convert(me.format,me.colorSpace),ie=r.convert(me.type),de=M(me.internalFormat,be,ie,me.colorSpace,w.isXRRenderTarget===!0),Ne=Ke(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ne,de,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,B.__webglColorRenderbuffer[ne])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Oe(B.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Be(i.TEXTURE_CUBE_MAP,x);for(let ne=0;ne<6;ne++)if(x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)Me(B.__webglFramebuffer[ne][me],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,me);else Me(B.__webglFramebuffer[ne],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);m(x)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let ne=0,me=$.length;ne<me;ne++){const be=$[ne],ie=n.get(be);let de=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(de=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,ie.__webglTexture),Be(de,be),Me(B.__webglFramebuffer,w,be,i.COLOR_ATTACHMENT0+ne,de,0),m(be)&&p(de)}t.unbindTexture()}else{let ne=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ne=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,X.__webglTexture),Be(ne,x),x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)Me(B.__webglFramebuffer[me],w,x,i.COLOR_ATTACHMENT0,ne,me);else Me(B.__webglFramebuffer,w,x,i.COLOR_ATTACHMENT0,ne,0);m(x)&&p(ne),t.unbindTexture()}w.depthBuffer&&Ye(w)}function Re(w){const x=w.textures;for(let B=0,X=x.length;B<X;B++){const $=x[B];if(m($)){const W=v(w),Se=n.get($).__webglTexture;t.bindTexture(W,Se),p(W),t.unbindTexture()}}}const le=[],we=[];function ee(w){if(w.samples>0){if(ge(w)===!1){const x=w.textures,B=w.width,X=w.height;let $=i.COLOR_BUFFER_BIT;const W=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=n.get(w),ne=x.length>1;if(ne)for(let be=0;be<x.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const me=w.texture.mipmaps;me&&me.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let be=0;be<x.length;be++){if(w.resolveDepthBuffer&&(w.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),ne){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Se.__webglColorRenderbuffer[be]);const ie=n.get(x[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,B,X,0,0,B,X,$,i.NEAREST),l===!0&&(le.length=0,we.length=0,le.push(i.COLOR_ATTACHMENT0+be),w.depthBuffer&&w.resolveDepthBuffer===!1&&(le.push(W),we.push(W),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,we)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,le))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ne)for(let be=0;be<x.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,Se.__webglColorRenderbuffer[be]);const ie=n.get(x[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const x=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Ke(w){return Math.min(s.maxSamples,w.samples)}function ge(w){const x=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ie(w){const x=a.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function nt(w,x){const B=w.colorSpace,X=w.format,$=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==Lt&&B!==kn&&(qe.getTransfer(B)===ot?(X!==Ct||$!==gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),x}function lt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=O,this.setTexture2D=G,this.setTexture2DArray=Y,this.setTexture3D=Q,this.setTextureCube=V,this.rebindTextures=St,this.setupRenderTarget=R,this.updateRenderTargetMipmap=Re,this.updateMultisampleRenderTarget=ee,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=ge}function l_(i,e){function t(n,s=kn){let r;const a=qe.getTransfer(s);if(n===gn)return i.UNSIGNED_BYTE;if(n===co)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ho)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Mc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===yc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===gc)return i.BYTE;if(n===_c)return i.SHORT;if(n===os)return i.UNSIGNED_SHORT;if(n===lo)return i.INT;if(n===ai)return i.UNSIGNED_INT;if(n===rn)return i.FLOAT;if(n===gs)return i.HALF_FLOAT;if(n===xc)return i.ALPHA;if(n===vc)return i.RGB;if(n===Ct)return i.RGBA;if(n===cs)return i.DEPTH_COMPONENT;if(n===hs)return i.DEPTH_STENCIL;if(n===uo)return i.RED;if(n===fo)return i.RED_INTEGER;if(n===Sc)return i.RG;if(n===po)return i.RG_INTEGER;if(n===mo)return i.RGBA_INTEGER;if(n===er||n===tr||n===nr||n===ir)if(a===ot)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===tr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===nr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ir)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ea||n===Ta||n===ba||n===Aa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ea)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ta)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ba)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Aa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ra||n===wa||n===Ca)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ra||n===wa)return a===ot?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ca)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===La||n===Ia||n===Pa||n===Da||n===Na||n===Oa||n===Ua||n===Fa||n===Ba||n===ka||n===Ha||n===za||n===Va||n===Ga)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===La)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ia)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Pa)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Da)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Na)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Oa)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ua)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Fa)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ba)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ka)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ha)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===za)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Va)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ga)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Wa||n===Xa||n===Ya)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Wa)return a===ot?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Xa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ya)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ja||n===qa||n===Ka||n===$a)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ja)return r.COMPRESSED_RED_RGTC1_EXT;if(n===qa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ka)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$a)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ls?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const c_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,h_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class u_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new kc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Wn({vertexShader:c_,fragmentShader:h_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Tt(new mr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class d_ extends Hi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new u_,p={},v=t.getContextAttributes();let M=null,y=null;const b=[],C=[],L=new ze;let D=null;const T=new Nt;T.viewport=new Je;const E=new Nt;E.viewport=new Je;const P=[T,E],O=new Sd;let z=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=b[q];return Z===void 0&&(Z=new zr,b[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=b[q];return Z===void 0&&(Z=new zr,b[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=b[q];return Z===void 0&&(Z=new zr,b[q]=Z),Z.getHandSpace()};function G(q){const Z=C.indexOf(q.inputSource);if(Z===-1)return;const Me=b[Z];Me!==void 0&&(Me.update(q.inputSource,q.frame,c||a),Me.dispatchEvent({type:q.type,data:q.inputSource}))}function Y(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",Q);for(let q=0;q<b.length;q++){const Z=C[q];Z!==null&&(C[q]=null,b[q].disconnect(Z))}z=null,j=null,m.reset();for(const q in p)delete p[q];e.setRenderTarget(M),f=null,d=null,u=null,s=null,y=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(M=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",Q),v.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(L),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Oe=null,Te=null;v.depth&&(Te=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=v.stencil?hs:cs,Oe=v.stencil?ls:ai);const Ye={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ye),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new oi(d.textureWidth,d.textureHeight,{format:Ct,type:gn,depthTexture:new Bc(d.textureWidth,d.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Me={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Me),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new oi(f.framebufferWidth,f.framebufferHeight,{format:Ct,type:gn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),$e.setContext(s),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Q(q){for(let Z=0;Z<q.removed.length;Z++){const Me=q.removed[Z],Oe=C.indexOf(Me);Oe>=0&&(C[Oe]=null,b[Oe].disconnect(Me))}for(let Z=0;Z<q.added.length;Z++){const Me=q.added[Z];let Oe=C.indexOf(Me);if(Oe===-1){for(let Ye=0;Ye<b.length;Ye++)if(Ye>=C.length){C.push(Me),Oe=Ye;break}else if(C[Ye]===null){C[Ye]=Me,Oe=Ye;break}if(Oe===-1)break}const Te=b[Oe];Te&&Te.connect(Me)}}const V=new I,oe=new I;function fe(q,Z,Me){V.setFromMatrixPosition(Z.matrixWorld),oe.setFromMatrixPosition(Me.matrixWorld);const Oe=V.distanceTo(oe),Te=Z.projectionMatrix.elements,Ye=Me.projectionMatrix.elements,St=Te[14]/(Te[10]-1),R=Te[14]/(Te[10]+1),Re=(Te[9]+1)/Te[5],le=(Te[9]-1)/Te[5],we=(Te[8]-1)/Te[0],ee=(Ye[8]+1)/Ye[0],Ke=St*we,ge=St*ee,Ie=Oe/(-we+ee),nt=Ie*-we;if(Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(nt),q.translateZ(Ie),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Te[10]===-1)q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const lt=St+Ie,w=R+Ie,x=Ke-nt,B=ge+(Oe-nt),X=Re*R/w*lt,$=le*R/w*lt;q.projectionMatrix.makePerspective(x,B,X,$,lt,w),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Ee(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let Z=q.near,Me=q.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(Me=m.depthFar)),O.near=E.near=T.near=Z,O.far=E.far=T.far=Me,(z!==O.near||j!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),z=O.near,j=O.far),O.layers.mask=q.layers.mask|6,T.layers.mask=O.layers.mask&3,E.layers.mask=O.layers.mask&5;const Oe=q.parent,Te=O.cameras;Ee(O,Oe);for(let Ye=0;Ye<Te.length;Ye++)Ee(Te[Ye],Oe);Te.length===2?fe(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),Be(q,O,Oe)};function Be(q,Z,Me){Me===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(Me.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Oi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(q){return p[q]};let Qe=null;function tt(q,Z){if(h=Z.getViewerPose(c||a),g=Z,h!==null){const Me=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Oe=!1;Me.length!==O.cameras.length&&(O.cameras.length=0,Oe=!0);for(let R=0;R<Me.length;R++){const Re=Me[R];let le=null;if(f!==null)le=f.getViewport(Re);else{const ee=u.getViewSubImage(d,Re);le=ee.viewport,R===0&&(e.setRenderTargetTextures(y,ee.colorTexture,ee.depthStencilTexture),e.setRenderTarget(y))}let we=P[R];we===void 0&&(we=new Nt,we.layers.enable(R),we.viewport=new Je,P[R]=we),we.matrix.fromArray(Re.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(Re.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(le.x,le.y,le.width,le.height),R===0&&(O.matrix.copy(we.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Oe===!0&&O.cameras.push(we)}const Te=s.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const R=u.getDepthInformation(Me[0]);R&&R.isValid&&R.texture&&m.init(R,s.renderState)}if(Te&&Te.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let R=0;R<Me.length;R++){const Re=Me[R].camera;if(Re){let le=p[Re];le||(le=new kc,p[Re]=le);const we=u.getCameraImage(Re);le.sourceTexture=we}}}}for(let Me=0;Me<b.length;Me++){const Oe=C[Me],Te=b[Me];Oe!==null&&Te!==void 0&&Te.update(Oe,Z,c||a)}Qe&&Qe(q,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const $e=new Gc;$e.setAnimationLoop(tt),this.setAnimationLoop=function(q){Qe=q},this.dispose=function(){}}}const Qn=new Zt,f_=new Ge;function p_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ic(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,M,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,v,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Bt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Bt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),M=v.envMap,y=v.envMapRotation;M&&(m.envMap.value=M,Qn.copy(y),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),m.envMapRotation.value.setFromMatrix4(f_.makeRotationFromEuler(Qn)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Bt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function m_(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){const y=M.program;n.uniformBlockBinding(v,y)}function c(v,M){let y=s[v.id];y===void 0&&(g(v),y=h(v),s[v.id]=y,v.addEventListener("dispose",m));const b=M.program;n.updateUBOMapping(v,b);const C=e.render.frame;r[v.id]!==C&&(d(v),r[v.id]=C)}function h(v){const M=u();v.__bindingPointIndex=M;const y=i.createBuffer(),b=v.__size,C=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,b,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,y),y}function u(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const M=s[v.id],y=v.uniforms,b=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let C=0,L=y.length;C<L;C++){const D=Array.isArray(y[C])?y[C]:[y[C]];for(let T=0,E=D.length;T<E;T++){const P=D[T];if(f(P,C,T,b)===!0){const O=P.__offset,z=Array.isArray(P.value)?P.value:[P.value];let j=0;for(let G=0;G<z.length;G++){const Y=z[G],Q=_(Y);typeof Y=="number"||typeof Y=="boolean"?(P.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,O+j,P.__data)):Y.isMatrix3?(P.__data[0]=Y.elements[0],P.__data[1]=Y.elements[1],P.__data[2]=Y.elements[2],P.__data[3]=0,P.__data[4]=Y.elements[3],P.__data[5]=Y.elements[4],P.__data[6]=Y.elements[5],P.__data[7]=0,P.__data[8]=Y.elements[6],P.__data[9]=Y.elements[7],P.__data[10]=Y.elements[8],P.__data[11]=0):(Y.toArray(P.__data,j),j+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,M,y,b){const C=v.value,L=M+"_"+y;if(b[L]===void 0)return typeof C=="number"||typeof C=="boolean"?b[L]=C:b[L]=C.clone(),!0;{const D=b[L];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return b[L]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function g(v){const M=v.uniforms;let y=0;const b=16;for(let L=0,D=M.length;L<D;L++){const T=Array.isArray(M[L])?M[L]:[M[L]];for(let E=0,P=T.length;E<P;E++){const O=T[E],z=Array.isArray(O.value)?O.value:[O.value];for(let j=0,G=z.length;j<G;j++){const Y=z[j],Q=_(Y),V=y%b,oe=V%Q.boundary,fe=V+oe;y+=oe,fe!==0&&b-fe<Q.storage&&(y+=b-fe),O.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=Q.storage}}}const C=y%b;return C>0&&(y+=b-C),v.__size=y,v.__cache={},this}function _(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){const M=v.target;M.removeEventListener("dispose",m);const y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class g_{constructor(e={}){const{canvas:t=_u(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const v=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let b=!1;this._outputColorSpace=_t;let C=0,L=0,D=null,T=-1,E=null;const P=new Je,O=new Je;let z=null;const j=new pe(0);let G=0,Y=t.width,Q=t.height,V=1,oe=null,fe=null;const Ee=new Je(0,0,Y,Q),Be=new Je(0,0,Y,Q);let Qe=!1;const tt=new xo;let $e=!1,q=!1;const Z=new Ge,Me=new I,Oe=new Je,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ye=!1;function St(){return D===null?V:1}let R=n;function Re(S,U){return t.getContext(S,U)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${oo}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",J,!1),R===null){const U="webgl2";if(R=Re(U,S),R===null)throw Re(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let le,we,ee,Ke,ge,Ie,nt,lt,w,x,B,X,$,W,Se,ne,me,be,ie,de,Ne,Ae,he,ke;function N(){le=new Am(R),le.init(),Ae=new l_(R,le),we=new ym(R,le,e,Ae),ee=new a_(R,le),we.reversedDepthBuffer&&d&&ee.buffers.depth.setReversed(!0),Ke=new Cm(R),ge=new jg,Ie=new o_(R,le,ee,ge,we,Ae,Ke),nt=new vm(y),lt=new bm(y),w=new Nd(R),he=new _m(R,w),x=new Rm(R,w,Ke,he),B=new Im(R,x,w,Ke),ie=new Lm(R,we,Ie),ne=new xm(ge),X=new Yg(y,nt,lt,le,we,he,ne),$=new p_(y,ge),W=new Kg,Se=new t_(le),be=new gm(y,nt,lt,ee,B,f,l),me=new s_(y,B,we),ke=new m_(R,Ke,we,ee),de=new Mm(R,le,Ke),Ne=new wm(R,le,Ke),Ke.programs=X.programs,y.capabilities=we,y.extensions=le,y.properties=ge,y.renderLists=W,y.shadowMap=me,y.state=ee,y.info=Ke}N();const se=new d_(y,R);this.xr=se,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const S=le.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=le.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(S){S!==void 0&&(V=S,this.setSize(Y,Q,!1))},this.getSize=function(S){return S.set(Y,Q)},this.setSize=function(S,U,k=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=S,Q=U,t.width=Math.floor(S*V),t.height=Math.floor(U*V),k===!0&&(t.style.width=S+"px",t.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(Y*V,Q*V).floor()},this.setDrawingBufferSize=function(S,U,k){Y=S,Q=U,V=k,t.width=Math.floor(S*k),t.height=Math.floor(U*k),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(P)},this.getViewport=function(S){return S.copy(Ee)},this.setViewport=function(S,U,k,H){S.isVector4?Ee.set(S.x,S.y,S.z,S.w):Ee.set(S,U,k,H),ee.viewport(P.copy(Ee).multiplyScalar(V).round())},this.getScissor=function(S){return S.copy(Be)},this.setScissor=function(S,U,k,H){S.isVector4?Be.set(S.x,S.y,S.z,S.w):Be.set(S,U,k,H),ee.scissor(O.copy(Be).multiplyScalar(V).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(S){ee.setScissorTest(Qe=S)},this.setOpaqueSort=function(S){oe=S},this.setTransparentSort=function(S){fe=S},this.getClearColor=function(S){return S.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor(...arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,k=!0){let H=0;if(S){let F=!1;if(D!==null){const te=D.texture.format;F=te===mo||te===po||te===fo}if(F){const te=D.texture.type,ue=te===gn||te===ai||te===os||te===ls||te===co||te===ho,xe=be.getClearColor(),_e=be.getClearAlpha(),De=xe.r,Ue=xe.g,Ce=xe.b;ue?(g[0]=De,g[1]=Ue,g[2]=Ce,g[3]=_e,R.clearBufferuiv(R.COLOR,0,g)):(_[0]=De,_[1]=Ue,_[2]=Ce,_[3]=_e,R.clearBufferiv(R.COLOR,0,_))}else H|=R.COLOR_BUFFER_BIT}U&&(H|=R.DEPTH_BUFFER_BIT),k&&(H|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",J,!1),be.dispose(),W.dispose(),Se.dispose(),ge.dispose(),nt.dispose(),lt.dispose(),B.dispose(),he.dispose(),ke.dispose(),X.dispose(),se.dispose(),se.removeEventListener("sessionstart",un),se.removeEventListener("sessionend",Lo),Yn.stop()};function re(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const S=Ke.autoReset,U=me.enabled,k=me.autoUpdate,H=me.needsUpdate,F=me.type;N(),Ke.autoReset=S,me.enabled=U,me.autoUpdate=k,me.needsUpdate=H,me.type=F}function J(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function K(S){const U=S.target;U.removeEventListener("dispose",K),ve(U)}function ve(S){Fe(S),ge.remove(S)}function Fe(S){const U=ge.get(S).programs;U!==void 0&&(U.forEach(function(k){X.releaseProgram(k)}),S.isShaderMaterial&&X.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,k,H,F,te){U===null&&(U=Te);const ue=F.isMesh&&F.matrixWorld.determinant()<0,xe=th(S,U,k,H,F);ee.setMaterial(H,ue);let _e=k.index,De=1;if(H.wireframe===!0){if(_e=x.getWireframeAttribute(k),_e===void 0)return;De=2}const Ue=k.drawRange,Ce=k.attributes.position;let je=Ue.start*De,at=(Ue.start+Ue.count)*De;te!==null&&(je=Math.max(je,te.start*De),at=Math.min(at,(te.start+te.count)*De)),_e!==null?(je=Math.max(je,0),at=Math.min(at,_e.count)):Ce!=null&&(je=Math.max(je,0),at=Math.min(at,Ce.count));const gt=at-je;if(gt<0||gt===1/0)return;he.setup(F,H,xe,k,_e);let ut,ct=de;if(_e!==null&&(ut=w.get(_e),ct=Ne,ct.setIndex(ut)),F.isMesh)H.wireframe===!0?(ee.setLineWidth(H.wireframeLinewidth*St()),ct.setMode(R.LINES)):ct.setMode(R.TRIANGLES);else if(F.isLine){let Pe=H.linewidth;Pe===void 0&&(Pe=1),ee.setLineWidth(Pe*St()),F.isLineSegments?ct.setMode(R.LINES):F.isLineLoop?ct.setMode(R.LINE_LOOP):ct.setMode(R.LINE_STRIP)}else F.isPoints?ct.setMode(R.POINTS):F.isSprite&&ct.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ps("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ct.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(le.get("WEBGL_multi_draw"))ct.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Pe=F._multiDrawStarts,pt=F._multiDrawCounts,Ze=F._multiDrawCount,Ht=_e?w.get(_e).bytesPerElement:1,hi=ge.get(H).currentProgram.getUniforms();for(let zt=0;zt<Ze;zt++)hi.setValue(R,"_gl_DrawID",zt),ct.render(Pe[zt]/Ht,pt[zt])}else if(F.isInstancedMesh)ct.renderInstances(je,gt,F.count);else if(k.isInstancedBufferGeometry){const Pe=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,pt=Math.min(k.instanceCount,Pe);ct.renderInstances(je,gt,pt)}else ct.render(je,gt)};function ht(S,U,k){S.transparent===!0&&S.side===pn&&S.forceSinglePass===!1?(S.side=Bt,S.needsUpdate=!0,xs(S,U,k),S.side=cn,S.needsUpdate=!0,xs(S,U,k),S.side=pn):xs(S,U,k)}this.compile=function(S,U,k=null){k===null&&(k=S),p=Se.get(k),p.init(U),M.push(p),k.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),S!==k&&S.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const H=new Set;return S.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const te=F.material;if(te)if(Array.isArray(te))for(let ue=0;ue<te.length;ue++){const xe=te[ue];ht(xe,k,F),H.add(xe)}else ht(te,k,F),H.add(te)}),p=M.pop(),H},this.compileAsync=function(S,U,k=null){const H=this.compile(S,U,k);return new Promise(F=>{function te(){if(H.forEach(function(ue){ge.get(ue).currentProgram.isReady()&&H.delete(ue)}),H.size===0){F(S);return}setTimeout(te,10)}le.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let et=null;function Mn(S){et&&et(S)}function un(){Yn.stop()}function Lo(){Yn.start()}const Yn=new Gc;Yn.setAnimationLoop(Mn),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(S){et=S,se.setAnimationLoop(S),S===null?Yn.stop():Yn.start()},se.addEventListener("sessionstart",un),se.addEventListener("sessionend",Lo),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(U),U=se.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,U,D),p=Se.get(S,M.length),p.init(U),M.push(p),Z.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),tt.setFromProjectionMatrix(Z,mn,U.reversedDepth),q=this.localClippingEnabled,$e=ne.init(this.clippingPlanes,q),m=W.get(S,v.length),m.init(),v.push(m),se.enabled===!0&&se.isPresenting===!0){const te=y.xr.getDepthSensingMesh();te!==null&&Mr(te,U,-1/0,y.sortObjects)}Mr(S,U,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(oe,fe),Ye=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Ye&&be.addToRenderList(m,S),this.info.render.frame++,$e===!0&&ne.beginShadows();const k=p.state.shadowsArray;me.render(k,S,U),$e===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,F=m.transmissive;if(p.setupLights(),U.isArrayCamera){const te=U.cameras;if(F.length>0)for(let ue=0,xe=te.length;ue<xe;ue++){const _e=te[ue];Po(H,F,S,_e)}Ye&&be.render(S);for(let ue=0,xe=te.length;ue<xe;ue++){const _e=te[ue];Io(m,S,_e,_e.viewport)}}else F.length>0&&Po(H,F,S,U),Ye&&be.render(S),Io(m,S,U);D!==null&&L===0&&(Ie.updateMultisampleRenderTarget(D),Ie.updateRenderTargetMipmap(D)),S.isScene===!0&&S.onAfterRender(y,S,U),he.resetDefaultState(),T=-1,E=null,M.pop(),M.length>0?(p=M[M.length-1],$e===!0&&ne.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Mr(S,U,k,H){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)k=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||tt.intersectsSprite(S)){H&&Oe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Z);const ue=B.update(S),xe=S.material;xe.visible&&m.push(S,ue,xe,k,Oe.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||tt.intersectsObject(S))){const ue=B.update(S),xe=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Oe.copy(S.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Oe.copy(ue.boundingSphere.center)),Oe.applyMatrix4(S.matrixWorld).applyMatrix4(Z)),Array.isArray(xe)){const _e=ue.groups;for(let De=0,Ue=_e.length;De<Ue;De++){const Ce=_e[De],je=xe[Ce.materialIndex];je&&je.visible&&m.push(S,ue,je,k,Oe.z,Ce)}}else xe.visible&&m.push(S,ue,xe,k,Oe.z,null)}}const te=S.children;for(let ue=0,xe=te.length;ue<xe;ue++)Mr(te[ue],U,k,H)}function Io(S,U,k,H){const F=S.opaque,te=S.transmissive,ue=S.transparent;p.setupLightsView(k),$e===!0&&ne.setGlobalState(y.clippingPlanes,k),H&&ee.viewport(P.copy(H)),F.length>0&&ys(F,U,k),te.length>0&&ys(te,U,k),ue.length>0&&ys(ue,U,k),ee.buffers.depth.setTest(!0),ee.buffers.depth.setMask(!0),ee.buffers.color.setMask(!0),ee.setPolygonOffset(!1)}function Po(S,U,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new oi(1,1,{generateMipmaps:!0,type:le.has("EXT_color_buffer_half_float")||le.has("EXT_color_buffer_float")?gs:gn,minFilter:Rn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const te=p.state.transmissionRenderTarget[H.id],ue=H.viewport||P;te.setSize(ue.z*y.transmissionResolutionScale,ue.w*y.transmissionResolutionScale);const xe=y.getRenderTarget(),_e=y.getActiveCubeFace(),De=y.getActiveMipmapLevel();y.setRenderTarget(te),y.getClearColor(j),G=y.getClearAlpha(),G<1&&y.setClearColor(16777215,.5),y.clear(),Ye&&be.render(k);const Ue=y.toneMapping;y.toneMapping=Gn;const Ce=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),$e===!0&&ne.setGlobalState(y.clippingPlanes,H),ys(S,k,H),Ie.updateMultisampleRenderTarget(te),Ie.updateRenderTargetMipmap(te),le.has("WEBGL_multisampled_render_to_texture")===!1){let je=!1;for(let at=0,gt=U.length;at<gt;at++){const ut=U[at],ct=ut.object,Pe=ut.geometry,pt=ut.material,Ze=ut.group;if(pt.side===pn&&ct.layers.test(H.layers)){const Ht=pt.side;pt.side=Bt,pt.needsUpdate=!0,Do(ct,k,H,Pe,pt,Ze),pt.side=Ht,pt.needsUpdate=!0,je=!0}}je===!0&&(Ie.updateMultisampleRenderTarget(te),Ie.updateRenderTargetMipmap(te))}y.setRenderTarget(xe,_e,De),y.setClearColor(j,G),Ce!==void 0&&(H.viewport=Ce),y.toneMapping=Ue}function ys(S,U,k){const H=U.isScene===!0?U.overrideMaterial:null;for(let F=0,te=S.length;F<te;F++){const ue=S[F],xe=ue.object,_e=ue.geometry,De=ue.group;let Ue=ue.material;Ue.allowOverride===!0&&H!==null&&(Ue=H),xe.layers.test(k.layers)&&Do(xe,U,k,_e,Ue,De)}}function Do(S,U,k,H,F,te){S.onBeforeRender(y,U,k,H,F,te),S.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(y,U,k,H,S,te),F.transparent===!0&&F.side===pn&&F.forceSinglePass===!1?(F.side=Bt,F.needsUpdate=!0,y.renderBufferDirect(k,U,H,F,S,te),F.side=cn,F.needsUpdate=!0,y.renderBufferDirect(k,U,H,F,S,te),F.side=pn):y.renderBufferDirect(k,U,H,F,S,te),S.onAfterRender(y,U,k,H,F,te)}function xs(S,U,k){U.isScene!==!0&&(U=Te);const H=ge.get(S),F=p.state.lights,te=p.state.shadowsArray,ue=F.state.version,xe=X.getParameters(S,F.state,te,U,k),_e=X.getProgramCacheKey(xe);let De=H.programs;H.environment=S.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(S.isMeshStandardMaterial?lt:nt).get(S.envMap||H.environment),H.envMapRotation=H.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,De===void 0&&(S.addEventListener("dispose",K),De=new Map,H.programs=De);let Ue=De.get(_e);if(Ue!==void 0){if(H.currentProgram===Ue&&H.lightsStateVersion===ue)return Oo(S,xe),Ue}else xe.uniforms=X.getUniforms(S),S.onBeforeCompile(xe,y),Ue=X.acquireProgram(xe,_e),De.set(_e,Ue),H.uniforms=xe.uniforms;const Ce=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ce.clippingPlanes=ne.uniform),Oo(S,xe),H.needsLights=ih(S),H.lightsStateVersion=ue,H.needsLights&&(Ce.ambientLightColor.value=F.state.ambient,Ce.lightProbe.value=F.state.probe,Ce.directionalLights.value=F.state.directional,Ce.directionalLightShadows.value=F.state.directionalShadow,Ce.spotLights.value=F.state.spot,Ce.spotLightShadows.value=F.state.spotShadow,Ce.rectAreaLights.value=F.state.rectArea,Ce.ltc_1.value=F.state.rectAreaLTC1,Ce.ltc_2.value=F.state.rectAreaLTC2,Ce.pointLights.value=F.state.point,Ce.pointLightShadows.value=F.state.pointShadow,Ce.hemisphereLights.value=F.state.hemi,Ce.directionalShadowMap.value=F.state.directionalShadowMap,Ce.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ce.spotShadowMap.value=F.state.spotShadowMap,Ce.spotLightMatrix.value=F.state.spotLightMatrix,Ce.spotLightMap.value=F.state.spotLightMap,Ce.pointShadowMap.value=F.state.pointShadowMap,Ce.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=Ue,H.uniformsList=null,Ue}function No(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=sr.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function Oo(S,U){const k=ge.get(S);k.outputColorSpace=U.outputColorSpace,k.batching=U.batching,k.batchingColor=U.batchingColor,k.instancing=U.instancing,k.instancingColor=U.instancingColor,k.instancingMorph=U.instancingMorph,k.skinning=U.skinning,k.morphTargets=U.morphTargets,k.morphNormals=U.morphNormals,k.morphColors=U.morphColors,k.morphTargetsCount=U.morphTargetsCount,k.numClippingPlanes=U.numClippingPlanes,k.numIntersection=U.numClipIntersection,k.vertexAlphas=U.vertexAlphas,k.vertexTangents=U.vertexTangents,k.toneMapping=U.toneMapping}function th(S,U,k,H,F){U.isScene!==!0&&(U=Te),Ie.resetTextureUnits();const te=U.fog,ue=H.isMeshStandardMaterial?U.environment:null,xe=D===null?y.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Lt,_e=(H.isMeshStandardMaterial?lt:nt).get(H.envMap||ue),De=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ue=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ce=!!k.morphAttributes.position,je=!!k.morphAttributes.normal,at=!!k.morphAttributes.color;let gt=Gn;H.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(gt=y.toneMapping);const ut=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ct=ut!==void 0?ut.length:0,Pe=ge.get(H),pt=p.state.lights;if($e===!0&&(q===!0||S!==E)){const It=S===E&&H.id===T;ne.setState(H,S,It)}let Ze=!1;H.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==pt.state.version||Pe.outputColorSpace!==xe||F.isBatchedMesh&&Pe.batching===!1||!F.isBatchedMesh&&Pe.batching===!0||F.isBatchedMesh&&Pe.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Pe.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Pe.instancing===!1||!F.isInstancedMesh&&Pe.instancing===!0||F.isSkinnedMesh&&Pe.skinning===!1||!F.isSkinnedMesh&&Pe.skinning===!0||F.isInstancedMesh&&Pe.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Pe.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Pe.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Pe.instancingMorph===!1&&F.morphTexture!==null||Pe.envMap!==_e||H.fog===!0&&Pe.fog!==te||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==ne.numPlanes||Pe.numIntersection!==ne.numIntersection)||Pe.vertexAlphas!==De||Pe.vertexTangents!==Ue||Pe.morphTargets!==Ce||Pe.morphNormals!==je||Pe.morphColors!==at||Pe.toneMapping!==gt||Pe.morphTargetsCount!==ct)&&(Ze=!0):(Ze=!0,Pe.__version=H.version);let Ht=Pe.currentProgram;Ze===!0&&(Ht=xs(H,U,F));let hi=!1,zt=!1,Xi=!1;const mt=Ht.getUniforms(),Yt=Pe.uniforms;if(ee.useProgram(Ht.program)&&(hi=!0,zt=!0,Xi=!0),H.id!==T&&(T=H.id,zt=!0),hi||E!==S){ee.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),mt.setValue(R,"projectionMatrix",S.projectionMatrix),mt.setValue(R,"viewMatrix",S.matrixWorldInverse);const Ut=mt.map.cameraPosition;Ut!==void 0&&Ut.setValue(R,Me.setFromMatrixPosition(S.matrixWorld)),we.logarithmicDepthBuffer&&mt.setValue(R,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&mt.setValue(R,"isOrthographic",S.isOrthographicCamera===!0),E!==S&&(E=S,zt=!0,Xi=!0)}if(F.isSkinnedMesh){mt.setOptional(R,F,"bindMatrix"),mt.setOptional(R,F,"bindMatrixInverse");const It=F.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),mt.setValue(R,"boneTexture",It.boneTexture,Ie))}F.isBatchedMesh&&(mt.setOptional(R,F,"batchingTexture"),mt.setValue(R,"batchingTexture",F._matricesTexture,Ie),mt.setOptional(R,F,"batchingIdTexture"),mt.setValue(R,"batchingIdTexture",F._indirectTexture,Ie),mt.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&mt.setValue(R,"batchingColorTexture",F._colorsTexture,Ie));const jt=k.morphAttributes;if((jt.position!==void 0||jt.normal!==void 0||jt.color!==void 0)&&ie.update(F,k,Ht),(zt||Pe.receiveShadow!==F.receiveShadow)&&(Pe.receiveShadow=F.receiveShadow,mt.setValue(R,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Yt.envMap.value=_e,Yt.flipEnvMap.value=_e.isCubeTexture&&_e.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(Yt.envMapIntensity.value=U.environmentIntensity),zt&&(mt.setValue(R,"toneMappingExposure",y.toneMappingExposure),Pe.needsLights&&nh(Yt,Xi),te&&H.fog===!0&&$.refreshFogUniforms(Yt,te),$.refreshMaterialUniforms(Yt,H,V,Q,p.state.transmissionRenderTarget[S.id]),sr.upload(R,No(Pe),Yt,Ie)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(sr.upload(R,No(Pe),Yt,Ie),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&mt.setValue(R,"center",F.center),mt.setValue(R,"modelViewMatrix",F.modelViewMatrix),mt.setValue(R,"normalMatrix",F.normalMatrix),mt.setValue(R,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const It=H.uniformsGroups;for(let Ut=0,yr=It.length;Ut<yr;Ut++){const jn=It[Ut];ke.update(jn,Ht),ke.bind(jn,Ht)}}return Ht}function nh(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function ih(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(S,U,k){const H=ge.get(S);H.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),ge.get(S.texture).__webglTexture=U,ge.get(S.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:k,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){const k=ge.get(S);k.__webglFramebuffer=U,k.__useDefaultFramebuffer=U===void 0};const sh=R.createFramebuffer();this.setRenderTarget=function(S,U=0,k=0){D=S,C=U,L=k;let H=!0,F=null,te=!1,ue=!1;if(S){const _e=ge.get(S);if(_e.__useDefaultFramebuffer!==void 0)ee.bindFramebuffer(R.FRAMEBUFFER,null),H=!1;else if(_e.__webglFramebuffer===void 0)Ie.setupRenderTarget(S);else if(_e.__hasExternalTextures)Ie.rebindTextures(S,ge.get(S.texture).__webglTexture,ge.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ce=S.depthTexture;if(_e.__boundDepthTexture!==Ce){if(Ce!==null&&ge.has(Ce)&&(S.width!==Ce.image.width||S.height!==Ce.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(S)}}const De=S.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(ue=!0);const Ue=ge.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ue[U])?F=Ue[U][k]:F=Ue[U],te=!0):S.samples>0&&Ie.useMultisampledRTT(S)===!1?F=ge.get(S).__webglMultisampledFramebuffer:Array.isArray(Ue)?F=Ue[k]:F=Ue,P.copy(S.viewport),O.copy(S.scissor),z=S.scissorTest}else P.copy(Ee).multiplyScalar(V).floor(),O.copy(Be).multiplyScalar(V).floor(),z=Qe;if(k!==0&&(F=sh),ee.bindFramebuffer(R.FRAMEBUFFER,F)&&H&&ee.drawBuffers(S,F),ee.viewport(P),ee.scissor(O),ee.setScissorTest(z),te){const _e=ge.get(S.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,_e.__webglTexture,k)}else if(ue){const _e=U;for(let De=0;De<S.textures.length;De++){const Ue=ge.get(S.textures[De]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+De,Ue.__webglTexture,k,_e)}}else if(S!==null&&k!==0){const _e=ge.get(S.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,_e.__webglTexture,k)}T=-1},this.readRenderTargetPixels=function(S,U,k,H,F,te,ue,xe=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=ge.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ue!==void 0&&(_e=_e[ue]),_e){ee.bindFramebuffer(R.FRAMEBUFFER,_e);try{const De=S.textures[xe],Ue=De.format,Ce=De.type;if(!we.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!we.textureTypeReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-H&&k>=0&&k<=S.height-F&&(S.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+xe),R.readPixels(U,k,H,F,Ae.convert(Ue),Ae.convert(Ce),te))}finally{const De=D!==null?ge.get(D).__webglFramebuffer:null;ee.bindFramebuffer(R.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(S,U,k,H,F,te,ue,xe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=ge.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ue!==void 0&&(_e=_e[ue]),_e)if(U>=0&&U<=S.width-H&&k>=0&&k<=S.height-F){ee.bindFramebuffer(R.FRAMEBUFFER,_e);const De=S.textures[xe],Ue=De.format,Ce=De.type;if(!we.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!we.textureTypeReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const je=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,je),R.bufferData(R.PIXEL_PACK_BUFFER,te.byteLength,R.STREAM_READ),S.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+xe),R.readPixels(U,k,H,F,Ae.convert(Ue),Ae.convert(Ce),0);const at=D!==null?ge.get(D).__webglFramebuffer:null;ee.bindFramebuffer(R.FRAMEBUFFER,at);const gt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Mu(R,gt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,je),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,te),R.deleteBuffer(je),R.deleteSync(gt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,k=0){const H=Math.pow(2,-k),F=Math.floor(S.image.width*H),te=Math.floor(S.image.height*H),ue=U!==null?U.x:0,xe=U!==null?U.y:0;Ie.setTexture2D(S,0),R.copyTexSubImage2D(R.TEXTURE_2D,k,0,0,ue,xe,F,te),ee.unbindTexture()};const rh=R.createFramebuffer(),ah=R.createFramebuffer();this.copyTextureToTexture=function(S,U,k=null,H=null,F=0,te=null){te===null&&(F!==0?(ps("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=F,F=0):te=0);let ue,xe,_e,De,Ue,Ce,je,at,gt;const ut=S.isCompressedTexture?S.mipmaps[te]:S.image;if(k!==null)ue=k.max.x-k.min.x,xe=k.max.y-k.min.y,_e=k.isBox3?k.max.z-k.min.z:1,De=k.min.x,Ue=k.min.y,Ce=k.isBox3?k.min.z:0;else{const jt=Math.pow(2,-F);ue=Math.floor(ut.width*jt),xe=Math.floor(ut.height*jt),S.isDataArrayTexture?_e=ut.depth:S.isData3DTexture?_e=Math.floor(ut.depth*jt):_e=1,De=0,Ue=0,Ce=0}H!==null?(je=H.x,at=H.y,gt=H.z):(je=0,at=0,gt=0);const ct=Ae.convert(U.format),Pe=Ae.convert(U.type);let pt;U.isData3DTexture?(Ie.setTexture3D(U,0),pt=R.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ie.setTexture2DArray(U,0),pt=R.TEXTURE_2D_ARRAY):(Ie.setTexture2D(U,0),pt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);const Ze=R.getParameter(R.UNPACK_ROW_LENGTH),Ht=R.getParameter(R.UNPACK_IMAGE_HEIGHT),hi=R.getParameter(R.UNPACK_SKIP_PIXELS),zt=R.getParameter(R.UNPACK_SKIP_ROWS),Xi=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ut.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ut.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,De),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ue),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ce);const mt=S.isDataArrayTexture||S.isData3DTexture,Yt=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){const jt=ge.get(S),It=ge.get(U),Ut=ge.get(jt.__renderTarget),yr=ge.get(It.__renderTarget);ee.bindFramebuffer(R.READ_FRAMEBUFFER,Ut.__webglFramebuffer),ee.bindFramebuffer(R.DRAW_FRAMEBUFFER,yr.__webglFramebuffer);for(let jn=0;jn<_e;jn++)mt&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,ge.get(S).__webglTexture,F,Ce+jn),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,ge.get(U).__webglTexture,te,gt+jn)),R.blitFramebuffer(De,Ue,ue,xe,je,at,ue,xe,R.DEPTH_BUFFER_BIT,R.NEAREST);ee.bindFramebuffer(R.READ_FRAMEBUFFER,null),ee.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(F!==0||S.isRenderTargetTexture||ge.has(S)){const jt=ge.get(S),It=ge.get(U);ee.bindFramebuffer(R.READ_FRAMEBUFFER,rh),ee.bindFramebuffer(R.DRAW_FRAMEBUFFER,ah);for(let Ut=0;Ut<_e;Ut++)mt?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,jt.__webglTexture,F,Ce+Ut):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,jt.__webglTexture,F),Yt?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,It.__webglTexture,te,gt+Ut):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,It.__webglTexture,te),F!==0?R.blitFramebuffer(De,Ue,ue,xe,je,at,ue,xe,R.COLOR_BUFFER_BIT,R.NEAREST):Yt?R.copyTexSubImage3D(pt,te,je,at,gt+Ut,De,Ue,ue,xe):R.copyTexSubImage2D(pt,te,je,at,De,Ue,ue,xe);ee.bindFramebuffer(R.READ_FRAMEBUFFER,null),ee.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Yt?S.isDataTexture||S.isData3DTexture?R.texSubImage3D(pt,te,je,at,gt,ue,xe,_e,ct,Pe,ut.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(pt,te,je,at,gt,ue,xe,_e,ct,ut.data):R.texSubImage3D(pt,te,je,at,gt,ue,xe,_e,ct,Pe,ut):S.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,te,je,at,ue,xe,ct,Pe,ut.data):S.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,te,je,at,ut.width,ut.height,ct,ut.data):R.texSubImage2D(R.TEXTURE_2D,te,je,at,ue,xe,ct,Pe,ut);R.pixelStorei(R.UNPACK_ROW_LENGTH,Ze),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Ht),R.pixelStorei(R.UNPACK_SKIP_PIXELS,hi),R.pixelStorei(R.UNPACK_SKIP_ROWS,zt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Xi),te===0&&U.generateMipmaps&&R.generateMipmap(pt),ee.unbindTexture()},this.initRenderTarget=function(S){ge.get(S).__webglFramebuffer===void 0&&Ie.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Ie.setTextureCube(S,0):S.isData3DTexture?Ie.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ie.setTexture2DArray(S,0):Ie.setTexture2D(S,0),ee.unbindTexture()},this.resetState=function(){C=0,L=0,D=null,ee.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}const ta=1e-6;class __{constructor(e,t,n){Le(this,"camera");Le(this,"domElement");Le(this,"target");Le(this,"spherical");Le(this,"sphericalDelta");Le(this,"scale",1);Le(this,"panOffset");Le(this,"minDistance");Le(this,"maxDistance");Le(this,"minPolar");Le(this,"maxPolar");Le(this,"enableDamping");Le(this,"dampingFactor");Le(this,"enablePan");Le(this,"enableZoom");Le(this,"autoRotateSpeed");Le(this,"enabled",!0);Le(this,"autoRotate",!1);Le(this,"isUserInteracting",!1);Le(this,"pointers",[]);Le(this,"pointerPositions",{});Le(this,"animationId",null);Le(this,"lastFrameTs",performance.now());Le(this,"lastTapTime",0);Le(this,"homeSpherical");Le(this,"onPointerDownHandler",e=>this.onPointerDown(e));Le(this,"onPointerMoveHandler",e=>this.onPointerMove(e));Le(this,"onPointerUpHandler",e=>this.onPointerUp(e));Le(this,"onWheelHandler",e=>this.onWheel(e));Le(this,"onContextMenuHandler",e=>this.onContextMenu(e));this.camera=e,this.domElement=t,this.target=n?.target?.clone()??new I(0,1,0),this.minDistance=n?.minDistance??1.5,this.maxDistance=n?.maxDistance??8,this.minPolar=Math.max(.01,n?.minPolar??.15),this.maxPolar=Math.min(Math.PI-.01,n?.maxPolar??1.35),this.enableDamping=n?.enableDamping??!0,this.dampingFactor=n?.dampingFactor??.08,this.enablePan=n?.enablePan??!0,this.enableZoom=n?.enableZoom??!0,this.autoRotateSpeed=n?.autoRotateSpeed??Math.PI/90,this.spherical=new Ai,this.sphericalDelta=new Ai(0,0,0),this.panOffset=new I,this.updateSphericalFromCamera(),this.homeSpherical=this.spherical.clone(),this.setupEventListeners(),console.log("🔍 [OrbitTouchControls] Initialized",{target:this.target,minDistance:this.minDistance,maxDistance:this.maxDistance,minPolar:this.minPolar,maxPolar:this.maxPolar,enableDamping:this.enableDamping})}setTarget(e){this.target.copy(e),this.updateSphericalFromCamera(),this.homeSpherical=this.spherical.clone()}setDistanceLimits(e,t){this.minDistance=e,this.maxDistance=Math.max(t,e+.01)}fitToObject(e,t=.08){const n=new Xt().setFromObject(e),s=n.getSize(new I),r=n.getCenter(new I);console.log("🔍 [OrbitTouchControls] fitToObject called with object details:",{objectName:e.name,objectType:e.constructor.name,objectUuid:e.uuid,boundingBoxSize:s.toArray(),boundingBoxCenter:r.toArray(),marginPct:t}),this.target.copy(r),this.target.y=r.y+s.y*.15;const a=Math.max(s.x,s.y,s.z),o=this.camera.fov*(Math.PI/180),l=a/(2*Math.tan(o/2))*(1+t*2),c=window.innerHeight,h=c<700,u=c>=700&&c<1e3,d=h?1.3:u?1.2:1.15,f=l*d,g=An.clamp(f,this.minDistance,this.maxDistance);console.log("🔍 [OrbitTouchControls] Camera distance calculation:",{maxDimension:a.toFixed(3),fovRadians:o.toFixed(3),baseDistance:l.toFixed(3),finalDistance:f.toFixed(3),clampedDistance:g.toFixed(3),distanceLimits:{min:this.minDistance,max:this.maxDistance},wasDistanceClamped:f!==g}),this.spherical.radius=g;const _=Math.PI/2;this.spherical.phi=_,this.spherical.theta=Math.PI/4,this.updateCameraFromSpherical(!0),this.homeSpherical=this.spherical.clone(),console.log("🔍 [OrbitTouchControls] Fitted to object completed",{objectName:e.name,size:s.toArray(),center:r.toArray(),baseDistance:l.toFixed(3),calculatedDistance:f.toFixed(3),clampedDistance:g.toFixed(3),responsiveAdjustments:{screenHeight:c,screenCategory:h?"small":u?"medium":"large",targetY:this.target.y.toFixed(3),distanceMultiplier:d.toFixed(3),cameraAngle:_.toFixed(3)},cameraPosition:{radius:this.spherical.radius.toFixed(3),phi:this.spherical.phi.toFixed(3),theta:this.spherical.theta.toFixed(3)},targetPosition:{x:this.target.x.toFixed(3),y:this.target.y.toFixed(3),z:this.target.z.toFixed(3)}})}fitToBoundingBox(e,t=.08){if(!e||e.isEmpty()){console.warn("ORBIT_CONTROLS","Cannot fit to empty or invalid bounding box.");return}const n=e.getSize(new I),s=e.getCenter(new I);this.target.copy(s);const r=Math.max(n.x,n.y,n.z),a=this.camera.fov*(Math.PI/180);let o=r/(2*Math.tan(a/2))*(1+t*2);o=An.clamp(o,this.minDistance,this.maxDistance),this.spherical.radius=o,this.spherical.phi=Math.PI/2,this.spherical.theta=0,this.updateCameraFromSpherical(!0),this.homeSpherical=this.spherical.clone(),console.log("ORBIT_CONTROLS","Fitted camera to bounding box",{boxMin:e.min.toArray(),boxMax:e.max.toArray(),boxCenter:s.toArray(),boxSize:n.toArray(),calculatedDistance:o.toFixed(3),finalTarget:this.target.toArray(),finalSpherical:{radius:this.spherical.radius.toFixed(3),phi:this.spherical.phi.toFixed(3),theta:this.spherical.theta.toFixed(3)}})}async snapTo(e){const t=this.getPresetSpherical(e),n=this.spherical.clone(),s=800,r=performance.now();if("vibrate"in navigator)try{navigator.vibrate(8)}catch{}return new Promise(a=>{const o=()=>{const l=performance.now(),c=Math.min((l-r)/s,1),h=1-Math.pow(1-c,3);this.spherical.radius=An.lerp(n.radius,t.radius,h),this.spherical.phi=An.lerp(n.phi,t.phi,h),this.spherical.theta=An.lerp(n.theta,t.theta,h),this.updateCameraFromSpherical(!0),c<1?requestAnimationFrame(o):a()};requestAnimationFrame(o)})}setAutoRotate(e){this.autoRotate=e}reset(){this.spherical.copy(this.homeSpherical),this.panOffset.set(0,0,0),this.updateCameraFromSpherical(!0)}setCameraDistance(e){this.spherical.radius=An.clamp(e,this.minDistance,this.maxDistance),this.updateCameraFromSpherical(!0)}enable(){this.enabled=!0}disable(){this.enabled=!1,this.isUserInteracting=!1,this.pointers=[],this.pointerPositions={}}dispose(){this.disable(),this.domElement.removeEventListener("pointerdown",this.onPointerDownHandler),this.domElement.removeEventListener("pointermove",this.onPointerMoveHandler),this.domElement.removeEventListener("pointerup",this.onPointerUpHandler),this.domElement.removeEventListener("wheel",this.onWheelHandler),this.domElement.removeEventListener("contextmenu",this.onContextMenuHandler)}getPresetSpherical(e){const t=this.spherical.radius;switch(e){case"front":return new Ai(t,Math.PI/2,0);case"profile":return new Ai(t,Math.PI/2,Math.PI/2);case"back":return new Ai(t,Math.PI/2,Math.PI);case"threequarter":return new Ai(t,Math.PI/3,Math.PI/4);default:return this.spherical.clone()}}setupEventListeners(){this.domElement.addEventListener("pointerdown",this.onPointerDownHandler),this.domElement.addEventListener("pointermove",this.onPointerMoveHandler),this.domElement.addEventListener("pointerup",this.onPointerUpHandler),this.domElement.addEventListener("wheel",this.onWheelHandler,{passive:!1}),this.domElement.addEventListener("contextmenu",this.onContextMenuHandler)}onPointerDown(e){if(!this.enabled)return;e.pointerType==="touch"&&e.preventDefault(),this.pointers.push(e),this.pointerPositions[e.pointerId]=new ze(e.clientX,e.clientY),this.isUserInteracting=!0,this.domElement.setPointerCapture?.(e.pointerId);const t=performance.now();if(e.pointerType==="touch"&&t-this.lastTapTime<300&&(this.reset(),"vibrate"in navigator))try{navigator.vibrate(15)}catch{}this.lastTapTime=t}onPointerMove(e){if(!this.enabled||!this.isUserInteracting)return;const t=this.pointers.findIndex(n=>n.pointerId===e.pointerId);t!==-1&&(this.pointers[t]=e,this.pointers.length===1?this.handleOrbit(e):this.pointers.length===2&&this.handlePanAndZoom())}onPointerUp(e){const t=this.pointers.findIndex(n=>n.pointerId===e.pointerId);t!==-1&&this.pointers.splice(t,1),delete this.pointerPositions[e.pointerId],this.pointers.length===0&&(this.isUserInteracting=!1),this.domElement.releasePointerCapture?.(e.pointerId)}handleOrbit(e){const t=this.pointerPositions[e.pointerId];if(!t)return;const n=e.clientX-t.x,s=e.clientY-t.y,r=2*Math.PI/Math.max(1,this.domElement.clientHeight);this.sphericalDelta.theta-=n*r,this.sphericalDelta.phi-=s*r,t.set(e.clientX,e.clientY)}handlePanAndZoom(){if(this.pointers.length!==2)return;const[e,t]=this.pointers,n=this.pointerPositions[e.pointerId],s=this.pointerPositions[t.pointerId];if(!n||!s)return;const r=new ze(e.clientX,t.clientY),a=new ze(t.clientX,t.clientY),o=r.distanceTo(a),l=n.distanceTo(s);if(l>0){const c=o/l;this.scale*=c}if(this.enablePan){const c=r.clone().add(a).multiplyScalar(.5),h=n.clone().add(s).multiplyScalar(.5),u=c.sub(h),d=.002*this.spherical.radius,f=this.camera.matrix.elements,g=new I(f[0],f[1],f[2]).normalize().multiplyScalar(-u.x*d),_=new I(f[4],f[5],f[6]).normalize().multiplyScalar(u.y*d);this.panOffset.add(g).add(_)}this.pointerPositions[e.pointerId].copy(r),this.pointerPositions[t.pointerId].copy(a)}onWheel(e){if(!this.enabled||!this.enableZoom)return;e.preventDefault();const t=Math.pow(.95,e.deltaY/53);this.scale*=t}onContextMenu(e){e.preventDefault()}updateSphericalFromCamera(){const e=new I().subVectors(this.camera.position,this.target);this.spherical.setFromVector3(e)}updateCameraFromSpherical(e=!1){this.spherical.theta+=this.sphericalDelta.theta,this.spherical.phi+=this.sphericalDelta.phi,this.spherical.radius*=this.scale,this.spherical.phi=An.clamp(this.spherical.phi,this.minPolar,this.maxPolar),this.spherical.radius=An.clamp(this.spherical.radius,this.minDistance,this.maxDistance),this.panOffset.equals(new I)||this.target.add(this.panOffset);const t=new I().setFromSpherical(this.spherical);this.camera.position.copy(this.target).add(t),this.camera.lookAt(this.target),this.enableDamping?(this.sphericalDelta.theta*=1-this.dampingFactor,this.sphericalDelta.phi*=1-this.dampingFactor,this.panOffset.multiplyScalar(1-this.dampingFactor)):(this.sphericalDelta.set(0,0,0),this.panOffset.set(0,0,0)),this.scale=1}update(){if(!this.enabled)return;const e=performance.now(),t=Math.max(0,(e-this.lastFrameTs)/1e3);this.lastFrameTs=e,this.autoRotate&&!this.isUserInteracting&&(this.sphericalDelta.theta-=this.autoRotateSpeed*t),(this.enableDamping||this.autoRotate||this.isUserInteracting||Math.abs(this.sphericalDelta.theta)>ta||Math.abs(this.sphericalDelta.phi)>ta||!this.panOffset.equals(new I)||Math.abs(this.scale-1)>ta)&&this.updateCameraFromSpherical()}}function M_(i){if(!i)throw new Error("Scene is not initialized - cannot setup lighting");const e=new yt(16777215,3.2);e.position.set(2,4,3),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048,e.shadow.camera.near=.1,e.shadow.camera.far=20,e.shadow.camera.left=-5,e.shadow.camera.right=5,e.shadow.camera.top=5,e.shadow.camera.bottom=-5,e.shadow.bias=-1e-4,e.shadow.normalBias=.02,i.add(e);const t=new yt(16775418,2);t.position.set(-2,3,2),i.add(t);const n=new yt(16775413,1.6);n.position.set(0,2,-3),i.add(n);const s=new yt(16774640,.7);s.position.set(-4,1.5,0),i.add(s);const r=new yt(16774640,.7);r.position.set(4,1.5,0),i.add(r);const a=new yt(15790847,.5);a.position.set(1,4,-2),i.add(a);const o=new gr(16777215,.9);i.add(o);const l=new yt(16775408,.35);l.position.set(0,-1,2),i.add(l);const c=new Eo(14741759,15788256,.5);i.add(c);const h=new yt(16777211,.35);h.position.set(0,3,4),i.add(h),A.info("ENHANCED_SSS_LIGHTING_SETUP","Enhanced SSS-optimized lighting setup completed",{totalLights:10,lightingStrategy:"neutral_color_accurate_with_sss_optimization",keyLightIntensity:3.2,keyLightColor:"0xffffff (neutral white)",ambientReduced:"reduced_from_1.2_to_0.9_to_prevent_bronzing",temperatureVariation:"neutral_spectrum_for_accurate_skin_color",shadowQuality:"enhanced_with_bias_correction",intensityOptimization:"balanced_for_color_preservation",sceneChildren:i.children.length,lightsAdded:i.children.filter(u=>u.isLight).length,colorAccuracyOptimizations:{neutralColorTemperatures:!0,reducedAmbientIntensity:!0,multiDirectionalForSSS:!0,veryLightSkinSupport:!0,noBronzingEffect:!0},philosophy:"color_accurate_photo_realistic_skin_all_tones_including_very_light"})}function y_(i){A.info("MOBILE_LIGHTING","Setting up low-end mobile lighting (3 lights)",{philosophy:"ultra_performance_minimal_lights"});const e=new gr(16777215,1.2);i.add(e);const t=new yt(16777215,2.5);t.position.set(2,4,3),t.castShadow=!1,i.add(t);const n=new yt(16775418,1.5);n.position.set(-2,2,2),n.castShadow=!1,i.add(n),A.info("MOBILE_LIGHTING","Low-end mobile lighting complete",{totalLights:3,shadowsEnabled:!1,ambientIntensity:1.2,philosophy:"minimal_lights_maximum_performance"})}function x_(i){A.info("MOBILE_LIGHTING","Setting up medium mobile lighting (4 lights)",{philosophy:"balanced_performance_quality"});const e=new gr(16777215,1);i.add(e);const t=new yt(16777215,2.8);t.position.set(2,4,3),t.castShadow=!1,i.add(t);const n=new yt(16775418,1.8);n.position.set(-2,3,2),n.castShadow=!1,i.add(n);const s=new yt(16775413,1.2);s.position.set(0,2,-3),s.castShadow=!1,i.add(s),A.info("MOBILE_LIGHTING","Medium mobile lighting complete",{totalLights:4,shadowsEnabled:!1,philosophy:"balanced_mobile_lighting"})}function v_(i,e){A.info("MOBILE_LIGHTING","Setting up tablet lighting (6 lights)",{enableShadows:e,philosophy:"tablet_optimized_lighting"});const t=new gr(16777215,.9);i.add(t);const n=new yt(16777215,3);n.position.set(2,4,3),n.castShadow=e,e&&(n.shadow.mapSize.width=1024,n.shadow.mapSize.height=1024,n.shadow.camera.near=.1,n.shadow.camera.far=20,n.shadow.camera.left=-5,n.shadow.camera.right=5,n.shadow.camera.top=5,n.shadow.camera.bottom=-5,n.shadow.bias=-1e-4,n.shadow.normalBias=.02),i.add(n);const s=new yt(16775418,2);s.position.set(-2,3,2),s.castShadow=!1,i.add(s);const r=new yt(16775413,1.6);r.position.set(0,2,-3),r.castShadow=!1,i.add(r);const a=new Eo(14741759,15788256,.5);i.add(a);const o=new yt(16777211,.35);o.position.set(0,3,4),o.castShadow=!1,i.add(o),A.info("MOBILE_LIGHTING","Tablet lighting complete",{totalLights:6,shadowsEnabled:e,shadowMapSize:e?1024:0,philosophy:"tablet_quality_lighting"})}function S_(i,e){const{performanceLevel:t,maxLights:n,enableShadows:s}=e;A.info("MOBILE_LIGHTING","Setting up adaptive lighting",{performanceLevel:t,maxLights:n,enableShadows:s,philosophy:"adaptive_lighting_setup"});const r=[];i.traverse(a=>{a instanceof li&&r.push(a)}),r.forEach(a=>{i.remove(a),a.dispose()}),t==="low"||n<=3?y_(i):t==="medium"||n<=4?x_(i):v_(i,s),A.info("MOBILE_LIGHTING","Adaptive lighting setup complete",{finalLightCount:i.children.filter(a=>a instanceof li).length,philosophy:"adaptive_lighting_complete"})}function E_(i){const e=new to(i);e.compileEquirectangularShader();const t=new Nc,n=new pe(16777215);new pe(15260872);const s=new pe(12891552),r=new Eo(n,s,1);t.add(r);const a=new yt(16777215,1.5);a.position.set(5,10,7.5),t.add(a);const o=new yt(16775408,.8);o.position.set(-5,5,5),t.add(o);const c=e.fromScene(t,.04).texture;return e.dispose(),A.info("ENVIRONMENT_SETUP","Procedural environment map generated",{type:"neutral_studio",philosophy:"fallback_ibl_for_skin_rendering"}),c}function T_(i,e){A.info("ENVIRONMENT_SETUP","Setting up studio environment for IBL",{philosophy:"professional_ibl_skin_rendering"});const t=E_(e);return i.environment=t,i.background=null,A.info("ENVIRONMENT_SETUP","Studio environment configured",{hasEnvironment:!!i.environment,philosophy:"ibl_active_for_realistic_reflections"}),t}function b_(i){return i<.3?1.4:i>.7?.9:1.1}function A_(i,e,t=1){let n=0;return i.traverse(s=>{s instanceof Tt&&(Array.isArray(s.material)?s.material:[s.material]).forEach(a=>{(a instanceof Ft||a instanceof dt)&&(a.envMap=e,a.envMapIntensity=t,a.needsUpdate=!0,n++,A.debug("ENVIRONMENT_SETUP","Environment applied to material",{materialName:a.name||"unnamed",intensity:t,philosophy:"ibl_material_configuration"}))})}),A.info("ENVIRONMENT_SETUP","Environment maps applied to scene",{materialsUpdated:n,intensity:t,philosophy:"scene_ibl_complete"}),n}function R_(){const i=navigator.userAgent.toLowerCase(),e=/ipad|tablet|playbook|silk|(android(?!.*mobi))/i.test(i),t=/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(i),n=window.screen.width,s=window.screen.height,r=Math.min(n,s);return e||r>=768&&r<1024?"tablet":t||r<768?"mobile":"desktop"}function w_(i){const e=i.getExtension("WEBGL_debug_renderer_info");if(!e)return 2;const t=i.getParameter(e.UNMASKED_RENDERER_WEBGL).toLowerCase();return t.includes("nvidia")||t.includes("geforce")||t.includes("radeon")||t.includes("apple m1")||t.includes("apple m2")||t.includes("apple a15")||t.includes("apple a16")||t.includes("apple a17")?3:t.includes("intel hd")||t.includes("intel uhd")||t.includes("mali")||t.includes("adreno 3")||t.includes("adreno 4")||t.includes("powervr")?1:2}function qc(){const i=R_(),e=i==="mobile",t=i==="tablet",n=i==="desktop",s=document.createElement("canvas"),r=s.getContext("webgl2")||s.getContext("webgl");if(!r)throw new Error("WebGL not supported on this device");const a=!!s.getContext("webgl2"),o=r.getParameter(r.MAX_TEXTURE_SIZE),l=w_(r),c=window.devicePixelRatio||1,h=window.screen.width,u=window.screen.height,d=navigator.hardwareConcurrency||4,f=navigator.deviceMemory||null;let g;n?g=l>=2?"high":"medium":t?g=l>=3?"high":l>=2?"medium":"low":l>=3&&d>=6&&(!f||f>=4)?g="medium":g="low";const _=g==="low"||e&&d<4||f!==null&&f<2||o<2048,m={type:i,performanceLevel:g,isMobile:e,isTablet:t,isDesktop:n,gpuTier:l,maxTextureSize:o,supportsWebGL2:a,devicePixelRatio:c,screenWidth:h,screenHeight:u,hardwareConcurrency:d,deviceMemory:f,isLowEndDevice:_};return A.info("MOBILE_DETECTION","Device capabilities detected",{deviceType:i,performanceLevel:g,gpuTier:l,isLowEndDevice:_,hardwareConcurrency:d,deviceMemory:f,maxTextureSize:o,supportsWebGL2:a,philosophy:"device_capability_detection"}),m}function Kc(i){const{performanceLevel:e,isMobile:t,isLowEndDevice:n,devicePixelRatio:s}=i;let r;return n||t&&e==="low"?r={pixelRatio:1,shadowsEnabled:!1,shadowMapSize:0,maxLights:3,targetFPS:30,enablePostProcessing:!1,enableProceduralTextures:!1,textureQuality:"low",geometryLOD:"low",enableAutoRotate:!1,enableEnvironmentMap:!1,maxMorphTargets:15,throttleControlsMs:100}:t&&e==="medium"?r={pixelRatio:1,shadowsEnabled:!1,shadowMapSize:0,maxLights:4,targetFPS:30,enablePostProcessing:!1,enableProceduralTextures:!1,textureQuality:"medium",geometryLOD:"medium",enableAutoRotate:!1,enableEnvironmentMap:!0,maxMorphTargets:25,throttleControlsMs:50}:i.isTablet?r={pixelRatio:Math.min(s,1.5),shadowsEnabled:e==="high",shadowMapSize:1024,maxLights:6,targetFPS:60,enablePostProcessing:!1,enableProceduralTextures:e==="high",textureQuality:e==="high"?"high":"medium",geometryLOD:e==="high"?"high":"medium",enableAutoRotate:!0,enableEnvironmentMap:!0,maxMorphTargets:40,throttleControlsMs:16}:r={pixelRatio:Math.min(s,2),shadowsEnabled:!0,shadowMapSize:2048,maxLights:10,targetFPS:60,enablePostProcessing:!0,enableProceduralTextures:!0,textureQuality:"high",geometryLOD:"high",enableAutoRotate:!0,enableEnvironmentMap:!0,maxMorphTargets:-1,throttleControlsMs:16},A.info("MOBILE_DETECTION","Performance config generated",{performanceLevel:e,isMobile:t,isLowEndDevice:n,config:r,philosophy:"performance_config_optimization"}),r}function C_(i){const{container:e,finalGender:t,faceOnly:n,serverScanId:s,performanceConfig:r}=i,a=qc(),o=r||Kc(a);A.info("SCENE_MANAGER","Creating Three.js scene with mobile optimizations",{gender:t,faceOnly:n,serverScanId:s,containerSize:{width:e.clientWidth,height:e.clientHeight},deviceType:a.type,performanceLevel:a.performanceLevel,isMobile:a.isMobile,isLowEndDevice:a.isLowEndDevice,optimizedPixelRatio:o.pixelRatio,shadowsEnabled:o.shadowsEnabled,maxLights:o.maxLights,targetFPS:o.targetFPS,philosophy:"mobile_optimized_scene_creation"});const l=new g_({antialias:!a.isMobile,alpha:!0,powerPreference:a.isMobile?"default":"high-performance",preserveDrawingBuffer:!1,failIfMajorPerformanceCaveat:!1});l.setSize(e.clientWidth,e.clientHeight),l.setPixelRatio(o.pixelRatio),l.shadowMap.enabled=o.shadowsEnabled,o.shadowsEnabled&&(l.shadowMap.type=uc),l.outputColorSpace=_t,l.toneMapping=a.isMobile?dc:fc,l.toneMappingExposure=1.25,l.physicallyCorrectLights=!a.isMobile,l._performanceConfig=o,l._deviceCapabilities=a,e.appendChild(l.domElement);const c=new Nc;if(c.background=null,!n&&!a.isMobile){const M=new Pd(10,10,4473924,2236962);M.position.y=-.1,c.add(M),A.info("SCENE_MANAGER","Grid helper added (desktop only)",{philosophy:"desktop_debug_grid"})}else a.isMobile&&A.info("SCENE_MANAGER","Grid helper skipped on mobile for performance",{philosophy:"mobile_optimization_no_grid"});const h=n?35:40,u=new Nt(h,e.clientWidth/e.clientHeight,.01,100),d=e.clientWidth/e.clientHeight,f=d>1.5,g=d<.8;let _,m;n?(_=.65,m=1.65):(_=f?3.8:g?3.2:3.5,m=f?.8:g?.6:.7),u.position.set(0,m,_);const p=new __(u,l.domElement);p.enableDamping=!0,p.dampingFactor=.05,p.enableZoom=!0,p.enablePan=!1,n?(p.minDistance=.4,p.maxDistance=1.2):(p.minDistance=f?2.2:g?1.8:2,p.maxDistance=f?12:g?10:11),n?(p.minPolarAngle=Math.PI*.35,p.maxPolarAngle=Math.PI*.65,p.setTarget(new I(0,1.65,0))):(p.minPolarAngle=Math.PI*.05,p.maxPolarAngle=Math.PI*.95,p.setTarget(new I(0,1,0))),a.isMobile||a.isTablet?S_(c,{performanceLevel:a.performanceLevel,maxLights:o.maxLights,enableShadows:o.shadowsEnabled}):M_(c),o.enableEnvironmentMap?(T_(c,l),A.info("SCENE_MANAGER","IBL environment configured",{hasEnvironment:!!c.environment,philosophy:"photo_realistic_ibl_active"})):A.info("SCENE_MANAGER","IBL environment skipped for mobile performance",{philosophy:"mobile_no_environment_map"}),window.__THREE_RENDERER__=l,window.__THREE_CAMERA__=u,window.__THREE_SCENE__=c;const v={renderer:l,scene:c,camera:u,controls:p,containerId:`viewer_${Date.now()}`};return A.info("SCENE_MANAGER","Scene creation completed",{containerId:v.containerId,serverScanId:s,philosophy:"core_scene_created"}),v}function L_(i,e,t){return()=>{if(!i||!e||!t)return;const n=i.clientWidth,s=i.clientHeight;e.aspect=n/s,e.updateProjectionMatrix(),t.setSize(n,s)}}function I_(i,e=!1,t){const{scene:n,renderer:s,camera:r,controls:a}=i;let o=!1,l=null,c=!1;const h=s._performanceConfig,u=s._deviceCapabilities,d=h?.targetFPS||60,f=1e3/d;let g=performance.now();a.setAutoRotate(e);const _=()=>{document.hidden?(c=!0,l!==null&&(cancelAnimationFrame(l),l=null),A.info("SCENE_MANAGER","Animation loop paused (page hidden)",{philosophy:"mobile_battery_optimization"})):(c=!1,g=performance.now(),l=requestAnimationFrame(m),A.info("SCENE_MANAGER","Animation loop resumed (page visible)",{philosophy:"mobile_resume_rendering"}))};document.addEventListener("visibilitychange",_);const m=p=>{if(c)return;l=requestAnimationFrame(m);const v=p-g;v<f||(g=p-v%f,a.update(),s.render(n,r),o||(o=!0,t?.()))};return l=requestAnimationFrame(m),A.info("SCENE_MANAGER","Animation loop started with mobile optimizations",{autoRotate:e,containerId:i.containerId,isMobile:u?.isMobile,targetFPS:d,frameInterval:f,philosophy:"mobile_optimized_animation_loop"}),()=>{l!==null&&(cancelAnimationFrame(l),l=null),document.removeEventListener("visibilitychange",_),c=!0,A.info("SCENE_MANAGER","Animation loop stopped and cleaned up",{philosophy:"animation_loop_cleanup"})}}function P_(i){const{renderer:e,scene:t,controls:n}=i;if(A.info("SCENE_MANAGER","Starting scene resource disposal",{containerId:i.containerId,philosophy:"core_resource_cleanup"}),n&&n.dispose(),t&&(t.traverse(s=>{const r=s.geometry;r&&r.dispose();const a=s.material;a&&(Array.isArray(a)?a:[a]).forEach(l=>{Object.values(l).forEach(c=>{c&&typeof c.dispose=="function"&&c.dispose()}),l.dispose()})}),t.clear()),e){const r=e.getContext().getExtension("WEBGL_lose_context");e.dispose(),r&&r.loseContext(),e.domElement&&e.domElement.parentNode&&e.domElement.parentNode.removeChild(e.domElement);const a=e._cleanup;a&&a()}delete window.__THREE_RENDERER__,delete window.__THREE_CAMERA__,delete window.__THREE_SCENE__,A.info("SCENE_MANAGER","Scene resource disposal completed",{containerId:i.containerId,philosophy:"core_webgl_context_freed"})}function D_({container:i,finalGender:e,faceOnly:t,serverScanId:n,onSceneReady:s}){const[r,a]=ae.useState(!1),[o,l]=ae.useState(!1),[c,h]=ae.useState(null),u=ae.useRef(null),d=ae.useRef(null),f=ae.useRef(null),g=ae.useCallback(async()=>{if(!i||r||o||u.current){A.debug("SCENE_LIFECYCLE","Scene initialization blocked",{hasContainer:!!i,isInitialized:r,isInitializing:o,hasSceneInstance:!!u.current,serverScanId:n,philosophy:"initialization_guard"});return}l(!0),h(null);try{A.info("SCENE_LIFECYCLE","Starting scene initialization",{finalGender:e,faceOnly:t,serverScanId:n,containerSize:{width:i.clientWidth,height:i.clientHeight},philosophy:"scene_lifecycle_init"});const p=C_({container:i,finalGender:e,faceOnly:t,serverScanId:n});u.current=p;const v=L_(i,p.camera,p.renderer);window.addEventListener("resize",v),f.current=()=>window.removeEventListener("resize",v),a(!0),l(!1),s?.(),A.info("SCENE_LIFECYCLE","Scene initialization completed",{containerId:p.containerId,serverScanId:n,philosophy:"scene_lifecycle_ready"})}catch(p){const v=p instanceof Error?p.message:"Unknown error";h(v),l(!1),A.error("SCENE_LIFECYCLE","Scene initialization failed",{error:v,serverScanId:n,philosophy:"scene_lifecycle_error"})}},[i,e,t,n,r,o,s]),_=ae.useCallback((p=!1,v)=>{if(!u.current){A.warn("SCENE_LIFECYCLE","Cannot start render loop - no scene instance");return}const M=I_(u.current,p,()=>{A.debug("SCENE_LIFECYCLE","First frame rendered",{serverScanId:n})});d.current=M,A.info("SCENE_LIFECYCLE","Render loop started",{autoRotate:p,serverScanId:n,philosophy:"render_loop_active"})},[n]),m=ae.useCallback(()=>{A.info("SCENE_LIFECYCLE","Starting scene cleanup",{hasSceneInstance:!!u.current,serverScanId:n,philosophy:"scene_lifecycle_cleanup"}),d.current&&(d.current(),d.current=null),f.current&&(f.current(),f.current=null),u.current&&(P_(u.current),u.current=null),a(!1),l(!1),h(null),A.info("SCENE_LIFECYCLE","Scene cleanup completed",{serverScanId:n,philosophy:"scene_lifecycle_cleaned"})},[n]);return{isInitialized:r,isInitializing:o,error:c,scene:u.current?.scene||null,renderer:u.current?.renderer||null,camera:u.current?.camera||null,controls:u.current?.controls||null,initializeScene:g,startRenderLoop:_,cleanup:m}}function Jl(i,e){if(e===Wh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Za||e===Ec){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Za)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class N_ extends ci{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new k_(t)}),this.register(function(t){return new H_(t)}),this.register(function(t){return new K_(t)}),this.register(function(t){return new $_(t)}),this.register(function(t){return new Z_(t)}),this.register(function(t){return new V_(t)}),this.register(function(t){return new G_(t)}),this.register(function(t){return new W_(t)}),this.register(function(t){return new X_(t)}),this.register(function(t){return new B_(t)}),this.register(function(t){return new Y_(t)}),this.register(function(t){return new z_(t)}),this.register(function(t){return new q_(t)}),this.register(function(t){return new j_(t)}),this.register(function(t){return new U_(t)}),this.register(function(t){return new J_(t)}),this.register(function(t){return new Q_(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=as.extractUrlBase(e);a=as.resolveURL(c,this.path)}else a=as.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new ur(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===$c){try{a[Xe.KHR_BINARY_GLTF]=new e0(e)}catch(u){s&&s(u);return}r=JSON.parse(a[Xe.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new f0(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Xe.KHR_MATERIALS_UNLIT:a[u]=new F_;break;case Xe.KHR_DRACO_MESH_COMPRESSION:a[u]=new t0(r,this.dracoLoader);break;case Xe.KHR_TEXTURE_TRANSFORM:a[u]=new n0;break;case Xe.KHR_MESH_QUANTIZATION:a[u]=new i0;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function O_(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Xe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class U_{constructor(e){this.parser=e,this.name=Xe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new pe(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Lt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new yt(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new yd(h),c.distance=u;break;case"spot":c=new _d(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),dn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class F_{constructor(){this.name=Xe.KHR_MATERIALS_UNLIT}getMaterialType(){return zn}extendParams(e,t,n){const s=[];e.color=new pe(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Lt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,_t))}return Promise.all(s)}}class B_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class k_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ze(o,o)}return Promise.all(r)}}class H_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dt}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class z_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class V_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new pe(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Lt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,_t)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class G_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class W_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new pe().setRGB(o[0],o[1],o[2],Lt),Promise.all(r)}}class X_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dt}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Y_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new pe().setRGB(o[0],o[1],o[2],Lt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,_t)),Promise.all(r)}}class j_{constructor(e){this.parser=e,this.name=Xe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class q_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dt}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class K_{constructor(e){this.parser=e,this.name=Xe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class $_{constructor(e){this.parser=e,this.name=Xe.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class Z_{constructor(e){this.parser=e,this.name=Xe.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class J_{constructor(e){this.name=Xe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}}class Q_{constructor(e){this.name=Xe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==Kt.TRIANGLES&&c.mode!==Kt.TRIANGLE_STRIP&&c.mode!==Kt.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new Ge,m=new I,p=new Xn,v=new I(1,1,1),M=new ju(g.geometry,g.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,y),l.SCALE&&v.fromBufferAttribute(l.SCALE,y),M.setMatrixAt(y,_.compose(m,p,v));for(const y in l)if(y==="_COLOR_0"){const b=l[y];M.instanceColor=new Qa(b.array,b.itemSize,b.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,l[y]);ft.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),f.push(M)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const $c="glTF",es=12,Ql={JSON:1313821514,BIN:5130562};class e0{constructor(e){this.name=Xe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,es),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==$c)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-es,r=new DataView(e,es);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===Ql.JSON){const c=new Uint8Array(e,es+a,o);this.content=n.decode(c)}else if(l===Ql.BIN){const c=es+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class t0{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Xe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=io[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=io[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Ii[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(f)},o,c,Lt,d)})})}}class n0{constructor(){this.name=Xe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class i0{constructor(){this.name=Xe.KHR_MESH_QUANTIZATION}}class Zc extends Ms{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=s-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,m=-2*f+3*d,p=f-d,v=1-m,M=p-d+u;for(let y=0;y!==o;y++){const b=a[_+y+o],C=a[_+y+l]*h,L=a[g+y+o],D=a[g+y]*h;r[y]=v*b+M*C+m*L+p*D}return r}}const s0=new Xn;class r0 extends Zc{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return s0.fromArray(r).normalize().toArray(r),r}}const Kt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ii={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ec={9728:Ot,9729:Wt,9984:mc,9985:Qs,9986:ts,9987:Rn},tc={33071:Hn,33648:ar,10497:kt},na={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},io={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Fn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},a0={CUBICSPLINE:void 0,LINEAR:ds,STEP:us},ia={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function o0(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Ft({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:cn})),i.DefaultMaterial}function ei(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function dn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function l0(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function c0(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function h0(i){let e;const t=i.extensions&&i.extensions[Xe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+sa(t.attributes):e=i.indices+":"+sa(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+sa(i.targets[n]);return e}function sa(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function so(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function u0(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const d0=new Ge;class f0{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new O_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new md(this.options.manager):this.textureLoader=new vd(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ur(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return ei(r,o,s),dn(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Xe.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(as.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=na[s.type],o=Ii[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new At(c,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=na[s.type],c=Ii[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let M=t.cache.get(v);M||(_=new c(o,p*f,s.count*f/h),M=new Gu(_,f/h),t.cache.add(v,M)),m=new Mo(M,l,d%f/h,g)}else o===null?_=new c(s.count*l):_=new c(o,d,s.count*l),m=new At(_,l,g);if(s.sparse!==void 0){const p=na.SCALAR,v=Ii[s.sparse.indices.componentType],M=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,b=new v(a[1],M,s.sparse.count*p),C=new c(a[2],y,s.sparse.count*l);o!==null&&(m=new At(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let L=0,D=b.length;L<D;L++){const T=b[L];if(m.setX(T,C[L*l]),l>=2&&m.setY(T,C[L*l+1]),l>=3&&m.setZ(T,C[L*l+2]),l>=4&&m.setW(T,C[L*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=ec[d.magFilter]||Wt,h.minFilter=ec[d.minFilter]||Rn,h.wrapS=tc[d.wrapS]||kt,h.wrapT=tc[d.wrapT]||kt,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ot&&h.minFilter!==Wt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new bt(_);m.needsUpdate=!0,d(m)}),t.load(as.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),dn(u,a),u.userData.mimeType=a.mimeType||u0(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Xe.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Xe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[Xe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Fc,$t.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new vo,$t.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Ft}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[Xe.KHR_MATERIALS_UNLIT]){const u=s[Xe.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new pe(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Lt),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,_t)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=pn);const h=r.alphaMode||ia.OPAQUE;if(h===ia.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===ia.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==zn&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ze(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==zn&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==zn){const u=r.emissiveFactor;o.emissive=new pe().setRGB(u[0],u[1],u[2],Lt)}return r.emissiveTexture!==void 0&&a!==zn&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,_t)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),dn(u,r),t.associations.set(u,{materials:e}),r.extensions&&ei(s,u,r),u})}createUniqueName(e){const t=st.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[Xe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return nc(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=h0(c),u=s[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[Xe.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=nc(new Jt,c,t),s[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?o0(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=a[f];let p;const v=c[f];if(m.mode===Kt.TRIANGLES||m.mode===Kt.TRIANGLE_STRIP||m.mode===Kt.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new wn(_,v):new Tt(_,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Kt.TRIANGLE_STRIP?p.geometry=Jl(p.geometry,Ec):m.mode===Kt.TRIANGLE_FAN&&(p.geometry=Jl(p.geometry,Za));else if(m.mode===Kt.LINES)p=new Uc(_,v);else if(m.mode===Kt.LINE_STRIP)p=new So(_,v);else if(m.mode===Kt.LINE_LOOP)p=new Zu(_,v);else if(m.mode===Kt.POINTS)p=new Ju(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&c0(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),dn(p,r),m.extensions&&ei(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ei(s,u[0],r),u[0];const d=new ri;r.extensions&&ei(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Nt(An.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new bo(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),dn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new Ge;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new yo(o,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const f=s.channels[u],g=s.samplers[f.sampler],_=f.target,m=_.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,v=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",v)),c.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let M=0,y=d.length;M<y;M++){const b=d[M],C=f[M],L=g[M],D=_[M],T=m[M];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const E=n._createAnimationTracks(b,C,L,D,T);if(E)for(let P=0;P<E.length;P++)p.push(E[P])}const v=new ld(r,void 0,p);return dn(v,s),v})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,d0)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new Oc:c.length>1?h=new ri:c.length===1?h=c[0]:h=new ft,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),dn(h,r),r.extensions&&ei(n,h,r),r.matrix!==void 0){const u=new Ge;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new ri;n.name&&(r.name=s.createUniqueName(n.name)),dn(r,n),n.extensions&&ei(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of s.associations)(d instanceof $t||d instanceof bt)&&u.set(d,f);return h.traverse(d=>{const f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,l=[];Fn[r.path]===Fn.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(Fn[r.path]){case Fn.weights:c=Fi;break;case Fn.rotation:c=Bi;break;case Fn.translation:case Fn.scale:c=ki;break;default:switch(n.itemSize){case 1:c=Fi;break;case 2:case 3:default:c=ki;break}break}const h=s.interpolation!==void 0?a0[s.interpolation]:ds,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+Fn[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=so(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Bi?r0:Zc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function p0(i,e,t){const n=e.attributes,s=new Xt;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new I(l[0],l[1],l[2]),new I(c[0],c[1],c[2])),o.normalized){const h=so(Ii[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new I,l=new I;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=so(Ii[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new _n;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function nc(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(const a in n){const o=io[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return qe.workingColorSpace!==Lt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qe.workingColorSpace}" not supported.`),dn(i,e),p0(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?l0(i,e.targets,t):i})}const ra=new WeakMap;class m0 extends ci{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,s){const r=new ur(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,a=>{this.parse(a,t,s)},n,s)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,_t,n).catch(n)}decodeDracoFile(e,t,n,s,r=Lt,a=()=>{}){const o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:s||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:r};return this.decodeGeometry(e,o).then(t).catch(a)}decodeGeometry(e,t){const n=JSON.stringify(t);if(ra.has(e)){const l=ra.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let s;const r=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(r,a).then(l=>(s=l,new Promise((c,h)=>{s._callbacks[r]={resolve:c,reject:h},s.postMessage({type:"decode",id:r,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{s&&r&&this._releaseTask(s,r)}),ra.set(e,{key:n,promise:o}),o}_createGeometry(e){const t=new Jt;e.index&&t.setIndex(new At(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const s=e.attributes[n],r=s.name,a=s.array,o=s.itemSize,l=new At(a,o);r==="color"&&(this._assignVertexColorSpace(l,s.vertexColorSpace),l.normalized=!(a instanceof Float32Array)),t.setAttribute(r,l)}return t}_assignVertexColorSpace(e,t){if(t!==_t)return;const n=new pe;for(let s=0,r=e.count;s<r;s++)n.fromBufferAttribute(e,s),qe.colorSpaceToWorking(n,_t),e.setXYZ(s,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new ur(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((s,r)=>{n.load(e,s,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const s=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const r=g0.toString(),a=["/* draco decoder */",s,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const s=new Worker(this.workerSourceURL);s._callbacks={},s._taskCosts={},s._taskLoad=0,s.postMessage({type:"init",decoderConfig:this.decoderConfig}),s.onmessage=function(r){const a=r.data;switch(a.type){case"decode":s._callbacks[a.id].resolve(a);break;case"error":s._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(s)}else this.workerPool.sort(function(s,r){return s._taskLoad>r._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function g0(){let i,e;onmessage=function(a){const o=a.data;switch(o.type){case"init":i=o.decoderConfig,e=new Promise(function(h){i.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(i)});break;case"decode":const l=o.buffer,c=o.taskConfig;e.then(h=>{const u=h.draco,d=new u.Decoder;try{const f=t(u,d,new Int8Array(l),c),g=f.attributes.map(_=>_.array.buffer);f.index&&g.push(f.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:f},g)}catch(f){console.error(f),self.postMessage({type:"error",id:o.id,error:f.message})}finally{u.destroy(d)}});break}};function t(a,o,l,c){const h=c.attributeIDs,u=c.attributeTypes;let d,f;const g=o.GetEncodedGeometryType(l);if(g===a.TRIANGULAR_MESH)d=new a.Mesh,f=o.DecodeArrayToMesh(l,l.byteLength,d);else if(g===a.POINT_CLOUD)d=new a.PointCloud,f=o.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());const _={index:null,attributes:[]};for(const m in h){const p=self[u[m]];let v,M;if(c.useUniqueIDs)M=h[m],v=o.GetAttributeByUniqueId(d,M);else{if(M=o.GetAttributeId(d,a[h[m]]),M===-1)continue;v=o.GetAttribute(d,M)}const y=s(a,o,d,m,p,v);m==="color"&&(y.vertexColorSpace=c.vertexColorSpace),_.attributes.push(y)}return g===a.TRIANGULAR_MESH&&(_.index=n(a,o,d)),a.destroy(d),_}function n(a,o,l){const h=l.num_faces()*3,u=h*4,d=a._malloc(u);o.GetTrianglesUInt32Array(l,u,d);const f=new Uint32Array(a.HEAPF32.buffer,d,h).slice();return a._free(d),{array:f,itemSize:1}}function s(a,o,l,c,h,u){const d=u.num_components(),g=l.num_points()*d,_=g*h.BYTES_PER_ELEMENT,m=r(a,h),p=a._malloc(_);o.GetAttributeDataArrayForAllPoints(l,u,m,_,p);const v=new h(a.HEAPF32.buffer,p,g).slice();return a._free(p),{name:c,array:v,itemSize:d}}function r(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}function _0(i){const e=performance.now();A.debug("MESH_SANITIZER","Starting avatar scene sanitization",{rootName:i.name,rootChildren:i.children.length});let t=null;const n=[],s=[];i.traverse(o=>{o instanceof wn&&o.morphTargetDictionary&&(n.push(o),A.debug("MESH_SANITIZER","Found candidate mesh",{meshName:o.name})),o.name&&M0(o)&&s.push(o)});const r=n.filter(o=>o.name.toLowerCase().includes("basemesh"));r.length>0?t=r.reduce((o,l)=>{const c=Object.keys(o.morphTargetDictionary||{}).length;return Object.keys(l.morphTargetDictionary||{}).length>c?l:o}):n.length>0&&(t=n.reduce((o,l)=>{const c=Object.keys(o.morphTargetDictionary||{}).length;return Object.keys(l.morphTargetDictionary||{}).length>c?l:o})),s.forEach(o=>{if(o.parent&&(o.parent.remove(o),o.isMesh)){const l=o;l.geometry&&l.geometry.dispose(),l.material&&(Array.isArray(l.material)?l.material.forEach(c=>c.dispose()):l.material.dispose())}}),i.traverse(o=>{if(o.isMesh&&o.morphTargetDictionary){const l=o,c=l.morphTargetDictionary,h=l.morphTargetInfluences,u=["BS_LOD0.AnimClitorisExpose","BS_LOD0.AnimGensOpen","BS_LOD0.AnimAnusOpen","BS_LOD0.BodyGenitals","BS_LOD0.BodyPenis","BS_LOD0.BodyVulva"];for(const d of u)d in c&&(h[c[d]]=0)}}),t&&(t.visible=!0);const a=performance.now()-e;return A.info("MESH_SANITIZER","Sanitization completed",{selectedMainMesh:t?.name||"none",removedObjects:s.length,durationMs:a.toFixed(1)}),t}function M0(i){const e=i.name.toLowerCase(),t=["genital","penis","vulva","vagina"],n=["cs_","solid_","arrow_","circle_","triangle_","bar_","torus_"];return[...t,...n].some(r=>e.includes(r))}function y0(i,e){if(!i||!i.bones){A.warn("BONE_SANITIZER","Invalid skeleton provided");return}const t=new Set([].map(s=>s.toLowerCase()));let n=0;i.bones.forEach(s=>{const r=(s.name||"").toLowerCase();t.has(r)||(s.scale.x!==1||s.scale.y!==1||s.scale.z!==1)&&(s.scale.set(1,1,1),s.updateMatrix(),s.updateMatrixWorld(!0),n++)}),n>0&&(A.info("BONE_SANITIZER",`Neutralized ${n} bone scales`),i.update())}const qs={male:"M_character_uniq.glb",female:"F_character_uniq_4.13.glb"};async function x0(i){const e=qs[i]||qs.male;A.info("ASSETS_REPO","📦 GETTING SIGNED MODEL URL FOR GENDER",{inputGender:i,inputGenderType:typeof i,modelPath:e,isMale:i==="male",isFemale:i==="female",usedFallback:!qs[i],availableGenders:Object.keys(qs),timestamp:new Date().toISOString(),philosophy:"private_storage_signed_url"});const t=await uh(dh.MODELS_3D,e);if(!t)throw A.error("ASSETS_REPO","Failed to get signed URL for model",{gender:i,modelPath:e,philosophy:"signed_url_failure"}),new Error(`Failed to get signed URL for ${i} model`);return t}const aa=new Map;async function v0(i){const{scene:e,finalGender:t,faceOnly:n,serverScanId:s,abortSignal:r}=i,a=performance.now();if(A.info("MODEL_LOADER","Starting model loading process",{gender:t,faceOnly:n,serverScanId:s,cacheSize:aa.size,philosophy:"core_model_loading"}),r?.aborted)throw new Error("Model loading was aborted before starting");const o=await x0(t);A.info("MODEL_LOADER","🎯 LOADING MODEL WITH FINAL GENDER AND SIGNED URL",{finalGenderParameter:t,finalGenderType:typeof t,hasModelUrl:!!o,serverScanId:s,philosophy:"model_loading_with_signed_url"});let l=aa.get(t);if(l)A.info("MODEL_LOADER","Using cached model",{gender:t,serverScanId:s});else{A.info("MODEL_LOADER","Fetching model from URL",{gender:t,modelUrl:o.substring(0,50)+"...",serverScanId:s});const y=new N_,b=new m0;b.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"),y.setDRACOLoader(b),l=(await new Promise((D,T)=>{if(r?.aborted){T(new Error("Model loading was aborted"));return}y.load(o,E=>{A.info("MODEL_LOADER","Model downloaded successfully",{gender:t,serverScanId:s,hasScene:!!E.scene,sceneChildren:E.scene.children.length,loadDuration:(performance.now()-a).toFixed(2)+"ms"}),D(E)},E=>{A.debug("MODEL_LOADER","Model loading progress",{loaded:E.loaded,total:E.total,percentage:E.total>0?(E.loaded/E.total*100).toFixed(1)+"%":"unknown",serverScanId:s})},E=>{A.error("MODEL_LOADER","Model download failed",{error:E instanceof Error?E.message:"Unknown error",gender:t,serverScanId:s}),T(E)}),r?.addEventListener("abort",()=>{T(new Error("Model loading was aborted"))})})).scene;const L=_0(l);if(!L)throw new Error("No main mesh with morph targets found");L.skeleton&&y0(L.skeleton),aa.set(t,l),A.info("MODEL_LOADER","Model structure inspection after GLTF loading",{gender:t,modelRootChildren:l.children.length,childrenTypes:l.children.map(D=>({name:D.name,type:D.type,isSkinnedMesh:D instanceof wn,hasMorphTargets:D instanceof wn?!!D.morphTargetDictionary:!1,morphTargetsCount:D instanceof wn?Object.keys(D.morphTargetDictionary||{}).length:0})),serverScanId:s}),A.info("MODEL_LOADER","Model processed and cached",{gender:t,mainMeshName:L.name,morphTargetsCount:Object.keys(L.morphTargetDictionary||{}).length,serverScanId:s})}if(r?.aborted)throw new Error("Model loading was aborted before scene attachment");const c=l.clone(!0);e.add(c);let h=null;if(c.traverse(y=>{y instanceof wn&&y.morphTargetDictionary&&(!h||Object.keys(y.morphTargetDictionary).length>Object.keys(h.morphTargetDictionary||{}).length)&&(h=y)}),!h)throw new Error("No main mesh found for camera fitting");A.info("MODEL_LOADER","Main mesh identification and properties",{mainMeshName:h.name,hasMorphTargetDictionary:!!h.morphTargetDictionary,morphTargetDictionaryKeys:h.morphTargetDictionary?Object.keys(h.morphTargetDictionary):[],morphTargetInfluencesLength:h.morphTargetInfluences?h.morphTargetInfluences.length:0,morphTargetInfluencesValues:h.morphTargetInfluences?h.morphTargetInfluences.slice(0,10):[],serverScanId:s});const u=new Xt().setFromObject(c),d=u.getSize(new I),f=u.getCenter(new I),_=1.6/d.y;c.scale.setScalar(_);const m=f.multiplyScalar(_);c.position.set(0,-m.y*.95,0);const p=new Xt().setFromObject(c);p.getSize(new I);const v=p.getCenter(new I);c.position.y=-v.y;let M;return A.info("MODEL_LOADER","Model loaded and positioned successfully",{modelName:c.name,mainMeshName:h.name,morphTargetsCount:Object.keys(h.morphTargetDictionary||{}).length,serverScanId:s}),{modelInstance:c,mainMesh:h,skeletonHelper:M}}function S0(i,e){A.info("MODEL_LOADER","Removing all models from scene",{serverScanId:e,philosophy:"core_model_cleanup"});const t=[];i.traverse(n=>{n.name&&(n.name.includes("character")||n.name.includes("basemesh"))&&t.push(n)}),A.info("MODEL_LOADER","Found models to remove",{modelsToRemoveCount:t.length,modelNames:t.map(n=>n.name),serverScanId:e}),t.forEach(n=>{i.remove(n),n.traverse(s=>{const r=s.geometry,a=s.material;r&&r.dispose(),a&&(Array.isArray(a)?a:[a]).forEach(l=>{Object.values(l).forEach(c=>{c&&typeof c.dispose=="function"&&c.dispose()}),l.dispose()})})}),A.info("MODEL_LOADER","Model cleanup completed",{removedCount:t.length,serverScanId:e})}class E0{constructor(e){Le(this,"operationHistory",[]);Le(this,"activeOperations",new Map);Le(this,"alerts",[]);Le(this,"reloadDetectionMap",new Map);Le(this,"sessionStartTime",Date.now());Le(this,"thresholds",{sceneInit:2e3,modelLoad:1500,morphApply:500,textureGeneration:400,materialConfig:300});Le(this,"maxHistorySize",500);Le(this,"maxAlertSize",100);e&&(this.thresholds={...this.thresholds,...e}),A.info("PERFORMANCE_MONITOR","PerformanceMonitor initialized",{thresholds:this.thresholds,philosophy:"performance_tracking_enabled"})}startOperation(e,t){const n=`${e}_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,s={operationName:e,startTime:performance.now(),tags:t||{}};return this.activeOperations.set(n,s),A.debug("PERFORMANCE_MONITOR",`⏱️ Operation started: ${e}`,{operationId:n,tags:t,philosophy:"operation_tracking_start"}),n}endOperation(e){const t=this.activeOperations.get(e);if(!t){A.warn("PERFORMANCE_MONITOR","Attempted to end unknown operation",{operationId:e,philosophy:"unknown_operation_end"});return}const n=performance.now(),s=n-t.startTime;t.endTime=n,t.duration=s,this.operationHistory.push(t),this.activeOperations.delete(e),this.operationHistory.length>this.maxHistorySize&&this.operationHistory.shift(),this.checkOperationThreshold(t),A.debug("PERFORMANCE_MONITOR",`✅ Operation completed: ${t.operationName}`,{duration:`${s.toFixed(2)}ms`,tags:t.tags,philosophy:"operation_tracking_end"})}checkOperationThreshold(e){if(!e.duration)return;let t;const n=e.operationName.toLowerCase();n.includes("scene")&&n.includes("init")?t=this.thresholds.sceneInit:n.includes("model")&&n.includes("load")?t=this.thresholds.modelLoad:n.includes("morph")&&n.includes("apply")?t=this.thresholds.morphApply:n.includes("texture")&&n.includes("generat")?t=this.thresholds.textureGeneration:n.includes("material")&&n.includes("config")&&(t=this.thresholds.materialConfig),t&&e.duration>t&&this.addAlert({type:"slow_operation",message:`Operation "${e.operationName}" exceeded threshold`,severity:e.duration>t*2?"error":"warning",details:{operationName:e.operationName,duration:e.duration,threshold:t,exceedBy:e.duration-t,tags:e.tags},timestamp:Date.now()})}trackReload(e){const n=(this.reloadDetectionMap.get(e)||0)+1;this.reloadDetectionMap.set(e,n),A.warn("PERFORMANCE_MONITOR",`🔄 Reload detected: ${e}`,{reloadCount:n,sessionTime:`${((Date.now()-this.sessionStartTime)/1e3).toFixed(1)}s`,philosophy:"reload_detection"}),n>1&&this.addAlert({type:"unexpected_reload",message:`Multiple reloads detected for ${e}`,severity:n>3?"critical":"error",details:{componentName:e,reloadCount:n,sessionTime:Date.now()-this.sessionStartTime},timestamp:Date.now()})}addAlert(e){this.alerts.push(e),this.alerts.length>this.maxAlertSize&&this.alerts.shift();const t=e.severity==="critical"||e.severity==="error"?"error":"warn";A[t]("PERFORMANCE_MONITOR",`🚨 ${e.type.toUpperCase()}: ${e.message}`,{...e.details,philosophy:"performance_alert"})}getStats(){const e=this.operationHistory.filter(l=>l.duration!==void 0);let t=0,n=null,s=null;e.forEach(l=>{l.duration&&(t+=l.duration,(!n||l.duration>(n.duration||0))&&(n=l),(!s||l.duration<(s.duration||1/0))&&(s=l))});const r=e.length>0?t/e.length:0,a=Array.from(this.reloadDetectionMap.values()).reduce((l,c)=>l+c,0),o=performance.memory?performance.memory.usedJSHeapSize/(1024*1024):0;return{totalOperations:e.length,averageDuration:r,slowestOperation:n,fastestOperation:s,reloadCount:a,alertCount:this.alerts.length,memoryUsageMB:o}}getAlerts(e){return e?this.alerts.filter(t=>t.severity===e):[...this.alerts]}getOperationHistory(e,t){let n=e?this.operationHistory.filter(s=>s.operationName===e):[...this.operationHistory];return t&&(n=n.slice(-t)),n}getReloadCounts(){return new Map(this.reloadDetectionMap)}logReport(){const e=this.getStats();if(A.info("PERFORMANCE_MONITOR","📊 Performance Report",{sessionDuration:`${((Date.now()-this.sessionStartTime)/1e3).toFixed(1)}s`,totalOperations:e.totalOperations,averageDuration:`${e.averageDuration.toFixed(2)}ms`,slowestOperation:e.slowestOperation?`${e.slowestOperation.operationName} (${e.slowestOperation.duration?.toFixed(2)}ms)`:"N/A",fastestOperation:e.fastestOperation?`${e.fastestOperation.operationName} (${e.fastestOperation.duration?.toFixed(2)}ms)`:"N/A",reloadCount:e.reloadCount,alertCount:e.alertCount,criticalAlerts:this.getAlerts("critical").length,errorAlerts:this.getAlerts("error").length,warningAlerts:this.getAlerts("warning").length,memoryUsageMB:e.memoryUsageMB.toFixed(2),philosophy:"performance_report"}),e.reloadCount>0){const t={};this.reloadDetectionMap.forEach((n,s)=>{t[s]=n}),A.warn("PERFORMANCE_MONITOR","🔄 Reload Breakdown",{...t,totalReloads:e.reloadCount,philosophy:"reload_breakdown"})}}reset(){this.operationHistory=[],this.activeOperations.clear(),this.alerts=[],this.reloadDetectionMap.clear(),this.sessionStartTime=Date.now(),A.info("PERFORMANCE_MONITOR","Performance monitor reset",{philosophy:"monitor_reset"})}dispose(){this.logReport(),this.reset(),A.info("PERFORMANCE_MONITOR","Performance monitor disposed",{philosophy:"monitor_disposed"})}}let oa=null;function rr(){return oa||(oa=new E0),oa}function T0({finalGender:i,serverScanId:e,onModelLoaded:t}){const[n,s]=ae.useState(!1),[r,a]=ae.useState(null),o=ae.useRef(null),l=ae.useRef(null),c=ae.useRef(null),h=ae.useRef(!1),u=ae.useRef(!1),d=ae.useRef(null),f=ae.useRef(null),g=ae.useCallback(async m=>{if(!m||!m.isScene){A.warn("MODEL_LIFECYCLE","Cannot load model - scene not available",{hasScene:!!m,isScene:m?.isScene,serverScanId:e,philosophy:"scene_dependency_guard"});return}if(u.current||h.current){A.debug("MODEL_LIFECYCLE","Model loading blocked by single-flight guard",{loadInFlight:u.current,modelLoaded:h.current,serverScanId:e,philosophy:"single_flight_protection"});return}u.current=!0,s(!0),a(null),c.current=new AbortController;const p=rr(),v=p.startOperation("model_loading",{gender:i,serverScanId:e});try{A.info("MODEL_LIFECYCLE","Starting model loading",{gender:i,serverScanId:e,sceneChildren:m.children.length,philosophy:"model_loading_start"});const M=await v0({scene:m,finalGender:i,serverScanId:e,abortSignal:c.current.signal});o.current=M.modelInstance,l.current=M.skeletonHelper||null,d.current=e||null,f.current=i,h.current=!0,s(!1),p.endOperation(v),t&&t(M.modelInstance,M.mainMesh),A.info("MODEL_LIFECYCLE","Model loading completed successfully",{modelName:M.modelInstance.name,mainMeshName:M.mainMesh.name,serverScanId:e,philosophy:"model_loading_complete"})}catch(M){if(p.endOperation(v),M instanceof Error&&M.message.includes("aborted"))A.debug("MODEL_LIFECYCLE","Model loading was aborted",{serverScanId:e,philosophy:"model_loading_aborted"});else{const y=M instanceof Error?M.message:"Unknown error";A.error("MODEL_LIFECYCLE","Model loading failed",{error:y,serverScanId:e,philosophy:"model_loading_failure"}),a(y)}s(!1)}finally{u.current=!1,c.current=null}},[i,e,t]),_=ae.useCallback(()=>{if(c.current&&(c.current.abort(),c.current=null),o.current){let m=o.current.parent;for(;m&&!m.isScene;)m=m.parent;m&&m.isScene&&S0(m,e)}o.current=null,l.current=null,h.current=!1,u.current=!1,d.current=null,f.current=null,s(!1),a(null),A.debug("MODEL_LIFECYCLE","Model cleanup completed",{serverScanId:e,philosophy:"model_cleanup_complete"})},[e]);return{isLoading:n,error:r,modelRef:o,skeletonHelperRef:l,modelLoadedRef:h,loadInFlightRef:u,lastLoadedScanIdRef:d,lastLoadedGenderRef:f,loadModel:g,cleanupModel:_}}const ic={pregnant:"BS_LOD0.BodyPregnant",pearFigure:"BS_LOD0.BodyPearFigure",bigHips:"BS_LOD0.BodyBigHips",assLarge:"BS_LOD0.BodyAssLarge",narrowWaist:"BS_LOD0.BodyNarrowWaist",bodybuilderSize:"BS_LOD0.BodyBodybuilderSize",bodybuilderDetails:"BS_LOD0.BodyBodybuilderDetails",emaciated:"BS_LOD0.BodyEmaciated",superBreast:"BS_LOD0.BodySuperBreast",breastsSmall:"BS_LOD0.BodyBreastsSmall",breastsSag:"BS_LOD0.BodyBreastsSag",animeWaist:"BS_LOD0.BodyAnimeWaist",dollBody:"BS_LOD0.BodyDollBody",nipples:"BS_LOD0.BodyNipples",animeNeck:"BS_LOD0.BodyAnimeNeck",animeProportion:"BS_LOD0.BodyAnimeProportion",eyesClosedL:"BS_LOD0.AnimEyesClosedL",eyesClosedR:"BS_LOD0.AnimEyesClosedR",FaceLowerEyelashLength:"BS_LOD0.FaceLowerEyelashLength",eyelashLength:"BS_LOD0.FaceEyelashLength",eyelashesSpecial:"BS_LOD0.FaceEyelashesSpecial",eyesShape:"BS_LOD0.FaceEyesShape",FaceEyesShape:"BS_LOD0.FaceEyesShape",eyesSpacing:"BS_LOD0.FaceEyesSpacing",eyesDown:"BS_LOD0.FaceEyesDown",FaceEyesDown:"BS_LOD0.FaceEyesDown",eyesUp:"BS_LOD0.FaceEyesUp",FaceEyesUp:"BS_LOD0.FaceEyesUp",eyesSpacingWide:"BS_LOD0.FaceEyesSpacingWide",FaceJawWidth:"BS_LOD0.FaceJawWidth",FaceCheekFullness:"BS_LOD0.FaceCheekFullness",FaceCheeksSize:"BS_LOD0.FaceCheeksSize",FaceNoseSize:"BS_LOD0.FaceNoseSize",FaceEyeSize:"BS_LOD0.FaceEyeSize",FaceLipThickness:"BS_LOD0.FaceLipThickness",FaceChinLength:"BS_LOD0.FaceChinLength",FaceChinSize:"BS_LOD0.FaceChinSize",FaceForeheadHeight:"BS_LOD0.FaceForeheadHeight",FaceBrowHeight:"BS_LOD0.FaceBrowHeight",FaceEarSize:"BS_LOD0.FaceEarSize",FaceHeadSize:"BS_LOD0.FaceHeadSize",FaceNarrow:"BS_LOD0.FaceNarrow",FaceNoseAngle:"BS_LOD0.FaceNoseAngle",FaceNoseHeight:"BS_LOD0.FaceNoseHeight",FaceNoseHump:"BS_LOD0.FaceNoseHump",FaceNoseNarrow:"BS_LOD0.FaceNoseNarrow",FaceNoseSmall:"BS_LOD0.FaceNoseSmall",FaceNoseWide:"BS_LOD0.FaceNoseWide",FaceRoundFace:"BS_LOD0.FaceRoundFace",FaceSymmetry:"BS_LOD0.FaceSymmetry",FaceLongFace:"BS_LOD0.FaceLongFace",FaceCheekbones:"BS_LOD0.FaceCheekbones",FaceMouthWidth:"BS_LOD0.FaceMouthWidth",FaceMouthSize:"BS_LOD0.FaceMouthSize",FaceLipsToMegalips:"BS_LOD0.FaceLipsToMegalips",FaceNostrilsFlare:"BS_LOD0.FaceNostrilsFlare",FaceEyebrowSize:"BS_LOD0.FaceEyebrowSize"};function sc(i){return i in ic?ic[i]:i.startsWith("BS_LOD0.Body")||i.startsWith("BS_LOD0.Face")||i.startsWith("BS_LOD0.Anim")?i:null}function Co(i){if(!i||typeof i!="string")return A.warn("MORPH_KEYS","Invalid key provided to toCanonicalDBKey",{key:i,type:typeof i}),"";let e=i.replace(/^BS_LOD0\.Body/,"");e=e.replace(/^BS_LOD0\.Face/,""),e=e.replace(/^BS_LOD0\.Anim/,""),e=e.replace(/^Body/,""),e=e.replace(/^Face/,""),e=e.replace(/^Anim/,""),e.includes("_")&&(e=e.replace(/_([a-z])/g,(s,r)=>r.toUpperCase())),e=e.charAt(0).toLowerCase()+e.slice(1);const t={bighips:"bigHips",asslarge:"assLarge",narrowwaist:"narrowWaist",pearfigure:"pearFigure",superbreast:"superBreast",breastsSmall:"breastsSmall",breastsSag:"breastsSag",bodybuildersize:"bodybuilderSize",bodybuilderdetails:"bodybuilderDetails",animewaist:"animeWaist",animeproportion:"animeProportion",animeneck:"animeNeck",dollbody:"dollBody",facelowereyelashlength:"FaceLowerEyelashLength",eyesclosedl:"eyesClosedL",eyesclosedr:"eyesClosedR",eyelashlength:"eyelashLength",eyelashesspecial:"eyelashesSpecial",eyesshape:"eyesShape",eyesspacing:"eyesSpacing",eyesdown:"eyesDown",eyesup:"eyesUp",eyesspacingwide:"eyesSpacingWide",facejawwidth:"FaceJawWidth",facecheekfullness:"FaceCheekFullness",facenosesize:"FaceNoseSize",faceeyesize:"FaceEyeSize",faceliptickness:"FaceLipThickness",facechinlength:"FaceChinLength",faceforeheadheight:"FaceForeheadHeight",facebrowheight:"FaceBrowHeight",faceearsize:"FaceEarSize",faceheadsize:"FaceHeadSize",facenarrow:"FaceNarrow",facenoseangle:"FaceNoseAngle",facenosehump:"FaceNoseHump",facenosenarrow:"FaceNoseNarrow",facenosesmall:"FaceNoseSmall",facenosewide:"FaceNoseWide",faceroundface:"FaceRoundFace",facesymmetry:"FaceSymmetry",facelongface:"FaceLongFace",facecheekbones:"FaceCheekbones",facemouthwidth:"FaceMouthWidth",facemouthsize:"FaceMouthSize",facelipstomegalips:"FaceLipsToMegalips",facenostrilsflare:"FaceNostrilsFlare"},n=e.toLowerCase();return t[n]&&(e=t[n]),A.trace("MORPH_KEYS","Key normalized",{original:i,canonical:e}),e}function b0(i){return i==="male"||i==="masculine"?"masculine":i==="female"||i==="feminine"?"feminine":(A.warn("MORPH_KEYS","Invalid gender input for toDbGender, defaulting to masculine",{invalidGender:i,type:typeof i}),"masculine")}function OM(i,e,t){const n={};return Object.entries(i).forEach(([s,r])=>{if(typeof r!="number"||!Number.isFinite(r)){A.warn("Invalid morph value, skipping",{key:s,value:r,type:typeof r});return}const a=Co(s);a&&A0(a,e,t)?n[a]=r:A.warn("MORPH_KEYS","Invalid or non-DB morph key, skipping",{key:s,canonicalKey:a,gender:e,philosophy:"db_first_strict_allowlisting"})}),A.debug("MORPH_KEYS","Shape params normalized with DB validation",{originalKeys:Object.keys(i).length,normalizedKeys:Object.keys(n).length,sampleNormalized:Object.entries(n).slice(0,3).map(([s,r])=>({key:s,value:r.toFixed(3)})),gender:e,philosophy:"db_first_normalization"}),n}function A0(i,e,t){if(!t)return["pregnant","pearFigure","bigHips","assLarge","narrowWaist","bodybuilderSize","bodybuilderDetails","emaciated","superBreast","breastsSmall","breastsSag","animeWaist","dollBody","nipples","animeNeck","animeProportion","eyesClosedL","eyesClosedR","FaceLowerEyelashLength","eyelashLength","eyelashesspecial","eyesShape","eyesSpacing","eyesDown","eyesUp","eyesSpacingWide","FaceJawWidth","FaceCheekFullness","FaceNoseSize","FaceEyeSize","FaceLipThickness","FaceChinLength","FaceForeheadHeight","FaceBrowHeight","FaceEarSize","FaceHeadSize","FaceNarrow","FaceNoseAngle","FaceNoseHump","FaceNoseNarrow","FaceNoseSmall","FaceNoseWide","FaceRoundFace","FaceSymmetry","FaceLongFace","FaceCheekbones","FaceMouthWidth","FaceMouthSize","FaceLipsToMegalips","FaceNostrilsFlare"].includes(i);const n=e==="male"?t.mapping_masculine:t.mapping_feminine;return i in n.morph_values||i in n.face_values}function R0(i,e,t){if(!i||typeof i!="string")return!1;const n=Co(i);if(!t||!t.mapping_masculine||!t.mapping_feminine)return A.error("MORPH_KEYS","isValidDBKey called without valid morphologyMapping",{key:i,gender:e,hasMapping:!!t,philosophy:"critical_mapping_missing_for_validation"}),!1;const s=e==="male"?t.mapping_masculine:t.mapping_feminine;return n in s.morph_values||n in s.face_values}function w0(i,e,t){if(!t)return!1;const n=Co(i),s=e==="male"?t.mapping_masculine:t.mapping_feminine;let r=s.morph_values[n];return r||(r=s.face_values[n]),r&&r.min===0&&r.max===0}async function rc(i,e,t,n,s,r){if(!e&&!r){A.warn("MORPH_TARGET_APPLIER","PHASE A.6: No morph data provided",{gender:t,philosophy:"phase_a_no_data"});return}if(!i.morphTargetDictionary||!i.morphTargetInfluences){A.error("MORPH_TARGET_APPLIER","PHASE A.6: Mesh missing morph target data",{hasDictionary:!!i.morphTargetDictionary,hasInfluences:!!i.morphTargetInfluences,philosophy:"phase_a_mesh_validation"});return}if(!n||!n.mapping_masculine||!n.mapping_feminine){A.error("MORPH_TARGET_APPLIER","PHASE A.6: Invalid morphologyMapping provided",{hasMapping:!!n,hasMasculine:!!n?.mapping_masculine,hasFeminine:!!n?.mapping_feminine,philosophy:"phase_a_invalid_morphology_mapping_guard"});return}const a=i.morphTargetDictionary,o=i.morphTargetInfluences;let l=0,c=0,h=0,u=0;const d={...e,...r},f=[],g=[];A.info("MORPH_TARGET_APPLIER","Starting morph application",{totalMorphs:Object.keys(d).length,bodyMorphsCount:e?Object.keys(e).length:0,faceMorphsCount:0,faceOnlyKeys:f.length,overriddenKeys:g.length,gender:t,sampleKeys:Object.keys(d).slice(0,10),sampleFaceMorphs:[],allFaceMorphKeys:[],meshHasMorphTargets:!!i.morphTargetDictionary,morphTargetDictionarySize:Object.keys(i.morphTargetDictionary||{}).length,philosophy:"morph_application_start_with_face_priority"});const _=[];Object.entries(d).forEach(([p,v])=>{if(typeof v!="number"||!Number.isFinite(v)){u++,c++;return}if(!R0(p,t,n)){u++,c++;return}if(n&&w0(p,t,n)){h++;const y=sc(p);if(y&&y in a){const b=a[y];o[b]=0,l++}return}const M=sc(p);if(M&&M in a){const y=a[M];o[y];let b=v;if(n){const C=b0(t)==="masculine"?n.mapping_masculine:n.mapping_feminine;let L=C.morph_values[p];L||(L=C.face_values[p]),L&&(b=Math.max(L.min,Math.min(L.max,v)))}o[y]=b,l++}else c++}),_.length>0&&A.warn("MORPH_TARGET_APPLIER","Some face morphs were skipped during application",{skippedCount:_.length,skippedMorphs:_,philosophy:"face_morph_skipped_diagnostic"}),l>0&&(i.geometry&&(i.geometry.attributes.position.needsUpdate=!0,i.geometry.attributes.normal&&(i.geometry.attributes.normal.needsUpdate=!0),i.geometry.computeBoundingBox(),i.geometry.computeBoundingSphere()),i.material&&(Array.isArray(i.material)?i.material:[i.material]).forEach(v=>{v.needsUpdate=!0}),i.updateMatrix(),i.updateMatrixWorld(!0),i.visible||(i.visible=!0,A.warn("MORPH_TARGET_APPLIER","Mesh was hidden, forcing visible",{meshName:i.name,philosophy:"force_mesh_visible"})),i.userData.needsUpdate=!0,A.info("MORPH_TARGET_APPLIER","Mesh forced to update after morph application",{meshName:i.name,meshVisible:i.visible,geometryUpdated:!0,materialUpdated:!0,philosophy:"force_mesh_update_complete"})),A.info("MORPH_TARGET_APPLIER","Morph application completed",{applied:l,skipped:c,banned:h,invalid:u,totalProcessed:Object.keys(d).length,faceKeysApplied:0,faceKeysTotal:0,faceApplicationRate:"N/A",philosophy:"morph_application_complete_with_face_tracking"})}const C0={version:"1.0",rig_id:"MAS_RIG_V1",gate_default:1,selectors:{include_regex:["(?i)^(?!c_).*","(?i)^(?!.*_(ik|fk|ref)).*"],exclude_regex:["(?i)^c_.*","(?i).*(?:_ik|_fk|_ref).*","(?i).*control.*"],symmetry:{left_token:"l",right_token:"r"}},bone_groups:{CHEST_CORE:{patterns:["^spine_01x?$","^spine_02x?$","^spine_03x?$"]},NECK_CORE:{patterns:["^neckx?$","^neck_twistx?$"]},HIP_CORE:{patterns:["^pelvisx?$","^hipx?$","^spine_00x?$"]},SHOULDER_L:{patterns:["^clavicle_l$","^shoulderl?$"]},SHOULDER_R:{patterns:["^clavicle_r$","^shoulderr?$"]},UPPER_ARM_L:{patterns:["^shoulderl?$","^arml?$"]},UPPER_ARM_R:{patterns:["^shoulderr?$","^armr?$"]},FOREARM_L:{patterns:["^forearml?$"]},FOREARM_R:{patterns:["^forearmr?$"]},THIGH_L:{patterns:["^thighl?$"]},THIGH_R:{patterns:["^thighr?$"]},CALF_L:{patterns:["^(leg|calf)l?$"]},CALF_R:{patterns:["^(leg|calf)r?$"]}},derived_masses:{},mappings:[{key:"torsoMass",enabled:!0,groups:["CHEST_CORE"],axis_scale:{x:.85,y:.1,z:.05},distribution:{spine_01:.2,spine_02:.45,spine_03:.35},pivot:"local",propagate_children:!0,blend_mode:"multiply",clamp:[.9,1.6]},{key:"neckMass",enabled:!0,groups:["NECK_CORE"],axis_scale:{x:.75,y:.15,z:.1},distribution:"uniform",pivot:"local",propagate_children:!0,blend_mode:"multiply",clamp:[.85,1.4]},{key:"hipMass",enabled:!0,groups:["HIP_CORE"],axis_scale:{x:.8,y:.1,z:.1},distribution:"uniform",pivot:"local",propagate_children:!0,blend_mode:"multiply",clamp:[.5,2]},{key:"shoulderMass",enabled:!0,groups:["SHOULDER_L","SHOULDER_R"],axis_scale:{x:.7,y:.15,z:.15},distribution:"uniform",pivot:"local",propagate_children:!0,blend_mode:"multiply",clamp:[.5,2]},{key:"armMass",enabled:!0,groups:["UPPER_ARM_L","UPPER_ARM_R"],axis_scale:{x:.65,y:.2,z:.15},distribution:"uniform",pivot:"local",propagate_children:!0,blend_mode:"multiply",clamp:[.85,1.35]},{key:"forearmMass",enabled:!0,groups:["FOREARM_L","FOREARM_R"],axis_scale:{x:.65,y:.2,z:.15},distribution:"uniform",pivot:"local",propagate_children:!0,blend_mode:"multiply",clamp:[.85,1.35]},{key:"thighMass",enabled:!0,groups:["THIGH_L","THIGH_R"],axis_scale:{x:.7,y:.2,z:.1},distribution:"uniform",pivot:"local",propagate_children:!0,blend_mode:"multiply",clamp:[.85,1.45]},{key:"calfMass",enabled:!0,groups:["CALF_L","CALF_R"],axis_scale:{x:.7,y:.2,z:.1},distribution:"uniform",pivot:"local",propagate_children:!0,blend_mode:"multiply",clamp:[.85,1.45]}],interplay:{gate:{apply:!0,mode:"multiply_all",clamp:[.8,1.2]},shape_key_overrides:[{when:"pearFigure>=1.2 || bodybuilderSize<=-0.5",bones:["CHEST_CORE"],axis_scale_multiplier:{x:1,y:.9,z:.9}},{when:"bodybuilderSize>=0.8",bones:["UPPER_ARM_L","UPPER_ARM_R","FOREARM_L","FOREARM_R","THIGH_L","THIGH_R","CALF_L","CALF_R"],enable_keys:["armMass","forearmMass","thighMass","calfMass"]},{when:"pearFigure>=0.5",bones:["UPPER_ARM_L","UPPER_ARM_R","FOREARM_L","FOREARM_R","THIGH_L","THIGH_R","CALF_L","CALF_R"],enable_keys:["armMass","forearmMass","thighMass","calfMass"]}]}};function L0(){return C0}function I0(i,e){if(i.formula.includes("thighMass")&&i.formula.includes("torsoMass")){const t=e.thighMass??1,n=e.torsoMass??1,s=e.gate??1;return 1+.4*(t-1)+.4*(n-1)+.2*(s-1)}return 1}function P0(i,e){const t={...i};return Object.entries(e).forEach(([n,s])=>{if(t[n]==null){const r=I0(s,i),a=Math.max(s.clamp[0],Math.min(s.clamp[1],r));t[n]=a,console.info("DERIVED_MASS_CALCULATOR","Derived mass calculated",{derivedKey:n,formula:s.formula,calculatedValue:r.toFixed(3),clampedValue:a.toFixed(3),clampRange:s.clamp,philosophy:"phase_a_derived_mass_calculation"})}}),t}function D0(i,e){const t=[];return i.traverse(n=>{if(n.isBone){const s=n.name||"";e.some(a=>{try{return new RegExp(a,"i").test(s)}catch(o){return console.warn("BONE_MAPPING","Invalid regex pattern",{pattern:a,error:o}),!1}})&&t.push(n)}}),t}function N0(i,e){const t={};return Object.entries(e).forEach(([n,s])=>{t[n]=D0(i,s.patterns)}),t}function O0(i,e,t="y"){const n=t==="x"?1:e,s=t==="y"?1:e,r=t==="z"?1:e;i.scale.set(n,s,r),i.updateMatrixWorld(!0)}function U0(i,e){const t=Math.max(e.clamp[0],Math.min(e.clamp[1],i));if(e.key==="torsoMass"){const n=t-1;return 1+.6*(Math.tanh(n*1.2)/Math.tanh(1.2))}return 1+(t-1)*.6}function F0(i,e="y"){let t=0;return i.forEach((n,s)=>{O0(s,n,e),t++}),t}function B0(i,e={},t){for(const n of t)if(n.enable_keys?.includes(i)){const s=ro(n.when,e);if(console.log("INTERPLAY_EVALUATOR","Interplay rule evaluation",{limbMassKey:i,condition:n.when,shouldEnable:s,shapeParamsUsed:Object.keys(e).filter(r=>n.when.includes(r)),philosophy:"phase_a_interplay_evaluation"}),s)return!0}return!1}function ro(i,e){console.log("INTERPLAY_EVALUATOR","Evaluating condition with enhanced debugging",{condition:i,shapeParamsAvailable:Object.keys(e),shapeParamsValues:Object.entries(e).map(([t,n])=>({key:t,value:n.toFixed(3)})),philosophy:"condition_evaluation_debug"});try{let t=i;if(Object.entries(e).forEach(([n,s])=>{const r=new RegExp(`\\b${n}\\b`,"g");t=t.replace(r,s.toString())}),console.log("INTERPLAY_EVALUATOR","Expression evaluation details",{originalCondition:i,processedExpression:t,philosophy:"expression_processing_debug"}),t.includes(">=")){const[n,s]=t.split(">=").map(l=>l.trim()),r=parseFloat(n),a=parseFloat(s),o=!isNaN(r)&&!isNaN(a)&&r>=a;return console.log("INTERPLAY_EVALUATOR","Condition evaluation result",{condition:i,leftVal:r,rightVal:a,result:o,leftIsNaN:isNaN(r),rightIsNaN:isNaN(a),philosophy:"condition_result_debug"}),o}if(t.includes("<=")){const[n,s]=t.split("<=").map(o=>o.trim()),r=parseFloat(n),a=parseFloat(s);return!isNaN(r)&&!isNaN(a)&&r<=a}return t.includes("||")?t.split("||").map(s=>s.trim()).some(s=>ro(s,e)):t.includes("&&")?t.split("&&").map(s=>s.trim()).every(s=>ro(s,e)):(console.warn("INTERPLAY_EVALUATOR","Unknown interplay condition format",{condition:i,expression:t,philosophy:"phase_a_condition_evaluation_fallback"}),!1)}catch(t){return console.error("INTERPLAY_EVALUATOR","Error evaluating interplay condition",{condition:i,error:t instanceof Error?t.message:"Unknown error",philosophy:"phase_a_condition_evaluation_error"}),!1}}function Jc(i,e,t={},n){if(!i)return;const s=L0(),r=n?.lengthAxis??"y";if(e?.gate!==1||e?.isActive===!1){n?.log&&console.info("BONE_APPLY — PHASE A.5: skipped by gate/isActive",{gate:e?.gate,isActive:e?.isActive,philosophy:"phase_a_gate_control"});return}const a=P0(e,s.derived_masses);n?.log&&console.info("BONE_APPLY — PHASE A.5: Shape params audit for interplay evaluation",{shapeParamsKeys:Object.keys(t),shapeParamsValues:Object.entries(t).map(([f,g])=>({key:f,value:g.toFixed(3)})),bodybuilderSize:t.bodybuilderSize?.toFixed(3)||"undefined",pearFigure:t.pearFigure?.toFixed(3)||"undefined",philosophy:"phase_a_shape_params_audit"});const o=N0(i,s.bone_groups),l=new Map;let c=0;const h=[],u=[],d=[];if(s.mappings.forEach(f=>{const g=a[f.key];if(g==null||!Number.isFinite(g))return;if(!(f.enabled||B0(f.key,t,s.interplay.shape_key_overrides))){u.push(f.key),n?.log&&console.log("BONE_APPLY — PHASE A.5: limb mass disabled by configuration",{limbMassKey:f.key,mass:g.toFixed(3),enabled:f.enabled,interplayResult:!1,philosophy:"phase_a_controlled_disabling"});return}h.push(f.key);const m=U0(g,f);f.groups.forEach(p=>{(o[p]||[]).forEach(M=>{const y=l.get(M)??1,b=Math.max(y,m);l.set(M,b),d.push({boneName:M.name,limbMassKey:f.key,scale:b,enabled:!0})})})}),a.gate&&a.gate!==1){const f=Math.max(s.interplay.gate.clamp[0],Math.min(s.interplay.gate.clamp[1],a.gate));l.forEach((g,_)=>{l.set(_,g*f)}),n?.log&&console.info("BONE_APPLY — PHASE A.5: gate factor applied",{gateFactor:f.toFixed(3),gateClamp:s.interplay.gate.clamp,affectedBones:l.size,philosophy:"phase_a_gate_application"})}c=F0(l,r),n?.log&&console.info("BONE_APPLY — PHASE A.5: configuration-driven bone application completed",{touched:c,enabledMappings:h,disabledMappings:u,appliedScales:d.slice(0,10),configVersion:s.version,rigId:s.rig_id,philosophy:"phase_a_configuration_driven_bone_application"})}async function ac(i){const{model:e,morphData:t,faceMorphData:n,limbMasses:s,serverScanId:r,gender:a,morphologyMapping:o}=i;let l=null;if(e.traverse(c=>{c instanceof wn&&c.morphTargetDictionary&&(!l||Object.keys(c.morphTargetDictionary).length>Object.keys(l.morphTargetDictionary||{}).length)&&(l=c)}),A.info("MORPH_APPLIER","Main mesh verification before morph application",{mainMeshFound:!!l,mainMeshName:l?.name||"none",hasMorphTargetDictionary:!!l?.morphTargetDictionary,morphTargetDictionarySize:l?.morphTargetDictionary?Object.keys(l.morphTargetDictionary).length:0,hasMorphTargetInfluences:!!l?.morphTargetInfluences,morphTargetInfluencesLength:l?.morphTargetInfluences?.length||0,serverScanId:r}),!l){A.error("MORPH_APPLIER","No main mesh found with morph target data",{serverScanId:r});return}if(t&&Object.keys(t).length>0&&(A.info("MORPH_APPLIER","Starting morph data application",{morphDataKeys:Object.keys(t),morphDataEntries:Object.entries(t).map(([c,h])=>({key:c,value:h})),serverScanId:r}),await rc(l,t,a,o)),n&&Object.keys(n).length>0&&(A.info("MORPH_APPLIER","Starting face morph data application",{faceMorphDataKeys:Object.keys(n),faceMorphDataEntries:Object.entries(n).map(([c,h])=>({key:c,value:h})),serverScanId:r}),await rc(l,n,a,o)),l&&A.info("MORPH_APPLIER","Final morph target influences after application",{morphTargetInfluencesLength:l.morphTargetInfluences?.length||0,morphTargetInfluencesValues:l.morphTargetInfluences?l.morphTargetInfluences.slice(0,20):[],nonZeroInfluences:l.morphTargetInfluences?l.morphTargetInfluences.map((c,h)=>({index:h,value:c})).filter(c=>c.value!==0):[],serverScanId:r}),A.info("MORPH_APPLIER","Morph application completed",{serverScanId:r}),s&&Object.keys(s).length>0){const c={gate:s.gate??1,isActive:s.isActive??!0,armMass:s.armMass,forearmMass:s.forearmMass,thighMass:s.thighMass,calfMass:s.calfMass,neckMass:s.neckMass,hipMass:s.hipMass};Jc(e,c,{},{lengthAxis:"y",log:!0})}}function k0({finalGender:i,morphologyMapping:e,serverScanId:t}){const[n,s]=ae.useState(!1),[r,a]=ae.useState(null),o=ae.useRef(!1),l=ae.useRef(null);ae.useRef(null),ae.useRef(!0);const c=ae.useCallback(async(f,g,_,m)=>{const p=m||e;if(!p){A.warn("MORPH_LIFECYCLE","Cannot apply morphs - morphologyMapping not available",{hasCallerMapping:!!m,hasHookMapping:!!e,serverScanId:t,philosophy:"morphology_mapping_validation"});return}if(A.debug("MORPH_LIFECYCLE","applyMorphs called",{hasModel:!!f,morphDataCount:g?Object.keys(g).length:0,faceMorphDataCount:_?Object.keys(_).length:0,serverScanId:t,philosophy:"morph_application_call"}),!f||!g&&!_||Object.keys(g).length===0&&Object.keys(_||{}).length===0){A.warn("MORPH_LIFECYCLE","Cannot apply morphs - invalid input",{hasModel:!!f,hasMorphData:!!g,morphDataKeys:g?Object.keys(g).length:0,hasFaceMorphData:!!_,faceMorphDataKeys:_?Object.keys(_).length:0,serverScanId:t,philosophy:"input_validation"});return}const v=JSON.stringify(Object.keys(g).sort().map(b=>[b,g[b]])),M=JSON.stringify(Object.keys(_||{}).sort().map(b=>[b,(_||{})[b]])),y=`${v}-${M}`;if(l.current===y){A.debug("MORPH_LIFECYCLE","Skipping morph application - same data",{serverScanId:t,philosophy:"deduplication"});return}s(!0),a(null);try{A.info("MORPH_LIFECYCLE","Applying morphs to model",{morphDataCount:Object.keys(g).length,faceMorphDataCount:Object.keys(_||{}).length,serverScanId:t,philosophy:"morph_application_start"}),await ac({model:f,morphData:g,gender:i,morphologyMapping:p,serverScanId:t,faceMorphData:_});let b=null;const C=f.children.find(L=>L.type==="SkinnedMesh");if(C&&(b=C),b||f.traverse(L=>{L.type==="SkinnedMesh"&&L instanceof wn&&(!b||L.morphTargetDictionary&&Object.keys(L.morphTargetDictionary).length>Object.keys(b.morphTargetDictionary||{}).length)&&(b=L)}),b){const L=b.morphTargetInfluences?b.morphTargetInfluences.map((D,T)=>({index:T,value:D,name:Object.keys(b.morphTargetDictionary||{}).find(E=>b.morphTargetDictionary[E]===T)})).filter(D=>D.value!==0):[];A.info("MORPH_LIFECYCLE","Final morphTargetInfluences after application",{meshName:b.name,meshVisible:b.visible,morphTargetInfluencesLength:b.morphTargetInfluences?.length||0,nonZeroCount:L.length,nonZeroInfluences:L.slice(0,10),morphTargetDictionarySize:Object.keys(b.morphTargetDictionary||{}).length,geometryMorphTargetsLength:b.geometry?.morphTargets?.length,serverScanId:t,philosophy:"morph_influences_verification"})}else A.error("MORPH_LIFECYCLE","Could not find main SkinnedMesh for morphTargetInfluences logging",{modelChildren:f.children.map(L=>({name:L.name,type:L.type})),modelChildrenCount:f.children.length,serverScanId:t,philosophy:"critical_mesh_detection_failed"});l.current=y,o.current=!0,A.info("MORPH_LIFECYCLE","Morphs applied successfully",{serverScanId:t,philosophy:"morph_application_complete"})}catch(b){const C=b instanceof Error?b.message:"Unknown error";a(C),A.error("MORPH_LIFECYCLE","Morph application failed",{error:C,serverScanId:t,philosophy:"morph_application_error"})}finally{s(!1)}},[i,e,t]),h=ae.useCallback(async(f,g,_)=>{if(!f||!g||Object.keys(g).length===0){A.warn("MORPH_LIFECYCLE","Cannot apply limb masses - invalid input",{hasModel:!!f,hasLimbMasses:!!g,limbMassesKeys:g?Object.keys(g).length:0,serverScanId:t,philosophy:"limb_mass_input_validation"});return}try{A.info("MORPH_LIFECYCLE","Applying limb masses to model",{limbMassesCount:Object.keys(g).length,shapeParamsCount:_?Object.keys(_).length:0,serverScanId:t,philosophy:"limb_mass_application_start"});const m={gate:g.gate??1,isActive:g.isActive??!0,armMass:g.armMass,forearmMass:g.forearmMass,thighMass:g.thighMass,calfMass:g.calfMass,neckMass:g.neckMass,hipMass:g.hipMass};Jc(f,m,_||{},{lengthAxis:"y",log:!0}),A.info("MORPH_LIFECYCLE","Limb masses applied successfully",{serverScanId:t,philosophy:"limb_mass_application_complete"})}catch(m){const p=m instanceof Error?m.message:"Unknown error";A.error("MORPH_LIFECYCLE","Limb mass application failed",{error:p,serverScanId:t,philosophy:"limb_mass_application_error"})}},[t]),u=ae.useCallback(async(f,g,_)=>{const{transitionDuration:m=0,skipDuplicateCheck:p=!1}=_||{};if(!f||!g||Object.keys(g).length===0){A.warn("MORPH_LIFECYCLE","Cannot apply live morphs - invalid input",{hasModel:!!f,hasTargetMorphData:!!g,serverScanId:t,philosophy:"live_morph_input_validation"});return}if(!p){const v=JSON.stringify(Object.keys(g).sort().map(M=>[M,g[M]]));if(l.current===v){A.debug("MORPH_LIFECYCLE","Skipping live morph - same data",{serverScanId:t,philosophy:"live_morph_deduplication"});return}}try{A.info("MORPH_LIFECYCLE","Applying live morphs with transition",{targetMorphCount:Object.keys(g).length,transitionDuration:m,serverScanId:t,philosophy:"live_morph_application_start"}),await ac({model:f,morphData:g,gender:i,morphologyMapping:e,serverScanId:t});const v=JSON.stringify(Object.keys(g).sort().map(M=>[M,g[M]]));l.current=v,A.info("MORPH_LIFECYCLE","Live morphs applied successfully",{serverScanId:t,philosophy:"live_morph_application_complete"})}catch(v){const M=v instanceof Error?v.message:"Unknown error";A.error("MORPH_LIFECYCLE","Live morph application failed",{error:M,serverScanId:t,philosophy:"live_morph_application_error"})}},[i,e,t]),d=ae.useCallback(async()=>{A.warn("MORPH_LIFECYCLE","resetMorphs called - not fully implemented yet",{serverScanId:t})},[t]);return{isApplying:n,error:r,morphsApplied:o.current,applyMorphs:c,applyMorphsLive:u,applyLimbMasses:h,resetMorphs:d,forceMorphsUpdate:ae.useCallback(async(f,g,_,m)=>{l.current=null,A.debug("MORPH_LIFECYCLE","Forced morph cache reset with immediate reapplication",{serverScanId:t,hasModel:!!f,hasMorphData:!!g,hasFaceMorphData:!!_,hasCallerMorphologyMapping:!!m,philosophy:"force_morph_reapplication_immediate"}),f&&(g||_)&&(Object.keys(g||{}).length>0||Object.keys(_||{}).length>0)&&(await c(f,g||{},_||{},m),A.debug("MORPH_LIFECYCLE","Immediate morph reapplication completed",{serverScanId:t,philosophy:"immediate_reapplication_after_cache_reset"}))},[t,c])}}const H0=["eyes","eye","reflection","teeth","tooth","nail","hair","eyelash","eyebrow","pupil","iris","cornea","sclera","metal","glass","chrome","mirror","lens"],z0=["skin","body","head","torso","basemesh","flesh"],V0=["face","head","visage","tete"];function oc(i,e){const t=(i.name||"").toLowerCase(),n=e.toLowerCase(),s=H0.filter(f=>t.includes(f)||n.includes(f)),r=s.length>0,a=z0.filter(f=>t.includes(f)||n.includes(f)),o=a.length>0&&!r,l=V0.filter(f=>t.includes(f)||n.includes(f)),c=l.length>0&&!r,h=[...new Set([...a,...l])],u=h.length>0,d=u?r?"in_material_exclusions":o&&c?"classified_as_skin_and_face":o?"classified_as_skin":c?"classified_as_face":"unknown":"not_in_any_inclusions";return A.info("MATERIAL_IDENTIFIER","Material classification decision",{materialName:t,objectName:n,isIncluded:u,isExcluded:r,isSkinMaterial:o,isFaceMaterial:c,inclusionMatches:h,exclusionMatches:s,materialUuid:i.uuid,decision:o||c?"APPLY_SKIN_TONE":"SKIP_MATERIAL",reason:d,philosophy:"material_classification_logic"}),{isSkinMaterial:o,isFaceMaterial:c,isIncluded:u,isExcluded:r,inclusionMatches:h,exclusionMatches:s,reason:d}}function G0(i){const e=[],t="color"in i&&i.color&&i.color instanceof pe;if(!t){const o="color"in i,l=i.color,c=typeof l,h=l instanceof pe;e.push(`Missing or invalid color property - exists: ${o}, type: ${c}, isThreeColor: ${h}, value: ${l}`),A.warn("MATERIAL_IDENTIFIER","DETAILED COLOR PROPERTY DIAGNOSIS",{materialName:i.name||"unnamed",materialType:i.type,materialConstructor:i.constructor.name,colorPropertyDiagnosis:{colorPropertyExists:o,colorValue:l,colorType:c,colorConstructor:l?l.constructor.name:"undefined",isThreeColor:h,colorHex:h?"#"+l.getHexString():"invalid",materialReadOnly:Object.isFrozen(i),materialSealed:Object.isSealed(i)},philosophy:"detailed_color_property_diagnosis"})}const n=i instanceof Ft||i instanceof dt;n||(e.push(`Incompatible material type: ${i.type} (constructor: ${i.constructor.name})`),A.warn("MATERIAL_IDENTIFIER","MATERIAL TYPE INCOMPATIBILITY DETAILED",{materialName:i.name||"unnamed",materialType:i.type,materialConstructor:i.constructor.name,materialUuid:i.uuid,typeCompatibilityAnalysis:{isMeshStandardMaterial:i instanceof Ft,isMeshPhysicalMaterial:i instanceof dt,isMeshBasicMaterial:i instanceof zn,isMeshLambertMaterial:i instanceof Hc,isMeshPhongMaterial:i instanceof Qu,actualType:i.type,supportsPBR:i instanceof Ft||i instanceof dt,supportsSSS:i instanceof dt},philosophy:"material_type_incompatibility_detailed"}));const s=t&&e.length===0,r=s?"debug":"warn",a=s?"Material validation for skin application":"MATERIAL VALIDATION FAILED - Detailed analysis";return A[r]("MATERIAL_IDENTIFIER",a,{materialName:i.name||"unnamed",materialType:i.type,materialConstructor:i.constructor.name,materialUuid:i.uuid,hasColor:t,isCompatibleType:n,isValid:s,issues:e,materialProperties:{hasMap:!!i.map,hasNormalMap:!!i.normalMap,hasRoughnessMap:!!i.roughnessMap,hasMetalnessMap:!!i.metalnessMap,hasEmissiveMap:!!i.emissiveMap,hasTransmission:"transmission"in i,hasThickness:"thickness"in i,hasIor:"ior"in i,hasAttenuationColor:"attenuationColor"in i,hasSheen:"sheen"in i,hasClearcoat:"clearcoat"in i,currentColor:t?i.color.getHex():"none",currentMetalness:i.metalness||"undefined",currentRoughness:i.roughness||"undefined",currentTransmission:i.transmission||"undefined",currentThickness:i.thickness||"undefined"},validationBreakdown:{colorValidation:{hasColorProperty:"color"in i,colorIsObject:!!i.color,colorIsThreeColor:i.color instanceof pe,colorValue:t?i.color.getHex():"invalid"},typeValidation:{isMeshStandardMaterial:i instanceof Ft,isMeshPhysicalMaterial:i instanceof dt,actualType:i.type,actualConstructor:i.constructor.name,supportsPBR:i instanceof Ft||i instanceof dt,supportsSSS:i instanceof dt}},philosophy:"material_validation_audit"}),{isValid:s,hasColor:t,isCompatibleType:n,materialType:i.type,issues:e}}function W0(i){const e=i.material;return e?Array.isArray(e)?e:[e]:[]}function X0(i){const{linear_f32:e}=i,t=e.r*.299+e.g*.587+e.b*.114,n=t<.3,s=t>.7,r=t>.75,a=i.undertone||"neutral",o=i.ethnicity_hint||"unknown";A.info("SKIN_PROPERTIES","AI metadata detected for contextual rendering",{undertone:a,ethnicityHint:o,luminance:t.toFixed(3),source:i.source,philosophy:"ai_contextual_sss_optimization"});let l=.35,c=.3,h=.55,u=.3,d=.25;n&&(l=.25,c=.2,h=.45,u=.35,d=.3),r?(l=.05,c=.08,h=.65,u=.2,d=.12):s&&(l=.12,c=.15,h=.65,u=.22,d=.15);let f,g,_;r?(f=Math.min(1,e.r*.99+.01),g=Math.min(1,e.g*.99+.01),_=Math.min(1,e.b*.99+.01)):s?(f=Math.min(1,e.r*1.05+.03),g=Math.min(1,e.g*1.03+.02),_=Math.min(1,e.b*1.02+.01)):(f=Math.min(1,e.r*1.4+.15),g=Math.min(1,e.g*1.2+.1),_=Math.min(1,e.b*1+.05)),r||(a==="warm"?(f=Math.min(1,f*1.1),g=Math.min(1,g*.95)):a==="cool"&&(f=Math.min(1,f*.95),_=Math.min(1,_*1.1)));const m={baseColor:e,metalness:0,roughness:h,transmission:l,thickness:c,ior:1.35,attenuationDistance:.5,attenuationColor:{r:f,g,b:_},sheen:u,sheenRoughness:.4,clearcoat:d,clearcoatRoughness:.4,specularIntensity:.8,iridescence:.05,iridescenceIOR:1.3};return A.info("SKIN_PROPERTIES","Calculated adaptive skin properties",{skinToneHex:i.hex,luminance:t.toFixed(3),skinCategory:r?"very_light":n?"dark":s?"light":"medium",colorPreservationMode:r?"ACTIVE_MAX":s?"ACTIVE":"DISABLED",adaptiveProperties:{transmission:l,thickness:c,roughness:h,sheen:u,clearcoat:d},attenuationColor:`rgb(${f.toFixed(3)}, ${g.toFixed(3)}, ${_.toFixed(3)})`,baseSkinColor:`rgb(${e.r.toFixed(3)}, ${e.g.toFixed(3)}, ${e.b.toFixed(3)})`,attenuationVsBase:{rDelta:(f-e.r).toFixed(3),gDelta:(g-e.g).toFixed(3),bDelta:(_-e.b).toFixed(3)},philosophy:"adaptive_skin_properties_with_color_preservation"}),m}function Y0(i,e){A.info("SCENE_TRAVERSER","Starting scene traversal for materials",{sceneChildren:i.children.length,sceneUuid:i.uuid,philosophy:"scene_traversal_audit"});const t={totalObjects:0,objectsWithMaterials:0,totalMaterials:0,materialsByType:{},objectNames:[],materialNames:[]};return i.traverse(n=>{t.totalObjects++,t.objectNames.push(n.name||"unnamed"),A.debug("SCENE_TRAVERSER","Traversing object with detailed material analysis",{objectName:n.name||"unnamed",objectType:n.type||"unknown",objectUuid:n.uuid,hasMaterial:!!n.material,isSkinnedMesh:n.isSkinnedMesh||!1,isMesh:n.isMesh||!1,materialDetails:n.material?{materialCount:Array.isArray(n.material)?n.material.length:1,materialTypes:Array.isArray(n.material)?n.material.map(r=>r.type):[n.material.type],materialNames:Array.isArray(n.material)?n.material.map(r=>r.name||"unnamed"):[n.material.name||"unnamed"],materialConstructors:Array.isArray(n.material)?n.material.map(r=>r.constructor.name):[n.material.constructor.name]}:null,philosophy:"object_traversal_audit"});const s=W0(n);s.length>0?(t.objectsWithMaterials++,t.totalMaterials+=s.length,s.forEach(r=>{const a=r.type;t.materialsByType[a]=(t.materialsByType[a]||0)+1,t.materialNames.push(r.name||"unnamed"),A.debug("SCENE_TRAVERSER","Found material - comprehensive analysis",{objectName:n.name||"unnamed",materialName:r.name||"unnamed",materialType:a,materialConstructor:r.constructor.name,materialUuid:r.uuid,materialCapabilities:{isPBRCompatible:r instanceof Ft||r instanceof dt,supportsSSS:r instanceof dt,hasColorProperty:"color"in r&&r.color instanceof pe,currentColor:"color"in r&&r.color?"#"+r.color.getHexString():"none",hasTransmissionSupport:"transmission"in r,hasThicknessSupport:"thickness"in r,hasAttenuationSupport:"attenuationColor"in r,hasSheenSupport:"sheen"in r,hasClearcoatSupport:"clearcoat"in r},currentMaterialState:{metalness:r.metalness||"undefined",roughness:r.roughness||"undefined",transmission:r.transmission||"undefined",thickness:r.thickness||"undefined",ior:r.ior||"undefined",needsUpdate:r.needsUpdate||!1},philosophy:"material_discovery"})}),e(n,s)):A.debug("SCENE_TRAVERSER","Object has no materials - detailed analysis",{objectName:n.name||"unnamed",objectType:n.type,objectConstructor:n.constructor.name,objectUuid:n.uuid,hasGeometry:!!n.geometry,hasChildren:n.children.length>0,childrenCount:n.children.length,isLight:!!n.isLight,isCamera:!!n.isCamera,isHelper:n.type.includes("Helper"),philosophy:"no_materials_found"})}),A.info("SCENE_TRAVERSER","Scene traversal completed",{totalObjects:t.totalObjects,objectsWithMaterials:t.objectsWithMaterials,totalMaterials:t.totalMaterials,materialsByType:t.materialsByType,uniqueObjectNames:[...new Set(t.objectNames)].slice(0,10),uniqueMaterialNames:[...new Set(t.materialNames)].slice(0,10),philosophy:"scene_traversal_complete"}),t}function j0(i,e,t){try{const n=i;if(!n.material)return A.warn("MATERIAL_UPGRADER","Object has no material to replace",{objectName:i.name,philosophy:"no_material_to_replace"}),!1;if(Array.isArray(n.material)){const s=n.material.indexOf(e);if(s!==-1)return n.material[s]=t,A.info("MATERIAL_UPGRADER","Replaced material in array",{objectName:i.name,materialIndex:s,oldMaterialName:e.name,newMaterialName:t.name,philosophy:"array_material_replacement"}),!0}else if(n.material===e)return n.material=t,A.info("MATERIAL_UPGRADER","Replaced single material",{objectName:i.name,oldMaterialName:e.name,newMaterialName:t.name,philosophy:"single_material_replacement"}),!0;return A.warn("MATERIAL_UPGRADER","Material not found on object for replacement",{objectName:i.name,oldMaterialName:e.name,philosophy:"material_not_found_for_replacement"}),!1}catch(n){return A.error("MATERIAL_UPGRADER","Error replacing material on object",{objectName:i.name,error:n instanceof Error?n.message:"Unknown error",philosophy:"material_replacement_error"}),!1}}function Ks(i){const{r:e,g:t,b:n}=i.rgb;return`rgb_${e}_${t}_${n}`}function $s(i){const e=i.image.width,t=i.image.height;return e*t*4}class q0{constructor(e=50){Le(this,"cache",new Map);Le(this,"accessOrder",[]);Le(this,"maxCacheSize");Le(this,"totalHits",0);Le(this,"totalMisses",0);this.maxCacheSize=e,A.info("TEXTURE_CACHE","TextureCacheManager initialized",{maxCacheSize:e,philosophy:"intelligent_texture_caching"})}get(e){const t=Ks(e),n=this.cache.get(t);return n?(n.accessCount++,n.timestamp=Date.now(),this.accessOrder=this.accessOrder.filter(s=>s!==t),this.accessOrder.push(t),this.totalHits++,A.info("TEXTURE_CACHE","🎯 Cache HIT - Reusing existing textures",{skinToneHex:n.skinToneHex,accessCount:n.accessCount,cacheSize:this.cache.size,hitRate:this.getHitRate().toFixed(2),timeSaved:"~265ms",philosophy:"texture_cache_hit"}),n):(this.totalMisses++,A.info("TEXTURE_CACHE","❌ Cache MISS - Will generate new textures",{skinToneHex:e.hex,cacheSize:this.cache.size,hitRate:this.getHitRate().toFixed(2),philosophy:"texture_cache_miss"}),null)}set(e,t){const n=Ks(e);this.cache.size>=this.maxCacheSize&&!this.cache.has(n)&&this.evictLRU();const s={...t,timestamp:Date.now(),accessCount:1,skinToneHex:e.hex};this.cache.set(n,s),this.accessOrder.push(n),A.info("TEXTURE_CACHE","Textures cached successfully",{skinToneHex:e.hex,cacheKey:n,cacheSize:this.cache.size,maxCacheSize:this.maxCacheSize,philosophy:"texture_cached"})}has(e){const t=Ks(e);return this.cache.has(t)}evictLRU(){if(this.accessOrder.length===0)return;const e=this.accessOrder.shift(),t=this.cache.get(e);t&&(t.baseColorMap.dispose(),t.normalMap.dispose(),t.roughnessMap.dispose(),t.sssMap?.dispose(),A.info("TEXTURE_CACHE","Evicted LRU entry",{skinToneHex:t.skinToneHex,accessCount:t.accessCount,age:Date.now()-t.timestamp,remainingEntries:this.cache.size-1,philosophy:"lru_eviction"})),this.cache.delete(e)}clear(){A.info("TEXTURE_CACHE","Clearing entire texture cache",{entriesCleared:this.cache.size,philosophy:"cache_clear"}),this.cache.forEach(e=>{e.baseColorMap.dispose(),e.normalMap.dispose(),e.roughnessMap.dispose(),e.sssMap?.dispose()}),this.cache.clear(),this.accessOrder=[],this.totalHits=0,this.totalMisses=0}remove(e){const t=Ks(e),n=this.cache.get(t);return n?(n.baseColorMap.dispose(),n.normalMap.dispose(),n.roughnessMap.dispose(),n.sssMap?.dispose(),this.cache.delete(t),this.accessOrder=this.accessOrder.filter(s=>s!==t),A.info("TEXTURE_CACHE","Cache entry removed",{skinToneHex:n.skinToneHex,philosophy:"cache_entry_removed"}),!0):!1}getStats(){const e=this.totalHits+this.totalMisses,t=e>0?this.totalHits/e*100:0;let n=0,s=Date.now();this.cache.forEach(o=>{n+=$s(o.baseColorMap),n+=$s(o.normalMap),n+=$s(o.roughnessMap),o.sssMap&&(n+=$s(o.sssMap)),o.timestamp<s&&(s=o.timestamp)});const r=n/(1024*1024),a=this.cache.size>0?Date.now()-s:0;return{totalEntries:this.cache.size,totalHits:this.totalHits,totalMisses:this.totalMisses,hitRate:t,memorySizeMB:r,oldestEntryAge:a}}getHitRate(){const e=this.totalHits+this.totalMisses;return e>0?this.totalHits/e*100:0}logStats(){const e=this.getStats();A.info("TEXTURE_CACHE","Cache statistics",{totalEntries:e.totalEntries,maxCacheSize:this.maxCacheSize,totalHits:e.totalHits,totalMisses:e.totalMisses,hitRate:`${e.hitRate.toFixed(2)}%`,memorySizeMB:e.memorySizeMB.toFixed(2),oldestEntryAge:`${(e.oldestEntryAge/1e3).toFixed(1)}s`,estimatedTimeSaved:`${(e.totalHits*265).toFixed(0)}ms`,philosophy:"cache_statistics"})}async preloadCommonSkinTones(e,t){A.info("TEXTURE_CACHE","Preloading common skin tones",{count:e.length,philosophy:"cache_preload"});for(const n of e)if(!this.has(n)){const s=await t(n);this.set(n,s)}A.info("TEXTURE_CACHE","Preload completed",{cachedEntries:this.cache.size,philosophy:"preload_complete"})}dispose(){this.clear(),A.info("TEXTURE_CACHE","TextureCacheManager disposed",{philosophy:"cache_disposed"})}}let la=null;function K0(){return la||(la=new q0(50)),la}function $0(i){const{skinTone:e,detailLevel:t="high",poreIntensity:n=.6,colorVariation:s=.3,imperfectionIntensity:r=.2,resolution:a=Z0(t)}=i,o=K0(),l=o.get(e);if(l)return{baseColorMap:l.baseColorMap,normalMap:l.normalMap,roughnessMap:l.roughnessMap,sssMap:l.sssMap};A.info("PROCEDURAL_SKIN_TEXTURE","Generating procedural skin textures",{skinToneHex:e.hex,detailLevel:t,resolution:a,poreIntensity:n,colorVariation:s,imperfectionIntensity:r,philosophy:"ultra_realistic_procedural_generation"});const c=J0(e,a,s),h=Q0(a,n,t),u=eM(a,e,r),d=tM(a,e);A.info("PROCEDURAL_SKIN_TEXTURE","Procedural textures generated successfully",{baseColorMapSize:`${a}x${a}`,normalMapSize:`${a}x${a}`,roughnessMapSize:`${a}x${a}`,sssMapGenerated:!!d,philosophy:"ultra_realistic_generation_complete"});const f={baseColorMap:c,normalMap:h,roughnessMap:u,sssMap:d};return o.set(e,f),f}function Z0(i){switch(i){case"low":return 256;case"medium":return 512;case"high":return 1024;case"ultra":return 2048;default:return 1024}}function J0(i,e,t){const n=e*e,s=new Uint8Array(4*n),r=i.rgb.r,a=i.rgb.g,o=i.rgb.b,l=(r*.299+a*.587+o*.114)/255;for(let h=0;h<n;h++){const u=h%e,d=Math.floor(h/e),f=.02,g=.1,_=.5,m=ln(u*f,d*f,0),p=ln(u*g,d*g,1),v=ln(u*_,d*_,2),M=m*.5+p*.3+v*.2,y=t*(.5+l*.5),b=M*y*15+m*5,C=M*y*10,L=M*y*8,D=h*4;s[D]=ca(r+b,0,255),s[D+1]=ca(a+C,0,255),s[D+2]=ca(o+L,0,255),s[D+3]=255}const c=new zi(s,e,e,Ct);return c.needsUpdate=!0,c.wrapS=kt,c.wrapT=kt,c}function Q0(i,e,t){const n=i*i,s=new Uint8Array(4*n),r=t==="ultra"?.15:t==="high"?.12:t==="medium"?.09:.06,a=.03;for(let l=0;l<n;l++){const c=l%i,h=Math.floor(l/i),u=ln(c*r,h*r,10),d=ln(c*r*2,h*r*2,11),f=Math.max(0,u*.7+d*.3),g=Math.pow(f,2)*e,m=ln(c*a,h*a,12)*.3,p=-g*.4+m*.2,v=p- -g*.4,M=p- -g*.4,y=v*5,b=M*5,C=1,L=Math.sqrt(y*y+b*b+C*C),D=y/L*.5+.5,T=b/L*.5+.5,E=C/L*.5+.5,P=l*4;s[P]=Math.floor(D*255),s[P+1]=Math.floor(T*255),s[P+2]=Math.floor(E*255),s[P+3]=255}const o=new zi(s,i,i,Ct);return o.needsUpdate=!0,o.wrapS=kt,o.wrapT=kt,o}function eM(i,e,t){const n=i*i,s=new Uint8Array(4*n),a=.55+(e.rgb.r*.299+e.rgb.g*.587+e.rgb.b*.114)/255*.1;for(let l=0;l<n;l++){const c=l%i,h=Math.floor(l/i),u=.05,d=ln(c*u,h*u,20),f=Math.max(0,d)*.2,g=.08,_=ln(c*g,h*g,21),m=Math.max(0,_)*.15,p=.3,M=ln(c*p,h*p,22)*.1*t,y=a-f+m+M,b=Math.max(.3,Math.min(.9,y)),C=Math.floor(b*255),L=l*4;s[L]=C,s[L+1]=C,s[L+2]=C,s[L+3]=255}const o=new zi(s,i,i,Ct);return o.needsUpdate=!0,o.wrapS=kt,o.wrapT=kt,o}function tM(i,e){const t=i*i,n=new Uint8Array(4*t),r=.5+(1-(e.rgb.r*.299+e.rgb.g*.587+e.rgb.b*.114)/255)*.3;for(let o=0;o<t;o++){const l=o%i,c=Math.floor(o/i),h=.04,u=ln(l*h,c*h,30),d=Math.max(0,u)*.3,f=.06,g=ln(l*f,c*f,31),_=Math.max(0,g)*.2,m=r+d-_,p=Math.max(.2,Math.min(.9,m)),v=Math.floor(p*255),M=o*4;n[M]=v,n[M+1]=v,n[M+2]=v,n[M+3]=255}const a=new zi(n,i,i,Ct);return a.needsUpdate=!0,a.wrapS=kt,a.wrapT=kt,a}function ln(i,e,t){const n=g=>(g=g^61^g>>16,g=g+(g<<3),g=g^g>>4,g=g*668265261,g=g^g>>15,g),s=Math.floor(i),r=Math.floor(e),a=i-s,o=e-r,l=a*a*(3-2*a),c=o*o*(3-2*o),h=n(s+n(r+t))/2147483647,u=n(s+1+n(r+t))/2147483647,d=n(s+n(r+1+t))/2147483647,f=n(s+1+n(r+1+t))/2147483647;return h*(1-l)*(1-c)+u*l*(1-c)+d*(1-l)*c+f*l*c}function ca(i,e,t){return Math.max(e,Math.min(t,Math.round(i)))}function nM(i,e){const t=i.color.clone(),n="#"+t.getHexString();A.info("PROCEDURAL_SKIN_TEXTURE","Applying procedural textures to material",{materialName:i.name||"unnamed",preservedColorBeforeTextures:n,hasBaseColorMap:!!e.baseColorMap,hasNormalMap:!!e.normalMap,hasRoughnessMap:!!e.roughnessMap,hasSSSMap:!!e.sssMap,philosophy:"ultra_realistic_texture_application"}),A.warn("PROCEDURAL_SKIN_TEXTURE","🚨 CRITICAL: BaseColorMap NOT applied to preserve Vision AI extracted color",{materialName:i.name||"unnamed",preservedColor:n,reason:"Applying material.map would replace the base color from scan",philosophy:"color_preservation_over_procedural_variation"}),i.normalMap=e.normalMap,i.normalScale=new ze(.5,.5),i.roughnessMap=e.roughnessMap,e.sssMap&&(i.userData.sssMap=e.sssMap),i.color.copy(t),i.needsUpdate=!0;const s="#"+i.color.getHexString(),r=s===n;A.info("PROCEDURAL_SKIN_TEXTURE","Procedural textures applied - Color preservation check",{materialName:i.name||"unnamed",preservedColorHex:n,finalColorHex:s,colorPreserved:r,colorDelta:r?"ZERO":"COLOR_CHANGED",philosophy:"ultra_realistic_texture_application_complete"})}function iM(i){const{linear_f32:e}=i,t=e.r*.299+e.g*.587+e.b*.114,n=t<.3,s=t>.7;A.info("MULTI_LAYER_SKIN","Calculating multi-layer skin configuration",{skinToneHex:i.hex,luminance:t.toFixed(3),skinCategory:n?"dark":s?"light":"medium",philosophy:"professional_3_layer_model"});const r={thickness:.02,scattering:new I(0,0,0),absorption:new I(0,0,0),ior:1.45};let a,o,l;n?(a=new I(.3,.25,.2),o=new I(.8,.7,.6),l=.15):s?(a=new I(.7,.6,.5),o=new I(.2,.15,.1),l=.1):(a=new I(.5,.45,.4),o=new I(.5,.4,.35),l=.12);const c={thickness:l,scattering:a,absorption:o,ior:1.4};let h,u;n?(h=new I(1,.3,.2),u=new I(.3,.6,.7)):s?(h=new I(1.2,.4,.3),u=new I(.2,.5,.6)):(h=new I(1.1,.35,.25),u=new I(.25,.55,.65));const d={thickness:.5,scattering:h,absorption:u,ior:1.39},f=sM(r,c,d,i),g={skinTone:i,oilLayer:r,epidermis:c,dermis:d,...f};return A.info("MULTI_LAYER_SKIN","Multi-layer configuration calculated",{oilLayerThickness:r.thickness,epidermisThickness:c.thickness,dermisThickness:d.thickness,combinedTransmission:f.combinedTransmission.toFixed(3),combinedThickness:f.combinedThickness.toFixed(3),attenuationColorHex:"#"+f.combinedAttenuationColor.getHexString(),specularTintHex:"#"+f.specularTint.getHexString(),philosophy:"realistic_3_layer_approximation"}),g}function sM(i,e,t,n){const{linear_f32:s}=n,r=s.r*.299+s.g*.587+s.b*.114,a=e.thickness/(e.thickness+t.thickness),o=t.thickness/(e.thickness+t.thickness),l=(e.scattering.x+e.scattering.y+e.scattering.z)/3,c=(t.scattering.x+t.scattering.y+t.scattering.z)/3;let h=l*a+c*o;r<.3?h=.25+h*.15:r>.75?h=.02+h*.04:r>.65?h=.05+h*.06:h=.2+h*.15;const u=e.thickness+t.thickness;let d,f,g;r>.75?(d=Math.min(1,s.r*.99+t.scattering.x*.01),f=Math.min(1,s.g*.99+t.scattering.y*.01),g=Math.min(1,s.b*.99+t.scattering.z*.01)):r>.65?(d=Math.min(1,s.r*.97+t.scattering.x*.03),f=Math.min(1,s.g*.97+t.scattering.y*.03),g=Math.min(1,s.b*.97+t.scattering.z*.03)):(d=Math.min(1,t.scattering.x*1.5+s.r*.3),f=Math.min(1,t.scattering.y*1.2+s.g*.2),g=Math.min(1,t.scattering.z*.9+s.b*.1));const _=new pe(d,f,g),m=Math.min(1,s.r*1.05+.05),p=Math.min(1,s.g*1.03+.03),v=Math.min(1,s.b*1.01+.01),M=new pe(m,p,v);return A.info("MULTI_LAYER_SKIN","🎨 Combined properties calculated with color preservation",{luminance:r.toFixed(3),skinCategory:r>.75?"very_light_max_preservation":r>.65?"light_high_preservation":r<.3?"dark_normal_sss":"medium_reduced_sss",combinedTransmission:h.toFixed(3),attenuationColorHex:"#"+_.getHexString(),baseSkinToneHex:n.hex,colorPreservationMode:r>.75?"ACTIVE_MAX":r>.65?"ACTIVE":"DISABLED",attenuationVsBase:{rDelta:(d-s.r).toFixed(4),gDelta:(f-s.g).toFixed(4),bDelta:(g-s.b).toFixed(4)},philosophy:"color_preservation_priority_especially_very_light_skins"}),{combinedTransmission:h,combinedThickness:u,combinedAttenuationColor:_,specularTint:M}}function rM(i,e,t="unnamed"){try{A.info("MULTI_LAYER_SKIN","🎨 CRITICAL: Applying EXACT Vision AI skin tone color",{materialName:t,skinToneHex:e.skinTone.hex,linearRGB:{r:e.skinTone.linear_f32.r.toFixed(6),g:e.skinTone.linear_f32.g.toFixed(6),b:e.skinTone.linear_f32.b.toFixed(6)},rgbValues:{r:e.skinTone.rgb.r,g:e.skinTone.rgb.g,b:e.skinTone.rgb.b},source:e.skinTone.source,confidence:e.skinTone.confidence,philosophy:"exact_color_application_from_vision_ai"}),i.color.setRGB(e.skinTone.linear_f32.r,e.skinTone.linear_f32.g,e.skinTone.linear_f32.b);const n="#"+i.color.getHexString();A.info("MULTI_LAYER_SKIN","✅ Color applied - Verification",{materialName:t,expectedHex:e.skinTone.hex,appliedHex:n,colorMatch:n.toLowerCase()===e.skinTone.hex.toLowerCase(),philosophy:"color_application_verification"}),i.transmission=e.combinedTransmission,i.thickness=e.combinedThickness,i.ior=e.epidermis.ior,i.attenuationDistance=.5,i.attenuationColor.copy(e.combinedAttenuationColor),i.specularColor&&i.specularColor.copy(e.specularTint),i.specularIntensity=.85,i.clearcoat=.25,i.clearcoatRoughness=.3;const s=e.skinTone.linear_f32.r*.299+e.skinTone.linear_f32.g*.587+e.skinTone.linear_f32.b*.114;i.roughness=s<.3?.45:s>.7?.65:.55,i.sheen=.3,i.sheenRoughness=.4,i.sheenColor&&i.sheenColor.copy(e.specularTint),i.metalness=0,i.needsUpdate=!0;const r={r:i.color.r,g:i.color.g,b:i.color.b,hex:"#"+i.color.getHexString()},a=Math.abs(i.color.r-e.skinTone.linear_f32.r)<.001&&Math.abs(i.color.g-e.skinTone.linear_f32.g)<.001&&Math.abs(i.color.b-e.skinTone.linear_f32.b)<.001;A.info("MULTI_LAYER_SKIN","Multi-layer skin model applied to material",{materialName:t,transmission:e.combinedTransmission.toFixed(3),thickness:e.combinedThickness.toFixed(3),clearcoat:i.clearcoat,roughness:i.roughness.toFixed(3),attenuationColorHex:"#"+i.attenuationColor.getHexString(),finalColorHex:r.hex,expectedColorHex:e.skinTone.hex,colorPreserved:a,colorPreservationStatus:a?"✅ PRESERVED":"❌ MODIFIED",philosophy:"professional_3_layer_applied"}),a||(A.warn("MULTI_LAYER_SKIN","🚨 CRITICAL: Color was modified, restoring original",{materialName:t,modifiedColor:r.hex,restoringTo:e.skinTone.hex,philosophy:"emergency_color_restoration"}),i.color.setRGB(e.skinTone.linear_f32.r,e.skinTone.linear_f32.g,e.skinTone.linear_f32.b),i.needsUpdate=!0)}catch(n){A.error("MULTI_LAYER_SKIN","Failed to apply multi-layer skin",{materialName:t,error:n instanceof Error?n.message:"Unknown error",philosophy:"multi_layer_application_error"})}}async function lc(i){const{scene:e,skinTone:t,enableProceduralTextures:n=!0,proceduralConfig:s={},useMultiLayerModel:r=!0,serverScanId:a}=i;if(A.info("UNIFIED_MATERIAL_SYSTEM","Starting unified material configuration",{serverScanId:a,skinToneHex:t.hex,skinToneRGB:`rgb(${t.rgb.r}, ${t.rgb.g}, ${t.rgb.b})`,enableProceduralTextures:n,proceduralDetailLevel:s.detailLevel||"high",philosophy:"unified_single_source_of_truth"}),!fh(t))return A.error("UNIFIED_MATERIAL_SYSTEM","Invalid skin tone format",{skinTone:t,philosophy:"unified_validation_failed"}),{success:!1,materialsProcessed:0,materialsUpgraded:0,skinMaterialsModified:0,proceduralTexturesApplied:0,error:"Invalid skin tone format - expected V2"};const o=r?iM(t):null,l=X0(t),c=t.linear_f32.r*.299+t.linear_f32.g*.587+t.linear_f32.b*.114,h=b_(c);e.environment&&A_(e,e.environment,h);let u=null;if(n)try{u=$0({skinTone:t,detailLevel:s.detailLevel||"high",poreIntensity:s.poreIntensity??.6,colorVariation:s.colorVariation??.3,imperfectionIntensity:s.imperfectionIntensity??.2,resolution:s.resolution}),A.info("UNIFIED_MATERIAL_SYSTEM","Procedural textures generated",{detailLevel:s.detailLevel||"high",philosophy:"ultra_realistic_textures_ready"})}catch(y){A.error("UNIFIED_MATERIAL_SYSTEM","Failed to generate procedural textures",{error:y instanceof Error?y.message:"Unknown error",philosophy:"procedural_generation_failed"})}let d=0,f=0,g=0,_=0,m=0;const p=Y0(e,(y,b)=>{b.forEach((C,L)=>{try{d++;const D=oc(C,y.name||"");if(!D.isSkinMaterial&&!D.isFaceMaterial)return;let T=C;if(!(C instanceof dt)){const O=oM(C,y);if(O)T=O,f++;else{A.warn("UNIFIED_MATERIAL_SYSTEM","Failed to upgrade material",{materialName:C.name||"unnamed",objectName:y.name||"unnamed"});return}}const E=G0(T);if(!E.isValid){A.warn("UNIFIED_MATERIAL_SYSTEM","Material validation failed",{materialName:T.name||"unnamed",issues:E.issues});return}(o?(rM(T,o,T.name||"unnamed"),!0):aM(T,l,t))?(g++,u&&T instanceof dt&&(nM(T,u),_++),A.debug("UNIFIED_MATERIAL_SYSTEM","Material configured successfully",{materialName:T.name||"unnamed",objectName:y.name||"unnamed",proceduralApplied:!!u})):m++}catch(D){m++,A.error("UNIFIED_MATERIAL_SYSTEM","Error configuring material",{materialName:C.name||"unnamed",objectName:y.name||"unnamed",error:D instanceof Error?D.message:"Unknown error"})}})});let v=0;e.traverse(y=>{y instanceof Tt&&y.material&&(Array.isArray(y.material)?y.material:[y.material]).forEach(C=>{const L=oc(C,y.name||"");if(L.isSkinMaterial||L.isFaceMaterial){const D=C.color;if(D&&D instanceof pe){const T="#"+D.getHexString(),E=t.linear_f32.r,P=t.linear_f32.g,O=t.linear_f32.b,z=Math.abs(D.r-E)+Math.abs(D.g-P)+Math.abs(D.b-O);z>.01&&(v++,A.warn("UNIFIED_MATERIAL_SYSTEM","🚨 Final verification: Color mismatch detected, correcting",{materialName:C.name||"unnamed",objectName:y.name||"unnamed",currentColor:T,expectedColor:t.hex,colorDelta:z.toFixed(6),philosophy:"final_color_verification_correction"}),D.setRGB(E,P,O))}}C.needsUpdate=!0})}),v>0&&A.warn("UNIFIED_MATERIAL_SYSTEM",`⚠️ Corrected ${v} color mismatches in final verification`,{issuesFound:v,correctedTo:t.hex,philosophy:"final_color_enforcement"});const M=g>0&&m===0;return A.info("UNIFIED_MATERIAL_SYSTEM","Unified material configuration completed",{success:M,materialsProcessed:d,materialsUpgraded:f,skinMaterialsModified:g,proceduralTexturesApplied:_,errorCount:m,totalObjects:p.totalObjects,philosophy:"unified_single_source_complete"}),{success:M,materialsProcessed:d,materialsUpgraded:f,skinMaterialsModified:g,proceduralTexturesApplied:_,error:m>0?`${m} materials failed to configure`:void 0}}function aM(i,e,t){try{if(i.color.setRGB(e.baseColor.r,e.baseColor.g,e.baseColor.b),i.metalness=e.metalness,i.roughness=e.roughness,i.transmission=e.transmission,i.thickness=e.thickness,i.ior=e.ior,i.attenuationDistance=e.attenuationDistance,i.attenuationColor=new pe(e.attenuationColor.r,e.attenuationColor.g,e.attenuationColor.b),i.sheen=e.sheen,i.sheenRoughness=e.sheenRoughness,i.clearcoat=e.clearcoat,i.clearcoatRoughness=e.clearcoatRoughness,i.specularIntensity=e.specularIntensity,i.iridescence=e.iridescence,i.iridescenceIOR=e.iridescenceIOR,i.sheenColor){const n=Math.min(1,e.baseColor.r*1.05),s=Math.min(1,e.baseColor.g*1.02),r=Math.min(1,e.baseColor.b*.98);i.sheenColor.setRGB(n,s,r)}return i.needsUpdate=!0,!0}catch(n){return A.error("UNIFIED_MATERIAL_SYSTEM","Failed to apply skin properties",{materialName:i.name||"unnamed",error:n instanceof Error?n.message:"Unknown error"}),!1}}function oM(i,e){try{if(!(i instanceof Ft))return null;const t=i,n=new dt({color:t.color?t.color.clone():new pe(.8,.6,.4),metalness:t.metalness,roughness:t.roughness,map:t.map,normalMap:t.normalMap,roughnessMap:t.roughnessMap,metalnessMap:t.metalnessMap,emissiveMap:t.emissiveMap,emissive:t.emissive,emissiveIntensity:t.emissiveIntensity,transparent:t.transparent,opacity:t.opacity,alphaTest:t.alphaTest,side:t.side,transmission:.2,thickness:.3,ior:1.35,attenuationDistance:.5,attenuationColor:new pe(.8,.4,.2)});return n.name=t.name,n.userData={...t.userData},j0(e,i,n)?(i.dispose(),n):null}catch(t){return A.error("UNIFIED_MATERIAL_SYSTEM","Material upgrade failed",{error:t instanceof Error?t.message:"Unknown error"}),null}}function lM(i){const e=new pe(i.r/255,i.g/255,i.b/255),t=new Hc({color:e,emissive:new pe(0),emissiveIntensity:0,reflectivity:.1,combine:ms,side:cn});return A.info("MOBILE_MATERIALS","Created low-end mobile material (Lambert)",{colorRGB:i,materialType:"MeshLambertMaterial",philosophy:"ultra_performance_simple_material"}),t}function cM(i){const e=new pe(i.r/255,i.g/255,i.b/255),t=new Ft({color:e,metalness:0,roughness:.7,emissive:new pe(0),emissiveIntensity:0,envMapIntensity:.3,side:cn});return t.normalMap=null,t.bumpMap=null,t.displacementMap=null,A.info("MOBILE_MATERIALS","Created medium mobile material (Standard simplified)",{colorRGB:i,materialType:"MeshStandardMaterial",metalness:0,roughness:.7,envMapIntensity:.3,philosophy:"balanced_mobile_material"}),t}async function hM(i,e){try{const{performanceLevel:t,skinToneRGB:n}=e;let s=0;return A.info("MOBILE_MATERIALS","Applying mobile-optimized materials",{performanceLevel:t,skinToneRGB:n,philosophy:"mobile_material_optimization_start"}),i.traverse(r=>{if(!(r instanceof Tt))return;(Array.isArray(r.material)?r.material:[r.material]).forEach((o,l)=>{if(!(o instanceof Ft||o instanceof dt))return;let c;t==="low"?c=lM(n):c=cM(n),c.name=o.name,c.visible=o.visible,c.transparent=o.transparent,c.opacity=o.opacity,c.side=o.side,o.morphTargets&&(c.morphTargets=!0),o.morphNormals&&(c.morphNormals=!0),o.skinning&&(c.skinning=!0),Array.isArray(r.material)?r.material[l]=c:r.material=c,o.dispose(),s++,A.debug("MOBILE_MATERIALS","Material replaced",{objectName:r.name||"unnamed",oldMaterialType:o.type,newMaterialType:c.type,philosophy:"mobile_material_replacement"})})}),A.info("MOBILE_MATERIALS","Mobile materials applied successfully",{materialsUpdated:s,performanceLevel:t,philosophy:"mobile_material_optimization_complete"}),{success:!0,materialsUpdated:s}}catch(t){const n=t instanceof Error?t.message:"Unknown error";return A.error("MOBILE_MATERIALS","Failed to apply mobile materials",{error:n,philosophy:"mobile_material_error"}),{success:!1,materialsUpdated:0,error:n}}}function uM(i,e){let t=0;return i.traverse(n=>{if(!(n instanceof Tt))return;(Array.isArray(n.material)?n.material:[n.material]).forEach(r=>{(r instanceof Ft||r instanceof dt)&&(e==="low"?(r.normalMap=null,r.bumpMap=null,r.displacementMap=null,r.roughnessMap=null,r.metalnessMap=null,r.aoMap=null,r.envMapIntensity=0):e==="medium"&&(r.normalMap=null,r.bumpMap=null,r.displacementMap=null,r.envMapIntensity=.3),r.needsUpdate=!0,t++)})}),A.info("MOBILE_MATERIALS","Existing materials simplified",{materialsSimplified:t,performanceLevel:e,philosophy:"mobile_material_simplification"}),t}function dM({scene:i,skinTone:e,finalGender:t,serverScanId:n}){const[s,r]=ae.useState(!1),[a,o]=ae.useState(null),l=ae.useCallback(async c=>{if(!i){A.warn("MATERIAL_LIFECYCLE","Cannot configure materials - no scene available",{serverScanId:n,philosophy:"material_config_no_scene"});return}const h=c||e;if(!h){A.warn("MATERIAL_LIFECYCLE","Cannot configure materials - no skin tone data",{serverScanId:n,philosophy:"material_config_no_skin_tone"});return}r(!0),o(null);const u=qc(),d=Kc(u);try{A.info("MATERIAL_LIFECYCLE","Starting material configuration with mobile detection",{serverScanId:n,hasSkinTone:!!h,finalGender:t,isMobile:u.isMobile,performanceLevel:u.performanceLevel,enableProceduralTextures:d.enableProceduralTextures,philosophy:"mobile_aware_material_config_start"});const f=cc({skin_tone:h});if(!f||!f.tone)throw new Error("Failed to resolve skin tone to valid V2 format");let g;if(u.isMobile&&u.performanceLevel==="low"?(A.info("MATERIAL_LIFECYCLE","Using ultra-optimized mobile materials",{performanceLevel:u.performanceLevel,philosophy:"low_end_mobile_material_path"}),g=await hM(i,{performanceLevel:u.performanceLevel,enableProceduralTextures:!1,textureQuality:"low",skinToneRGB:f.tone.rgb})):u.isMobile?(A.info("MATERIAL_LIFECYCLE","Using balanced mobile materials",{performanceLevel:u.performanceLevel,philosophy:"medium_mobile_material_path"}),g=await lc({scene:i,skinTone:f.tone,enableProceduralTextures:!1,proceduralConfig:{detailLevel:"low",poreIntensity:0,colorVariation:0,imperfectionIntensity:0},serverScanId:n}),uM(i,u.performanceLevel)):g=await lc({scene:i,skinTone:f.tone,enableProceduralTextures:d.enableProceduralTextures,proceduralConfig:{detailLevel:"high",poreIntensity:.6,colorVariation:.3,imperfectionIntensity:.2},serverScanId:n}),!g.success)throw new Error(g.error||"Material configuration failed");A.info("MATERIAL_LIFECYCLE","Unified material configuration completed successfully",{serverScanId:n,skinMaterialsModified:g.skinMaterialsModified,proceduralTexturesApplied:g.proceduralTexturesApplied,materialsUpgraded:g.materialsUpgraded,philosophy:"unified_material_config_complete"}),A.info("MATERIAL_LIFECYCLE","🎨 FINAL COLOR VERIFICATION - Checking all materials in scene",{serverScanId:n,expectedColorHex:f.tone.hex,expectedColorRGB:{r:f.tone.rgb.r,g:f.tone.rgb.g,b:f.tone.rgb.b},philosophy:"final_color_verification_start"});const _=[];i.traverse(m=>{m instanceof Tt&&m.material&&(Array.isArray(m.material)?m.material:[m.material]).forEach(v=>{if(v.color&&v.color instanceof pe){const M=v.color,y="#"+M.getHexString();_.push({objectName:m.name||"unnamed",materialName:v.name||"unnamed",currentColorHex:y,currentColorRGB:{r:Math.round(M.r*255),g:Math.round(M.g*255),b:Math.round(M.b*255)}})}})}),A.info("MATERIAL_LIFECYCLE","✅ FINAL COLOR VERIFICATION - Scene materials report",{serverScanId:n,expectedColorHex:f.tone.hex,totalMaterialsInScene:_.length,materialColors:_.slice(0,5),philosophy:"final_color_verification_complete"})}catch(f){const g=f instanceof Error?f.message:"Unknown error";o(g),A.error("MATERIAL_LIFECYCLE","Material configuration failed",{error:g,serverScanId:n,philosophy:"material_config_error"})}finally{r(!1)}},[i,e,t,n]);return{isConfiguring:s,error:a,configureMaterials:l}}async function fM(i,e){const{savedAvatarPayload:t,morphData:n={},limbMasses:s={},userProfile:r,serverScanId:a,overrideMorphData:o,overrideLimbMasses:l,overrideSkinTone:c,overrideGender:h}=i;if(A.debug("PAYLOAD_PROCESSOR","Processing viewer payload",{hasSavedAvatarPayload:!!t,hasMorphData:!!n,morphDataKeys:n?Object.keys(n):[],hasLimbMasses:!!s,limbMassesKeys:s?Object.keys(s):[],hasMorphologyMapping:!!e,hasUserProfile:!!r,serverScanId:a,hasOverrideMorphData:!!o,overrideMorphDataKeys:o?Object.keys(o).length:0,hasOverrideLimbMasses:!!l,overrideLimbMassesKeys:l?Object.keys(l).length:0,hasOverrideSkinTone:!!c,hasOverrideGender:!!h,philosophy:"payload_processing_audit"}),o&&Object.keys(o).length>0){const _=eh(i),m=Qc(i);return A.info("PAYLOAD_PROCESSOR","Using override morph data (projection mode)",{overrideMorphDataKeys:Object.keys(o).length,overrideLimbMassesKeys:l?Object.keys(l).length:0,hasOverrideSkinTone:!!c,hasOverrideGender:!!h,finalGender:_,finalSkinToneHex:m?.hex,serverScanId:a,philosophy:"override_morph_data_mode"}),{status:"ready",shape_params:o,limb_masses:l||s||{},resolved_gender:_,skin_tone:m,strategy:"override_morph_data",confidence:1}}if(t){const _=pM(t);return A.info("PAYLOAD_PROCESSOR","Using saved avatar payload",{avatarVersion:t.avatar_version,resolvedGender:t.resolved_gender,payloadValidation:_,serverScanId:a,philosophy:"saved_avatar_payload_mode"}),_.isValid?{status:"ready",shape_params:t.final_shape_params,limb_masses:t.final_limb_masses,strategy:`saved_avatar_${t.avatar_version}`,confidence:.95}:{status:"error",shape_params:{},limb_masses:{},strategy:"saved_payload_validation_failed",confidence:0,error:`Saved avatar payload validation failed: ${_.issues.join(", ")}`}}const{faceMorphData:u,faceSkinTone:d}=i,f=n&&Object.keys(n).length>0,g=u&&Object.keys(u).length>0;return!f&&!g?{status:"pending",shape_params:{},limb_masses:{},strategy:"pending_morph_data",confidence:0,error:"Morph data or face morph data not available"}:e?(A.info("PAYLOAD_PROCESSOR","Payload ready for viewer",{hasMorphData:f,hasFaceMorphData:g,strategy:g?"face_only_mode":"full_body_mode",morphDataKeys:f?Object.keys(n).length:0,faceMorphDataKeys:g?Object.keys(u).length:0,serverScanId:a,philosophy:"payload_ready"}),{status:"ready",shape_params:n||{},limb_masses:s||{},strategy:g?"face_only_direct_params":"direct_morph_data",confidence:g?.95:.9}):{status:"pending",shape_params:n||{},limb_masses:s||{},strategy:"pending_morphology_mapping",confidence:0,error:"Morphology mapping not loaded"}}function Qc(i){const{savedAvatarPayload:e,skinTone:t,scanResult:n,serverScanId:s,overrideSkinTone:r}=i;if(r){const h=r.rgb||r;return A.info("PAYLOAD_PROCESSOR","Using override skin tone",{skinToneRGB:h?.r!==void 0?`rgb(${h.r}, ${h.g}, ${h.b})`:"unknown",skinToneHex:r.hex,confidence:r.confidence?.toFixed(3),schema:r.schema,serverScanId:s,philosophy:"override_skin_tone_priority"}),r}const a={skin_tone:e?.skin_tone,avatar:{skin_tone:e?.skin_tone},savedAvatarPayload:{skin_tone:e?.skin_tone},skinTone:t,estimate:n?.estimate,commit:n?.commit,match:n?.match,semantic:n?.semantic},{tone:o,source:l}=cc(a);if(e?.skin_tone&&n?.estimate?.extracted_data?.skin_tone){const h=e.skin_tone.rgb,u=n.estimate.extracted_data.skin_tone,d=Math.max(Math.abs(h.r-(u.r||0)),Math.abs(h.g-(u.g||0)),Math.abs(h.b-(u.b||0)));d>10?A.warn("PAYLOAD_PROCESSOR","Skin tone divergence detected between storage and scan",{savedRGB:`rgb(${h.r}, ${h.g}, ${h.b})`,scanRGB:`rgb(${u.r||0}, ${u.g||0}, ${u.b||0})`,maxDifference:d,threshold:10,serverScanId:s,philosophy:"skin_tone_coherence_validation"}):A.debug("PAYLOAD_PROCESSOR","Skin tone coherence validated",{maxDifference:d,threshold:10,serverScanId:s,philosophy:"skin_tone_coherence_ok"})}const c=o?.rgb||o;return A.info("PAYLOAD_PROCESSOR","Skin tone resolved",{skinToneRGB:c?.r!==void 0?`rgb(${c.r}, ${c.g}, ${c.b})`:"unknown",skinToneHex:o?.hex,source:l,confidence:o?.confidence?.toFixed(3),schema:o?.schema,serverScanId:s,philosophy:"skin_tone_processing_complete"}),o}function pM(i){const e=[];return(!i.final_shape_params||Object.keys(i.final_shape_params).length===0)&&e.push("Missing or empty final_shape_params"),(!i.final_limb_masses||Object.keys(i.final_limb_masses).length===0)&&e.push("Missing or empty final_limb_masses"),(!i.resolved_gender||!["male","female"].includes(i.resolved_gender))&&e.push("Missing or invalid resolved_gender"),i.gltf_model_id||e.push("Missing gltf_model_id"),(!i.avatar_version||i.avatar_version!=="v2.0")&&e.push("Missing or invalid avatar_version"),i.final_shape_params&&Object.entries(i.final_shape_params).forEach(([t,n])=>{(typeof n!="number"||!Number.isFinite(n))&&e.push(`Invalid shape param ${t}: ${n}`)}),i.final_limb_masses&&Object.entries(i.final_limb_masses).forEach(([t,n])=>{(typeof n!="number"||!Number.isFinite(n))&&e.push(`Invalid limb mass ${t}: ${n}`)}),{isValid:e.length===0,issues:e}}function ha(i){return i==="feminine"||i==="female"?"female":(i==="masculine"||i==="male"||A.error("PAYLOAD_PROCESSOR","🚨 CRITICAL: Unknown gender format",{gender:i,fallback:"male",philosophy:"gender_normalization_fallback"}),"male")}function eh(i){const{savedAvatarPayload:e,resolvedGender:t,userProfile:n,serverScanId:s,overrideGender:r}=i;if(r)return A.info("PAYLOAD_PROCESSOR","🎯 USING OVERRIDE GENDER (PROJECTION MODE)",{overrideGenderValue:r,overrideGenderType:typeof r,serverScanId:s,hasUserProfile:!!n,userProfileSex:n?.sex,philosophy:"override_gender_priority"}),r;if(n?.sex){const o=ha(n.sex);return A.info("PAYLOAD_PROCESSOR","🔒 CRITICAL: Using user profile sex as source of truth",{profileGender:n.sex,normalizedGender:o,serverScanId:s,hasResolvedGender:!!t,hasSavedAvatarGender:!!e?.resolved_gender,philosophy:"user_profile_sex_absolute_priority_normalized"}),o}if(e?.resolved_gender){const o=ha(e.resolved_gender);return A.info("PAYLOAD_PROCESSOR","Using saved avatar payload resolved gender",{resolvedGender:e.resolved_gender,normalizedGender:o,avatarVersion:e.avatar_version,serverScanId:s,philosophy:"saved_avatar_gender_fallback_normalized"}),o}if(t){const o=ha(t);return A.info("PAYLOAD_PROCESSOR","Using explicit resolved gender",{resolvedGender:t,normalizedGender:o,serverScanId:s,philosophy:"explicit_resolved_gender_normalized"}),o}const a="male";return A.error("PAYLOAD_PROCESSOR","🚨 CRITICAL ERROR: Using fallback gender - no gender information available",{fallbackGender:a,serverScanId:s,reason:"no_gender_information_available",hasUserProfile:!!n,userProfileKeys:n?Object.keys(n):[],philosophy:"critical_fallback_should_not_happen"}),a}const mM={async getMapping(){A.debug("🔍 [MorphologyMappingRepo] Fetching morphology mapping from database");try{const{data:i,error:e}=await hh.functions.invoke("morphology-mapping",{method:"GET"});if(e)return A.error("🔍 [MorphologyMappingRepo] Edge function error:",e),A.warn("🔍 [MorphologyMappingRepo] Edge function failed, using fallback mapping"),Zs();if(!i||!i.success)return A.error("🔍 [MorphologyMappingRepo] Invalid response:",i),A.warn("🔍 [MorphologyMappingRepo] Invalid response, using fallback mapping"),Zs();const t=i.data;return!t.mapping_masculine||!t.mapping_feminine?(A.error("🔍 [MorphologyMappingRepo] Missing gender mappings in response"),A.warn("🔍 [MorphologyMappingRepo] Incomplete mapping data, using fallback mapping"),Zs()):(A.info("✅ [MorphologyMappingRepo] Morphology mapping fetched successfully",{masculineMorphValues:Object.keys(t.mapping_masculine.morph_values).length,feminineMorphValues:Object.keys(t.mapping_feminine.morph_values).length,masculineLimbMasses:Object.keys(t.mapping_masculine.limb_masses).length,feminineLimbMasses:Object.keys(t.mapping_feminine.limb_masses).length,version:i.metadata?.version}),t)}catch(i){return A.error("🔍 [MorphologyMappingRepo] Failed to fetch morphology mapping:",i),A.warn("🔍 [MorphologyMappingRepo] Using fallback mapping due to error"),Zs()}}};function Zs(){return A.warn("🔍 [MorphologyMappingRepo] Using fallback mapping data"),{mapping_masculine:{levels:["Émacié","Mince","Normal","Obèse","Obèse morbide","Obèse sévère","Surpoids"],obesity:["Non obèse","Obèse","Obésité morbide","Surpoids"],bmi_range:{max:48.1,min:15.9},limb_masses:{gate:{max:1,min:1},armMass:{max:1.8,min:.3},calfMass:{max:1.75,min:.3},neckMass:{max:1.6,min:.2},thighMass:{max:1.95,min:.4},torsoMass:{max:1.95,min:.3},forearmMass:{max:1.6,min:.2}},morph_index:{max:2,min:-.6},morphotypes:["OVA","POI","POM","REC","SAB","TRI"],muscularity:["Atrophié sévère","Légèrement atrophié","Moyen musclé","Musclé","Normal costaud"],gender_codes:["MAS"],height_range:{max:191,min:164},morph_values:{bigHips:{max:1,min:-.5},nipples:{max:0,min:0},assLarge:{max:1.1,min:-.6},dollBody:{max:.7,min:0},pregnant:{max:0,min:0},animeNeck:{max:.8,min:0},emaciated:{max:1.5,min:-2.2},animeWaist:{max:1,min:-1},breastsSag:{max:1.3,min:-1},pearFigure:{max:2,min:-.5},narrowWaist:{max:0,min:-2},superBreast:{max:0,min:-.5},breastsSmall:{max:2,min:0},animeProportion:{max:0,min:0},bodybuilderSize:{max:1.5,min:-.8},bodybuilderDetails:{max:2.5,min:-1.5},FaceLowerEyelashLength:{max:1,min:0}},muscle_index:{max:1.45,min:-.92},weight_range:{max:175,min:50},abdomen_round:{max:1,min:-.3}},mapping_feminine:{levels:["Émacié","Normal","Obèse","Obèse morbide","Obèse sévère","Surpoids"],obesity:["Non obèse","Obèse","Obésité morbide","Surpoids"],bmi_range:{max:47,min:16.5},limb_masses:{gate:{max:1,min:1},armMass:{max:1.325,min:.862},calfMass:{max:1.35,min:.9},neckMass:{max:1.25,min:.889},thighMass:{max:1.525,min:.935},torsoMass:{max:1.375,min:.745},forearmMass:{max:1.2,min:.759}},morph_index:{max:1.92,min:-.16},morphotypes:["OVA","POI","POM","REC","SAB","TRI"],muscularity:["Atrophiée sévère","Moins musclée","Moyennement musclée","Musclée","Normal costaud"],gender_codes:["FEM"],height_range:{max:178,min:158},morph_values:{bigHips:{max:.9,min:-1},nipples:{max:0,min:0},assLarge:{max:1.2,min:-.8},dollBody:{max:.6,min:0},pregnant:{max:0,min:0},animeNeck:{max:0,min:0},emaciated:{max:.3,min:-2.3},animeWaist:{max:.8,min:-.5},breastsSag:{max:.95,min:-.8},pearFigure:{max:1.8,min:-.4},narrowWaist:{max:1,min:-1.8},superBreast:{max:.3,min:0},breastsSmall:{max:1,min:0},animeProportion:{max:0,min:0},bodybuilderSize:{max:1.2,min:-.8},bodybuilderDetails:{max:.8,min:-1},FaceLowerEyelashLength:{max:1,min:1}},muscle_index:{max:1.08,min:-.79},weight_range:{max:140,min:43},abdomen_round:{max:.96,min:-.08}}}}function gM(){const{data:i,isLoading:e,error:t}=ch({queryKey:["morphology-mapping"],queryFn:mM.getMapping,staleTime:18e5,gcTime:36e5,refetchOnWindowFocus:!1,retry:2});ao.useEffect(()=>{i?A.info("MORPHOLOGY_MAPPING_HOOK","Mapping data loaded successfully",{masculineMorphValues:Object.keys(i.mapping_masculine.morph_values).length,feminineMorphValues:Object.keys(i.mapping_feminine.morph_values).length,masculineLimbMasses:Object.keys(i.mapping_masculine.limb_masses).length,feminineLimbMasses:Object.keys(i.mapping_feminine.limb_masses).length,masculineFaceValues:Object.keys(i.mapping_masculine.face_values).length,feminineFaceValues:Object.keys(i.mapping_feminine.face_values).length,timestamp:new Date().toISOString()}):t&&A.error("MORPHOLOGY_MAPPING_HOOK","Failed to load mapping data",{error:t instanceof Error?t.message:"Unknown error",timestamp:new Date().toISOString()})},[i,t]);const n=ae.useMemo(()=>{if(!i)return{getMorphValueRange:()=>null,getLimbMassRange:()=>null,getFaceValueRange:()=>null,isValidMorphKey:()=>!1,isValidLimbMassKey:()=>!1,isValidFaceMorphKey:()=>!1,isMorphBanned:()=>!1,getBannedMorphs:()=>[],getSemanticCategories:()=>({levels:[],obesity:[],morphotypes:[],muscularity:[]}),normalizeLimbMass:v=>v,denormalizeLimbMass:v=>v,validateMorphValue:(v,M)=>({isValid:!1,clampedValue:M,outOfRange:!1}),validateLimbMass:(v,M)=>({isValid:!1,clampedValue:M,outOfRange:!1}),validateFaceValue:(v,M)=>({isValid:!1,clampedValue:M,outOfRange:!1})};const s=(v,M)=>(M==="male"?i.mapping_masculine:i.mapping_feminine).morph_values[v]||null,r=(v,M)=>(M==="male"?i.mapping_masculine:i.mapping_feminine).limb_masses[v]||null,a=(v,M)=>(M==="male"?i.mapping_masculine:i.mapping_feminine).face_values[v]||null,o=(v,M)=>{const y=M==="male"?i.mapping_masculine:i.mapping_feminine;return v in y.morph_values},l=(v,M)=>{const y=M==="male"?i.mapping_masculine:i.mapping_feminine;return v in y.limb_masses},c=(v,M)=>{const y=M==="male"?i.mapping_masculine:i.mapping_feminine;return v in y.face_values},h=(v,M)=>{const y=s(v,M);return y?y.min===0&&y.max===0:!1};return{getMorphValueRange:s,getLimbMassRange:r,getFaceValueRange:a,isValidMorphKey:o,isValidLimbMassKey:l,isValidFaceMorphKey:c,isMorphBanned:h,getBannedMorphs:v=>{const M=v==="male"?i.mapping_masculine:i.mapping_feminine;return Object.keys(M.morph_values).filter(y=>h(y,v))},getSemanticCategories:v=>{const M=v==="male"?i.mapping_masculine:i.mapping_feminine;return{levels:M.levels,obesity:M.obesity,morphotypes:M.morphotypes,muscularity:M.muscularity}},normalizeLimbMass:(v,M,y)=>{const b=r(M,y);if(!b)return v;const C=(v-b.min)/(b.max-b.min)*2-1;return Math.max(-1,Math.min(1,C))},denormalizeLimbMass:(v,M,y)=>{const b=r(M,y);if(!b)return v;const C=(v+1)/2*(b.max-b.min)+b.min;return Math.max(b.min,Math.min(b.max,C))},validateMorphValue:(v,M,y)=>{const b=s(v,y);if(!b)return{isValid:!1,clampedValue:M,outOfRange:!1};const C=Math.max(b.min,Math.min(b.max,M)),L=M>=b.min&&M<=b.max;return{isValid:L,clampedValue:C,outOfRange:!L}},validateLimbMass:(v,M,y)=>{const b=r(v,y);if(!b)return{isValid:!1,clampedValue:M,outOfRange:!1};const C=Math.max(b.min,Math.min(b.max,M)),L=M>=b.min&&M<=b.max;return{isValid:L,clampedValue:C,outOfRange:!L}},validateFaceValue:(v,M,y)=>{const b=a(v,y);if(!b)return{isValid:!1,clampedValue:M,outOfRange:!1};const C=Math.max(b.min,Math.min(b.max,M)),L=M>=b.min&&M<=b.max;return{isValid:L,clampedValue:C,outOfRange:!L}}}},[i]);return{data:i,isLoading:e,error:t,...n}}const _M={avatar:{showBones:!1,showMesh:!0,showLights:!1,enablePostProcessing:!0},performance:{monitorFPS:!1,logRenderTime:!1},general:{verboseLogging:!1},DISABLE_FACE_CLIPPING:!1,SHOW_FULL_BODY_IN_FACE_MODE:!1,FORCE_MESH_VISIBLE:!1};class MM{constructor(){Le(this,"isMonitoring",!1);Le(this,"checkInterval",null);Le(this,"CHECK_INTERVAL_MS",2e3);Le(this,"WARNING_THRESHOLD",.75);Le(this,"CRITICAL_THRESHOLD",.9);Le(this,"lastCleanupTime",0);Le(this,"MIN_CLEANUP_INTERVAL",1e4);Le(this,"cleanupCallbacks",[])}startMonitoring(){if(this.isMonitoring)return;if(!/mobile|android|iphone|ipod/i.test(navigator.userAgent)){A.info("MEMORY_MONITOR","Skipping memory monitoring (desktop device)",{philosophy:"desktop_skip_memory_monitor"});return}if(!performance.memory){A.warn("MEMORY_MONITOR","Performance.memory API not available",{philosophy:"memory_api_unavailable"});return}this.isMonitoring=!0,A.info("MEMORY_MONITOR","Starting mobile memory monitoring",{checkInterval:this.CHECK_INTERVAL_MS,warningThreshold:this.WARNING_THRESHOLD,criticalThreshold:this.CRITICAL_THRESHOLD,philosophy:"memory_monitoring_started"}),this.checkInterval=setInterval(()=>{this.checkMemory()},this.CHECK_INTERVAL_MS),this.checkMemory()}stopMonitoring(){this.checkInterval&&(clearInterval(this.checkInterval),this.checkInterval=null),this.isMonitoring=!1,A.info("MEMORY_MONITOR","Memory monitoring stopped",{philosophy:"memory_monitoring_stopped"})}onMemoryPressure(e){this.cleanupCallbacks.push(e)}getMemoryStats(){const e=performance.memory;if(!e)return{isNearLimit:!1,isCritical:!1};const t=e.usedJSHeapSize/e.jsHeapSizeLimit,n=t>=this.WARNING_THRESHOLD,s=t>=this.CRITICAL_THRESHOLD;return{usedJSHeapSize:e.usedJSHeapSize,totalJSHeapSize:e.totalJSHeapSize,jsHeapSizeLimit:e.jsHeapSizeLimit,usagePercentage:t,isNearLimit:n,isCritical:s}}checkMemory(){const e=this.getMemoryStats();e.usagePercentage&&e.isNearLimit&&(A.warn("MEMORY_MONITOR","Memory pressure detected",{usedMB:(e.usedJSHeapSize/1024/1024).toFixed(2),limitMB:(e.jsHeapSizeLimit/1024/1024).toFixed(2),usagePercentage:(e.usagePercentage*100).toFixed(1)+"%",isCritical:e.isCritical,philosophy:"memory_pressure_detected"}),e.isCritical&&this.triggerCleanup())}triggerCleanup(){const e=Date.now();e-this.lastCleanupTime<this.MIN_CLEANUP_INTERVAL||(this.lastCleanupTime=e,A.warn("MEMORY_MONITOR","🧹 Triggering memory cleanup",{registeredCallbacks:this.cleanupCallbacks.length,philosophy:"memory_cleanup_triggered"}),this.cleanupCallbacks.forEach((t,n)=>{try{t()}catch(s){A.error("MEMORY_MONITOR",`Cleanup callback ${n} failed`,{error:s instanceof Error?s.message:"Unknown error"})}}))}forceCleanup(){A.info("MEMORY_MONITOR","Manual cleanup requested",{philosophy:"manual_cleanup"}),this.triggerCleanup()}}const Js=new MM;function yM(i){if(!i)return;A.info("MEMORY_CLEANUP","Cleaning up Three.js resources",{philosophy:"threejs_resource_cleanup"});let e=0,t=0,n=0;i.traverse(s=>{if(s.geometry){const r=s.geometry;r&&typeof r.dispose=="function"&&(r.dispose(),t++)}s.material&&(Array.isArray(s.material)?s.material:[s.material]).forEach(a=>{a&&typeof a.dispose=="function"&&(Object.keys(a).forEach(o=>{const l=a[o];l&&l.isTexture&&(l.dispose(),e++)}),a.dispose(),n++)})}),A.info("MEMORY_CLEANUP","Three.js cleanup complete",{disposedTextures:e,disposedGeometries:t,disposedMaterials:n,philosophy:"threejs_cleanup_stats"})}function xM(i){i.updateMatrixWorld(!0);let e=1.2,t=!1;i.traverse(c=>{if(c.type==="Bone"&&!t){const h=c.name.toLowerCase();if(h.includes("neck")&&!h.includes("twist")&&!h.includes("ref")){c.updateMatrixWorld(!0);const u=new I;c.getWorldPosition(u),e=u.y-.15,t=!0,A.info("FACE_CLIPPING","Found neck bone for clipping reference",{boneName:c.name,neckBoneY:e.toFixed(3),worldPosition:u.toArray(),philosophy:"neck_bone_reference"})}}});const n=t?e:1.5;A.info("FACE_CLIPPING","Applying face-only clipping with plane",{threshold:n,foundNeckBone:t,method:t?"neck_bone_based":"threshold_fallback",debugFlagsActive:!1,philosophy:"clip_body_preserve_head_and_neck"});let s=!1,r=!1,a=0,o=0,l=null;i.traverse(c=>{if(c instanceof wn&&c.morphTargetDictionary){const h=Object.keys(c.morphTargetDictionary).length;(!l||h>Object.keys(l.morphTargetDictionary||{}).length)&&(l=c)}}),l&&A.info("FACE_CLIPPING","Found main skinned mesh with morphs",{meshName:l.name,morphTargetCount:Object.keys(l.morphTargetDictionary||{}).length,philosophy:"main_mesh_identified"}),i.traverse(c=>{if(c.type==="Mesh"||c.type==="SkinnedMesh"){o++;const h=c,u=h===l,d=new Xt().setFromObject(h),f=new I,g=new I;d.getCenter(f),d.getSize(g);const _=d.min.y,m=d.max.y;if(A.debug("FACE_CLIPPING","Analyzing mesh for clipping",{meshName:h.name,meshType:h.type,isMainMesh:u,centerY:f.y.toFixed(3),minY:_.toFixed(3),maxY:m.toFixed(3),sizeY:g.y.toFixed(3),threshold:n}),u||m>=n){if(h.visible=!0,s=!0,u&&(r=!0),A.info("FACE_CLIPPING","Keeping mesh visible",{meshName:h.name,reason:u?"main_skinned_mesh_with_morphs":"contains_head",maxY:m.toFixed(3),threshold:n,philosophy:"preserve_mesh"}),h.material){const p=Array.isArray(h.material)?h.material:[h.material];p.forEach(v=>{const M=new Bn(new I(0,1,0),-n);v.clippingPlanes=[M],v.clipShadows=!0,v.needsUpdate=!0}),a++,A.info("FACE_CLIPPING","Applied clipping plane to material",{meshName:h.name,materialCount:p.length,philosophy:"material_clipping_plane"})}}else h.visible=!1,A.debug("FACE_CLIPPING","Hiding mesh (entirely below threshold)",{meshName:h.name,maxY:m.toFixed(3),threshold:n})}}),A.info("FACE_CLIPPING","Face-only clipping completed",{totalMeshes:o,clippedMeshes:a,mainMeshFound:s,skinnedMeshFound:r,threshold:n,philosophy:"clipping_complete"}),(!s||!r)&&A.error("FACE_CLIPPING","CRITICAL: Main mesh visibility issue after clipping!",{totalMeshes:o,mainMeshFound:s,skinnedMeshFound:r,threshold:n,mainMeshName:l?.name||"not_found",philosophy:"critical_mesh_visibility_issue"})}function vM(i){const{container:e,serverScanId:t,onViewerReady:n,onMorphDataChange:s,autoRotate:r=!1,faceMorphData:a,faceSkinTone:o,faceOnly:l=!1,...c}=i,[h,u]=ae.useState({isLoading:!0,error:null,isInitialized:!1,isViewerReady:!1,activeView:"threequarter",isAutoRotating:r}),d=ae.useRef(!n),f=ae.useRef(!1),g=ae.useRef(!1),_=ae.useRef(0),m=ae.useRef(!1),p=ae.useRef(t),v=ae.useRef(null),{data:M}=gM(),y=ae.useRef("female"),b=ae.useRef(null),C=ae.useRef(!1),L=ae.useRef(!1),D=ae.useRef(i);D.current=i;const T=ae.useRef(M);T.current=M;const E=ae.useMemo(()=>{const R=eh(i);return C.current&&m.current?(R!==y.current&&A.error("ORCHESTRATOR","🚨 BLOCKED: Attempted gender change during projection session",{lockedGender:y.current,attemptedGender:R,philosophy:"projection_session_gender_lock"}),y.current):(R!==y.current&&(y.current=R,i.overrideGender&&(C.current=!0,A.info("ORCHESTRATOR","🔒 Gender LOCKED for projection session",{lockedGender:R,philosophy:"gender_lock_activated"}))),y.current)},[i.savedAvatarPayload?.resolved_gender,i.resolvedGender,i.userProfile?.sex,i.overrideGender]),P=ae.useMemo(()=>{const R=Qc(i);if(L.current&&m.current&&!i.overrideSkinTone){const ee=b.current?.rgb,Ke=R?.rgb;return(!ee||!Ke||Math.abs(ee.r-Ke.r)>1||Math.abs(ee.g-Ke.g)>1||Math.abs(ee.b-Ke.b)>1)&&A.warn("ORCHESTRATOR","🚨 BLOCKED: Attempted skin tone change during projection session (non-override)",{lockedRGB:ee,attemptedRGB:Ke,philosophy:"projection_session_skin_tone_lock"}),b.current}const Re=b.current?.rgb,le=R?.rgb;return(!Re||!le||Re.r!==le.r||Re.g!==le.g||Re.b!==le.b)&&(b.current=R,i.overrideSkinTone&&(L.current=!0,A.info("ORCHESTRATOR","🔒 Skin tone LOCKED for projection session",{lockedRGB:le,philosophy:"skin_tone_lock_activated"}))),b.current},[i.savedAvatarPayload?.skin_tone,i.skinTone,i.scanResult,i.overrideSkinTone]);ae.useLayoutEffect(()=>{g.current||A.debug("ORCHESTRATOR","Initialization values",{finalGender:E,skinToneRGB:P?.rgb?`rgb(${P.rgb.r}, ${P.rgb.g}, ${P.rgb.b})`:"none",serverScanId:t,faceOnly:l,hasMorphologyMapping:!!M,hasOverrideProps:!!(i.overrideMorphData||i.overrideGender||i.overrideSkinTone),containerDimensions:e?{width:e.clientWidth,height:e.clientHeight}:null,philosophy:"orchestrator_initialization"})},[E,P,t,l,M,e,i.overrideMorphData,i.overrideGender,i.overrideSkinTone]);const O=D_({container:e,finalGender:E,serverScanId:t,faceOnly:l,onSceneReady:ae.useCallback(()=>{A.info("ORCHESTRATOR","Scene ready, proceeding to model loading",{serverScanId:t,philosophy:"scene_to_model_transition"})},[t])}),z=k0({finalGender:E,morphologyMapping:M,serverScanId:t}),j=dM({scene:O.scene,skinTone:P,finalGender:E,serverScanId:t}),G=T0({finalGender:E,serverScanId:t,onModelLoaded:ae.useCallback(async(R,Re)=>{const le=D.current,we=T.current;if(!we){A.info("ORCHESTRATOR","Model loaded but morphologyMapping not available yet, deferring morph application",{serverScanId:t,philosophy:"morphology_mapping_not_ready"});return}A.info("ORCHESTRATOR","Model loaded callback - detailed inspection",{modelInstanceName:R.name,modelInstanceChildren:R.children.length,mainMeshName:Re.name,mainMeshType:Re.type,hasMorphTargetDictionary:!!Re.morphTargetDictionary,morphTargetDictionarySize:Re.morphTargetDictionary?Object.keys(Re.morphTargetDictionary).length:0,morphTargetDictionaryKeys:Re.morphTargetDictionary?Object.keys(Re.morphTargetDictionary).slice(0,10):[],hasMorphTargetInfluences:!!Re.morphTargetInfluences,morphTargetInfluencesLength:Re.morphTargetInfluences?Re.morphTargetInfluences.length:0,morphTargetInfluencesInitialValues:Re.morphTargetInfluences?Re.morphTargetInfluences.slice(0,10):[],serverScanId:t}),A.info("ORCHESTRATOR","Model loaded, applying morphs and materials",{modelName:R.name,mainMeshName:Re.name,serverScanId:t,philosophy:"model_to_morph_transition"}),u(Ie=>({...Ie,isLoading:!1,isInitialized:!0}));const ee=await fM(le,we);if(ee.status==="ready"?(await z.applyMorphs(R,ee.shape_params,le.faceMorphData,we),le.faceOnly?A.info("ORCHESTRATOR","Skipping limb masses application (faceOnly mode)",{faceOnly:le.faceOnly,serverScanId:t,philosophy:"face_only_skip_limb_masses"}):(A.info("ORCHESTRATOR","Applying limb masses (body mode)",{limbMassesCount:Object.keys(ee.limb_masses||{}).length,shapeParamsCount:Object.keys(ee.shape_params||{}).length,serverScanId:t,philosophy:"body_mode_limb_masses"}),await z.applyLimbMasses(R,ee.limb_masses,ee.shape_params))):A.error("ORCHESTRATOR","Payload not ready for morph application - detailed diagnostics",{payloadStatus:ee.status,payloadError:ee.error,serverScanId:t,hasPayloadData:!!ee.data,payloadDataKeys:ee.data?Object.keys(ee.data):[],hasMorphData:!!ee.data?.finalShapeParams,morphDataCount:ee.data?.finalShapeParams?Object.keys(ee.data.finalShapeParams).length:0,hasLimbMasses:!!ee.data?.finalLimbMasses,limbMassesCount:ee.data?.finalLimbMasses?Object.keys(ee.data.finalLimbMasses).length:0,hasResolvedGender:!!ee.data?.resolvedGender,resolvedGenderValue:ee.data?.resolvedGender,hasUserProfile:!!ee.data?.userProfile,userProfileKeys:ee.data?.userProfile?Object.keys(ee.data.userProfile):[],recommendations:["Check if scan was committed successfully","Verify body_scans table has all required columns","Check if useProfileAvatarData is returning complete data","Verify resolvedGender is persisted in database"],philosophy:"payload_not_ready_detailed_diagnostics"}),await j.configureMaterials(le.faceSkinTone||b.current),O.controls)if(le.faceOnly){A.info("ORCHESTRATOR","Adjusting camera and applying clipping for face scan focus",{serverScanId:t}),xM(R),_M.FORCE_MESH_VISIBLE;const Ie=new I(0,1.65,0);if(O.controls.setTarget(Ie),O.camera){const nt=O.camera,lt=1.5;nt.position.set(0,1.65,lt),nt.lookAt(Ie),nt.updateProjectionMatrix(),nt.near=.1,nt.far=10,nt.updateProjectionMatrix(),A.info("ORCHESTRATOR","Camera positioned for face view",{cameraPosition:nt.position.toArray(),targetPosition:Ie.toArray(),distance:lt,near:nt.near,far:nt.far,serverScanId:t,philosophy:"face_camera_optimized"})}O.controls.snapTo("front")}else O.controls.fitToObject(R,.02);O.startRenderLoop(h.isAutoRotating,R),u(Ie=>({...Ie,isViewerReady:!0})),g.current=!0,le.onViewerReady&&(A.info("ORCHESTRATOR","Calling onViewerReady callback - viewer fully initialized",{serverScanId:t,philosophy:"viewer_ready_callback"}),le.onViewerReady()),(le.overrideMorphData||le.overrideGender||le.overrideSkinTone)&&(m.current=!0,A.info("ORCHESTRATOR","🔒 PROJECTION SESSION ACTIVE - All reinitialization BLOCKED",{hasOverrideMorphData:!!le.overrideMorphData,hasOverrideGender:!!le.overrideGender,hasOverrideSkinTone:!!le.overrideSkinTone,serverScanId:t,philosophy:"projection_session_lock_activated"}));const Ke=rr();A.info("ORCHESTRATOR","Viewer fully initialized - permanent flag set",{serverScanId:t,initCount:_.current,totalReloads:Ke.getReloadCounts().size,projectionSessionActive:m.current,philosophy:"permanent_initialization_complete"}),!d.current&&le.onViewerReady&&(d.current=!0,setTimeout(()=>{le.onViewerReady()},0));const ge=ph.getState();ge.isActive&&ge.overallProgress<100&&ge.setOverallProgress(100,"Avatar 3D Prêt","Votre reflet numérique est maintenant visible")},[t,O,h.isAutoRotating])});ae.useLayoutEffect(()=>{if(g.current){rr().trackReload("Avatar3DViewer_SceneInit"),A.error("ORCHESTRATOR","🚨 CRITICAL: Attempted reinitialize of fully initialized viewer!",{serverScanId:t,initialServerScanId:p.current,initCount:_.current,projectionSessionActive:m.current,triggerSource:"useLayoutEffect_sceneInit_dependencies",philosophy:"permanent_guard_blocked_reinit"});return}if(m.current){A.error("ORCHESTRATOR","🚨 BLOCKED: Scene init during projection session!",{serverScanId:t,philosophy:"projection_session_guard_blocked_scene_init"});return}if(!e||O.isInitialized||O.isInitializing||f.current)return;if(e.clientWidth===0||e.clientHeight===0){A.warn("ORCHESTRATOR","Container has zero dimensions, deferring initialization",{containerSize:{width:e.clientWidth,height:e.clientHeight},serverScanId:t,philosophy:"container_dimensions_invalid"});return}f.current=!0,_.current++,v.current||(v.current=e);const R=rr(),Re=R.startOperation("scene_initialization",{serverScanId:t,initCount:_.current,containerChanged:v.current!==e});u(le=>({...le,isLoading:!0,error:null})),O.initializeScene().then(()=>{R.endOperation(Re),Js.startMonitoring(),A.info("ORCHESTRATOR","Mobile memory monitoring started",{serverScanId:t,philosophy:"memory_monitoring_init"})}).catch(le=>{R.endOperation(Re),A.error("ORCHESTRATOR","Scene initialization failed",{error:le instanceof Error?le.message:"Unknown error",serverScanId:t,philosophy:"scene_init_error"}),u(we=>({...we,error:le instanceof Error?le.message:"Initialization failed",isLoading:!1})),f.current=!1})},[e]),ae.useEffect(()=>{if(!O.scene)return;const R=()=>{O.scene&&yM(O.scene)};return Js.onMemoryPressure(R),A.info("ORCHESTRATOR","Registered Three.js cleanup callback for memory pressure",{serverScanId:t,philosophy:"memory_pressure_cleanup_registered"}),()=>{}},[O.scene,t]),ae.useLayoutEffect(()=>{if(g.current){A.debug("ORCHESTRATOR","Skipping model loading - already fully initialized",{serverScanId:t,projectionSessionActive:m.current,triggerSource:"useLayoutEffect_modelLoad_dependencies",philosophy:"permanent_guard_prevents_reload"});return}if(m.current){A.error("ORCHESTRATOR","🚨 BLOCKED: Model load during projection session!",{serverScanId:t,philosophy:"projection_session_guard_blocked_model_load"});return}if(!O.scene||!O.isInitialized||G.isLoading){A.debug("ORCHESTRATOR","Model loading conditions not met",{hasScene:!!O.scene,sceneInitialized:O.isInitialized,modelIsLoading:G.isLoading,serverScanId:t,philosophy:"model_loading_conditions_check"});return}A.info("ORCHESTRATOR","Scene verified available, triggering model loading with explicit scene reference",{hasScene:!!O.scene,sceneInitialized:O.isInitialized,sceneChildren:O.scene.children.length,sceneUuid:O.scene.uuid,serverScanId:t,philosophy:"scene_verified_explicit_reference_model_loading"}),G.loadModel(O.scene).catch(R=>{A.error("ORCHESTRATOR","Model loading failed with explicit scene reference",{error:R instanceof Error?R.message:"Unknown error",sceneWasValid:!!O.scene,sceneUuid:O.scene?.uuid,serverScanId:t,philosophy:"model_loading_failure_explicit_scene_reference"}),u(Re=>({...Re,error:R instanceof Error?R.message:"Model loading failed",isLoading:!1}))})},[O.scene,O.isInitialized,G.isLoading,G.loadModel]);const Y=ae.useRef(0),Q=ae.useRef(null),V=ae.useRef(""),oe=ae.useRef(""),fe=ae.useRef(""),Ee=ae.useRef(!1),Be=ae.useRef(null),Qe=ae.useRef(0),tt=ae.useRef(0);ae.useLayoutEffect(()=>{if(!g.current||Ee.current||!G.model||!G.modelRef.current||!h.isViewerReady||!i.overrideMorphData||Object.keys(i.overrideMorphData).length===0||!M)return;const R=JSON.stringify(i.overrideMorphData),Re=i.overrideLimbMasses?JSON.stringify(i.overrideLimbMasses):"",le=i.overrideSkinTone?JSON.stringify(i.overrideSkinTone):"",we=R!==V.current,ee=Re!==oe.current,Ke=le!==fe.current;if(!we&&!ee&&!Ke)return;const Ie=Date.now()-Y.current,lt=typeof navigator<"u"&&/mobile|android|iphone|ipod/i.test(navigator.userAgent)?400:150,w=async()=>{Ee.current=!0;try{const x=Date.now();Y.current=x;const B=Be.current||{morphHash:R,limbMassHash:Re,skinToneHash:le};Be.current=null;const X=B.morphHash!==V.current,$=B.limbMassHash!==oe.current,W=B.skinToneHash!==fe.current;if(V.current=B.morphHash,oe.current=B.limbMassHash,fe.current=B.skinToneHash,Qe.current++,X){const ne=Date.now();await z.applyMorphs(G.model,i.overrideMorphData,D.current.faceMorphData,M);const me=Date.now()-ne;me>100&&A.debug("ORCHESTRATOR","✅ Morphs applied",{duration:`${me}ms`,philosophy:"morph_update_complete"})}if($&&i.overrideLimbMasses&&Object.keys(i.overrideLimbMasses).length>0&&!D.current.faceOnly){const ne=Date.now();await z.applyLimbMasses(G.model,i.overrideLimbMasses);const me=Date.now()-ne;me>50&&A.debug("ORCHESTRATOR","✅ Limb masses applied",{duration:`${me}ms`,philosophy:"limb_mass_update_complete"})}if(W&&i.overrideSkinTone){const ne=Date.now();await j.configureMaterials(i.overrideSkinTone);const me=Date.now()-ne;me>50&&A.debug("ORCHESTRATOR","✅ Materials updated",{duration:`${me}ms`,philosophy:"material_update_complete"})}const Se=Date.now()-x;tt.current++,Se>100&&A.info("ORCHESTRATOR","✨ BATCH UPDATE COMPLETE",{updateNumber:tt.current,totalDuration:`${Se}ms`,morphApplied:X,limbMassApplied:$,skinToneApplied:W,projectionSessionActive:m.current,philosophy:"batch_update_success_sampled"})}catch(x){A.error("ORCHESTRATOR","Error during morph-only update",{error:x instanceof Error?x.message:"Unknown error",updateAttemptNumber:Qe.current,successfulUpdates:tt.current,stack:x instanceof Error?x.stack:void 0,philosophy:"morph_update_error"})}finally{Ee.current=!1}};if(Be.current={morphHash:R,limbMassHash:Re,skinToneHash:le},Ie>=lt)w();else{const x=lt-Ie;Q.current&&clearTimeout(Q.current),Q.current=setTimeout(()=>{w()},x)}return()=>{Q.current&&clearTimeout(Q.current)}},[i.overrideMorphData,i.overrideLimbMasses,i.overrideSkinTone,h.isViewerReady,G.model,G.modelRef,M,z.applyMorphs,z.applyLimbMasses,j.configureMaterials]),ae.useLayoutEffect(()=>{m.current},[h.isViewerReady,G.model]);const $e=ae.useCallback(R=>{O.controls&&(u(Re=>({...Re,activeView:R})),O.controls.snapTo(R==="threequarter"?"threequarter":R))},[O.controls]),q=ae.useCallback(()=>{const R=!h.isAutoRotating;u(Re=>({...Re,isAutoRotating:R})),O.controls&&O.controls.setAutoRotate(R)},[h.isAutoRotating,O.controls]),Z=ae.useCallback(()=>{O.controls&&(O.controls.reset(),u(R=>({...R,activeView:"threequarter"})))},[O.controls]),Me=ae.useCallback(R=>{G.modelRef.current&&(z.applyMorphs(G.modelRef.current,R,a,M),s?.(R),A.debug("ORCHESTRATOR","Direct morph update applied via ref",{morphDataKeys:Object.keys(R),serverScanId:t,philosophy:"direct_ref_morph_update"}))},[G.modelRef,z.applyMorphs,s,t,a,M]),Oe=ae.useCallback(R=>{G.modelRef.current&&(z.forceMorphsUpdate(G.modelRef.current,R,a,M),A.debug("ORCHESTRATOR","Forced morph cache reset via orchestrator",{serverScanId:t,philosophy:"orchestrator_force_morph_update"}))},[G.modelRef,z.forceMorphsUpdate,t,a,M]),Te=ae.useCallback(()=>{A.info("ORCHESTRATOR","Retrying initialization with complete cleanup",{serverScanId:t,projectionSessionWasActive:m.current,philosophy:"retry_with_cleanup"}),m.current=!1,C.current=!1,L.current=!1,Js.stopMonitoring(),O.cleanup(),G.cleanupModel(),z.resetMorphs(),u({isLoading:!0,error:null,isInitialized:!1,isViewerReady:!1,activeView:"threequarter",isAutoRotating:r}),d.current=!1,f.current=!1,g.current=!1,Qe.current=0,tt.current=0,A.info("ORCHESTRATOR","Retry initialization state reset completed",{serverScanId:t,philosophy:"retry_state_reset_complete"})},[O.cleanup,G.cleanupModel,z.resetMorphs,r,t]);ae.useEffect(()=>()=>{Js.stopMonitoring(),A.info("ORCHESTRATOR","Memory monitoring stopped on unmount",{serverScanId:t,philosophy:"memory_monitoring_cleanup"})},[t]);const Ye=h.isViewerReady&&!h.isLoading&&!h.error,St=!!h.error;return{viewerState:h,scene:O.scene,renderer:O.renderer,camera:O.camera,controls:O.controls,model:G.model,mainMesh:G.modelRef.current,setCameraView:$e,toggleAutoRotate:q,resetCamera:Z,updateMorphData:Me,retryInitialization:Te,forceMorphsUpdate:Oe,isReady:Ye,hasError:St,errorMessage:h.error}}const SM=({activeView:i,isAutoRotating:e,onCameraViewChange:t,onAutoRotateToggle:n,onCameraReset:s,showControls:r})=>{if(!r)return null;const a=ae.useMemo(()=>[{key:"front",icon:ni.User,color:"#60A5FA",label:"Vue de face"},{key:"threequarter",icon:ni.RotateCcw,color:"#8B5CF6",label:"Vue 3/4"},{key:"profile",icon:ni.ArrowRight,color:"#06B6D4",label:"Vue de profil"}],[]);return rt.jsx(ua.div,{className:"absolute top-2 right-2 sm:top-3 sm:right-3",initial:{opacity:0,y:-6},animate:{opacity:1,y:0},transition:{duration:.25,ease:[.25,.1,.25,1]},children:rt.jsxs("div",{className:`
          flex flex-col items-center
          gap-1 sm:gap-1.5
          p-1 sm:p-1.5
          rounded-xl
          bg-black/60 backdrop-blur-md
          border border-white/15
          shadow-lg
        `,role:"toolbar","aria-label":"Contrôles de la caméra",children:[a.map(({key:o,icon:l,color:c,label:h})=>{const u=i===o;return rt.jsx("button",{onClick:()=>t(o),className:["w-8 h-8 sm:w-9 sm:h-9 rounded-lg","flex items-center justify-center","transition-all outline-none",u?"bg-white/10 text-white border border-white/20 shadow":"text-white/70 hover:text-white hover:bg-white/10 border border-transparent","focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0"].join(" "),style:u?{boxShadow:`0 0 0 1px color-mix(in srgb, ${c} 35%, transparent), 0 6px 14px rgba(0,0,0,.35)`}:void 0,"aria-label":h,"aria-pressed":u,title:h,type:"button",children:rt.jsx(is,{Icon:l,size:14,className:"!w-[18px] !h-[18px] sm:!w-[14px] sm:!h-[14px]",color:u?c:void 0})},o)}),rt.jsx("div",{className:"w-6 sm:w-7 h-px my-1 sm:my-1.5 bg-white/10 rounded-full","aria-hidden":"true"}),rt.jsx("button",{onClick:n,className:["w-8 h-8 sm:w-9 sm:h-9 rounded-lg","flex items-center justify-center","transition-all outline-none",e?"bg-emerald-500/15 text-emerald-300 border border-emerald-400/25":"bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/15","focus-visible:ring-2 focus-visible:ring-white/50"].join(" "),"aria-pressed":e,"aria-label":e?"Désactiver la rotation automatique":"Activer la rotation automatique",title:e?"Désactiver la rotation automatique":"Activer la rotation automatique",type:"button",children:rt.jsx(ua.div,{animate:e?{rotate:360}:{rotate:0},transition:e?{duration:4,repeat:1/0,ease:"linear"}:{duration:.2},children:rt.jsx(is,{Icon:ni.RotateCcw,size:14,className:"!w-[18px] !h-[18px] sm:!w-[14px] sm:!h-[14px]"})})}),rt.jsx("button",{onClick:s,className:`
            w-8 h-8 sm:w-9 sm:h-9 rounded-lg
            flex items-center justify-center
            bg-white/5 text-white/70 hover:text-white hover:bg-white/10
            border border-white/15
            transition-all outline-none
            focus-visible:ring-2 focus-visible:ring-white/50
          `,"aria-label":"Réinitialiser la vue",title:"Réinitialiser la vue",type:"button",children:rt.jsx(is,{Icon:ni.Target,size:14,className:"!w-[18px] !h-[18px] sm:!w-[14px] sm:!h-[14px]"})})]})})},EM=ao.memo(SM),TM=({isLoading:i})=>i?rt.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-xl",children:rt.jsxs("div",{className:"text-center space-y-4",children:[rt.jsx(ua.div,{className:"w-12 h-12 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center",animate:{rotate:360},transition:{duration:2,repeat:1/0,ease:"linear"},children:rt.jsx(is,{Icon:ni.Loader2,size:24,className:"text-purple-400"})}),rt.jsxs("div",{children:[rt.jsx("h4",{className:"text-white font-semibold mb-1",children:"Chargement de votre avatar"}),rt.jsx("p",{className:"text-white/60 text-sm",children:"Initialisation du moteur 3D..."})]})]})}):null,bM=({error:i,onRetry:e})=>i?rt.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-xl",children:rt.jsxs("div",{className:"text-center space-y-4",children:[rt.jsx(is,{Icon:ni.AlertCircle,size:48,className:"text-red-400 mx-auto"}),rt.jsxs("div",{children:[rt.jsx("h4",{className:"text-white font-semibold mb-2",children:"Affichage 3D indisponible"}),rt.jsx("p",{className:"text-red-300 text-sm mb-4",children:i}),rt.jsx("button",{onClick:e,className:"btn-glass--primary px-4 py-2",children:"Réessayer"})]})]})}):null,AM=ae.forwardRef((i,e)=>{const{serverScanId:t,className:n="",showControls:s=!0,faceMorphData:r,faceSkinTone:a,faceOnly:o=!1,overrideMorphData:l,overrideLimbMasses:c,overrideSkinTone:h,overrideGender:u,...d}=i,[f,g]=ao.useState(null),_=ae.useCallback(p=>{g(p)},[]),m=vM({container:f,serverScanId:t,faceMorphData:r,faceSkinTone:a,faceOnly:o,overrideMorphData:l,overrideLimbMasses:c,overrideSkinTone:h,overrideGender:u,...d});return ae.useImperativeHandle(e,()=>({getCameraControls:()=>m.controls,updateMorphData:m.updateMorphData,resetCamera:m.resetCamera,setCameraView:m.setCameraView,toggleAutoRotate:m.toggleAutoRotate,forceMorphsUpdate:m.forceMorphsUpdate}),[m]),rt.jsxs("div",{className:`relative ${n}`,children:[rt.jsx("div",{ref:_,className:"w-full h-full min-h-[300px] sm:min-h-[400px] rounded-xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-400/20 relative overflow-hidden",style:{width:"100%",height:"100%",position:"relative"}}),rt.jsx(TM,{isLoading:m.viewerState.isLoading}),rt.jsx(bM,{error:m.hasError?m.errorMessage:null,onRetry:m.retryInitialization}),rt.jsx(EM,{activeView:m.viewerState.activeView,isAutoRotating:m.viewerState.isAutoRotating,onCameraViewChange:m.setCameraView,onAutoRotateToggle:m.toggleAutoRotate,onCameraReset:m.resetCamera,showControls:s&&!m.viewerState.isLoading&&!m.hasError})]})});AM.displayName="Avatar3DViewer";export{AM as A,OM as n,Co as t,gM as u};
