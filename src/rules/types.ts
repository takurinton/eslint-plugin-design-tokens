export type MessageId = "use_design_token";

export type Messages = {
  [key in MessageId]: string;
};

export type Options = Array<{
  ignoreFilenames?: string[];
  ignoreKeys?: string[];
  onlyCheckDefaultTheme?: boolean;
}>;
