<template>
  <div class="container" id="about-page">
    <!-- About -->
    <h1>About</h1>
    <hr class="titlebar" />

    <div class="section">
      <p>
        Under the leadership of City Controller Rebecca Rhynhart, the
        Controller’s Office is committed to increasing transparency for datasets
        of public interest. To that end, this dashboard presents data related to
        asbestos abatement projects in School District buildings. The data is
        provided for informational purposes only in accordance with the office's
        goals of transparency, accountability, and good government.
      </p>
      <p>
        Specifically, this dashboard shows information provided to the City of
        Philadelphia’s Department of Public Health about construction projects
        involving asbestos in School District buildings. In Philadelphia,
        asbestos abatement projects of any size require submission of a
        <a
          href="https://www.phila.gov/media/20181002095145/Asbestos_Abatement_and_Demolition-Renovation_Notification_Form___.pdf"
          target="_blank"
          ><span>notification form</span
          ><i class="ml-1 fas fa-external-link-alt"></i
        ></a>
        to the Public Health Department. The information from these forms is
        available for public download on the City’s
        <a href="http://www.citizenserve.com/philagov" target="_blank"
          ><span>Air Management Services online portal</span
          ><i class="ml-1 fas fa-external-link-alt"></i></a
        >. The dashboard relies on this public information, extracting out data
        for school buildings and mapping the projects across the city. The
        dashboard includes data for projects since 2016 and is updated with new
        projects each day.
      </p>
      <p>
        Asbestos fibers, which were a common building material for insulation
        and fireproofing until a partial ban in 1989, can release harmful dust
        into the air that can cause lung disease and cancer if inhaled. Because
        of its potentially harmful effects, the process of identifying and
        remediating asbestos is heavily regulated by city, state, and federal
        laws.
      </p>

      <div id="learn-more-subsection">
        <div id="learnMoreTitle" class="font-italic font-weight-bold">
          Learn More
        </div>
        <ul>
          <li>
            Background information on asbestos and existing regulations can be
            found on
            <a href="https://www.epa.gov/asbestos" target="_blank"
              ><span>the Environmental Protection Agency’s website.</span
              ><i class="ml-1 fas fa-external-link-alt"></i></a
            >.
          </li>
          <li>
            The School District provides
            <a
              href="https://www.philasd.org/capitalprograms/programsservices/environmental/ahera/"
              target="_blank"
              ><span>information related to asbestos on its website</span
              ><i class="ml-1 fas fa-external-link-alt"></i></a
            >.
          </li>
          <li>
            The City of Philadelphia provides information regarding the
            <a
              href="https://www.phila.gov/services/permits-violations-licenses/apply-for-a-permit/environmental-permits-and-approvals/dust-air-pollution-and-asbestos/apply-for-an-asbestos-project-permit/"
              target="_blank"
              ><span>permit process for asbestos abatement projects</span
              ><i class="ml-1 fas fa-external-link-alt"></i></a
            >, as well as
            <a
              href="https://www.phila.gov/documents/asbestos-documents-and-forms/"
              target="_blank"
              ><span>additional asbestos documents and forms</span
              ><i class="ml-1 fas fa-external-link-alt"></i></a
            >.
          </li>
        </ul>
      </div>
    </div>

    <div id="methods-section" class="section">
      <h2>Data & Methods</h2>
      <hr class="titlebar" />

      <p>
        The raw data for this dashboard is obtained from the “Electronic
        Asbestos Notification Report,” which is publicly available on the
        “Reports” page of the
        <a href="http://www.citizenserve.com/philagov" target="_blank"
          ><span>Air Management Services portal</span
          ><i class="ml-1 fas fa-external-link-alt"></i></a
        >. The raw data is processed for clarity, and projects are matched to a
        list of schools in the Philadelphia School District. The dashboard
        includes data for projects since 2016 and is updated each day
        automatically.
      </p>
      <p>
        Because this dashboard shows data from the City’s notification
        application forms, which are submitted prior to a project's start, the
        "Planned Completeion Date” is an anticipated rather than actual date.
        Furthermore, the "Description” field for each project reflects the
        descriptions listed on the notification form and may not sufficiently
        represent the entirety of asbestos identification and removal work done.
        Finally, the dashboard excludes asbestos projects that occur at
        buildings owned by the School District of Philadelphia that are not
        listed as schools on
        <a
          href="https://www.philasd.org/performance/programsservices/open-data/school-information/"
          target="_blank"
          ><span
            >the "School Information" page on the School District's
            website</span
          ><i class="ml-1 fas fa-external-link-alt"></i></a
        >. This includes bus garages, field houses, and school annex buildings.
      </p>
    </div>

    <div id="asbestos-info-section" class="section">
      <h2>Asbestos Information</h2>
      <hr class="titlebar" />

      <p>
        Below is a list of commonly used acronyms related to asbestos. These
        acronyms are often found in the work descriptions for an individual
        project. This section also includes definitions and additional
        information related to the sizes of asbestos projects. Acronyms and
        definitions are from materials provided by the City’s Public Health
        Department.
      </p>

      <!-- Acronyms -->
      <div id="asbestos-acronyms" style="margin-top: 2rem">
        <h3>Common Acronyms</h3>
        <hr class="titlebar sub" />

        <div class="section" style="margin-top: 1rem">
          <!-- Asbestos Types -->
          <h4>Asbestos Types</h4>
          <ul>
            <li>
              <span class="font-weight-bold">ACM</span>: Asbestos-Containing
              Material
            </li>
            <li>
              <span class="font-weight-bold">ACBM</span>: Asbestos-Containing
              Building Material
            </li>
            <li>
              <span class="font-weight-bold">ACPI</span>: Asbestos-Containing
              Pipe Insulation
            </li>
            <li>
              <span class="font-weight-bold">VAT</span>: Vinyl Asbestos Tiling
            </li>
            <li><span class="font-weight-bold">FRI</span>: Friable Asbestos</li>
          </ul>

          <!-- Units -->
          <h4>Units</h4>
          <ul>
            <li><span class="font-weight-bold">LF</span>: Linear Feet</li>
            <li><span class="font-weight-bold">SF</span>: Square Feet</li>
            <li><span class="font-weight-bold">CF</span>: Cubic Feet</li>
          </ul>

          <!-- Abatement Methods -->
          <h4>Abatement Methods</h4>
          <ul>
            <li><span class="font-weight-bold">REM</span>: Removal</li>
            <li><span class="font-weight-bold">CAP</span>: Encapsulation</li>
            <li><span class="font-weight-bold">CLO</span>: Enclosure</li>
          </ul>
        </div>
      </div>

      <!-- Definitions -->
      <div id="asbestos-definitions">
        <h3>Definitions</h3>
        <hr class="titlebar sub" />

        <div class="section" style="margin-top: 1rem">
          <h4>Asbestos</h4>
          <p>
            <span class="font-weight-bold"
              >Asbestos-Containing Material (ACM)</span
            >: Any material or product that contains more than one percent
            asbestos.
          </p>
          <p>
            <span class="font-weight-bold"
              >Asbestos-Containing Building Material (ACBM)</span
            >: Asbestos-containing material that is found in or on interior
            structural members or other parts of a school building.
          </p>
          <p>
            <span class="font-weight-bold">Friable Asbestos</span>: Material
            that may be crumbled, pulverized, or reduced to powder by hand
            pressure when dry. Friable asbestos-containing material releases
            fibers into the air more readily than nonfriable asbestos-containing
            material.
          </p>
          <p>
            <span class="font-weight-bold">Nonfriable Asbestos</span>: Material
            that, when dry, may not be crumbled, pulverized, or reduced to
            powder by hand pressure.
          </p>
          <p>
            <span class="font-weight-bold">Thermal System Asbestos</span>:
            Interior asbestos-containing material that has been sprayed on,
            troweled on, or otherwise applied to surfaces for acoustical,
            decorative, fireproofing, or other purposes.
          </p>
          <p>
            <span class="font-weight-bold">Surfacing Asbestos</span>: Insulation
            used to control heat transfer or prevent condensation on pipes and
            pipe fittings, boilers, breeching, tanks, ducts, and other parts of
            hot and cold water systems; heating, ventilation, and
            air-conditioning systems; or other mechanical systems.
          </p>
          <p>
            <span class="font-weight-bold">Miscellaneous Asbestos</span>: Other,
            mostly nonfriable, products and materials such as floor tile,
            ceiling tile, construction mastic for floor and ceiling materials,
            sheet flooring, fire doors, asbestos cement pipe and board,
            wallboard, acoustical wall tile, and vibration damping cloth.
          </p>
          <p>
            <span class="font-weight-bold"
              >The Asbestos Hazard Emergency Response Act (AHERA)</span
            >: Federal regulations that require public school districts to
            inspect their schools for asbestos-containing material and prepare
            management plans/take action to prevent or reduce asbestos hazards.
          </p>
          <p>
            <span class="font-weight-bold"
              >National Emission Standards for Hazardous Air Pollutants
              (NESHAP)</span
            >: Emission standards for harmful air polluants, including asbestos,
            set by the federal Environmental Protection Agency.
          </p>
          <p>
            <span class="font-weight-bold"
              >Common types of asbestos-containing material in school buildings
              include</span
            >: flooring, vinyl base, mastic, roofing materials, gaskets in
            heating and air-conditioning equipment, ceiling panels and tiles,
            wallboard, joint compound, plaster, pipe and boiler insulation,
            duct-wrap insulation, duct joint tape, duct vibration dampening
            cloth, fireproofing on structural members, fire brick for boilers,
            fire doors, acoustical spray-on, cement pipes, and panels.
          </p>
        </div>

        <div class="section">
          <h4 id="project-header">Projects</h4>
          <p class="font-italic">
            Sorted from smallest to largest by amount of asbestos material.
          </p>
          <p>
            <span class="font-weight-bold">Incidental Project</span>: Abatement
            of less than 1 linear or 5 square feet.
          </p>
          <p>
            <span class="font-weight-bold">Small Project</span>: Abatement
            greater than or equal to 1 linear or 5 square feet but less than 3
            linear or 12 square feet.
          </p>
          <p>
            <span class="font-weight-bold">Minor Project</span>: Abatement
            greater than or equal to 3 linear or 12 square feet but less than 40
            linear or 80 square feet.
          </p>
          <p>
            <span class="font-weight-bold">Major Project, Permitted</span>:
            Abatement greater than or equal to 40 linear or 80 square feet. A
            Major Project must have a permit approved and issued by the
            Department of Public Health.
          </p>
          <p>
            <span class="font-weight-bold">Major Project, Non-Permitted</span>:
            Any demolition project except single residences with three dwelling
            units or less where there is no asbestos present.
          </p>
          <p>
            <span class="font-weight-bold">NESHAP Project</span>: Abatement
            greater than or equal to 260 linear or 160 square feet.
          </p>
        </div>
      </div>
    </div>

    <!-- Feedback -->
    <div id="limitations-section" class="section">
      <h2>Feedback</h2>
      <hr class="titlebar" />

      <!-- Feedback -->
      <p>
        If you've noticed a bug in this application or have suggestions for how
        to make it better, please send an email to
        <a href="mailto:controller@phila.gov">controller@phila.gov</a> to let us
        know. You can also send
        <a href="https://twitter.com/PhilaController" target="blank_"
          >@PhilaController</a
        >
        a tweet or open up a new
        <a
          href="https://github.com/PhiladelphiaController/AsbestosDashboard/issues"
          target="_blank"
          >GitHub Issue</a
        >.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: [],

  mounted() {
    if (window.FontAwesome) window.FontAwesome.dom.i2svg();
  },
};
</script>

<style>
#learnMoreTitle {
  font-size: 1.1rem;
}
.sub {
  border-top-color: #ef5350 !important;
  padding-bottom: 10px !important;
}
#notes-title {
  font-weight: bold;
  font-size: 1.5rem;
}
.section:last-of-type {
  margin-bottom: 2rem;
}
#about-page .titlebar {
  max-width: 150px !important;
}
#about-page h1 {
  margin-bottom: 0.5rem;
}
#about-page h2 {
  margin-bottom: 0.5rem;
  margin-top: 2rem !important;
}
#about-page h3 {
  margin-bottom: 0.5rem;
}
#about-page h4 {
  margin-bottom: 1rem !important;
  margin-top: 1rem !important;
}
#project-header {
  margin-top: 2rem !important;
}
.url-break {
  word-wrap: break-word;
}

#about-page {
  text-align: left;
}

.indented {
  margin-left: 50px;
  font-style: italic;
}

#about-page ul {
  margin-left: 0.5rem;
}

#about-page a {
  color: #2176d2 !important;
}
#about-page a:hover {
  text-decoration: underline;
}
.fa-external-link-alt {
  color: #2176d2 !important;
}
.fa-external-link-alt:hover {
  color: #2176d2 !important;
}
</style>