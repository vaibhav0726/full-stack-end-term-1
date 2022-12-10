document.getElementById("alice").addEventListener("change", function () {
  var file_reader = new FileReader();
  const inputElement = document.getElementById('alice');
  const temp = inputElement.value.slice(12);
  document.getElementById("heading").innerText = temp;
  file_reader.onload = function () {
    document.getElementById("display").textContent = file_reader.result;
    const str = file_reader.result;
    const num = 6;
    let res = nthMostCommon(str, num);
    res = res.slice(1);
    var demo = document.getElementById("demo");
    demo.innerText = '';
    res.forEach(ans => demo.innerHTML += "<br>" + Object.values(ans).join(":- "));

    let res2 = orderStringByFrequency(str);
    console.log(typeof res2);
    res2 = res2.slice(-5);
    // var demo2 = document.getElementById("demo2");
    demo2.innerText = '';
    // res2.forEach(ans2 => demo2.innerHTML += "<br>" + Object.values(ans2).join(":- "));
    // console.log(res2);   
    let txt = "";
    for (let x in res2) {
        txt += "<br>" + x+" "+res2[x] + " ";
    };

    document.getElementById("demo2").innerHTML = txt;

    document.getElementById("len").innerText = "document length-: " +str.length;

    var word = document.getElementById("words");
    word.innerText = "word count-: " + getWordCount(str);

    // len.innerText = str.length();
  };
  file_reader.readAsText(this.files[0]);
});


function orderStringByFrequency(string) {
    let frequentObj = {};
    string.split(' ').forEach(word => frequentObj[word] ? frequentObj[word]++ : frequentObj[word] = 1);
    return Object.entries(frequentObj).sort((a, b) => b[1] - a[1]).map((arr) => arr[0]).join(' ');
  }

function getWordCount(str) {
    return str.trim().split(/\s+/).length;
}

function nthMostCommon(str, amount) {
  const stickyWords  = [
    "a",
    "able",
    "about",
    "across",
    "after",
    "all",
    "almost",
    "also",
    "am",
    "among",
    "an",
    "and",
    "any",
    "are",
    "as",
    "at",
    "be",
    "because",
    "been",
    "but",
    "by",
    "can",
    "cannot",
    "could",
    "dear",
    "did",
    "do",
    "does",
    "either",
    "else",
    "ever",
    "every",
    "for",
    "from",
    "get",
    "got",
    "had",
    "has",
    "have",
    "he",
    "her",
    "hers",
    "him",
    "his",
    "how",
    "however",
    "i",
    "if",
    "in",
    "into",
    "is",
    "it",
    "its",
    "just",
    "least",
    "let",
    "like",
    "likely",
    "may",
    "me",
    "might",
    "most",
    "must",
    "my",
    "neither",
    "no",
    "nor",
    "not",
    "of",
    "off",
    "often",
    "on",
    "only",
    "or",
    "other",
    "our",
    "own",
    "rather",
    "said",
    "say",
    "says",
    "she",
    "should",
    "since",
    "so",
    "some",
    "than",
    "that",
    "the",
    "their",
    "them",
    "then",
    "there",
    "these",
    "they",
    "this",
    "tis",
    "to",
    "too",
    "twas",
    "us",
    "wants",
    "was",
    "we",
    "were",
    "what",
    "when",
    "where",
    "which",
    "while",
    "who",
    "whom",
    "why",
    "will",
    "with",
    "would",
    "yet",
    "you",
    "your",
    "ain't",
    "aren't",
    "can't",
    "could've",
    "couldn't",
    "didn't",
    "doesn't",
    "don't",
    "hasn't",
    "he'd",
    "he'll",
    "he's",
    "how'd",
    "how'll",
    "how's",
    "i'd",
    "i'll",
    "i'm",
    "i've",
    "isn't",
    "it's",
    "might've",
    "mightn't",
    "must've",
    "mustn't",
    "shan't",
    "she'd",
    "she'll",
    "she's",
    "should've",
    "shouldn't",
    "that'll",
    "that's",
    "there's",
    "they'd",
    "they'll",
    "they're",
    "they've",
    "wasn't",
    "we'd",
    "we'll",
    "we're",
    "weren't",
    "what'd",
    "what's",
    "when'd",
    "when'll",
    "when's",
    "where'd",
    "where'll",
    "where's",
    "who'd",
    "who'll",
    "who's",
    "why'd",
    "why'll",
    "why's",
    "won't",
    "would've",
    "wouldn't",
    "you'd",
    "you'll",
    "you're",
    "you've",
  ];
  str = str.toLowerCase();
  var splitUp = str.split(/\s/);
  const wordsArray = splitUp.filter(function (x) {
    return !stickyWords.includes(x);
  });
  var wordOccurrences = {};
  for (var i = 0; i < wordsArray.length; i++) {
    wordOccurrences["_" + wordsArray[i]] =
      (wordOccurrences["_" + wordsArray[i]] || 0) + 1;
  }
  var result = Object.keys(wordOccurrences).reduce(function (acc, currentKey) {
    for (var i = 0; i < amount; i++) {
      if (!acc[i]) {
        acc[i] = {
          word: currentKey.slice(1, currentKey.length),
          occurences: wordOccurrences[currentKey],
        };
        break;
      } else if (acc[i].occurences < wordOccurrences[currentKey]) {
        acc.splice(i, 0, {
          word: currentKey.slice(1, currentKey.length),
          occurences: wordOccurrences[currentKey],
        });
        if (acc.length > amount) acc.pop();
        break;
      }
    }
    // console.log("acc", acc);
    return acc;
  }, []);
//   console.log(wordOccurrences);
  return result;
}
