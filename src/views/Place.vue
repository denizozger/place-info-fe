<template>
  <div class="placeContainer">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="place" class="place">
      <section class="nameAndAddress">
        <h1>{{ place.name }}</h1>
        <address>{{ place.address }}</address>
      </section>
      <section class="openingHours">
        <h2>Opening hours</h2>
        <div v-for="(hours, day) in groupedDays" v-bind:key="day">
          <Day :day="day" :hours="hours" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Day from "@/components/Day";
import { getPlaceById } from "@/api/places-api";
import { groupDaysWithSameOpeningHours } from '@/helpers/placeUtils'

export default {
  name: "Place",
  props: {
    id: String,
  },
  components: {
    Day,
  },
  data() {
    return {
      loading: false,
      place: null,
      error: null,
    };
  },
  async created() {
    await this.fetchPlace();
  },
  computed: {
    groupedDays() {
      return groupDaysWithSameOpeningHours(this.place.openingHours);
    },
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
.placeContainer {
  text-align: left;
}

.place {
  display: flex;
  flex-direction: column;
}

.place > section{
  border: 10px solid gray;
  padding: 10px;
}

.place .nameAndAddress {
  border-bottom: 0;
}

address {
  font-style: normal;
  color: gray;
}

@media (min-width: 376px) {
  .place {
    flex-direction: row;
  }
  .place .nameAndAddress {
    border-right: 0;
    border-bottom: 10px solid gray;
  }
}
</style>
