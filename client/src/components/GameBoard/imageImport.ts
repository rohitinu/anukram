import oneOfA from '../../assets/cards/ace_of_clubs.png';
import oneOfD from '../../assets/cards/ace_of_diamonds.png';
import oneOfS from '../../assets/cards/ace_of_spades.png';
import oneOfH from '../../assets/cards/ace_of_hearts.png';

import kingOfA from '../../assets/cards/king_of_clubs2.png';
import kingOfD from '../../assets/cards/king_of_diamonds2.png';
import kingOfS from '../../assets/cards/king_of_spades2.png';
import kingOfH from '../../assets/cards/king_of_hearts2.png';

import queenOfA from '../../assets/cards/queen_of_clubs2.png';
import queenOfD from '../../assets/cards/queen_of_diamonds2.png';
import queenOfS from '../../assets/cards/queen_of_spades2.png';
import queenOfH from '../../assets/cards/queen_of_hearts2.png';

import TwoOfA from '../../assets/cards/2_of_clubs.png';
import TwoOfD from '../../assets/cards/2_of_diamonds.png';
import TwoOfS from '../../assets/cards/2_of_spades.png';
import TwoOfH from '../../assets/cards/2_of_hearts.png';

import ThreeOfA from '../../assets/cards/3_of_clubs.png';
import ThreeOfD from '../../assets/cards/3_of_diamonds.png';
import ThreeOfS from '../../assets/cards/3_of_spades.png';
import ThreeOfH from '../../assets/cards/3_of_hearts.png';

import FourOfA from '../../assets/cards/4_of_clubs.png';
import FourOfD from '../../assets/cards/4_of_diamonds.png';
import FourOfS from '../../assets/cards/4_of_spades.png';
import FourOfH from '../../assets/cards/4_of_hearts.png';

import FiveOfA from '../../assets/cards/5_of_clubs.png';
import FiveOfD from '../../assets/cards/5_of_diamonds.png';
import FiveOfS from '../../assets/cards/5_of_spades.png';
import FiveOfH from '../../assets/cards/5_of_hearts.png';

import SixOfA from '../../assets/cards/6_of_clubs.png';
import SixOfD from '../../assets/cards/6_of_diamonds.png';
import SixOfS from '../../assets/cards/6_of_spades.png';
import SixOfH from '../../assets/cards/6_of_hearts.png';

import SevenOfA from '../../assets/cards/7_of_clubs.png';
import SevenOfD from '../../assets/cards/7_of_diamonds.png';
import SevenOfS from '../../assets/cards/7_of_spades.png';
import SevenOfH from '../../assets/cards/7_of_hearts.png';

import EightOfA from '../../assets/cards/8_of_clubs.png';
import EightOfD from '../../assets/cards/8_of_diamonds.png';
import EightOfS from '../../assets/cards/8_of_spades.png';
import EightOfH from '../../assets/cards/8_of_hearts.png';

import NineOfA from '../../assets/cards/9_of_clubs.png';
import NineOfD from '../../assets/cards/9_of_diamonds.png';
import NineOfS from '../../assets/cards/9_of_spades.png';
import NineOfH from '../../assets/cards/9_of_hearts.png';

import TenOfA from '../../assets/cards/10_of_clubs.png';
import TenOfD from '../../assets/cards/10_of_diamonds.png';
import TenOfS from '../../assets/cards/10_of_spades.png';
import TenOfH from '../../assets/cards/10_of_hearts.png';
import BlackJ from '../../assets/cards/black_joker.png';

