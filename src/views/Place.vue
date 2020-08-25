<template>
  <div class="about">
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="place" class="content">
      <p>{{ place.name }}</p>
      <p>{{ place.address }}</p>
    </div>
  </div>
</template>

<script>
  import { getPlaceById } from "../api/places-api";

  export default {
    name: 'Place',
    props: {
      id: String
    },
    data() {
      return {
        loading: false,
        place: null,
        error: null
      }
    },
    created () {
      this.fetchPlace()
    },
    watch: {
      '$route': 'fetchPlace'
    },
    methods: {
      async fetchPlace () {
        this.loading = true;

        try {
          const placeId = this.$route.params.id
          this.place = await getPlaceById(placeId);
        } catch (e) {
          this.error = e.toString()
        }

        this.loading = false;
      }
    }
  }
</script>
