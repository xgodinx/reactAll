import { Counter } from "./components/Counter";
export default function App() {
  return (
    <div className="flex flex-col gap-2.5 items-center">
      <h1 className="text-4xl">redux</h1>
      <Counter counterId="fisrt" />
      <Counter counterId="second" />
    </div>
  );
}
