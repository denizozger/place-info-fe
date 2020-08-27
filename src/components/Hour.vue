<template>
  <div>{{ start }} - {{ end }}</div>
</template>

<script>
export default {
  name: "Hour",
  props: {
    start: String,
    end: String,
  },
};
</script>

<style scoped></style>
