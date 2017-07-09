# Rx 정복기

### 목표 ###
Rx를 도입하여 비동기 프로그래밍을 단순화 하고 비동기 방식으로 프로그램의 병렬성을 극대화한다.

### Rx에 대한 정리 ###

* Observable [(doc)](http://reactivex.io/documentation/observable.html)
  * 직역하자면 관찰 가능한 객체를 뜻함.
  * observer 가 observable을 관찰하는 형태.
  * observer의 메소드
    * `onNext`
      item 방출
    * `onError`
      관찰중 에러를 발생시킨다.
      * `onCompleted`
        정상 종료 시킨다.
    * Observable 생성 예제
      ```javascript
      var obs1 = () => {
          return Observable.create(observer => {
              for (let i; i <= 10; i++) {
                  observer.onNext(i);
              }
              observer.onCompleted();
          });
      };
          
      ```

* Observable 연산자

  rx의 핵심이라 할 수 있다. 
  observable 객체를 이용한 프로그래밍의 모든 인터페이스들

  * Observable 생성
    * Create [(doc)](http://reactivex.io/documentation/operators/create.html)
      * 기본적인 생성 방법, callback 함수에 observer 매개변수를 전달한다.
    * Defer [(doc)](http://reactivex.io/documentation/operators/defer.html)
      * subscribe를 호출 할 때 까지 대기하고 이후 Observable을 생성한다.

        부연 설명하자면, Observable은 두 가지 특성으로 구분되는데.
        cold와 hot이다. cold는 Observable이 생성된 후에 바로 프로세싱되는
        것이 아니라 특정 메소드에 따라 프로세싱된다. 반면 hot은 생성과 동시에
        프로세싱 됨으로 hot같은 경우는 defer와 같이 cold로 만들어 줄수 있는
        대기처리가 필요하다.

        ```javascript
        var defer1 = Observable.defer(() => {
            return obv1();
        });

        defer1.subscribe(res => console.log(res));

        ```

    * if 연산자

       args|return|설명
      :-:|:-:|:-:
       0|bool|조건을 결정하는 함수 
       1|Observable|0 이 true라면 Observable 생성
       2|Observable|0 이 false라면 Observable 생성

      ```javascript
      var if1 = Observable.if(
          () => true,
          Observable.return(1),
          Observable.return(0)
      );
      
      ```

    * case 연산자

       args|return|설명
      :-:|:-:|:-:
       0|Any|key 값을 반환하는 함수
       1|Observable|key 값에 따른 Observable 생성 
       2|Observable|key가 매칭하지 않을 경우 생성될 Observable
      
      ```javascript
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
      
      ```

  * Empty/Never/Throw [(doc)](http://reactivex.io/documentation/operators/empty-never-throw.html)
          
    아무런 방출이 없는 Observable을 생성한다.
    다양한 Observable을 조합하여 사용할 때, 사용된다.

    * Empty
        * 방출 없이 그냥 정상 종료된다.
    * Never
        * 방출은 없지만 종료되진 않는다.
    * Throw
        * 방출 없이 에러만 발생시킨다.

  * From [(doc)](http://reactivex.io/documentation/operators/from.html)
          
    기존 객체나 변수들을 Observable로 변경하여 생성한다.
    언어별로 상이하여 상세한 내역은 공식 문서를 확인.

  * Start [(doc)](http://reactivex.io/documentation/operators/start.html)

    함수 선언 방식으로 observable을 생성한다.
    기존 함수를 Observable 형식으로 변형할 때 유용해 보인다.

    args|return|설명
    :-:|:-:|:-:
    0|Any|일반 적인 함수, 반환 값이 방출 값이된다. 
    1|none|Object 함수의 this에 맵핑된다.
    2|none|스케쥴러, Observable의 프로세싱 방식을 관리한다. 

    ```javascript
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
    ```

  * Transforming  
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
      
     
      
