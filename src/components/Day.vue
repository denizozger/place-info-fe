<template>
  <div class="dayContainer">
    <span class="day">{{ day }}</span>
    <section>
      <span v-if="hours.length === 0">closed</span>
      <ol v-else>
        <li v-for="hour in hours" :key="hour.start">
          <Hour :start="hour.start" :end="hour.end" />
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import Hour from "@/components/Hour";

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
}

.day {
  text-transform: capitalize;
}

ol {
  list-style-type: none;
}
</style>
