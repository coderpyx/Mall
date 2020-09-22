// pages/home/childCpns/recommend/recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends:{
      type:Array,
      value:[]
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad:false

  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageLoad() {
      // console.log('图片记载完成');
      // 图片加载完后，发射事件,只需发射一次
      if(!this.data.isLoad) {
        console.log('图片记载完成');
        this.triggerEvent('imageLoad')
        this.data.isLoad = true

      }

    }

  }
})
