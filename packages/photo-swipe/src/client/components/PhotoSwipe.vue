<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe. 
    It’s a separate element, as animating opacity is faster than rgba().-->
    <div class="pswp__bg" />

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
      <div class="pswp__container">
        <!-- don’t modify these 3 pswp__item elements, data is added later on -->
        <div class="pswp__item" />
        <div class="pswp__item" />
        <div class="pswp__item" />
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter" />

          <button
            class="pswp__button pswp__button--close"
            :title="locales.close"
            :aria-label="locales.close"
          />

          <button
            class="pswp__button pswp__button--share"
            :title="locales.share"
            :aria-label="locales.share"
          />

          <button
            class="pswp__button pswp__button--fs"
            :title="locales.fullscreen"
            :aria-label="locales.fullscreen"
          />

          <button
            class="pswp__button pswp__button--zoom"
            :title="locales.zoom"
            :aria-label="locales.zoom"
          />

          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut" />
              </div>
            </div>
          </div>
        </div>

        <div
          class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
        >
          <div class="pswp__share-tooltip" />
        </div>

        <button
          class="pswp__button pswp__button--arrow--left"
          :title="locales.prev"
          :aria-label="locales.prev"
        />

        <button
          class="pswp__button pswp__button--arrow--right"
          :title="locales.next"
          :aria-label="locales.next"
        />

        <div class="pswp__caption">
          <div class="pswp__caption__center" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./PhotoSwipe" />

<style lang="stylus">
@require '~photoswipe/dist/photoswipe.css'
@require '~photoswipe/dist/default-skin/default-skin.css'
</style>
