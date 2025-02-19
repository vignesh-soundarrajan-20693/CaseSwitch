import { dispatchAlert } from "./aeft-utils";
import { aaranji } from "./aeft-utils";

export const tocamelCase = (text: string): string => {
  text = text.toLowerCase().replace(/[^a-z0-9]+/g, " ");
  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (i > 0) {
      words[i] = words[i].replace(/^./, (match: string): string =>
        match.toUpperCase()
      );
    }
  }
  const camelCaseText = words.join("");
  return camelCaseText.replace(/^[A-Za-z0-9]/, (match: string): string =>
    match.toLowerCase()
  );
};

export const tosentenceCase = (text: string): string => {
  let result = text.toLowerCase();
  result = result.charAt(0).toUpperCase() + result.slice(1);
  result = result.replace(
    /([.!?])\s*(\w)/g,
    (match, p1, p2) => p1 + " " + p2.toUpperCase()
  );
  return result;
};

export const toreverseCase = (text: string): string => {
  let result = "";
  for (const char of text) {
    result +=
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
  }
  return result;
};

export const toalternateCase = (text: string): string => {
  const chars = text.toLowerCase().split("");
  for (let i = 0; i < chars.length; i += 2) {
    chars[i] = chars[i].toUpperCase();
  }
  return chars.join("");
};

export const tokebabCase = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ") 
    .join("-");
};

export const todotCase = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ") 
    .split(" ")
    .join(".");
};

export const topathCase = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .join("/");
};

export const tosnakeCase = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .join("_");
};

export const spongeCase = (input: string): string => {
  let result = "";
  for (const char of input) {
    result += Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
  }
  return result;
};

export const spongeCaseWords = (input: string): string => {
  const words: string[] = input.split(" ");
  const transformedWords: string[] = [];
  for (const word of words) {
    transformedWords.push(
      Math.random() > 0.5 ? word.toUpperCase() : word.toLowerCase()
    );
  }
  const result = transformedWords.join(" ");
  return result;
};

export const toflatCase = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .join("");
};

//------------
export const toWords = (input: string): string => {
  const sanitizedInput = input.replace(/\s+/g, "");
  if (!/^\d+$/.test(sanitizedInput)) {
    dispatchAlert("Select Numeric Value", aaranji, 2000);
    return input;
  }
  const n = parseInt(sanitizedInput, 10);
  const NUMBERS = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const TENS = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const SCALES = ["", "thousand", "million", "billion", "trillion"];

  if (n === 0) return "zero";

  const numToWordsBelow1000 = (num: number): string => {
    let result = "";
    if (num >= 100) {
      result += NUMBERS[Math.floor(num / 100)] + " hundred ";
      num %= 100;
    }
    if (num >= 20) {
      result += TENS[Math.floor(num / 10)] + " ";
      num %= 10;
    }
    if (num > 0) {
      result += NUMBERS[num] + " ";
    }
    return result;
  };

  let words = "";
  let scaleIndex = 0;

  let remaining = n;
  while (remaining > 0) {
    const chunk = remaining % 1000;
    if (chunk > 0) {
      words =
        numToWordsBelow1000(chunk) + " " + SCALES[scaleIndex] + " " + words;
    }
    remaining = Math.floor(remaining / 1000);
    scaleIndex++;
  }

  return words;
};

export const totitleCase = (text: string): string => {
  text = text.toLowerCase();
  const smallWords =
    /^(a|an|and|as|at|but|by|en|for|if|in|is|nor|of|on|or|per|the|to|v.?|vs.?|via|about|after|along|amid|among|around|as|aside|at|before|behind|below|beneath|beside|besides|between|beyond|despite|down|during|except|following|from|inside|into|like|near|off|onto|out|outside|over|past|plus|regarding|round|since|than|through|throughout|till|toward|under|underneath|unlike|until|up|upon|versus|with|within|without)$/i;
  const wordSeparators = /([ :–—,;.!?(){}\[\]"'\n])/;
  let words = text.split(wordSeparators);
  for (let i = 0; i < words.length; i++) {
    const current = words[i];
    if (i === 0 || words[i - 1].match(/[.!?]/)) {
      words[i] = current.replace(/[a-z]/, (match) => match.toUpperCase());
    }
    else if (smallWords.test(current)) {
      words[i] = current.toLowerCase();
    }
    else {
      words[i] = current.replace(/[a-z]/, (match) => match.toUpperCase());
    }
  }
  return words.join("");
};

export const totitleCasexSW = (str: string): string => {
  const words = str.toLowerCase().split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
};

export const topascalCase = (text: string): string => {
  const words = text.toLowerCase().split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }

  return words.join("");
};

export const toConstantCase = (text: string): string => {
  return text.replace(/\s+/g, "_").toUpperCase();
};

export const toCobolCase = (text: string): string => {
  return text.replace(/\s+/g, "-").toUpperCase();
}