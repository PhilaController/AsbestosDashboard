<template>
  <div id="mapContainer" style="position: relative">
    <!-- Base map -->
    <l-map
      :options="mapOptions"
      :zoom="zoom"
      :center="center"
      ref="map"
      class="map-pane"
    >
    </l-map>

    <!-- Popup data table -->
    <v-dialog id="popup-data-table" v-model="dialog" scrollable>
      <v-card elevation="0" v-if="selectedData !== null">
        <!-- Close button -->
        <div class="w-100 d-flex justify-content-end p-3">
          <div id="dialogButtonsWrapper" class="d-flex flex-column">
            <v-btn
              id="dialogCloseButton"
              @click="handleDialogClose"
              outlined
              :ripple="false"
            >
              Close
            </v-btn>
            <v-btn
              id="dialogDownloadButton"
              class="mt-2"
              outlined
              :ripple="false"
              @click="downloadData"
            >
              <i class="fas fa-download"></i
              ><span class="ml-3">Download Data</span></v-btn
            >
          </div>
        </div>

        <!-- Card title -->
        <div class="m-3 m-md-5">
          <div class="popup-data-table-header">
            <div class="d-flex flex-column">
              <div class="header">{{ clickedSchool.school_name }}</div>
              <hr class="my-divider" />
            </div>
            <div class="line" v-if="clickedSchool.school_website">
              <a :href="clickedSchool.school_website" target="_blank"
                >Website<i class="ml-1 fas fa-external-link-alt"></i
              ></a>
            </div>
            <div class="line">
              <span class="font-weight-bold">Address: </span
              >{{ clickedSchool.school_address }}
            </div>
            <div class="line">
              <span class="font-weight-bold">Level: </span>
              {{ getAlias(clickedSchool.school_level, "school_level") }}
            </div>
            <div class="line" v-if="clickedSchool.year_opened">
              <span class="font-weight-bold">Year Opened: </span
              >{{ clickedSchool.year_opened }}
            </div>
            <div class="line" v-if="clickedSchool.year_closed">
              <span class="font-weight-bold">Year Closed: </span
              >{{ clickedSchool.year_closed }}
            </div>
          </div>

          <!-- Data table -->
          <DataTable :data="selectedData" />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// External
import $ from "jquery";

// Leaflet
import L from "leaflet";
import * as Vue2Leaflet from "vue2-leaflet";
import "leaflet.heat";
const esri = require("esri-leaflet");

// Local
import DataTable from "./DataTable";
import { downloadFile, jsonToCSV } from "@/tools";
import { OUTPUT_COLUMNS, ALIASES } from "@/data-dict";

