import { chalk, fs, path } from "vuepress-shared";

// #region exclude-files
const EXCLUDED_FILES = [
  "__tests__",
  ".npmignore",
  "LICENSE",
  "package.json",
  "node_modules",
  "README.md",
  "readme.md",
];
// #endregion exclude-files

export const eject = async (dir: string): Promise<void> => {
  try {
    const sourceDir = path.resolve(__dirname, "../");
    const targetDir = path.resolve(process.cwd(), dir, ".vuepress/theme");

    await fs.copy(sourceDir, targetDir, {
      filter: (src) => {
        return !EXCLUDED_FILES.includes(path.relative(sourceDir, src));
      },
    });

    console.log(`Copied vuepress-theme-hope into ${chalk.cyan(targetDir)}.\n`);
  } catch (err) {
    console.error(chalk.red((err as Error).stack || ""));
    process.exitCode = 1;
  }
};
