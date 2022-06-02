export type ChalkboardKeyBindingConfig = Record<
  string,
  {
    keyCode: number;
    key: string;
    description: string;
  }
>;

export interface ChalkboardChalk {
  color: string;
  cursor: string;
}

export interface ChalkboardConfig {
  /**
   * drawing width of the boardmarker
   */
  boardmarkerWidth?: number;

  /**
   * drawing width of the chalk
   */
  chalkWidth?: number;

  /**
   * a float in the range [0.0, 1.0], the intesity of the chalk effect on the chalk board. Full effect (default) 1.0, no effect 0.0
   */
  chalkEffect?: number;

  /** Variable name for session storage of drawings. */
  storage?: string;

  /**
   * Filename for pre-recorded drawings.
   */
  src?: string;

  /**
   * Configuation option allowing to prevent changes to existing drawings.
   *
   * - If set to `true` no changes can be made
   * - If set to false false changes can be made
   * - If unset or set to undefined no changes to the drawings can be made after returning to a slide or fragment for which drawings had been recorded before. In any case the recorded drawings for a slide or fragment can be cleared by pressing the 'DEL' key (i.e. by using the RevealChalkboard.clear() function).
   */
  readonly?: boolean;

  /**
   * Gives the duration (in milliseconds) of the transition for a slide change, so that the notes canvas is drawn after the transition is completed.
   */
  transition?: number;

  theme?: "chalkboard" | "whiteboard";

  /**
   * The first value expects a (semi-)transparent color which is used to provide visual feedback that the notes canvas is enabled, the second value expects a filename to a background image for the chalkboard.
   */
  background?: [string, string] | [string];

  /**
   * By default whiteboard and chalkboard themes include a grid pattern on the background.
   *
   * This pattern can be modified by setting the color, the distance between lines, and the line width
   *
   * e.g. { color: 'rgb(127,127,255,0.1)', distance: 40, width: 2}
   *
   * Alternatively, the grid can be removed by setting the value to false.
   */
  grid?: Record<string, string> | false;

  /**
   * An image path and radius for the eraser.
   */
  eraser?: { src: string; radius: number };

  /**  A list of boardmarkers with given color and cursor.*/

  boardmarkers?: ChalkboardChalk[];

  /** A list of chalks with given color and cursor. */
  chalks?: ChalkboardChalk[];

  /** Whether to remember the last selected color for the slide canvas or the board. */
  rememberColor?: [boolean, boolean];

  /**
   * If set to `true` a button for opening and closing the notes canvas is shown. Alternatively, the css position attributes can be provided if the default position is not appropriate.
   */
  toggleNotesButton?: boolean | Record<string, string>;
  /**
   * If set to `true` a button for opening and closing the chalkboard is shown. Alternatively, the css position attributes can be provided if the default position is not appropriate.
   */
  toggleChalkboardButton?: boolean | Record<string, string>;

  keyBindings?: ChalkboardKeyBindingConfig;

  boardHandle?: boolean;

  messageType?: string;
}
