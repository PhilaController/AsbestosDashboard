<template>
  <div class="data-table section">
    <!-- Second row: data table -->
    <v-row no-gutters class="data-table-row ml-2 mr-2">
      <v-col cols="12">
        <div>
          <p class="font-italic">
            <span class="font-weight-bold">Note</span>: To view more information
            for each notification, use the hyperlink for the permit number in
            the table below.
          </p>
        </div>

        <!-- Table -->
        <v-data-table
          class="my-data-table elevation-0 mb-2"
          ref="dataTable"
          :headers="headers"
          :items="data"
          item-key="permit_number"
          sort-by="application_date"
          :sort-desc="true"
          show-expand
          must-sort
          :disable-pagination="true"
          :hide-default-footer="true"
          :expanded="expanded"
        >
          <template v-slot:item.application_date="{ item }">
            <span>{{ formatDate(item.application_date) }}</span>
          </template>
          <template v-slot:item.work_start="{ item }">
            <span>{{ formatDate(item.work_start) }}</span>
          </template>
          <template v-slot:item.complete_date="{ item }">
            <span>{{ formatDate(item.complete_date) }}</span>
          </template>
          <template v-slot:item.permit_number="{ item }">
            <template v-if="item.permit_url">
              <a target="_blank" :href="item.permit_url"
                ><span>{{ item.permit_number }}</span
                ><i class="ml-1 fas fa-external-link-alt"></i
              ></a>
            </template>
            <template v-else>
              <span>{{ item.permit_number }}</span>
            </template>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="expanded-content">
              <span class="font-weight-bold">Description:</span>
              <span class="ml-1">{{ item.work_description }}</span>
            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { timeFormat } from "d3-time-format";

export default {
  props: ["data"],
  components: {},
  data() {
    return {};
  },
  computed: {
    expanded() {
      return this.data;
    },
    headers() {
      return [
        {
          text: "Application Date",
          value: "application_date",
          width: "15%",
        },
        {
          text: "Permit Number",
          sortable: false,
          value: "permit_number",
          width: "15%",
        },
        {
          text: "Project Type",
          sortable: false,
          value: "project_type",
        },
        {
          text: "Operation Type",
          sortable: false,
          value: "operation_type",
        },
        {
          text: "Planned Start Date",
          value: "work_start",
          width: "20%",
        },
        {
          text: "Planned Completion Date",
          value: "complete_date",
          width: "20%",
        },
      ];
    },
  },
  methods: {
    formatDate(dt) {
      console.log(dt);
      console.log(timeFormat("%m/%d/%Y")(dt));
      return timeFormat("%m/%d/%Y")(dt);
    },
  },
};
</script>

<style >
[data-vuetify]
  .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #cfcfcf;
}

.data-table-row {
  margin-top: 50px !important;
}
/* Sliders */
.total-slider-wrapper {
  height: 100px;
  margin-top: 30px !important
  ;
}
.total-slider {
  margin-bottom: 60px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
.vue-slider-dot-tooltip-inner {
  font-size: 1rem;
  padding: 5px !important;
}
.vue-slider-rail {
  background-color: #ccc;
  height: 5px;
}
.vue-slider-dot-tooltip-inner {
  background-color: rgba(0, 0, 0, 0.5);
  border-color: rgba(0, 0, 0, 0.5);
}
.vue-slider-process {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Chips */
.existing-chip {
  width: 75px;
  justify-content: center;
}
.short-category-chip {
  width: 125px;
  justify-content: center;
}
.dashed-chip {
  background: repeating-linear-gradient(
    45deg,
    white,
    white 3px,
    #ffe082 3px,
    #ffe082 calc(2 * 3px)
  ) !important;
  border: 2px solid #ffca28 !important;
  text-shadow: white 0px 0px 10px !important;
}

.data-dashboard .subtitle {
  font-weight: 500;
  font-size: 1.4rem;
  margin-bottom: 10px;
}

@media only screen and (max-width: 960px) {
  .data-dashboard .indented {
    margin-left: 0px;
  }
}

.expanded-content {
  padding-bottom: 20px !important;
  padding-top: 20px !important;
  background: rgb(238, 238, 238, 0.5);
}
.v-data-table-header th {
  font-size: 0.9rem !important;
}
.data-dashboard input {
  background-color: transparent !important;
  border-width: 0px !important;
}
.my-data-table tbody .v-chip {
  pointer-events: none;
}
.reset-button-wrapper {
  height: 70px;
}
</style>