interface DictionaryProps {
  words: string[];
  dictionary: Set<string>;
  isInDict: (word: string) => boolean;
}

class Dictionary implements DictionaryProps {
  words: string[] = [];
  dictionary: Set<string>;

  constructor(words: string[]) {
    this.dictionary = new Set(words);
  }

  isInDict(word: string): boolean {
    return this.dictionary.has(word);
  }
}

const test = new Dictionary(['cat', 'car']);

console.log(test.isInDict('cat'));
