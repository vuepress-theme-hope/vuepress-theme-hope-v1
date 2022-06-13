<template>
  <div class="nav-screen-dropdown-wrapper">
    <button
      class="nav-screen-dropdown-title"
      :class="{ active: open }"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleDropdown"
    >
      <slot name="title">
        <span class="title">
          <FontIcon :icon="config.icon" />
          {{ config.text }}
        </span>
      </slot>
      <span class="arrow" :class="open ? 'down' : 'right'" />
    </button>
    <ul class="nav-screen-dropdown" :class="{ hide: !open }">
      <li
        v-for="(child, index) in config.children"
        :key="child.link || index"
        class="dropdown-item"
      >
        <template v-if="'children' in child">
          <h4 class="dropdown-subtitle">
            <AutoLink
              v-if="child.link"
              :cpnfig="child"
              @focusout="
                child.children.length === 0 &&
                  index === config.children.length - 1 &&
                  setOpen(false)
              "
            />

            <span v-else>{{ child.text }}</span>
          </h4>

          <ul class="dropdown-subitem-wrapper">
            <li
              v-for="(grandchild, grandIndex) in child.children"
              :key="grandchild.link"
              class="dropdown-subitem"
            >
              <AutoLink
                :config="grandchild"
                @focusout="
                  grandIndex === child.children.length - 1 &&
                    index === config.children.length - 1 &&
                    setOpen(false)
                "
              />
            </li>
          </ul>
        </template>

        <AutoLink
          v-else
          :config="child"
          @focusout="index === config.children.length - 1 && setOpen(false)"
        />
      </li>
    </ul>
  </div>
</template>

<script src="./NavScreenDropdown" />

<style lang="stylus">
@require "~vuepress-shared/styles/reset";
@require "~vuepress-shared/styles/arrow";

.nav-screen-dropdown-title {
  @include reset.button;

  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
  padding: 0;

  color: var(--dark-grey);

  font-size: inherit;
  font-family: inherit;
  text-align: left;

  cursor: pointer;

  &:hover,
  &.active {
    color: var(--text-color);
  }

  .title {
    flex: 1;
  }

  .arrow {
    @include arrow.arrow;
  }
}

.nav-screen-dropdown {
  overflow: hidden;

  margin: 0.5rem 0 0;
  padding: 0;

  list-style: none;

  transition: transform 0.1s ease-out;
  transform: scaleY(1);
  transform-origin: top;

  &.hide {
    height: 0;
    margin: 0;
    transform: scaleY(0);
  }

  .nav-link {
    position: relative;

    display: block;

    padding-left: 0.5rem;

    font-weight: 400;
    line-height: 2;

    &:hover {
      color: var(--accent-color);
    }

    &.active {
      color: var(--accent-color);
    }

    .icon {
      font-size: 1em;
    }
  }

  .dropdown-item {
    color: inherit;
    line-height: 1.7rem;
  }

  .dropdown-subtitle {
    margin: 0;
    padding-left: 0.25rem;

    color: var(--light-grey);

    font-weight: 600;
    font-size: 0.75rem;
    line-height: 2;
    text-transform: uppercase;

    transition: color var(--color-transition);

    .nav-link {
      padding: 0;
    }
  }

  .dropdown-subitem-wrapper {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .dropdown-subitem {
    padding-left: 0.5rem;
    font-size: 0.9em;
  }
}
</style>
