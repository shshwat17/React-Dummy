import React, { useState, memo, useCallback } from "react";
import "./chess.css";

const Chessboard = (props) => {
  const { size = 4 } = props;
  const [colorIndex, setColorIndex] = useState(["black", "white"]);
  const getChessBoard = useCallback(() => {
    let boardTiles = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const getColorTiles = colorIndex[(i + j) % 2];
        boardTiles.push(
          <div
            key={`${i}-${j}`}
            onClick={() => {
              setColorIndex([...colorIndex.reverse()]);
            }}
            className={getColorTiles}
          />
        );
      }
    }
    return boardTiles;
  }, []);

  return (
    <>
      <div
        className="chessboard"
        style={{ gridTemplateColumns: `repeat(${size}, 60px)` }}
      >
        {getChessBoard()}
      </div>
    </>
  );
};
export default memo(Chessboard);
