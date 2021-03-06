import { compareSync } from "bcrypt-ts";
import { encryptBaseMixin } from "@theme/mixins/encrypt";
import { getPathMatchedKeys } from "@theme/utils/encrypt";

import type { EncryptOptions } from "@theme/types";

export const pathEncryptMixin = encryptBaseMixin.extend({
  data: () => ({
    encryptPasswordConfig: {} as Record<string, string>,
  }),

  computed: {
    pathEncryptMatchKeys(): string[] {
      return getPathMatchedKeys(this.encryptOptions, this.$route.path);
    },

    isPathEncrypted(): boolean {
      if (this.pathEncryptMatchKeys.length === 0) return false;

      const { config } = this.encryptOptions as Required<EncryptOptions>;

      // none of the password matches
      return this.pathEncryptMatchKeys.every((key) => {
        const keyConfig = config[key];
        const hitPasswords =
          typeof keyConfig === "string" ? [keyConfig] : keyConfig;

        return (
          !this.encryptPasswordConfig[key] ||
          hitPasswords.every(
            (encryptPassword) =>
              !compareSync(this.encryptPasswordConfig[key], encryptPassword)
          )
        );
      });
    },
  },

  mounted(): void {
    const passwordConfig = localStorage.getItem("encryptConfig");

    if (passwordConfig)
      this.encryptPasswordConfig = JSON.parse(passwordConfig) as Record<
        string,
        string
      >;
  },

  methods: {
    checkPathPassword(password: string): void {
      const { config } = this.$themeConfig.encrypt as Required<EncryptOptions>;

      for (const hitKey of this.pathEncryptMatchKeys) {
        const hitPassword = config[hitKey];
        const hitPasswordList =
          typeof hitPassword === "string" ? [hitPassword] : hitPassword;

        // some of the password matches
        if (
          hitPasswordList.filter((encryptPassword) =>
            compareSync(password, encryptPassword)
          )
        ) {
          this.$set(this.encryptPasswordConfig, hitKey, password);
          localStorage.setItem(
            "encryptConfig",
            JSON.stringify(this.encryptPasswordConfig)
          );

          break;
        }
      }
    },
  },
});
