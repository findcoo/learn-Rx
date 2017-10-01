import 'rxjs';

const PING = 'PING';
const PONG = 'PONG';

export function ping() {
  return { type: PING };
}

export function pingEpic(action$) {
  return action$.ofType('PING')
    .mapTo({ type: 'PONG' });
}

export default function reducer(state = { isPing: false }, action) {
  switch (action.type) {
    case 'PING':
      return { isPing: false };
    case 'PONG':
      return { isPing: true };
    default:
      return state;
  }
}
