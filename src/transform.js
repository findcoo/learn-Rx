"use strict";

const Rx = require('rx'),
    Observable = Rx.Observable;

Observable.range(1,5)
  .bufferWithCount(2,1)
  .subscribe(
    res => console.log(res),
    err => console.log(err),
    () => console.log('compete buffer'));

Observable
  .of(1,2,3)
  .subscribe(
    res => console.log(res),
    err => console.log(err),
    () => console.log('complete of'));
