import type { Item } from "photoswipe";

export const getImageInfo = (
  image: HTMLImageElement
): Item & { title: string } => ({
  src: image.src,
  w: image.naturalWidth,
  h: image.naturalHeight,
  title: image.alt,
});

export interface PhotoSwipeImages {
  elements: HTMLImageElement[];
  infos: Item[];
}

export const getImages = (selector: string): Promise<PhotoSwipeImages> => {
  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>(selector)
  );

  return Promise.all(
    images.map(
      (image) =>
        new Promise<Item>((resolve, reject) => {
          if (image.complete) resolve(getImageInfo(image));
          else {
            image.onload = (): void => resolve(getImageInfo(image));
            image.onerror = (err): void => reject(err);
          }
        })
    )
  ).then((infos) => ({ elements: images, infos }));
};
