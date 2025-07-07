<!-- components/CurrencyInput.vue -->

<template>
  <ElementLayout>
    <div style="width: 240px; margin-bottom: 10px;">Annual Income<br></div>
    <template #element>
        <input  style="width: 225px; border: 1px solid rgb(209, 209, 214); border-radius: 4px; padding: 4px; font-size: 14px; font-weight: 400; color: rgb(0, 0, 0);"
          type="text"
          :value="displayValue"
          @input="handleInput"
          @blur="formatValue"
        />
      </template>

  </ElementLayout>
  </template>
  
  <script setup>
  import { ref, computed, watch, defineProps, defineEmits } from 'vue';
  import { defineElement } from '@vueform/vueform'
  
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0,
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const internalValue = ref(props.modelValue);
  
  const displayValue = computed(() => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',  minimumFractionDigits: 0, }).format(internalValue.value);
  });
  
  watch(() => props.modelValue, (newValue) => {
    internalValue.value = newValue;
  });
  
  function handleInput(event) {
    console.log(event)
    const value = event.target.value.replace(/[^\d.]/g, ''); // Remove non-numeric characters
    internalValue.value = parseFloat(value) || 0; // Convert to float, defaulting to 0 if NaN
    emit('update:modelValue', internalValue.value); // Update parent model value
  }
  
  function formatValue() {
    // Reformat on blur to ensure consistent formatting
    internalValue.value = parseFloat(internalValue.value.toFixed(2)); // Fix to 2 decimal places
  }
  </script>
  