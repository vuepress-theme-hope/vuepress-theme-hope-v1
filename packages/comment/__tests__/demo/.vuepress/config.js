module.exports = {
  base: process.env.VuePress_BASE || "/",

  title: "Comment Plugin",

  description: "Comment Plugin for VuePress",

  dest: "./dist",

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "Home", link: "/" },
      {
        text: "Test",
        items: [{ text: "Test", link: "/test/" }],
      },
    ],
  },

  plugins: [
    [
      "comment1",
      {
        // type: "valine",
        // author: "Mr.Hope",
        // appId: "GG2VSnGiz09Rx18y2OUzdaHS-gzGzoHsz",
        // appKey: "fBf2dptTBHxNqALKrzUlBXeB",

        provider: "Waline",
        serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      },
    ],
  ],
};
