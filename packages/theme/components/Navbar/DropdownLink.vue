<template>
  <div class="dropdown-wrapper" :class="{ open }">
    <button
      class="dropdown-title"
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
      <span class="arrow" />

      <ul class="nav-dropdown">
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
    </button>
  </div>
</template>

<script src="./DropdownLink" />

<style lang="stylus">
@require "~vuepress-shared/styles/arrow";
@require "~vuepress-shared/styles/reset";

.dropdown-wrapper {
  cursor: pointer;

  &:not(:hover) {
    .arrow {
      transform: rotate(-180deg);
    }
  }

  .dropdown-title {
    button();

    padding: 0 0.25rem;

    color: var(--dark-grey);

    font-weight: 500;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;

    cursor: inherit;

    &:hover {
      border-color: transparent;
    }

    &::after {
      border-left: 5px solid var(--accent-color);
    }

    .icon {
      margin-right: 0.25em;
      font-size: 1em;
    }

    .arrow {
      arrow();
      font-size: 1.2em;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .nav-dropdown {
    position: absolute;
    top: 100%;
    right: 0;

    overflow-y: auto;
    box-sizing: border-box;

    max-height: calc(100vh - var(--navbar-height));
    margin: 0;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--grey14);
    border-radius: 0.25rem;

    background: var(--bg-color);
    box-shadow: 2px 2px 10px var(--card-shadow);

    text-align: left;
    white-space: nowrap;

    opacity: 0;
    visibility: hidden;

    transition: all 0.18s ease-out;
    transform: scale(0.8);
  }

  &:hover,
  &.open {
    .nav-dropdown {
      z-index: 2;
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }

  .nav-link {
    position: relative;

    display: block;

    margin-bottom: 0;
    border-bottom: none;

    color: var(--dark-grey);

    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.7rem;

    transition: color var(--color-transition);

    &:hover {
      color: var(--accent-color);
    }

    &.active {
      color: var(--accent-color);
    }
  }

  .dropdown-subtitle {
    margin: 0;
    padding: 0 0.25rem;

    color: var(--light-grey);

    font-weight: 600;
    font-size: 0.75rem;
    line-height: 2;
    text-transform: uppercase;

    transition: color var(--color-transition);
  }

  .dropdown-subitem-wrapper {
    padding: 0 0 0.5rem;
    border-bottom: 1px solid var(--grey14);
  }

  .dropdown-item {
    color: inherit;
    line-height: 1.7rem;

    &:last-child .dropdown-subitem-wrapper {
      padding-bottom: 0;
      border-bottom-width: 0;
    }
  }
}
</style>
