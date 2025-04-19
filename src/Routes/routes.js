import React, { lazy, Profiler } from "react";
import ImageCarousel from "../ImageCaurosel/ImageCarousel";
import MutationObserverComponent from "../JavascriptConcepts/MutationObserver";
import ProgressBar from "../ProgressBar/ProgressBar";
import ClockTimer from "../clockTimer";
import Chessboard from "../Chess/chess";
const Form = lazy(() => import("../Form/FormFields"));

const CustomRouteConfig = [
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
];
export default CustomRouteConfig;
