import { number } from "prop-types";

export type UNIXTIME = number;

export enum CardType {
  WORKOUT = "workout",
  TEXT = "text",
  BOOK = "book",
  BODY = "body",
  NOTE = "note",
  NONE = -1
}

export enum CardStatus {
  NONE = -1,
  NEW = 0,
  WRITE = 1,
  VIEW = 2,
  EDIT = 3,
  DETAILVIEW = 4
}

export interface Card {
  id: CardID; // Card ID (write일 경우)
  type: CardType; // 현재 선택된 카드의 타입 (CardType)
  created_at: UNIXTIME;
  updated_at: UNIXTIME;
  summary?: CardSummary;
  setting?: CardSetting;

  // 이건 이제 아예 다른 곳에서 관리함 -> 여기서는 삭제 되어도 될듯
  logs?: CardLogs;

  // 이건 UI에서만 사용되는 건데...
  status?: CardStatus; // 현재 선택된 카드의 상태
}

export const SUMMARY_DAY = 14;
export type CardSummary = any | { data: CardSummaryData };
export type CardSummaryData = Array<null | number>; // 현재 시간을 배열을 가장 첫번째 요소로 넣고, 각 날짜별 기록을 저장 하는 데이터
export type CardSetting =
  | {
      [property: string]: any;
    }
  | WorkoutCardSetting
  | BodyCardSetting
  | NoteCardSetting
  | BookCardSetting
  | any;

export type CardLog = {
  id: string;
  progress: number;
  updated_at: number;
  comment: string;
  amount: number;
  target_date?: string;
};
export type CardLogs = Array<CardLog>;

export type CardID = string;

export interface WorkoutCardSetting {
  title: string;
  duration: string;
  unit: string;
  baseline: number;
}
export interface BodyCardSetting {
  title: string;
  duration: string;
  unit: string;
  baseline: number;
}

export interface NoteCardSetting {
  title: string;
}

export interface BookCardSetting {
  title: string;
  isbn: string;
  duration: string;
  unit: string;
  baseline: number;
}
