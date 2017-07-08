"use strict";

const Rx = require('rx'),
    Observable = Rx.Observable;


// Create
var obs1 = () => {
    return Observable.create(observer => {
        for (let i=0; i < 13; i++) {
            observer.onNext(i);
        }
        observer.onCompleted();
    });
};

obs1().subscribe(
    res => console.log(res),
    err => console.log(err),
    () => console.log('complete obs1')
);

var defer1 = Observable.defer(() => {
    return obs1();
});

defer1.subscribe(
    res => console.log(res),
    err => console.log(err),
    () => console.log('complete defer1')
);

var if1 = Observable.if(
    () => true,
    Observable.return(1),
    Observable.return(0)
);

if1.subscribe(
    res => console.log(res),
    err => console.log(err),
    () => console.log('complete if1')
);

var selectObservable = {
    'a': Observable.return(1),
    'b': Observable.return(0)
}

var defaultObservable = Observable.empty();

var case1 = Observable.case(
    () => {return 'a';},
    selectObservable,
    defaultObservable
);

var context = { hello: 'world' };

var start1 = Observable.start(
  function() { return this.hello; },
  context,
  Rx.Scheduler.timeout
);

start1.subscribe(
  res => console.log(res),
  err => console.log(err),
  () => console.log('complete start1')
);
