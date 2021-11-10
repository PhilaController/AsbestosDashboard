<template>
  <div class="map-sidebar">
    <!--------------------------------------->
    <!-- TOP: Side bar header message -->
    <!--------------------------------------->
    <div class="sidebar-header">
      <div class="font-italic mt-3">
        <p>
          Showing locations for
          <span style="color: #ef5350; font-weight: bold">{{
            formatNumber(filteredSize)
          }}</span>
          asbestos project<span v-if="filteredSize !== 1">s</span>
        </p>
      </div>

      <div class="font-italic">
        <p>
          Click on a circle to view the detailed data for a particular school.
          Use the filters below to select data for a specific school, level, or
          project type.
        </p>
        <p><router-link to="/about">Learn more about the data.</router-link></p>
      </div>
    </div>

    <div
      id="buttons-section"
      class="d-flex justify-content-center flex-column align-items-center"
    >
      <!-- Download data -->
      <DownloadButton :data="data" :filteredData="filteredData" />

      <!-- Reset all filters -->
      <v-btn
        id="reset-all-button"
        class="ml-5 mr-5 mt-3 mb-5"
        outlined
        :ripple="false"
        @click="resetAllFilters"
        :disabled="hideResetAllButton"
      >
        <i class="fas fa-undo"></i
        ><span class="ml-3">Reset All Filters</span></v-btn
      >
    </div>

    <!-- Scrollable content -->
    <div class="sidebar-inner-content">
      <v-container id="filters-section">
        <!-- Header -->
        <div class="text-center sidebar-subtitle">Filters</div>
        <v-divider class="my-divider" />

        <!-- School Name Filter -->
        <div id="schoolNameSelectWrapper">
          <v-autocomplete
            id="schoolNameSelect"
            v-model="selected['school_name']"
            :items="availableSchools"
            hide-no-data
            hide-selected
            label="School Name"
            placeholder="Start typing to search"
            clearable
            :ripple="false"
            hint="View projects for a specific school"
            persistent-hint
          ></v-autocomplete>
        </div>

        <!-- Expansion panels -->
        <v-expansion-panels
          id="expansionPanels"
          accordion
          multiple
          v-model="expandedPanels"
        >
          <!-- Application Date Filter -->
          <v-expansion-panel>
            <v-expansion-panel-header
              ><div class="header-content">Application Date</div>
              <div
                v-if="showReset('application_date')"
                class="reset-link"
                @click.capture="handleResetClick($event, 'application_date')"
              >
                Reset
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <vue-slider
                  class="date-slider"
                  v-model="selected['application_date']"
                  :min="allowed['application_date'][0]"
                  :max="allowed['application_date'][1]"
                  tooltip="always"
                  :tooltip-formatter="formatDateTooltip"
                  :tooltip-placement="dateTooltipPlacement('application_date')"
                  :lazy="true"
                  :enableCross="false"
                  width="80%"
                  :clickable="false"
                  ref="slider"
                ></vue-slider>

                <div
                  id="lastNDaysWrapper"
                  class="d-flex flex-row justify-content-center"
                >
                  <span class="date-text-field-label align-bottom"
                    >View projects for the last</span
                  >

                  <div id="date-text-field" class="ml-2 mr-2">
                    <v-text-field
                      ref="lastNDays"
                      v-model="lastNDays"
                      label=""
                      clearable
                      :ripple="false"
                      :rules="[rules.number]"
                    />
                  </div>
                  <span class="date-text-field-label">days</span>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- End Date Filter -->
          <v-expansion-panel>
            <v-expansion-panel-header
              ><div class="header-content">Planned Completion Date</div>
              <div
                v-if="showReset('complete_date')"
                class="reset-link"
                @click.capture="handleResetClick($event, 'complete_date')"
              >
                Reset
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <vue-slider
                  class="date-slider"
                  v-model="selected['complete_date']"
                  :min="allowed['complete_date'][0]"
                  :max="allowed['complete_date'][1]"
                  tooltip="always"
                  :tooltip-formatter="formatDateTooltip"
                  :tooltip-placement="dateTooltipPlacement('complete_date')"
                  :lazy="true"
                  :enableCross="false"
                  width="80%"
                  :clickable="false"
                  ref="completeDateSlider"
                />

                <!-- Show only future dates -->
                <v-switch
                  class="mt-5 pt-5"
                  v-model="futureDatesOnly"
                  label="Show only future dates"
                  :ripple="false"
                  color="#7ab5e5"
                  hide-details
                />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Project Type Filter -->
          <v-expansion-panel v-for="r in checkboxFields" :key="r.key">
            <v-expansion-panel-header
              ><div class="header-content">{{ r.label }}</div>
              <div
                v-if="showReset(r.key)"
                class="reset-link"
                @click.capture="handleResetClick($event, r.key)"
              >
                Reset
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-hover v-for="type in allowed[r.key]" :key="type">
                <v-checkbox
                  slot-scope="{ hover }"
                  :value="type"
                  v-model="selected[r.key]"
                  color="#7ab5e5"
                  hide-details
                  dense
                  multiple
                  :ripple="false"
                  @click.native.capture="handleCheckboxClick"
                >
                  <template v-slot:label>
                    <div>
                      {{ getAlias(type, r.key) }}
                      <span
                        v-if="hover"
                        class="only-link"
                        v-on:click.stop="handleOnlyClick($event, r.key, type)"
                        >only</span
                      >
                    </div>
                  </template>
                </v-checkbox>
              </v-hover>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </div>
  </div>
