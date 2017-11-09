module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer')({
        browsers: [
            "> 1%",
            "last 5 versions",
            "ie 6"
        ]
    }),
  ]
};
