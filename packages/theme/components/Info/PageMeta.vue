<template>
  <footer class="page-meta">
    <div v-if="editLink" class="meta-item edit-link">
      <EditIcon />
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{
        editLinkText
      }}</a>
    </div>

    <div v-if="updateTime" class="meta-item update-time">
      <span class="label">{{ updateTimeText }}:</span>
      <span class="info">{{ updateTime }}</span>
    </div>

    <div
      v-if="contributors && contributors.length"
      class="meta-item contributors"
    >
      <span class="label">{{ contributorsText }}: </span>
      <span class="info">
        <template v-for="(contributor, index) in contributors">
          <span
            class="contributor"
            :title="`email: ${contributor.email}`"
            :key="index"
          >
            {{ contributor.name }}
          </span>
          {{ index !== contributors.length - 1 ? ", " : "" }}
        </template>
      </span>
    </div>
  </footer>
</template>

<script src="./PageMeta" />

<style lang="stylus">
@require '~vuepress-shared/styles/wrapper';

.page-meta {
  horizontal-wrapper();
  overflow: auto;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;

  .meta-item {
    margin-top: 0.5rem;

    .label {
      font-weight: 500;

      &:not(a) {
        color: var(--text-color-lighter);
      }
    }

    .info {
      color: var(--dark-grey);
      font-weight: 400;
    }
  }

  .edit-link {
    display: inline-block;
    margin-right: 0.25rem;
    font-size: 14px;

    @media (max-width: $MQMobile) {
      margin-bottom: 8px;
    }

    .icon {
      position: relative;
      bottom: -0.125em;

      width: 1em;
      height: 1em;
      margin-right: 0.25em;
    }
  }

  .update-time {
    float: right;
    font-size: 14px;

    @media (max-width: $MQMobile) {
      float: none;
      font-size: 13px;
      text-align: left;
    }

    &:first-child {
      float: left;
    }
  }

  .contributors {
    font-size: 14px;
    text-align: right;

    @media (max-width: $MQMobile) {
      font-size: 13px;
      text-align: left;
    }
  }
}
</style>
