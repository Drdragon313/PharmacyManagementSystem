export function numericToAlphabetic(id) {
    let result = '';
    while (id > 0) {
      const remainder = (id - 1) % 26;
      result = String.fromCharCode(65 + remainder) + result;
      id = Math.floor((id - 1) / 26);
    }
    return result;
  }
  