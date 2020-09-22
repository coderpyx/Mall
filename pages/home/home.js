// pages/home/home.js
import {getMultiData,getHomeGoods} from "../../service/home"

const types = ['pop','new','sell']
const Top = 1000
Page({
  data: {
    banners:[],
    recommends:[],
    titles:['流行','新款','精选'],
    goods:{
      pop:{page:0 ,list:[]},
      new:{page:0 ,list:[]},
      sell:{page:0 ,list:[]}
    },
    // 记录默认选中的是第一个
    currentType:'pop',
    // 默认不显示回到顶部按钮
    showBackTop:false,
    isFixed:false,
    tabScrollTop:0,

  },
  onLoad: function (options) {

    // 1.获取轮播图数据
    this._getMultiData()
    // 2.获取商品数据
    this._getHomeGoods('pop')
    this._getHomeGoods('new')
    this._getHomeGoods('sell')
  },

  // -----------------网络请求函数---------------------
  _getMultiData() {
    getMultiData().then(res => {
      // console.log(res);
      const data = res.data.data;
      // 轮播图数据
      const banners = data.banner.list;
      // 推荐数据
      const recommends = data.recommend.list;
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getHomeGoods(type) {
    const page = this.data.goods[type].page + 1
    // 发送网络请求
    getHomeGoods(type,page).then(res=> {
      // console.log(res);
      // 取出商品数据
      const list = res.data.data.list;
      // 商品列表放入对应的列表项中
      // 不能直接修改goods里list 的数据
      const oldList = this.data.goods[type].list;
      oldList.push(...list);

      // 将数据设置到data 到goods中
      const typekey = `goods.${type}.list`;
      const pagekey = `goods.${type}.page`;
      this.setData({
        [typekey]: oldList,
        [pagekey]: page
      })
    })
  },
  //------------事件监听函数------------------
  TabClick(event) {
    const index = event.detail.index;
    // console.log(index);
    // 设置currentType
    this.setData({
      currentType:types[index]
    })
  },
  // 页面滚动到底部回调
  onReachBottom() {
    // console.log('滚到底部了');
    // 上拉请求更多数据
    this._getHomeGoods(this.data.currentType)
  },
  // 页面滚动事件监听
  onPageScroll(options) {
    // console.log(options);
    const scrollTop = options.scrollTop
    // 修改显示
    // 防抖操作，当flag不发生变化时，不频繁调用setData
    const flag = scrollTop >=Top
    if(flag !=this.data.showBackTop) {
      this.setData({
        showBackTop:flag
      })
    }
    const flag1 = scrollTop >= this.data.tabScrollTop
    if(flag1 !=this.data.isFixed) {
      this.setData({
        isFixed:flag1
      })
    }
    
  },
  imageLoad() {
    // console.log("图片加载了");
    // 获知图片加载后，计算tab-control到顶部的真实高度
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  }
})