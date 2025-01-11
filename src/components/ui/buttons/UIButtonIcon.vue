<template>
  <button
    :disabled="disabled"
    :class="[
      'ui-button-icon',
      `_${variant}`,
      `_${size}`,
      { _transparent: transparent },
    ]"
  >
    <UIIcon :name="iconName" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UIIcon from "@/components/ui/icon/UIIcon.vue";
const sizes = ["sm", "md", "lg"];
const variants = ["default", "rounded"];

export default defineComponent({
  components: { UIIcon },
  name: "UIButtonIcon",
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
    iconName: {
      type: String,
    },
    variant: {
      type: String,
      default: () => "default",
      validator: (variant: string) => variants.includes(variant),
    },
    size: {
      type: String,
      default: () => "md",
      validator: (size: string) => sizes.includes(size),
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.ui-button-icon {
  padding: rem(2);
  background-color: var(--ui-overlay-dark-15);
  border: none;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: $box-shadow-btn-icon;
  &._transparent {
    background-color: transparent;
    box-shadow: unset;
  }
  &._default {
    border-radius: var(--border-radius-sm);
    &._sm {
      :deep(.ui-icon) {
        height: rem(16);
        width: rem(16);
      }
    }
    &._md {
      :deep(.ui-icon) {
        height: rem(20);
        width: rem(20);
      }
    }
    &._lg {
      :deep(.ui-icon) {
        height: rem(24);
        width: rem(24);
      }
    }
  }
  &._rounded {
    border-radius: 50%;
    &._sm {
      :deep(.ui-icon) {
        height: 1rem;
        width: 1rem;
      }
    }
    &._md {
      :deep(.ui-icon) {
        height: rem(20);
        width: rem(20);
      }
    }
    &._lg {
      :deep(.ui-icon) {
        height: rem(24);
        width: rem(24);
      }
    }
  }
  &:hover {
    :deep(.ui-icon) {
      opacity: $hover-opacity;
    }
  }
  &:active {
    :deep(.ui-icon) {
      color: var(--icon-pressed);
    }
  }
  &:disabled {
    opacity: $disabled-opacity;
    pointer-events: none;
  }
}

</style>
