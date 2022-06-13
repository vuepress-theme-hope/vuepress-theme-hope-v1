import AutoLink from "@theme/components/AutoLink";
import DropdownLink from "@theme/components/Navbar/DropdownLink.vue";
import { navbarMixin } from "@theme/mixins/navbar";

export default navbarMixin.extend({
  name: "NavbarLinks",

  components: {
    AutoLink,
    DropdownLink,
  },
});
