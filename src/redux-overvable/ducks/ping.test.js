import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducer, { 
  pingEpic,
  ping
} from './ping';


const epicMiddleware = createEpicMiddleware(pingEpic)
const store = createStore(reducer, applyMiddleware(epicMiddleware))

describe('ping reducer', () => {
  it('fetch ping action', () => {
    store.dispatch(ping());
    const { isPing } = store.getState(); 
    expect(isPing).toEqual(true);  
  });
  
  it('check ping state', () => {
    const { isPing } = store.getState(); 
    expect(isPing).toEqual(true);  
  });
})
