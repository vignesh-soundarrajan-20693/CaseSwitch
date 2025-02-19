import { getActiveComp } from "./aeft-utils";
import { dispatchAlert } from "./aeft-utils";

//Case Functions
import {
  tocamelCase,
  tokebabCase,
  toflatCase,
  toreverseCase,
  toalternateCase,
  totitleCase,
  totitleCasexSW,
  tosentenceCase,
  todotCase,
  topascalCase,
  tosnakeCase,
  topathCase,
  spongeCase,
  spongeCaseWords,
  toWords,
  toConstantCase,
  toCobolCase,
} from "./script";

//colors
import { sigappu, neelam, pachai, aaranji } from "./aeft-utils";

function saveOriginalText(selectedLayer: TextLayer): void {
  selectedLayer.originalText = selectedLayer.text.sourceText.value;
}

export const normalizeTextForComparison = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9]/g, "");
};

export const getTextSimilarity = (text1: string, text2: string): number => {
  const normalizedText1 = normalizeTextForComparison(text1.toLowerCase());
  const normalizedText2 = normalizeTextForComparison(text2.toLowerCase());
  const len1 = normalizedText1.length;
  const len2 = normalizedText2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = normalizedText1[i - 1] === normalizedText2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // Deletion
        matrix[i][j - 1] + 1, // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLength = Math.max(len1, len2);
  return 1 - distance / maxLength;
};

export const clearSelectedLayersOriginalText = () => {
  const comp = getActiveComp();
  const selectedLayers = comp.selectedLayers;

  if (selectedLayers.length > 0) {
    for (let i = 0; i < selectedLayers.length; i++) {
      const layer = selectedLayers[i];
      if (layer instanceof TextLayer) {
        // Clear the saved original text for this selected text layer
        delete layer.originalText;
      }
    }
    dispatchAlert('Original text updated', pachai, 3000);
  } else {
    dispatchAlert('No layers selected', '#e67e22', 3000);
  }
}

export const clearAllLayersOriginalText = () => {
  const comp = getActiveComp(); // Get active composition
  const layers = comp.layers; // Get all layers

  for (let i = 1; i <= layers.length; i++) {
    const layer = layers[i];
    if (layer instanceof TextLayer) {
      // Clear the saved original text for this text layer
      delete layer.originalText;
    }
  }
  dispatchAlert('Original text cleared for all layers', '#f39c12', 3000);
}

export function mainCaseSwitch(
  transformFunctionName: string,
  isShiftPressed: boolean
) {
  const comp = getActiveComp();
  if (!comp) {
    dispatchAlert("No active composition found.", sigappu, 3000);
    return;
  }

  app.beginUndoGroup("mainCaseSwitch");
  const selectedLayers = comp.selectedLayers;
  if (selectedLayers.length > 0) {
    for (let i = 0; i < selectedLayers.length; i++) {
      const selectedLayer = selectedLayers[i];
      if (selectedLayer instanceof TextLayer) {
        const textProp = selectedLayer.text.sourceText;
        let originalText = textProp.value.text;

        if (!selectedLayer.originalText) {
          selectedLayer.originalText = originalText;
        }

        const applyTransformation = (text: string): string => {
          switch (transformFunctionName) {
            case "upperCase":
              dispatchAlert("Changed to Uppercase", pachai, 2000);
              return text.toUpperCase();
            case "lowerCase":
              dispatchAlert("Changed to Lowercase", pachai, 2000);
              return text.toLowerCase();
            case "sentenceCase":
              dispatchAlert("Changed to SentenceCase", pachai, 2000);
              return tosentenceCase(text);
            case "titleCase":
              dispatchAlert("Changed to TitleCase", pachai, 2000);
              return totitleCasexSW(text);
            case "titleCasexSW":
              dispatchAlert(
                "Changed to TitleCase and Ignored Small Words",
                pachai,
                2000
              );
              return totitleCase(text);
            case "camelCase":
              dispatchAlert("Changed to CamelCase", pachai, 2000);
              return tocamelCase(text);
            case "kebabCase":
              dispatchAlert("Changed to KebabCase", pachai, 2000);
              return tokebabCase(text);
            case "reverseCase":
              dispatchAlert("Changed to ReverseCase", pachai, 2000);
              return toreverseCase(text);
            case "alternateCase":
              dispatchAlert("Changed to AlternateCase", pachai, 2000);
              return toalternateCase(text);
            case "pathCase":
              dispatchAlert("Changed to PathCase", pachai, 2000);
              return topathCase(text);
            case "dotCase":
              dispatchAlert("Changed to DotCase", pachai, 2000);
              return todotCase(text);
            case "snakeCase":
              dispatchAlert("Changed to SnakeCase", pachai, 2000);
              return tosnakeCase(text);
            case "randomCase":
              dispatchAlert("Changed to RandomCase", pachai, 2000);
              return spongeCase(text);
            case "randomwordsCase":
              dispatchAlert("Changed to RandomCase for Words", pachai, 2000);
              return spongeCaseWords(text);
            case "flatCase":
              dispatchAlert("Changed to FlatCase", pachai, 2000);
              return toflatCase(text);
            case "pascalCase":
              dispatchAlert("Changed to PascalCase", pachai, 2000);
              return topascalCase(text);
              case "cobolCase":
                dispatchAlert("Changed to CobolCase", pachai, 2000);
                return toCobolCase(text);
              case "constantCase":
                dispatchAlert("Changed to ConstantCase", pachai, 2000);
                return toConstantCase(text);
            case "numericToText":
              dispatchAlert("Changed to Numeric to Text", pachai, 2000);
              return toWords(text);
            case "restoreOriginal":
              const originalText = selectedLayer.originalText || "";
              const currentText = text.toLowerCase();
              const similarity = getTextSimilarity(originalText, currentText);

              if (similarity >= 0.8) {
                selectedLayer.text.sourceText.setValue(
                  selectedLayer.originalText
                );
                dispatchAlert("Original text restored", pachai, 3000);
              } else {
                dispatchAlert(
                  "Text similarity below 80%, restoration skipped",
                  aaranji,
                  3000
                );
              }
              return selectedLayer.text.sourceText.value;
            default:
              return text;
          }
        };

        if (textProp.numKeys > 0) {
          if (isShiftPressed) {
            const textDocument = textProp.value;
            textDocument.text = applyTransformation(textDocument.text);
            textProp.setValueAtTime(comp.time, textDocument);
          } else {
            for (let j = 1; j <= textProp.numKeys; j++) {
              const keyValue = textProp.keyValue(j);
              keyValue.text = applyTransformation(keyValue.text);
              textProp.setValueAtKey(j, keyValue);
            }
          }
        } else {
          const textDocument = textProp.value;
          textDocument.text = applyTransformation(textDocument.text);
          textProp.setValue(textDocument);
        }
      }
    }
    app.endUndoGroup();
  } else {
    dispatchAlert("No Layers Selected", neelam, 3000);
  }
}
