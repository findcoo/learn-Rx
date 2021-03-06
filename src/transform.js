"use strict";

const Rx = require('rx'),
    Observable = Rx.Observable;

Observable.range(1,5)
  .bufferWithCount(2,1)
  .subscribe(
    res => console.log(res),
    err => console.log(err),
    () => console.log('compete buffer'));

Observable.of(1,2,3)
  .subscribe(
    res => console.log(res),
    err => console.log(err),
    () => console.log('complete of'));

Observable.range(2,3)
  .selectMany(res => {return Observable.range(1,res)})
  .subscribe(
    res => console.log(res),
    err => console.log(err),
    () => console.log('complete selectMany'));

var charObs = Observable.fromArray(['a','b','c','d'])
charObs
  .flatMap(
    (x, i) => {return [x,i]},
    (x, y, ix, iy) => {return [x, y, ix, iy]})
  .subscribe(
    res => console.log(res),
    err => console.log(err),
    () => console.log('complete flatMap'));
