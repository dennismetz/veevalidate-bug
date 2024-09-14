<template>
	<div :id="'form-input-wrapper-' + propId" :class="{'row': true, 'mb-2': hasMarginBottom}">
		<label v-if="!isLabelHidden && propLabel" :for="propId" class="" :class="props.labelClasses">
			{{ propLabel }}
			<i v-if="tooltip" class="fa-solid fa-circle-info form-tooltip ms-2" :class="tooltipClass"></i>
		</label>
		<div class="col-auto col-lg" :class="{'input-group': isInputGroup}">
			<slot name="before" />
      <FormInput
          v-model="inputValue"
          :field="field"
          :id="id"
          :name="name"
          type="text"
          :is-readonly="isReadonly"
          :validation="validation"
          @update:error-message="updateErrorMessage"
      />
			<slot name="default" />
			<slot name="error-message">
				<span class="invalid-field" v-if="errorMessage">{{ errorMessage }}</span>
			</slot>
		</div>
	</div>
</template>

<script setup>
import { computed, ref, toRef, watch } from "vue"
import FormInput from "@/components/form/FormInput"

// props
const props = defineProps({
	modelValue: {
		type: [ String, Number, Boolean, Object, Array ],
		default: ''
	},

	id: {
		type: String
	},
	field: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	label: {
		type: String
	},
	labelClasses: {
		type: String,
		default: 'col-md-5 col-lg-4 col-form-label col-form-label-sm'
	},

	tag: {
		type: String,
		default: 'input'
	},

	isReadonly: {
		type: Boolean,
		default: false
	},
	isLabelHidden: {
		type: Boolean,
		default: false
	},
	isInputGroup: {
		type: Boolean,
		default: false
	},
	hasMarginBottom: {
		type: Boolean,
		default: true
	},

	validation: {
		type: String,
		default: ""
	}
})

const emit = defineEmits([
	'update:modelValue',
	'option:selected',
	'option:deselected',
	'option:created',
	'option:clear',
	'search'
])

// dynamically generate id and label based on the fieldname
const fieldName = toRef(props, 'field')
const propId = props.id || `${fieldName.value}`.replace(/\./g, '-')
const propLabel = computed(() => props.label || "This is a Label")

// set error message
const errorMessage = ref(null)
const updateErrorMessage = message => {
	errorMessage.value = message
}

// watch if input gets updated from parent
const inputValue = ref(props.modelValue)
watch(() => props.modelValue, (newValue) => {
	inputValue.value = newValue
})

// return input value
watch(() => inputValue.value, (newValue) => {
	emit('update:modelValue', newValue)
})

</script>
