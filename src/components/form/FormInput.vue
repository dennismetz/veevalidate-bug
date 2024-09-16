<template>
  <div :class="'input-wrapper' + ' input-wrapper-' + propId">
    <input
        v-model="inputValue"
        :id="propId"
        :class="{
					'form-control': true,
					'form-control-sm': true,
					'is-invalid': errorMessage || $slots['error-message'],
					'is-readonly': isReadonly
				}"
        :name="propName"
        type="text"
        :readonly="isReadonly"
    >
  </div>
</template>

<script setup>
import { computed, ref, toRef, watch } from "vue"
import { useField } from "vee-validate"
import { debounce } from "@/util/debounce"

const props = defineProps({
  modelValue: {
    type: [ String, Number ],
    default: ''
  },
  field: {
    type: String,
    required: true
  },
  id: {
    type: String
  },
  name: {
    type: String
  },
  isReadonly: {
    type: Boolean,
    default: false
  },
  validation: {
    type: String,
    default: ""
  }
})

// dynamically generate id, name based on the fieldname
const fieldName = toRef(props, 'field')
const propId = props.id || `${fieldName.value}`.replace(/\./g, '-')
const propName = props.name || `${fieldName.value}`.replace(/\./g, '-')

// watch if input gets updated from parent
const inputValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

// validate input
const { errorMessage } = useField(fieldName.value, props.validation, {
  syncVModel: true
})

// return input value
const emit = defineEmits([
  'update:modelValue',
  'update:errorMessage'
])

// tell parent input was updated
watch(inputValue, debounce((newValue) => {
  emit('update:modelValue', newValue)
}, 300))

// return error message
watch(() => errorMessage.value, () => emit('update:errorMessage', errorMessage.value))

</script>
