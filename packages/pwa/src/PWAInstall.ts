import { Component, Vue } from "vue-property-decorator";
import PWAInstallModal from "./PWAInstallModal.vue";
import { SafariNavigator } from "./PWAInstallModal";

interface ModernNavigator extends Navigator {
  getInstalledRelatedApps: () => Promise<unknown[]>;
}

@Component({ components: { PWAInstallModal } })
export default class PWAInstall extends Vue {
  canInstall = false;
  hasRelatedApps = false;
  isOpen = false;

  get install(): string {
    return PWA_I18N[this.$localePath || "/"].install;
  }

  get isIOS(): boolean {
    return (
      "standalone" in navigator &&
      (navigator as SafariNavigator).standalone === false
    );
  }

  get showInstall(): boolean {
    return this.hasRelatedApps && this.canInstall;
  }

  mounted(): void {
    if ("getInstalledRelatedApps" in navigator)
      void (navigator as ModernNavigator)
        .getInstalledRelatedApps()
        .then((result) => {
          this.hasRelatedApps = result.length > 0;
        });
  }

  getInstalledStatus(): boolean {
    if ((navigator as SafariNavigator).standalone)
      return (navigator as SafariNavigator).standalone;

    return matchMedia("(display-mode: standalone)").matches;
  }
}
