import "./styles.css";
import { useState } from "react";

let singleArray = [4, 2, 2, 2];
let MultiArray = [];
for (let i = 0; i < 4; i++) {
  MultiArray.push(singleArray);
}
let updatedArray = [...MultiArray[0]];
updatedArray[2] = 8;
MultiArray[0] = updatedArray;

export default function App() {
  const [dataArray, setDataArray] = useState(MultiArray);

  function transpose(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < i; j++) {
        const tmp = arr[i][j];
        let temp1 = [...arr[i]];
        temp1[j] = arr[j][i];
        arr[i] = temp1;
        let temp2 = [...arr[j]];
        temp2[i] = tmp;
        arr[j] = temp2;
      }
    }
  }

  // Numbers should be swiped in bottom direction
  function swipeBottom(arr) {
    transpose(dataArray);
    swipeRight(dataArray);
    transpose(dataArray);
    let newArray = [...dataArray];
    setDataArray(newArray);
  }

  function swipeTop(arr) {
    transpose(dataArray);
    swipeLeft(dataArray);
    transpose(dataArray);
    let newArray = [...dataArray];
    setDataArray(newArray);
  }

  // Numbers should be swiped in right direction
  function swipeRight() {
    dataArray.forEach(moveZeroesToLeft);
    console.log(dataArray);
    let newArray = [...dataArray];
    setDataArray(newArray);
  }

  // Numbers should be swiped in left direction
  function swipeLeft() {
    dataArray.forEach(moveZeroesToRight);
    let newArray = [...dataArray];
    setDataArray(newArray);
  }

  //Move Numbers to left and Move Zeroes to right
  function moveZeroesToRight(arrayElement) {
    let count = 0;
    for (let i = 0; i < arrayElement.length; i++)
      if (arrayElement[i] !== 0) arrayElement[count++] = arrayElement[i];
    while (count < arrayElement.length) arrayElement[count++] = 0;
    addNumbersToLeft(arrayElement);
  }

  // Move Numbers to left and Move Zeroes to right
  function moveZeroesToLeft(arrayElement) {
    let count = arrayElement.length - 1;
    for (let i = arrayElement.length - 1; i >= 0; i--) {
      if (arrayElement[i] !== 0) {
        arrayElement[count--] = arrayElement[i];
      }
    }
    while (count >= 0) {
      arrayElement[count--] = 0;
    }
    addNumbersToRight(arrayElement);
  }

  function addNumbersToRight(arrayElement) {
    for (let i = 0; i < arrayElement.length; ) {
      if (arrayElement[i] === arrayElement[i + 1]) {
        arrayElement[i] = 2 * arrayElement[i];
        arrayElement[i + 1] = 0;
        i += 2;
      } else {
        i++;
      }
    }
    return arrayElement;
  }

  function addNumbersToLeft(arrayElement) {
    for (let i = arrayElement.length - 1; i > 0; ) {
      if (arrayElement[i] === arrayElement[i - 1]) {
        arrayElement[i] = 0;
        arrayElement[i - 1] = 2 * arrayElement[i];
        i -= 2;
      } else {
        i--;
      }
    }
    return arrayElement;
  }

  function getColor(el) {
    if (el === 2) {
      return "pink";
    }
    if (el === 4) {
      return "yellow";
    }
    if (el === 8) {
      return "beige";
    }
    if (el === 16) {
      return "beige";
    }
    if (el === 32) {
      return "aquamarine";
    }
    if (el === 64) {
      return "blanchedalmond";
    }
    if (el === 128) {
      return "cadetblue";
    }
    if (el === 256) {
      return "cornsilk";
    }
    if (el === 512) {
      return "crimson";
    }
    if (el === 1024) {
      return "burlywood";
    }
    if (el === 2048) {
      return "lightsalmon";
    }
  }

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button onClick={swipeLeft}>Scroll-Right </button>
        <button onClick={swipeRight}>Scroll-Left </button>
        <button onClick={swipeBottom}>Scroll-Top </button>
        <button onClick={swipeTop}>Scroll-Bottom </button>
      </div>
      {dataArray &&
        dataArray.map((d) => {
          return (
            <div className="grid-cell">
              {d &&
                d.map((de) => {
                  return (
                    <div style={{ backgroundColor: getColor(de) }}>
                      {de || ""}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}
