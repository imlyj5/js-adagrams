const LETTER_POOL = {
    'A': 9, 
    'B': 2, 
    'C': 2, 
    'D': 4, 
    'E': 12, 
    'F': 2, 
    'G': 3, 
    'H': 2, 
    'I': 9, 
    'J': 1, 
    'K': 1, 
    'L': 4, 
    'M': 2, 
    'N': 6, 
    'O': 8, 
    'P': 2, 
    'Q': 1, 
    'R': 6, 
    'S': 4, 
    'T': 6, 
    'U': 4, 
    'V': 2, 
    'W': 2, 
    'X': 1, 
    'Y': 2, 
    'Z': 1
};

const SCORE_OF_LETTER = {
    'A': 1, 
    'B': 3, 
    'C': 3, 
    'D': 2, 
    'E': 1, 
    'F': 4, 
    'G': 2, 
    'H': 4, 
    'I': 1, 
    'J': 8, 
    'K': 5, 
    'L': 1, 
    'M': 3, 
    'N': 1, 
    'O': 1, 
    'P': 3, 
    'Q': 10, 
    'R': 1, 
    'S': 1, 
    'T': 1, 
    'U': 1, 
    'V': 4, 
    'W': 4, 
    'X': 8, 
    'Y': 4, 
    'Z': 10
};

const HAND_SIZE = 10;
const BONUS_MIN_LENGTH = 7;
const LENGTH_BONUS_POINTS = 8;


export const drawLetters = () => {
  // Implement this method for wave 1
  let letters = [];
  let availablePool = [];

  for (const key in LETTER_POOL) {
    for (let i = 0; i < LETTER_POOL[key]; i++){
      availablePool.push(key);
    }
  }

  while(letters.length < HAND_SIZE) {
    let min = 0;
    let max = availablePool.length - 1;
    let randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    letters.push(availablePool.splice(randomIndex, 1)[0]);  //use splice because pop can only remove the last element in JS
  }
  return letters;

};


export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
  let status = false;
  let countOfLetterMapping = {};

  for (let letter of lettersInHand){
    if(letter in countOfLetterMapping) {
      countOfLetterMapping[letter] ++ ;
    }else{
      countOfLetterMapping[letter] = 1;
    }
  }

  for (let letter of input){
    if (lettersInHand.includes(letter.toUpperCase()) && countOfLetterMapping[letter.toUpperCase()] > 0){
      countOfLetterMapping[letter.toUpperCase()] --;
      status = true;
    }else{
      status = false;
      return status;
    }
  }

  return status;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
  let score = 0;

  for(let letter of word){
    score += SCORE_OF_LETTER[letter.toUpperCase()]
  }

  if(word.length >= BONUS_MIN_LENGTH){
    score += LENGTH_BONUS_POINTS;
  }

  return score;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
  let highestScore = 0;
  let winner = '';

  for (let word of words){
    let scoreOfWord = scoreWord(word);
    if (scoreOfWord > highestScore){
      highestScore = scoreOfWord;
      winner = word;
    }else if(scoreOfWord === highestScore){
      if (winner.length !== 10 && word.length === 10){
        winner = word;
      }else if(winner.length !== 10 && word.length < winner.length){
        winner = word;
      }
    }
  }

  let winnerInfo = {
    'score': highestScore,
    'word' : winner 
  };
  return winnerInfo;
};
