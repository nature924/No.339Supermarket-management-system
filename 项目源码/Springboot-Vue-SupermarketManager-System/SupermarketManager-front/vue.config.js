/*
 * @Description: 
 * @Author: cow.horse
 * @Date: 2023-09-07 20:58:35
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports={
  devServer:{
    host:"localhost",
    port: 9292
  },
}

