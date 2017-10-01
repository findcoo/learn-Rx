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

  * [Create](https://github.com/findcoo/learn-Rx/blob/master/src/Create.md)
  * [Transform](https://github.com/findcoo/learn-Rx/blob/master/src/Transform.md)


* Redux-observable

  rxjs를 이용해 redux 상태를 관리하는 라이브러리.
  가장 큰 특징은 상태를 마치 서사시 처럼 기승전결이 있는 단계별 흐름으로
  관리한다는 것이다. 이를 `Epic`이라 부른다.
