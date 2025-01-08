<template>
  <div class="ui-select" v-on-click-outside="hide">
    <button class="ui-select__toggler" @click="toggle" aria-haspopup="listbox" :aria-expanded="optionsShown">
      <span class="ui-select__toggler-text"> {{ modelValue }}</span>
    </button>
    <div v-if="optionsShown" class="ui-select__options">
      <ul class="ui-select__list">
        <li v-for="(option, index) in options" :key="index" class="ui-select__list-item" @click="updateValue(option)">
          <slot name="option" :option="option">
            <span class="ui-select__list-item-text">
              {{ option }}
            </span>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { vOnClickOutside as baseOnClickOutside } from '@vueuse/components'

import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Directive } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UISelectOption = Record<string, any> | string
export type ModelValueObject = UISelectOption
export type ModelValuePrimitive = number | string
export type ModelValue = ModelValuePrimitive | ModelValueObject

const vOnClickOutside: Directive = baseOnClickOutside;

export default defineComponent({
  name: 'UISelect',
  emits: ['update:modelValue'],
  directives: {
    onClickOutside: vOnClickOutside
  },
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: null
    },
    options: {
      type: Array as PropType<UISelectOption[]>,
      default: () => []
    }
  },
  data() {
    return {
      optionsShown: false
    }
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    async setShowOptions(show: boolean) {
      this.optionsShown = show
    },

    toggle() {
      this.setShowOptions(!this.optionsShown)
    },
    hide() {
      this.setShowOptions(false)
    },
    updateValue(value: ModelValue) {
      this.$emit('update:modelValue', value)
      this.hide()
    },
    handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape" && this.optionsShown) {
        this.hide();
      }
    },
  }
})
</script>

<style lang="css" scoped>
.ui-select {
  display: inline-flex;
  position: relative;
  width: 100%;
}

.ui-select__label {
  align-items: center;
  display: inline-flex;
}

.ui-select__toggler {
  width: 100%;
  z-index: 1;
  padding: 5px 10px;
  border: 1px solid green;
  background-color: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.ui-select__options {
  position: absolute;
  border-radius: 5px;
  z-index: 100;
  top: 150%;
  max-height: 200px;
  overflow-y: scroll;
}

.ui-select__list {
  overflow: hidden;
}

.ui-select__list-item {
  background-color: green;

  cursor: pointer;
  position: relative;
  user-select: none;
  padding-bottom: 3px;
  padding-top: 3px;
  width: 100%;
}

.ui-select__list-item-text {
  display: block;
  box-sizing: border-box;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
