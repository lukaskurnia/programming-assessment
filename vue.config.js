module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/programming-assessment/" : "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `            
            @import "@/styles/setup/variable.scss";
          `,
      },
    },
  },
};
