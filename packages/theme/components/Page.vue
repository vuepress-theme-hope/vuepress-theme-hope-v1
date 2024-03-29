<template>
  <main class="page">
    <MyTransition>
      <BreadCrumb
        :key="$route.path"
        :show="$themeConfig.breadcrumb !== false"
        :icon="$themeConfig.breadcrumbIcon !== false"
        :icon-prefix="$themeConfig.iconPrefix"
      />
    </MyTransition>

    <slot name="top" />

    <MyTransition :delay="0.04">
      <PageInfo :key="$route.path" v-bind="pageInfoProps" />
    </MyTransition>

    <MyTransition v-if="pagePassword && !pageDescrypted" :delay="0.08">
      <Password
        :key="$route.path"
        :page="true"
        @password-verify="password = $event"
      />
    </MyTransition>

    <MyTransition v-else-if="isPathEncrypted" :delay="0.08">
      <Password
        :key="$route.path"
        :page="true"
        @password-verify="checkPathPassword"
      />
    </MyTransition>

    <template v-else>
      <MyTransition :delay="0.12">
        <TOC :key="$route.path" />
      </MyTransition>

      <slot v-if="!pagePassword || pageDescrypted" name="content-top" />

      <MyTransition v-show="!pagePassword || pageDescrypted" :delay="0.08">
        <Content :key="$route.path" class="theme-default-content" />
      </MyTransition>

      <slot v-if="!pagePassword || pageDescrypted" name="content-bottom" />

      <MyTransition :delay="0.12">
        <PageMeta :key="$route.path" />
      </MyTransition>

      <MyTransition :delay="0.14">
        <PageNav :key="$route.path" v-bind="{ sidebarItems }" />
      </MyTransition>

      <MyTransition :delay="0.16">
        <CommentService v-if="$themeConfig.comment" :key="$route.path" />
      </MyTransition>
    </template>

    <slot name="bottom" />
  </main>
</template>

<script src="./Page" />

<style lang="stylus">
.page {
  position: relative;
  display: block;
  box-sizing: border-box;
  min-height: 100vh;
  padding-left: $sidebarWidth;
  padding-bottom: 2rem;
  background: var(--bg-color);

  @media (max-width: $MQMobile) {
    min-height: 100vh;
  }

  // narrow desktop / iPad
  @media (max-width: $MQNarrow) {
    padding-left: $sidebarMobileWidth;
  }

  // wide mobile
  @media (max-width: $MQMobile) {
    padding-left: 0;
  }

  @media (min-width: $MQMobile) {
    .theme-container:not(.has-sidebar) & {
      padding-left: 0;
    }
  }

  @media (min-width: $MQWide) {
    .has-toc &:not(.blog) {
      padding-right: 16rem;
    }
  }
}
</style>
