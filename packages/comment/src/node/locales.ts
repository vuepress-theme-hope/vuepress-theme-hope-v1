import type {
  PageInfoLocaleConfig,
  ValineLocaleConfig,
  WalineLocaleConfig,
} from "../types";

/**
 * Default lcoales config for Page Info
 */
export const pageInfoLocales: PageInfoLocaleConfig = {
  "/en/": {
    author: "Author🖊",
    date: "Writing Date📅",
    origin: "Original💡",
    views: "Page views🔢",
    category: "Category🌈",
    tag: "Tags🏷",
    readingTime: "Reading Time⌛",
    words: "Words🔠",
  },

  "/zh/": {
    author: "作者🖊",
    date: "写作日期📅",
    origin: "原创💡",
    views: "访问量🔢",
    category: "分类🌈",
    tag: "标签🏷",
    readingTime: "阅读时间⌛",
    words: "字数🔠",
  },

  "/zh-tw/": {
    author: "作者🖊",
    date: "寫作日期📅",
    origin: "原創💡",
    views: "訪問量🔢",
    category: "分類🌈",
    tag: "標籤🏷",
    readingTime: "閱讀時間⌛",
    words: "字數🔠",
  },

  "/de/": {
    author: "Autor🖊",
    date: "Datum📅",
    origin: "Original💡",
    views: "Besucher🔢",
    category: "Kategorie🌈",
    tag: "Tags🏷",
    readingTime: "Lesezeit⌛",
    words: "Wörter🔠",
  },

  "/vi/": {
    author: "Người viết🖊",
    date: "Ngày viết📅",
    origin: "Nguồn💡",
    views: "Views của trang🔢",
    category: "Category🌈",
    tag: "Tags🏷",
    readingTime: "Thời gian đọc⌛",
    words: "Words🔠",
  },

  "/uk/": {
    author: "Автор🖊",
    date: "Дата написання📅",
    origin: "Оригінал💡",
    views: "Перегляди сторінки🔢",
    category: "Категорія🌈",
    tag: "Теги🏷",
    readingTime: "Час читання⌛",
    words: "Слова🔠",
  },

  "/ru/": {
    author: "Автор🖊",
    date: "Дата написания📅",
    origin: "Оригинал💡",
    views: "Просмотры страницы🔢",
    category: "Категория🌈",
    tag: "Тэги🏷",
    readingTime: "Время чтения⌛",
    words: "Слова🔠",
  },

  "/br/": {
    author: "Autor🖊",
    date: "Escrito em📅",
    origin: "Original💡",
    views: "Visualizações🔢",
    category: "Categoria🌈",
    tag: "Tags🏷",
    readingTime: "Tempo de Leitura⌛",
    words: "Palavras🔠",
  },
};

/**
 * Default locale config for valine
 */
export const valineLocales: ValineLocaleConfig = {
  "/zh/": {
    placeholder: "请留言。(填写邮箱可在被回复时收到邮件提醒)",
  },

  "/zh-tw/": {
    placeholder: "請留言。(填寫信箱可在被回覆時收到郵件提醒)",
  },

  "/en/": {
    placeholder:
      "Write a comment here (Fill in the email address to receive an email notification when being replied)",
  },
  "/de/": {
    placeholder:
      "Schreibe ein Kommentar (Geben Sie die E-Mail-Adresse ein, um eine E-Mail-Benachrichtigung zu erhalten, wenn Sie geantwortet werden)",
  },
  "/vi/": {
    placeholder:
      "Để lại bình luận (Điền địa chỉ email để nhận email thông báo khi được trả lời)",
  },
  "/uk/": {
    placeholder:
      "Напишіть тут коментар (введіть адресу електронної пошти, щоб отримувати сповіщення електронною поштою, коли буде відповідь)",
  },
  "/ru/": {
    placeholder:
      "Напишите здесь комментарий (введите адрес электронной почты, чтобы получать уведомление по электронной почте при ответе)",
  },
  "/br/": {
    placeholder:
      "Escreva um comentário aqui (preencha com o endereço de email para receber notificações quando tiver alguma resposta)",
  },
};

/**
 * Default locale config for Waline
 */
export const walineLocales: WalineLocaleConfig = {
  "/zh/": {
    placeholder: "请留言。(填写邮箱可在被回复时收到邮件提醒)",
  },

  "/zh-tw/": {
    placeholder: "請留言。(填寫信箱可在被回覆時收到郵件提醒)",
  },

  "/en/": {
    placeholder:
      "Write a comment here (Fill in the email address to receive an email notification when being replied)",
  },
  "/de/": {
    placeholder:
      "Schreibe ein Kommentar (Geben Sie die E-Mail-Adresse ein, um eine E-Mail-Benachrichtigung zu erhalten, wenn Sie geantwortet werden)",
  },
  "/vi/": {
    placeholder:
      "Để lại bình luận (Điền địa chỉ email để nhận email thông báo khi được trả lời)",
  },
  "/uk/": {
    placeholder:
      "Напишіть тут коментар (введіть адресу електронної пошти, щоб отримувати сповіщення електронною поштою, коли буде відповідь)",
  },
  "/ru/": {
    placeholder:
      "Напишите здесь комментарий (введите адрес электронной почты, чтобы получать уведомление по электронной почте при ответе)",
  },
  "/br/": {
    placeholder:
      "Escreva um comentário aqui (preencha com o endereço de email para receber notificações quando tiver alguma resposta)",
  },
};