</template>

<script>
// Internal
import { CATEGORIES, ALIASES, DIMS } from "@/data-dict";
import DownloadButton from "./DownloadButton";

// Vue slider
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  components: { VueSlider, DownloadButton },
  props: [
    "data",
    "filteredData",
    "filteredSize",
    "currentFilters",
    "availableSchools",
    "endApplicationDate",
    "endCompleteDate",
    "startCompleteDate",
  ],
  data() {
    return {
      error: false,
      rules: {
        number: (value) => {
          if (value === "") return true;
          if (value === null) return true;
          const pattern = /^\d*$/;
          return pattern.test(value) || "Number required";
        },
      },
      onlyClick: false,
      aliases: ALIASES,
      expandedPanels: [],
      checkboxFields: [
        { key: "project_type", label: "Project Type" },
        { key: "operation_type", label: "Operation Type" },
        { key: "school_level", label: "School Level" },
      ],

      // Allowed values
      allowed: {
        project_type: Object.assign([], CATEGORIES["project_type"]),
        operation_type: Object.assign([], CATEGORIES["operation_type"]),
        school_level: Object.assign([], CATEGORIES["school_level"]),
        application_date: [
          new Date("2016-01-01T00:00:00").getTime(),
          new Date().getTime(),
        ],
        complete_date: [
          new Date("2015-01-01T00:00:00").getTime(),
          new Date().getTime(),
        ],
      },

      // Default selections
      selected: {
        project_type: null,
        operation_type: null,
        application_date: null,
        complete_date: null,
        school_name: null,
        school_level: null,
      },

      lastNDays: null,
      futureDatesOnly: false,
    };
  },
  created() {
    // Set the selected values to the defaults
    let keys = Object.keys(this.allowed);

    for (let i = 0; i < keys.length; i++) {
      this.selected[keys[i]] = this.allowed[keys[i]];
    }
  },
  watch: {
    futureDatesOnly(nextValue) {
      let start;
      if (nextValue) start = new Date().getTime();
      else start = this.startCompleteDate;
      this.selected.complete_date = [start, this.selected.complete_date[1]];
    },
    endApplicationDate(nextValue) {
      this.allowed.application_date[1] = nextValue;
    },
    endCompleteDate(nextValue) {
      this.allowed.complete_date[1] = nextValue;
    },
    startCompleteDate(nextValue) {
      this.allowed.complete_date[0] = nextValue;
    },
    lastNDays(nextVal) {
      if (nextVal === null || nextVal === "") {
        // Reset the date to the default
        this.selected["application_date"] = this.allowed["application_date"];
      } else {
        // Validate
        const pattern = /^\d*$/;
        if (pattern.test(nextVal)) {
          // Subtract the days from the current date
          let minDate = new Date(this.allowed["application_date"][1]);
          minDate.setDate(minDate.getDate() - nextVal);
          this.selected["application_date"] = [
            minDate.getTime(),
            this.selected["application_date"][1],
          ];
        }
      }
    },
    "selected.school_name": function (nextValue) {
      this.$emit("update-data", "school_name", nextValue);
    },
    "selected.application_date": function (nextValue) {
      this.$emit("update-data", "application_date", (d) => {
        return d >= nextValue[0] && d <= nextValue[1];
      });
    },
    "selected.complete_date": function (nextValue) {
      this.$emit("update-data", "complete_date", (d) => {
        return d >= nextValue[0] && d <= nextValue[1];
      });
    },
    "selected.project_type": function (nextValue) {
      this.$emit(
        "update-data",
        "project_type",
        (d) => nextValue.indexOf(d) !== -1
      );
    },
    "selected.school_level": function (nextValue) {
      this.$emit(
        "update-data",
        "school_level",
        (d) => nextValue.indexOf(d) !== -1
      );
    },
    "selected.operation_type": function (nextValue) {
      this.$emit(
        "update-data",
        "operation_type",
        (d) => nextValue.indexOf(d) !== -1
      );
    },
  },
  computed: {
    hideResetAllButton() {
      for (let i = 0; i < DIMS.length; i++)
        if (this.showReset(DIMS[i])) return false;
      return true;
    },
  },
  methods: {
    dateTooltipPlacement(column) {
      let dateRange = this.selected[column];
      let a = dateRange[0];
      let b = dateRange[1];

      let diff = Math.round((b - a) / (1000 * 60 * 60 * 24));
      if (diff < 365 * 3) return ["top", "bottom"];
      else return ["bottom", "bottom"];
    },
    getAlias(value, kind) {
      let out = this.aliases[kind];
      if (out) {
        return out[value] || value;
      } else {
        return value;
      }
    },
    handleOnlyClick(event, key, value) {
      this.onlyClick = true;
      this.selected[key] = [value];
    },
    handleCheckboxClick(event) {
      if (this.onlyClick) {
        event.stopPropagation();
        event.preventDefault();
        this.onlyClick = false;
      }
    },
    formatDateTooltip(dt) {
      dt = new Date(dt);
      const day = dt.getDate();
      const month = dt.getMonth() + 1;
      const year = `${dt.getFullYear()}`.slice(2);

      return `${month}/${day}/${year}`;
    },
    formatNumber(d) {
      return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    setToDefault(value, filterName) {
      if (filterName == "school_name") return value === null;
      else if (filterName == "application_date")
        return (
          value[0] === this.allowed["application_date"][0] &&
          value[1] === this.allowed["application_date"][1]
        );
      else if (filterName == "complete_date")
        return (
          value[0] === this.allowed["complete_date"][0] &&
          value[1] === this.allowed["complete_date"][1]
        );
      else if (
        filterName == "project_type" ||
        filterName == "operation_type" ||
        filterName == "school_level"
      ) {
        for (let i = 0; i < this.allowed[filterName].length; i++) {
          if (value.indexOf(this.allowed[filterName][i]) === -1) return false;
        }
        return true;
      } else return true;
    },
    showReset(filterName) {
      return !this.setToDefault(this.selected[filterName], filterName);
    },
    resetAllFilters() {
      let filters = DIMS;
      for (let i = 0; i < filters.length; i++) {
        this.$emit("reset", filters[i]);
        this.resetFilter(filters[i]);
      }
    },
    resetFilter(filterName) {
      // Update the filters
      if (filterName == "school_name") this.selected["school_name"] = null;
      else this.selected[filterName] = this.allowed[filterName];

      if (filterName == "application_date") this.lastNDays = null;
      if (filterName == "complete_date") this.futureDatesOnly = false;
    },
    handleResetClick(event, filterName) {
      // Stop button from expanding
      event.stopPropagation();
      event.preventDefault();

      // Reset filter
      this.resetFilter(filterName);
    },
  },
};
</script>

