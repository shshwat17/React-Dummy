import "./styles.css";
import WrappedComponentMiddleware from "./WrappedComp";
import useCounter from "./CustomHook/useCounter";
import useFetch from "./CustomHook/useFetch";
import ClockTimer from "./clockTimer";
import Chessboard from "./Chess/chess";
import ProgressBar from "./ProgressBar/ProgressBar";
import ImageCarousel from "./ImageCaurosel/ImageCarousel";
import FormFields from "./Form/FormFields";

const App = ({ name }) => {
  const { count, increment, decrement } = useCounter();
  const { data } = useFetch();
  const images = [
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200"
  ];

  return (
    <div className="App">
      {/* <ImageCarousel images={images} /> */}
      <FormFields />
      {/* Counter
      <h2>{count}</h2>
      <ProgressBar progress={count} />
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <h1>Fetch</h1>
      <h2>{data?.title}</h2>
      <h1>Time</h1>
      <h2>
        <ClockTimer />
      </h2>
      <Chessboard size={4} />
      <div className="circle" /> */}
    </div>
  );
};
export default WrappedComponentMiddleware(App);
