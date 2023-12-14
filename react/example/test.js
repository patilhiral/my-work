const redux = require('redux');
 
const counterReducer = (state = { counter: 0 }, action) => {
    return {
        counter: state.counter + 1
    };
}
const store = redux.createStore(counterReducer);
 
console.log("Initial State: " , store.getState());
 
const counterReducerSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
}
 
store.subscribe(counterReducerSubscriber);
store.dispatch({type:'increment'})