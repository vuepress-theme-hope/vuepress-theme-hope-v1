<template>
  <div v-show="pluginEnable" class="comments-wrapper">
    <Vssue v-if="options.type === 'vssue'" :title="$title" />
    <CommentProvider v-else :config="options" />
  </div>
</template>

<script src="./CommentService" />
