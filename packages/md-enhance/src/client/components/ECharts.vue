<template>
  <div class="echarts">
    <div class="echarts-title">{{ decodeURIComponent(title) }}</div>
    <div v-if="loading" class="echarts-loading-wrapper">
      <LoadingIcon />
    </div>
    <div
      v-show="!loading"
      :id="id"
      ref="echartsWrapper"
      class="echarts-wrapper"
    />
  </div>
</template>

<script src="./ECharts" />

<style lang="stylus">
.echarts-title {
  margin: 0.5rem auto;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
}

.echarts-loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--grey14, #eee);

  .loading-icon {
    width: 4em;
    height: 4em;
    margin: 2.5em auto;
    color: var(--accent-color);
  }
}

.echarts-wrapper {
  min-height: 360px;
  padding: 0.6em 0.4em;
  text-align: center;
  transition: all 1s;

  @media (max-width: $MQMobile) {
    margin: 0 -1rem;
    padding: 0.6em 0;
  }
}
</style>
