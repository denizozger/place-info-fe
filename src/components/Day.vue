<template>
  <div class="dayContainer">
    <div class="day">{{ day }}</div>
    <div>
      <span v-if="hours.length === 0">closed</span>
      <ul v-else>
        <li v-for="hour in hours" :key="hour.start">
          <Hour :start="hour.start" :end="hour.end" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Hour from "./Hour";

export default {
  name: "Day",
  components: { Hour },
  props: {
    day: String,
    hours: Array,
  },
};
</script>

<style scoped>
.dayContainer {
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;
}

.day {
  text-transform: capitalize;
}

ul {
  list-style-type: none;
}
</style>
