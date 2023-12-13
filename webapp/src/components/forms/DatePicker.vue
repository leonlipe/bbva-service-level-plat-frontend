<template>
  <div
    data-grid="region">
    <div data-grid="zone">
      <bbva-web-form-date custom
        :label="label"
        :value="date"
        :min="min"
        :class="styles.dateInput"
        :invalid="invalid"
        :error-message="errorMessage"
        :max="max"
        @value-change="(ev) => onChange(ev)"
      />
    </div>
  </div>
</template>

<script>
import '@/components/bbva-web-components/bbva-web-form-date.js'
import { ref } from 'vue';

export default {
  data() {
    return {
      date: '',
      styles: { dateInput: ref('date-input') }
    };
  },
  props: {
    label: { type: String, default: '' },
    invalid:{  type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    value: { type: String, default: '' },
    min: { type: String, default: '' },
    max: { type: String, default: '' },
  },
  methods: {
    onChange (ev) {
      const ts = ev.target.value
      if (ts === this.date) return
      this.$emit('value-change', { target: { value: { ts } } })
    },
  },
  watch: {
    value(newValue) {
      this.date = newValue;
    }
  }
}
</script>

<style>
  .date-input input {
    position: absolute;
    top: 20%;
    left: 3%;
  }
</style>
