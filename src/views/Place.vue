<template>
  <div class="about">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="place" class="content">
      <div>
        <p>{{ place.name }}</p>
        <p>{{ place.address }}</p>
      </div>
      <div class="openingHours">
        <div v-for="(hours, day) in groupedDays" v-bind:key="day">
          <Day :day="day" :hours="hours" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Day from "../components/Day";
import { getPlaceById } from "@/api/places-api";

export default {
  name: "Place",
  props: {
    id: String,
  },
  data() {
    return {
      loading: false,
      place: null,
      error: null,
    };
  },
  computed: {
    groupedDays() {
      return {
        monday: [],
        "tuesday - Friday": [
          {
            start: "11:30",
            end: "15:00",
            type: "OPEN",
          },
          {
            start: "18:30",
            end: "00:00",
            type: "OPEN",
          },
        ],
        saturday: [
          {
            start: "18:00",
            end: "00:00",
            type: "OPEN",
          },
        ],
        sunday: [
          {
            start: "11:30",
            end: "15:00",
            type: "OPEN",
          },
        ],
      };
    },
  },
  components: {
    Day,
  },
  async created() {
    await this.fetchPlace();
  },
  watch: {
    $route: "fetchPlace",
  },
  methods: {
    async fetchPlace() {
      this.loading = true;

      try {
        const placeId = this.$route.params.id;
        this.place = await getPlaceById(placeId);
      } catch (e) {
        this.error = e.toString();
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped>
.openingHours {
}
</style>
