import Vue from "vue";
import PhotoSwipe from "photoswipe";

let images: NodeListOf<HTMLImageElement>;
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
        void this.getImages().then((imageConfig) => {
          images.forEach((image, index) => {
            image.onclick = (): void => {
              const gallery = new photoSwipe.default(
                pswp,
                PhotoSwipeDefault.default,
                imageConfig,
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

    getImageInfo(image: HTMLImageElement): PhotoSwipe.Item & { title: string } {
      return {
        src: image.src,
        // eslint-disable-next-line id-length
        w: image.naturalWidth,
        h: image.naturalHeight,
        title: image.alt,
      };
    },

    getImages(): Promise<PhotoSwipe.Item[]> {
      const promises: Promise<PhotoSwipe.Item & { title: string }>[] = [];
      images =
        document.querySelectorAll<HTMLImageElement>(PHOTO_SWIPE_SELECTOR);

      images.forEach((image, index) => {
        promises[index] = new Promise((resolve, reject) => {
          if (image.complete) resolve(this.getImageInfo(image));
          else {
            image.onload = (): void => resolve(this.getImageInfo(image));
            image.onerror = (err): void => reject(err);
          }
        });
      });

      return Promise.all(promises);
    },
  },
});
