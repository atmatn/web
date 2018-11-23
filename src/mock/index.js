import Mock from 'mockjs'

var getWelcomeMsg = function getWelcomeMsg ({ url, type, body }) {
  return {
    msg: 'mock hello world!'
  }
}

var getDataTree = function getDataTree ({ url, type, body }) {
  // 注意：
  //   product 只有 “visible_perms”，没有 “executable_perms”
  //   folder 只有 executable_perms”，没有 “visible_perms”
  //   args-script 只有 executable_perms”，没有 “visible_perms”

  return {
    treeNodes: [
      {
        type: 'product',
        id: 1,
        title: '有道精品课',
        visible_perms: ['ke_general'], // product的perms是“可见”权限，有该权限则所有子节点可见
        currentUserVisible: true, //  （后端计算出的属性）当前用户是否有“可见”权限
        children: [
          {
            type: 'folder',
            id: 15,
            title: '链接',
            currentUserExecutable: true,
            executable_perms: ['ke_general'], // （后端计算出的属性，如果没有配置，会直接拷贝product的visible_perms）folder的perms是“执行”权限；前端可以提示用户，需要该权限（之一）才能执行
            children: [
              {
                type: 'direct-link',
                id: 16,
                title: 'KPI数据',
                currentUserExecutable: true,
                executable_perms: ['ke_general'], // （后端计算出的属性，如果没有配置，会直接拷贝product的visible_perms）folder的perms是“执行”权限；前端可以提示用户，需要该权限（之一）才能执行
                linkUrl: 'http://analyzer2.corp.youdao.com/'
              },
              {
                type: 'direct-link',
                id: 17,
                title: '绝密KPI数据',
                currentUserExecutable: false,
                executable_perms: ['ke_core'] // （后端计算出的属性，如果没有配置，会直接拷贝product的visible_perms）folder的perms是“执行”权限；前端可以提示用户，需要该权限（之一）才能执行
                // （后端剥离掉的数据）用户没有执行权限，则后端不提供对应的linkUrl
                // linkUrl: '/xxx.html',
              }
            ]
          },
          {
            type: 'folder',
            id: 5,
            title: '财务',
            executable_perms: ['ke_financial'], // （后端计算出的属性，如果没有配置，会直接拷贝product的visible_perms）folder的perms是“执行”权限；前端可以提示用户，需要该权限（之一）才能执行
            children: [
              {
                type: 'args-script',
                id: 8,
                title: '高中概要数据',
                currentUserExecutable: true, // （后端计算出的属性）当前用户是否有“执行”权限
                executable_perms: ['ke_financial'], // （后端计算出的属性，如果没有配置，会直接拷贝folder的executable_perms）args-script的perms是“执行”权限；前端可以提示用户，需要该权限（之一）才能执行
                scriptId: '123',
                scriptParams: {
                  param_a: 1,
                  param_b: 2
                }
              },
              {
                type: 'args-script',
                id: 9,
                title: '实用英语概要数据',
                currentUserExecutable: false, // （后端计算出的属性）当前用户是否有“执行”权限
                executable_perms: ['ke_chief_financial'] // （后端计算出的属性）args-script的perms是“执行”权限；前端可以提示用户，需要该权限才能执行
                // （后端剥离掉的数据）用户没有执行权限，则后端不提供对应的scriptId和params
                // scriptId: '123',
                // scriptParams: {
                //   param_a: 3,
                //   param_b: 4
                // }
              }
            ]
          },
          {
            type: 'folder',
            id: 6,
            title: '市场',
            children: [
              {
                type: 'args-script',
                id: 10,
                title: 'Android端回访情况',
                currentUserExecutable: true, // （后端计算出的属性）
                executable_perms: ['ke_chief_financial'], // （后端计算出的属性）args-script的perms是“执行”权限；前端可以提示用户，需要该权限才能执行
                scriptId: '456',
                scriptParams: {
                  param_a: 4,
                  param_b: 5
                }
              }
            ]
          },
          {
            type: 'folder',
            id: 7,
            title: '小工具',
            currentUserExecutable: true, // （后端计算出的属性）
            executable_perms: ['ke_general'], // （后端计算出的属性）
            children: [
              // 空的
            ]
          }
        ]
      },
      {
        type: 'product',
        id: 2,
        title: '有道云笔记',
        visible_perms: ['ynote_general'], // product的perms是“可见”权限，有该权限则所有子节点可见
        currentUserVisible: false //  （后端计算出的属性）当前用户是否有“可见”权限
      }
    ]
  }
}
Mock.mock(/\/getWelcomeMsg/, 'get', getWelcomeMsg)

Mock.mock(/\/api\/data-tree/, 'get', getDataTree)

Mock.setup({
  timeout: 0
})

export default Mock
