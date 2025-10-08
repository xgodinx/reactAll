import { useEffect, useReducer, useRef } from "react";
import { store } from "./../redux/store";
import type {
  CounterId,
  IncrementAction,
  DecrementAction,
  AppState,
} from "./../redux/store";

const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];

export function Counter({ counterId }: { counterId: CounterId }) {
  const lastStateRef = useRef<ReturnType<typeof selectCounter>>(null);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentState = selectCounter(store.getState(), counterId);
      const lastState = lastStateRef.current;

      if (currentState !== lastState) forceUpdate();

      lastStateRef.current = currentState;
    });
    console.log(unsubscribe);
    return unsubscribe;
  }, []);

  const counterState = selectCounter(store.getState(), counterId);
  return (
    <>
      <p className="bg-blue-400 px-2 text-[20px]">
        {counterState?.counter ?? 0}
      </p>
      <div className="flex gap-2.5">
        <button
          className="bg-amber-300 px-10 rounded-[14px] select-none"
          onClick={() =>
            store.dispatch({
              type: "increment",
              payload: { counterId },
            } satisfies IncrementAction)
          }
        >
          Increment
        </button>
        <button
          className="bg-amber-300 px-10 rounded-[14px] select-none"
          onClick={() =>
            store.dispatch({
              type: "decrement",
              payload: { counterId },
            } satisfies DecrementAction)
          }
        >
          Decrement
        </button>
      </div>
    </>
  );
}
