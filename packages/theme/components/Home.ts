import Vue from "vue";
import HomeFeatures from "@theme/components/HomeFeatures.vue";
import HomeHero from "@theme/components/HomeHero.vue";
import MyTransition from "@theme/components/MyTransition.vue";

export default Vue.extend({
  name: "Home",

  components: { HomeFeatures, HomeHero, MyTransition },
});
