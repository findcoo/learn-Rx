* Transform 
  * Buffer [(doc)](http://reactivex.io/documentation/operators/buffer.html) 

    주기적으로 방출되는 아이템을 모아서 집합으로 만들고 집합을 방출시킨다.
    buffer의 기준은 시간적 기준과 갯수 기준으로 나뉜다.

    ```javascript
    obs1()
        .bufferWithCount(2)
        .subscribe(res => console.log(res));
   ```

  * FlatMap [(doc)](http://reactivex.io/documentation/operators/flatmap.html)
    
    Observable이 방출하는 아이템을 다른 Observable로 확산시킨다.
    
     args|return|설명
    :-:|:-:|:-:
     0|Array|반환된 Array이는 index만큼 Observable을 확산한다
     1|Any|확산되었던 값들을 다시 하나의 Observable로 취합한다 
    
    ```javascript
    Observable.range(2,3)
      .selectMany(res => {return Observable.range(1,res)})
      .subscribe(
        res => console.log(res),
        err => console.log(err),
        () => console.log('complete selectMany'));
    ```
