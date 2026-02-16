"use strict";var u=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var f=u(function(C,v){
var x=require('@stdlib/strided-base-smskmap/dist'),R=require('@stdlib/math-base-special-floorf/dist');function _(e,r,a,s,i,t,o){return x(e,r,a,s,i,t,o,R)}v.exports=_
});var m=u(function(D,q){
var E=require('@stdlib/strided-base-smskmap/dist').ndarray,O=require('@stdlib/math-base-special-floorf/dist');function b(e,r,a,s,i,t,o,k,y,j){return E(e,r,a,s,i,t,o,k,y,j,O)}q.exports=b
});var l=u(function(F,p){
var g=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),c=f(),h=m();g(c,"ndarray",h);p.exports=c
});var w=require("path").join,z=require('@stdlib/utils-try-require/dist'),A=l(),n,d=z(w(__dirname,"./native.js"));d instanceof Error?n=A:n=d;module.exports=n;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
