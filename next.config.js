// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "app/styles")],
  },
  images: {
    domains: ['ipfs.infura.io'],
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
};
