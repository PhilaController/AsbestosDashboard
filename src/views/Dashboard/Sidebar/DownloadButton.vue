<template>
  <v-dialog v-model="downloadDialog" width="500" class="download-dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        id="download-data-button"
        class="ml-5 mr-5"
        outlined
        :ripple="false"
        v-bind="attrs"
        v-on="on"
      >
        <i class="fas fa-download"></i
        ><span class="ml-3">Download Data</span></v-btn
      >
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Download Data
      </v-card-title>

      <v-card-text>
        <!-- Selection -->
        <v-radio-group
          class="mt-5"
          label="Data Selection"
          v-model="selectionRadio"
          row
          hide-details
        >
          <v-radio
            v-for="(item, i) in selectionGroups"
            :key="item"
            :label="item"
            :value="i"
          ></v-radio>
        </v-radio-group>
      </v-card-text>

      <v-divider class="my-divider"></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :ripple="false" text @click="downloadData">
          Download
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { downloadFile, jsonToCSV } from "@/tools";
import { OUTPUT_COLUMNS } from "@/data-dict";

export default {
  props: ["data", "filteredData"],
  data() {
    return {
      expandedPanels: [],
      downloadDialog: false,
      selectionRadio: 0,
      selectionGroups: ["Current Selection", "All Data"],
      columnHeaders: OUTPUT_COLUMNS,
    };
  },
  watch: {
    downloadDialog(value) {
      if (value == false) {
        this.selectionRadio = 0;
      }
    },
  },
  methods: {
    downloadData() {
      // Determine the content to download
      let data = this.selectionRadio == 0 ? this.filteredData : this.data;

      //  Download specifics
      let fileName, contentType, content;

      //   CSV
      content = jsonToCSV(data, this.columnHeaders);
      fileName = `school-district-asbestos-download.csv`;
      contentType = "text/plain";

      // Download it
      downloadFile(content, contentType, fileName);

      // Reset and close the dialog
      this.downloadDialog = false;
    },
  },
};
</script>