export default {
  components: {
    "l-map": Vue2Leaflet.LMap,
    "l-geo-json": Vue2Leaflet.LGeoJson,
    DataTable,
  },
  props: ["schoolGeojson", "schoolCounts", "selectedData", "selectedSchool"],
  data() {
    return {
      searchFilter: "",
      clickedSchool: null,
      dialog: false,
      mapOptions: {
        maxZoom: 16,
        minZoom: 11,
        zoomControl: false,
        scrollWheelZoom: false,
      },
      zoom: 12,
      center: [39.9854507, -75.15],
      homeBounds: null,
      layers: {},
      panes: {},
      circle: { radius: 6, color: "#7ab5e5" },
      markerOptions: {
        radius: 8,
        fillColor: "#25cef7",
        color: "#25cef7",
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.5,
      },
    };
  },
  computed: {
    /* Length of the GeoJSON data */
    lengthGeojson() {
      return this.geojson.length;
    },
    /* The Leaflet Map object */
    mapObject() {
      return this.$refs.map.mapObject;
    },
    pointToLayerFunction() {
      return (feature, latlng) => {
        return L.circleMarker(latlng, this.styleFunction(feature));
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        // Bind the popup to the layer
        layer.bindTooltip(this.getTooltipText(feature), {
          permanent: false,
          sticky: true,
          opacity: 1.0,
          interactive: true,
        });

        // Highlight on mouseover
        layer.on({
          mouseover: this.highlightFeature,
          mouseout: this.resetHighlight,
          click: this.handleBubbleClick,
        });
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      // the leaflet basemap
      let map = this.mapObject;

      // set zoom home bounds
      this.homeBounds = map.getBounds();

      //add zoom control with your options
      L.control
        .zoom({
          position: "topright",
        })
        .addTo(map);

      // add a home button to the control bar
      let button =
        $(`<a class="leaflet-control-zoom-in" title="Recenter Map" role="button" aria-label="Recenter Map">
        <i class="fa fa-home" aria-hidden="true"></i>
        </a>`);
      button.on("click", this.zoomHome);
      $("#mapContainer .leaflet-control-zoom").append(button);

      // convert to svg
      if (window.FontAwesome) window.FontAwesome.dom.i2svg();

      // Add ArcGIS Online basemap
      esri
        .basemapLayer("Gray", {
          detectRetina: false,
        })
        .addTo(map);

      // Add city limits
      this.layers.cityLimits = esri
        .featureLayer({
          url: "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/City_Limits/FeatureServer/0",
          style: () => {
            return { fill: false, color: "#666", weight: 4 };
          },
        })
        .addTo(map);

      map.getPane("overlayPane").style.zIndex = 1400;
    });
  },
  watch: {
    schoolCounts(nextValue) {
      if (nextValue) {
        let map = this.mapObject;
        let layer = this.layers.schoolCounts;

        if (layer) map.removeLayer(layer);

        this.layers.schoolCounts = L.geoJSON(this.schoolGeojson, {
          onEachFeature: this.onEachFeatureFunction,
          pointToLayer: this.pointToLayerFunction,
        }).addTo(this.mapObject);

        if (this.selectedSchool) {
          // Figure out the index of the selected school
          this.layers.schoolCounts.eachLayer((layer) => {
            let selected = layer.feature;
            if (selected.properties.school_name === this.selectedSchool) {
              let coords = selected.geometry.coordinates;
              this.mapObject.flyTo([coords[1], coords[0]], 13);
            }
          });
        } else this.zoomHome();
      }
    },
  },
  methods: {
    getAlias(value, kind) {
      let out = ALIASES[kind];
      if (out) {
        return out[value] || value;
      } else {
        return value;
      }
    },
    downloadData() {
      //  Download specifics
      let fileName, contentType, content;

      //   CSV
      content = jsonToCSV(this.selectedData, OUTPUT_COLUMNS);
      fileName = `school-district-asbestos-download.csv`;
      contentType = "text/plain";

      // Download it
      downloadFile(content, contentType, fileName);
    },
    handleDialogClose() {
      this.$emit("map-click", null);
      this.dialog = false;
    },
    /* Tooltip text for bubbles */
    getTooltipText(feature) {
      // School name
      let school = feature.properties.school_name;
      let count = this.schoolCounts.get(feature.properties.school_name);

      let text = `<div class="tooltip-title">${school}</div>`;
      if (count > 1) {
        text += `<div class="tooltip-line text-center">${count} projects</div>`;
      } else
        text += `<div class="tooltip-line text-center">${count} project</div>`;

      text += `<div id='clickMoreInfo' class="tooltip-line text-center font-italic mt-5">Click for more info</div>`;

      // Create an element to hold all your text and markup
      let container = $("<div />");

      // Delegate all event handling for the container itself and its contents to the container
      container.on("click", "#clickMoreInfo", (e) => {
        e.preventDefault();
        this.clickedSchool = feature.properties;
        this.dialog = true;
        this.$nextTick(() => {
          this.$emit("map-click", this.clickedSchool.school_name);
        });
      });

      // Insert whatever you want into the container, using whichever approach you prefer
      container.html(text);

      // Insert the container into the popup
      return container[0];
    },
    /* Style function for bubble chart */
    styleFunction(feature) {
      // Red and lighter red
      let fillColor = "#EF5350";
      let edgeColor = "#B71C1C";

      // Set radius of point
      let size = this.schoolCounts.get(feature.properties.school_name) || 0;

      // Default
      let opacity = 0.8,
        weight = 1,
        fillOpacity = 0.5;

      // Hide these!
      if (
        (size == 0) |
        ((this.selectedSchool !== null) &
          (this.selectedSchool !== feature.properties.school_name))
      ) {
        opacity = 0;
        fillOpacity = 0;
        weight = 0;
      }
      return {
        radius: 4 * size ** 0.5,
        fillColor: fillColor,
        color: edgeColor,
        weight: weight,
        opacity: opacity,
        fillOpacity: fillOpacity,
      };
    },
    /* Style function for highlighting */
    highlightFeature(e) {
      let layer = e.target;
      let fillColor = "#039BE5";
      let edgeColor = "#01579B";

      layer.setStyle({
        fillColor: fillColor,
        color: edgeColor,
        fillOpacity: 0.9,
      });
    },

    /* Reset on mouseout */
    resetHighlight(e) {
      let layer = e.target;
      layer.setStyle(this.styleFunction(layer.feature));
    },

    /* When a bubble is clicked, show the pop-up data table*/
    handleBubbleClick(e) {
      // Stop propagation
      L.DomEvent.stopPropagation(e);

      // Not a touch screen
      if (matchMedia("(pointer:fine)").matches) {
        // Set the clicked school
        this.clickedSchool = e.target.feature.properties;

        // Open the dialog
        this.dialog = true;
        this.$emit("map-click", this.clickedSchool.school_name);
      }
    },

    /* Zoom home */
    zoomHome() {
      this.mapObject.flyToBounds(this.homeBounds);
    },
  },
};
</script>

<style>
.v-dialog {
  background-color: white !important;
}

#mapContainer {
  flex: 1 1;
  display: flex;
}
.map-pane {
  flex: 1;
  height: 800px !important;
  z-index: 1 !important;
}

@media only screen and (max-width: 767px) {
  .map-pane {
    height: 500px !important;
  }
  #dialogButtonsWrapper {
    width: 100%;
  }
  #clickMoreInfo {
    text-decoration: underline;
  }
}
/* Zoom control */
.fa-home {
  color: #000;
}

.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
  color: #000 !important;
}

/* tooltip */
.tooltip-line {
  border-bottom: 1px solid #f0f0f0;
}
.tooltip-line td {
  padding: 0 7px 0 7px;
  text-align: center;
}
.leaflet-tooltip {
  padding: 10px;
  font: 1rem sans-serif;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #cdcdcd;
  opacity: 1;
  display: block;
  max-width: 400px;
  min-width: 200px;
  pointer-events: auto !important;
}
.tooltip-title {
  margin-bottom: 5px;
  border-bottom: 1px solid #cdcdcd;
  text-align: center;
  font-weight: bold;
  padding-bottom: 5px;
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
}
.leaflet-tooltip-pane {
  z-index: 1500 !important;
}

.popup-data-table-header {
  font-size: 1rem;
}

.popup-data-table-header hr {
  max-width: 200px !important;
  margin-left: 0 !important;
}
.popup-data-table-header .header {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.data-table {
  margin-top: 0rem !important;
}
</style>