<style>
.header-content {
  max-width: 60% !important;
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
.date-text-field-label {
  margin-top: 4px;
  padding-top: 16px;
}
#date-text-field {
  width: 60px !important;
  text-align: center;
  min-height: 90px;
}
#expansionPanels {
  margin-top: 30px;
}
#schoolNameSelectWrapper {
  padding-left: 16px !important;
  padding-right: 16px !important;
}
.sidebar-subtitle {
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.sidebar-inner-content .v-expansion-panel:before {
  box-shadow: none !important;
}

.v-input--radio-group {
  margin-top: 0px !important;
  padding-top: 0px !important;
}
/* Reset all button */
#reset-all-button,
#download-data-button {
  width: 100%;
  max-width: 300px;
}

/* Total sidebar */
.map-sidebar {
  width: 30%;
  min-width: 300px;
  height: 800px;
  display: flex;
  flex-direction: column;
  border-left: 5px solid #d0d0d2;
}
@media only screen and (max-width: 767px) {
  .map-sidebar {
    width: 100%;
    height: 800px;
  }
}
.sidebar-inner-content {
  overflow-y: scroll;
}

/* Header */
.sidebar-header {
  text-align: center;
  padding: 5px;
}

/* Panel config */
/* .sidebar-inner-content button:focus {
  outline: 0 !important;
} */

.sidebar-inner-content .v-expansion-panel-header {
  font-size: 1.1rem !important;
  display: flex;
}

/* Reset link and only links */
.reset-link {
  color: #7ab5e5;
  font-weight: 500;
  text-align: right;
  margin-right: 1rem;
  padding-left: 0.5rem;
}
.reset-link:hover {
  text-decoration: underline;
}
.only-link {
  font-weight: 500;
}
.only-link:hover {
  text-decoration: underline;
}

/* .v-label {
  margin-bottom: 0rem !important;
} */

/* Sliders */
.date-slider {
  margin-top: 35px;
  margin-bottom: 60px;
  margin-left: auto;
  margin-right: auto;
}
.vue-slider-dot-tooltip-inner {
  font-size: 1.2rem;
}
.vue-slider-rail {
  background-color: #ccc;
}
.vue-slider-dot-tooltip-inner {
  background-color: #868b8e;
  border-color: #868b8e;
}
.vue-slider-process {
  background-color: #7ab5e5;
}

#buttons-section {
  border-bottom: 5px solid #d0d0d2;
}

@media only screen and (max-width: 767px) {
  .map-sidebar {
    border-top: 5px solid #868b8e;
    border-left-width: 0px;
  }
}
</style>