<template>
  <div
    class="app-theme"
    style="position: relative"
    v-show="$router.currentRoute.path != '/about'"
  >
    <!-- Overlay a loader -->
    <v-overlay :value="isLoading" opacity="1" color="#fff">
      <v-progress-circular indeterminate size="64" color="#2176d2" />
    </v-overlay>

    <!-- Header message -->
    <HeaderMessage ref="headerMessage" class="header-message" />

    <!-- Map & Sidebar-->
    <div class="map-wrapper">
      <!-- Map -->
      <DataMap
        ref="mapRef"
        :selectedData="selectedData"
        :selectedSchool="currentFilters['school_name']"
        :schoolCounts="schoolCounts"
        :schoolGeojson="schools"
        @map-click="handleMapClick"
      />

      <!-- Sidebar -->
      <MapSidebar
        ref="mapSidebar"
        :data="data"
        :filteredData="filteredData"
        :availableSchools="availableSchools"
        :filteredSize="filteredSize"
        :currentFilters="currentFilters"
        :endApplicationDate="endApplicationDate"
        :endCompleteDate="endCompleteDate"
        :startCompleteDate="startCompleteDate"
        @update-data="handleDataUpdate"
      />
    </div>

    <!-- Data Table -->
    <!-- <DataTable v-if="data !== null" :data="filteredData" class="m-5" /> -->
  </div>
</template>

<script>
// Local
import { fetchAWS } from "@/tools.js";
import { DIMS, DATE_COLUMNS } from "@/data-dict";
import HeaderMessage from "./HeaderMessage";

// Map & Sidebar
import DataMap from "./DataMap";
import MapSidebar from "./Sidebar";

// Charts
import DataTable from "./DataTable";

// External
import crossfilter from "crossfilter2";
import { min, max } from "d3-array";
import { timeParse } from "d3-time-format";

export default {
  name: "Dashboard",
  components: {
    DataMap,
    MapSidebar,
    HeaderMessage,
    DataTable,
  },
  data() {
    return {
      // Data
      data: null,
      schools: null,
      schoolCounts: null,
      filteredData: null,
      selectedData: null,
      filteredSize: 0,
      endApplicationDate: null,
      startCompleteDate: null,
      endCompleteDate: null,

      // Filtering
      crossfilter: null,
      dimensions: DIMS.reduce(
        (o, key) => Object.assign(o, { [key]: null }),
        {}
      ),
      currentFilters: DIMS.reduce(
        (o, key) => Object.assign(o, { [key]: null }),
        {}
      ),
      schoolGroup: null,
      minDate: null,
      maxDate: null,

      // Track whether it's loading
      isLoading: true,
    };
  },
  async created() {
    // Fetch the data
    await this.fetchData();

    // Turn off loading
    this.isLoading = false;
  },
  computed: {
    selectedSchool() {
      return this.currentFilters["school_name"];
    },
    availableSchools() {
      if (this.schoolCounts == null) return [];

      // Get the keys
      let keys = Array.from(this.schoolCounts.keys());
      let out = keys.filter((d) => this.schoolCounts.get(d) > 0);

      // Make sure the selected school is in the list
      if ((out.length == 0) & (this.selectedSchool !== null))
        out = [this.selectedSchool];

      return out;
    },
  },
  methods: {
    handleDataUpdate(filterName, filterValue) {
      let dim = this.dimensions[filterName];
      if (dim == null) return;

      // Save the current filter
      this.currentFilters[filterName] = filterValue;

      // Filter the right dimension
      this.dimensions[filterName].filter(filterValue);

      // Update the filtered data
      this.filteredData = this.crossfilter.allFiltered();
    },

    handleMapClick(selectedSchool) {
      this.dimensions["school_name"].filter(selectedSchool);
      if (selectedSchool !== null)
        this.selectedData = this.crossfilter.allFiltered();
    },
    createCrossfilter(data) {
      // Create and save crossfilter
      this.crossfilter = crossfilter(data);

      // Create dimensions
      for (let dim in this.dimensions) {
        this.dimensions[dim] = this.crossfilter.dimension((d) => d[dim]);
      }

      // The group for the "school_name" dimension
      this.schoolGroup = this.dimensions["school_name"].group();

      return this.crossfilter;
    },
    async fetchData() {
      // Database of schools
      this.schools = await fetchAWS("schools");

      // Download and extract the features
      let data = await fetchAWS("asbestos-data");

      // Format date and time
      const fmt = timeParse("%m-%d-%Y");
      data.forEach((d) => {
        for (let i = 0; i < DATE_COLUMNS.length; i++) {
          let dateColumn = DATE_COLUMNS[i];
          d[dateColumn] = fmt(d[dateColumn]).getTime();
        }
      });

      // Save the end date
      this.endApplicationDate = max(data, (d) => d.application_date);
      this.startCompleteDate = min(data, (d) => d.complete_date);
      this.endCompleteDate = max(data, (d) => d.complete_date);

      // Save it
      this.data = data;
      this.filteredData = data;

      // Create crossfilter
      this.createCrossfilter(this.data);

      // Turn of loading and return
      this.isLoading = false;

      // Filter out extra schools
      this.$nextTick(() => {
        this.schools.features = this.schools.features.filter(
          (d) => this.availableSchools.indexOf(d.properties.school_name) > -1
        );
      });

      return this.data;
    },
  },
  watch: {
    filteredData(nextValue) {
      // Set the size
      this.filteredSize = nextValue.length;

      // Group by school name
      // This respects all filters but school name
      this.schoolCounts = new Map(
        this.schoolGroup.all().map((d) => [d.key, d.value])
      );
    },
  },
};
</script>

<style>
.full-page-loader.vld-overlay {
  align-items: flex-start !important;
}
.full-page-loader .vld-icon {
  margin-top: 50px !important;
}
.map-wrapper {
  display: flex;
  margin-top: 50px;
  margin-bottom: 20px;
  border: 5px solid #d0d0d2;
}

@media only screen and (max-width: 767px) {
  .map-wrapper {
    flex-direction: column;
  }
}
</style>
