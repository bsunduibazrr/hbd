export enum AppStage {
  LOCK = "LOCK",
  CAKE = "CAKE",
  LETTER = "LETTER",
}

export interface BirthdayMessage {
  title: string;
  content: string;
  closing: string;
}
