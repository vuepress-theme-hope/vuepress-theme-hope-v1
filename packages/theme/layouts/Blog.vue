<template>
  <Common :sidebar="false">
    <template #sidebar-bottom>
      <BlogInfo />
    </template>

    <Password v-if="isGlobalEncrypted" @password-verify="checkGlobalPassword" />
    <Password
      v-else-if="isPathEncrypted"
      @password-verify="checkPathPassword"
    />
    <main v-else class="page blog">
      <div class="blog-page-wrapper">
        <BlogPage />

        <MyTransition :delay="0.16">
          <BlogInfo />
        </MyTransition>
      </div>
    </main>
  </Common>
</template>

<script src="./Blog" />

<style lang="stylus">
{$containerClass} {
  .page.blog {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-sizing: border-box;

    min-height: 100vh;
    margin: 0 auto;
    padding-top: $navbarHeight;
    padding-bottom: 2rem;

    background: var(--bg-color-back);

    @media (max-width: $MQNarrow) {
      padding-top: $navbarMobileHeight;
    }

    @media (max-width: $MQMobile) {
      padding-right: 1.5rem;
      padding-left: 1.5rem;
    }

    @media (max-width: $MQMobileNarrow) {
      padding-right: 0;
      padding-left: 0;
    }
  }

  &.has-toc .page.blog {
    @media (min-width: $MQWide) {
      // fix toc padding
      padding-right: 0;
    }
  }
}

.blog-page-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;

  box-sizing: border-box;

  width: 100%;
  margin: 0 auto;

  @media (min-width: $MQMobile) {
    padding: 0 1rem;
  }

  @media (min-width: $MQNarrow) {
    padding: 0 2rem;
  }

  @media (min-width: $MQWide) {
    padding: 0;
  }
}
</style>
