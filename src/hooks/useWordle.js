import { useState } from "react";
const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setcurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setisCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); //index --> that particular color usedkey[a]=green
  //to take a new guess and format in terms of key and color key === > letter and that color

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    //to check if the letter should be green or not
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    //to check if the letter should be yellow
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add new guess

  const addGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setisCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setcurrentGuess("");
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };
      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l];
        if (l.color === "green") {
          newKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if (
          l.color === "grey" &&
          currentColor !== "yellow" &&
          currentColor !== "green"
        ) {
          newKeys[l.key] = "grey";
          return;
        }
      });
      return newKeys;
    });
  };

  // after pressing enter

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      //only if the turn is less than 5 o/w dont allow enter key
      if (turn > 5) {
        console.log("You have used all your guesses");
        return;
      }
      //only if the current guess is not in out history
      if (history.includes(currentGuess)) {
        console.log("You already guesses that word!!");
        return;
      }
      // if that current word is 5 chars only
      if (currentGuess.length !== 5) {
        console.log("Please enter 5 letters word only");
        return;
      }
      const formatted = formatGuess();
      addGuess(formatted);
    }

    if (key === "Backspace") {
      setcurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setcurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys };
};

export default useWordle;
