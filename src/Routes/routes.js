import React, { lazy, Profiler } from "react";
import ImageCarousel from "../Components/ImageCaurosel/ImageCarousel";
import MutationObserverComponent from "../Components/JavascriptConcepts/MutationObserver";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import ClockTimer from "../Components/clockTimer";
import Chessboard from "../Components/Chess/chess";
import StickyNote from "../Components/StickyNotes/StickyNotes";
import ReactForwardRef from "../Components/ForwardRef";
const Form = lazy(() => import("../Components/Form/FormFields"));

const CustomRouteConfig = [
  {
    key: 1,
    element: <StickyNote />,
    path: "/sticky-notes",
  },
  {
    key: 2,
    element: <ImageCarousel />,
    path: "/image-caraousel",
  },
  {
    key: 3,
    element: <Form />,
    path: "/todo-form",
  },
  {
    key: 4,
    element: (
      <Profiler
        id="MutationObserver"
        onRender={(id, phase, actualDuration) => {
          console.log({ id, phase, actualDuration });
          // You can send this data to your analytics or logging service
        }}
      >
        <MutationObserverComponent />
      </Profiler>
    ),
    path: "/mutation-observer",
  },
  {
    key: 5,
    element: <ProgressBar count={20} />,
    path: "/progress-bar",
  },
  {
    key: 6,
    element: <ClockTimer />,
    path: "/clock-timer",
  },
  {
    key: 7,
    element: <Chessboard size={4} />,
    path: "/chessboard",
  },
  {
    key: 8,
    element: <div className="circle" />,
    path: "/half-circle",
  },
  {
    key: 9,
    element: <ReactForwardRef />,
    path: "/ReactForwardRef",
  },
];
export default CustomRouteConfig;
