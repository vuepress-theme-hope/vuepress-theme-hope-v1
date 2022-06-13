import AutoLink from "@theme/components/AutoLink";
import NavScreenDropdown from "@theme/components/Navbar/NavScreenDropdown.vue";
import { navbarMixin } from "@theme/mixins/navbar";

export default navbarMixin.extend({
  name: "NavScreenLinks",

  components: {
    AutoLink,
    NavScreenDropdown,
  },
});
