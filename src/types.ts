export interface MockVideo {
  id: string;
  title: string;
  duration: string;
  thumbnailUrl: string;
  views: string;
  publishedAt: string;
  defaultClips: MockClip[];
}

export interface MockClip {
  id: string;
  title: string;
  viralScore: number;
  duration: string;
  startTimestamp: string;
  endTimestamp: string;
  socialPlatforms: string[];
  captions: string[];
}

export interface CaptionStyle {
  id: string;
  name: string;
  fontClass: string;
  textColor: string;
  highlightColor: string;
  textShadow: string;
  emojiStyle: string;
}

export interface LogLine {
  text: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
}
