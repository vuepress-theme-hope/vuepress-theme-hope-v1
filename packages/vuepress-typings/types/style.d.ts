/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * postcss-loader does not provide official typings, so we extract types from:
 *
 * @see  https://github.com/webpack-contrib/postcss-loader/tree/v3.0.0
 */
export interface PostCssLoaderOptions {
  exec?: boolean;
  parser?: string | Record<string, any>;
  syntax?: string | Record<string, any>;
  stringifier?: string | Record<string, any>;
  config?: {
    path?: string;
    context?: Record<string, any>;
    ctx?: Record<string, any>;
  };
  ident?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  plugins?: any[] | Function;
  sourceMap?: "inline" | boolean;
}

// https://github.com/shama/stylus-loader#readme
export interface StylusLoaderOptions {
  use?: any[];
  import?: string[];
  preferPathResolver?: "webpack" | string;
  [key: string]: any;
}
