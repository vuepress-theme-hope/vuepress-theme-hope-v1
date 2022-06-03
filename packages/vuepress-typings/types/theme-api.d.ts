import type { PluginEntry } from "./plugin";
import type { NormalizedPlugin } from "./plugin-api";

export interface ResolvedComponent {
  filename: string;
  componentName: string;
  isInternal: boolean;
  path: string;
}

export interface ResolvedTheme {
  /**
   * Theme's directory
   */
  path?: string;

  /**
   * Theme's full name
   */
  name?: string;

  /**
   * Theme's short name
   */
  shortcut?: string;

  /**
   * Theme entry path.
   */
  entry: Record<string, unknown> | NormalizedPlugin;
}

export interface ThemeAPI {
  theme: ResolvedTheme;
  parentTheme: ResolvedTheme;
  existsParentTheme: boolean;
  /** @private */
  vuepressPlugin: PluginEntry;
  componentMap: Record<string, ResolvedComponent>;
  layoutComponentMap: Record<string, ResolvedComponent>;
  setAlias: (alias: Record<string, string>) => void;
  init: () => void;
  getComponents: () => Record<string, ResolvedComponent>;
  getLayoutComponentMap: () => Record<string, ResolvedComponent>;
}
