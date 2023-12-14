import classes from './Counter.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { counterActions } from '../store/counter';
const Counter = () => {
  const counter = useSelector(state =>state.counter.counter);
  const show =useSelector(state => state.counter.showCounter);
  const dispatch = useDispatch();
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle())
  };
  const incrementHandler = ()=>{
    dispatch(counterActions.increment())
  };
  const decrementHandler=()=>{
    dispatch(counterActions.decrement())
  };

  const increaseHandler = () =>{
    dispatch(counterActions.increase(5))
  }
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>increment</button>
        <button onClick={increaseHandler}>Increase</button>
        <button onClick={decrementHandler}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
