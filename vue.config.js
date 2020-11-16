/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Syntha
  Author: Christopher Breland
  Author Email: SeaBreez7890@gmail.com
==========================================================================================*/


module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
  // devServer: {
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   }
  // }
}