export const cardMap = {
  oneOfA: oneOfA,
  oneOfD: oneOfD,
  oneOfH: oneOfH,
  oneOfS: oneOfS,
  queenOfA: queenOfA,
  queenOfD: queenOfD,
  queenOfH: queenOfH,
  queenOfS: queenOfS,
  kingOfA: kingOfA,
  kingOfD: kingOfD,
  kingOfH: kingOfH,
  kingOfS: kingOfS,
  TwoOfA: TwoOfA,
  TwoOfD: TwoOfD,
  TwoOfH: TwoOfH,
  TwoOfS: TwoOfS,
  ThreeOfA: ThreeOfA,
  ThreeOfD: ThreeOfD,
  ThreeOfH: ThreeOfH,
  ThreeOfS: ThreeOfS,
  FourOfA: FourOfA,
  FourOfD: FourOfD,
  FourOfH: FourOfH,
  FourOfS: FourOfS,
  FiveOfA: FiveOfA,
  FiveOfD: FiveOfD,
  FiveOfH: FiveOfH,
  FiveOfS: FiveOfS,
  SixOfA: SixOfA,
  SixOfD: SixOfD,
  SixOfH: SixOfH,
  SixOfS: SixOfS,
  SevenOfA: SevenOfA,
  SevenOfD: SevenOfD,
  SevenOfH: SevenOfH,
  SevenOfS: SevenOfS,
  EightOfA: EightOfA,
  EightOfD: EightOfD,
  EightOfH: EightOfH,
  EightOfS: EightOfS,
  NineOfA: NineOfA,
  NineOfD: NineOfD,
  NineOfH: NineOfH,
  NineOfS: NineOfS,
  TenOfA: TenOfA,
  TenOfD: TenOfD,
  TenOfH: TenOfH,
  TenOfS: TenOfS,
  BlackJ: BlackJ,
};
export const boardSeq = [
  [BlackJ, TenOfS, queenOfS, kingOfS, oneOfS, TwoOfD, ThreeOfD, FourOfD, FiveOfD, BlackJ],
  [NineOfS, TenOfH, NineOfH, EightOfH, SevenOfH, SixOfH, FiveOfH, FourOfH, ThreeOfH, SixOfD],
  [EightOfS, queenOfD, SevenOfD, EightOfD, NineOfD, TenOfD, queenOfD, kingOfD, TwoOfH, SevenOfD],
  [SevenOfS, kingOfH, SixOfD, TwoOfA, oneOfH, kingOfH, queenOfH, oneOfD, TwoOfS, EightOfD],
  [SixOfS, oneOfH, FiveOfD, ThreeOfA, FourOfH, ThreeOfH, TenOfH, oneOfA, ThreeOfS, NineOfD],
  [FiveOfS, TwoOfA, FourOfD, FourOfA, FiveOfH, TwoOfH, NineOfH, kingOfA, FourOfS, TenOfD],
  [FourOfS, ThreeOfA, ThreeOfD, FiveOfA, SixOfH, SevenOfH, EightOfH, queenOfA, FiveOfS, queenOfD],
  [ThreeOfS, FourOfA, TwoOfD, SixOfA, SevenOfA, EightOfA, NineOfA, TenOfA, SixOfH, kingOfD],
  [TwoOfS, FiveOfA, oneOfS, kingOfS, queenOfS, TenOfS, NineOfS, EightOfS, SevenOfS, oneOfD],
  [BlackJ, SixOfA, SevenOfA, EightOfA, NineOfA, TenOfA, queenOfA, kingOfA, oneOfA, BlackJ],
];
export const cardDeck = [
  oneOfA,
  oneOfD,
  oneOfH,
  oneOfS,
  queenOfA,
  queenOfD,
  queenOfH,
  queenOfS,
  kingOfA,
  kingOfD,
  kingOfH,
  kingOfS,
  TwoOfA,
  TwoOfD,
  TwoOfH,
  TwoOfS,
  ThreeOfA,
  ThreeOfD,
  ThreeOfH,
  ThreeOfS,
  FourOfA,
  FourOfD,
  FourOfH,
  FourOfS,
  FiveOfA,
  FiveOfD,
  FiveOfH,
  FiveOfS,
  SixOfA,
  SixOfD,
  SixOfH,
  SixOfS,
  SevenOfA,
  SevenOfD,
  SevenOfH,
  SevenOfS,
  EightOfA,
  EightOfD,
  EightOfH,
  EightOfS,
  NineOfA,
  NineOfD,
  NineOfH,
  NineOfS,
  TenOfA,
  TenOfD,
  TenOfH,
  TenOfS,
  oneOfA,
  oneOfD,
  oneOfH,
  oneOfS,
  queenOfA,
  queenOfD,
  queenOfH,
  queenOfS,
  kingOfA,
  kingOfD,
  kingOfH,
  kingOfS,
  TwoOfA,
  TwoOfD,
  TwoOfH,
  TwoOfS,
  ThreeOfA,
  ThreeOfD,
  ThreeOfH,
  ThreeOfS,
  FourOfA,
  FourOfD,
  FourOfH,
  FourOfS,
  FiveOfA,
  FiveOfD,
  FiveOfH,
  FiveOfS,
  SixOfA,
  SixOfD,
  SixOfH,
  SixOfS,
  SevenOfA,
  SevenOfD,
  SevenOfH,
  SevenOfS,
  EightOfA,
  EightOfD,
  EightOfH,
  EightOfS,
  NineOfA,
  NineOfD,
  NineOfH,
  NineOfS,
  TenOfA,
  TenOfD,
  TenOfH,
  TenOfS,
];
