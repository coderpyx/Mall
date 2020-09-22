import request from "./network"

export function getMultiData() {
  return request({
    url:  "/home/multidata",
  })
}

// 获取首页商品数据
export function getHomeGoods(type, page) {
  return request({
    url:'home/data',
    data:{
      type,
      page
    }
  })
}

