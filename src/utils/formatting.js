// @flow
export const trimWords = (content: string = '', trimLength: number, more?: string = '…'): string => {
  if (!content || !trimLength) {
    return content;
  }

  const words: Array<string> = content.split(' ');
  const wordsCount: number = words.length;

  // If the content length is equal or less then trim length, then return the string as is
  if (wordsCount <= trimLength) {
    return content;
  }

  return words.splice(0, trimLength).join(' ') + more;
};

export const trimCharacters = (content: string = '', trimLength: number, more?: string = '…'): string => {
  if (!content || !trimLength) {
    return content;
  }

  // If the content length is equal or less then trim length, then return the string as is
  if (content.length <= trimLength) {
    return content;
  }

  return content.substring(0, trimLength).trim() + more;
};

export const renameKeys = (object: Object, newKeys: Object): Object => {
  const keyValues = Object.keys(object).map(key => {
    const newKey = newKeys[key] || key;
    return { [newKey]: object[key] };
  });
  return Object.assign({}, ...keyValues);
}

export const createMarkup = (html: string) => ({ __html: html });

export const createRichMarkup = (json: string) => {
  
}
