<template>
	<div id="page-wrapper">
    <div id="home-wrapper" class="container p-5">
      <Form @submit="patchAllEntries(entries)">
        <div v-for="entry in entries" :key="entry.id">
          <form-input-wrapper v-model="entry.name" field="entity.name1" :id="'entity.name' + entry.id" validation="required" />
          <hr>
        </div>
      </Form>

      <pre>{{ entries }}</pre>
    </div>
	</div>
</template>

<script setup>
import FormInputWrapper from "@/components/form/FormInputWrapper.vue";
import { onMounted, ref } from "vue";
import { debounce } from "@/util/debounce.js";
import { Form } from "vee-validate";


// patch
const entries = ref([])

onMounted(() => {
  debounce(() => {
    entries.value = [
      { id: 12312112124122, name: "test number one" },
      { id: 11023102932346, name: "this is another test" },
      { id: 11029381033479, name: "and this one is test number 3" }
    ];
  }, 900)();
});

const patchAllEntries = async (entityData) => {
  console.log(entityData)
}
</script>

<style lang="scss">
@import '@/styles/app.scss';

html,
body {
  min-height: 100%;
}

#page-wrapper {
  min-height: 100vh;
}
</style>
