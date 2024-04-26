const deck: string[] = [
  "oneOfA",
  "oneOfD",
  "oneOfH",
  "oneOfS",
  "queenOfA",
  "queenOfD",
  "queenOfH",
  "queenOfS",
  "kingOfA",
  "kingOfD",
  "kingOfH",
  "kingOfS",
  "TwoOfA",
  "TwoOfD",
  "TwoOfH",
  "TwoOfS",
  "ThreeOfA",
  "ThreeOfD",
  "ThreeOfH",
  "ThreeOfS",
  "FourOfA",
  "FourOfD",
  "FourOfH",
  "FourOfS",
  "FiveOfA",
  "FiveOfD",
  "FiveOfH",
  "FiveOfS",
  "SixOfA",
  "SixOfD",
  "SixOfH",
  "SixOfS",
  "SevenOfA",
  "SevenOfD",
  "SevenOfH",
  "SevenOfS",
  "EightOfA",
  "EightOfD",
  "EightOfH",
  "EightOfS",
  "NineOfA",
  "NineOfD",
  "NineOfH",
  "NineOfS",
  "TenOfA",
  "TenOfD",
  "TenOfH",
  "TenOfS",
  "BlackJ",
  "oneOfA",
  "oneOfD",
  "oneOfH",
  "oneOfS",
  "queenOfA",
  "queenOfD",
  "queenOfH",
  "queenOfS",
  "kingOfA",
  "kingOfD",
  "kingOfH",
  "kingOfS",
  "TwoOfA",
  "TwoOfD",
  "TwoOfH",
  "TwoOfS",
  "ThreeOfA",
  "ThreeOfD",
  "ThreeOfH",
  "ThreeOfS",
  "FourOfA",
  "FourOfD",
  "FourOfH",
  "FourOfS",
  "FiveOfA",
  "FiveOfD",
  "FiveOfH",
  "FiveOfS",
  "SixOfA",
  "SixOfD",
  "SixOfH",
  "SixOfS",
  "SevenOfA",
  "SevenOfD",
  "SevenOfH",
  "SevenOfS",
  "EightOfA",
  "EightOfD",
  "EightOfH",
  "EightOfS",
  "NineOfA",
  "NineOfD",
  "NineOfH",
  "NineOfS",
  "TenOfA",
  "TenOfD",
  "TenOfH",
  "TenOfS",
  "BlackJ",
];
export function shuffledCard() {
  let currentIndex = deck.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex],
      deck[currentIndex],
    ];
  }
  return deck;
}
export const pickACard = (cardDeck: string[]): string => {
  return cardDeck.pop() || "NO_MORE_CARD";
};
export const pickNCard = (cardDeck: string[], n: number): string[] => {
  const cards: string[] = [];
  for (let i = 0; i < n; i++) {
    cards.push(...[cardDeck.pop() || "NO_MORE_CARD"]);
  }
  return cards;
};
