import Vue from "vue";
import { getImages } from "../utils";

const locales = PHOTO_SWIPE_LOCALES;

export default Vue.extend({
  name: "PhotoSwipe",

  computed: {
    locales() {
      return locales[this.$localePath || "/"];
    },
  },

  watch: {
    $route(): void {
      this.initPhotoSwipe();
    },
  },

  mounted(): void {
    this.initPhotoSwipe();
  },

  methods: {
    initPhotoSwipe(): void {
      const pswp = document.querySelector(".pswp") as HTMLElement;

      void Promise.all([
        import(/* webpackChunkName: "photo-swipe" */ "photoswipe"),
        import(
          /* webpackChunkName: "photo-swipe" */ "photoswipe/dist/photoswipe-ui-default"
        ),
        new Promise<void>((resolve) =>
          setTimeout(() => resolve(), PHOTO_SWIPE_DELAY)
        ),
      ]).then(([photoSwipe, PhotoSwipeDefault]) => {
        void getImages(PHOTO_SWIPE_SELECTOR).then(({ elements, infos }) => {
          elements.forEach((image, index) => {
            image.onclick = (): void => {
              const gallery = new photoSwipe.default(
                pswp,
                PhotoSwipeDefault.default,
                infos,
                {
                  shareButtons: this.locales.buttons,
                  ...PHOTO_SWIPE_OPTIONS,
                  index,
                }
              );

              gallery.init();
            };
          });
        });
      });
    },
  },
});
