<template>
  <div class="header-message-wrapper w-100">
    <!-- Title -->
    <div class="header-message pl-2 pr-2">
      <div>Asbestos in the Philadelphia School District</div>
      <v-divider class="my-divider mt-3" />
    </div>

    <!-- Submessage -->
    <div class="header-submessage pl-5 pr-5">
      <p>
        This app maps asbestos abatement projects in the Philadelphia School
        District since 2016.
      </p>
      <p>
        The size of the <span style="color: #ef5350">circles</span> indicates
        the number of projects at a particular school.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  name: "HeaderMessage",
};
</script>

<style>
.header-message-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.header-message {
  font-size: 3rem;
  font-weight: 500;
  line-height: 1.1;
  font-family: Montserrat, sans-serif;
  text-align: center;
}

.header-message p:nth-child(2) {
  margin-top: 50px;
}

.header-submessage {
  font-size: 2rem;
  font-weight: 300;
  line-height: 1.2;
  font-family: Montserrat, sans-serif;
  margin-top: 30px;
  max-width: 800px;
  text-align: center;
}
.header-submessage:nth-child(3) {
  margin-top: 50px;
}
@media only screen and (max-width: 767px) {
  .header-submessage {
    font-size: 1.6rem;
    margin-top: 50px;
    text-align: center;
    line-height: 1.5;
  }
  .header-message {
    text-align: center;
    font-size: 2.7rem;
  }
}
</style>