<template>
  <span class="pageview-info" :aria-label="hint" data-balloon-pos="down">
    <EyeIcon v-if="count < 1000" />
    <FireIcon v-else />
    <span
      :id="visitorID"
      :data-flag-title="$page.title"
      class="leancloud_visitors waline-visitor-count"
    >
      <span
        class="waline-pageview-count leancloud-visitors-count"
        :data-path="visitorID"
        >...</span
      >
    </span>
  </span>
</template>

<script src="./PageViewInfo" />
