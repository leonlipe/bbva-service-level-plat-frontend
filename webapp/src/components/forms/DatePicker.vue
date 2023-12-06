<template  >
    <bbva-web-form-date custom
      :label="label"
      :value="valueAsStr"
      :min="min"
      class="case"
      :invalid="invalid"
      :error-message="errorMessage"
      :max="max"
      @value-change="(ev) => onChange(ev)"
    />
</template>

<script>
import '@/components/bbva-web-components/bbva-web-form-date.js'

export default {
  props: {
    label: { type: String, default: '' },
    invalid:{  type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    value: { type: String, default: '' },
    min: { type: String, default: '' },
    max: { type: String, default: '' },
  },
  computed: {
    valueAsStr () { return this.value }
  },
  methods: {
    onChange (ev) {
      const ts = ev.target.value
      if (ts === this.value) return
      this.$emit('value-change', ts)
    },
  },
}
</script>
