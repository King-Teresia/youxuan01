// 在这里详细的配置 路由的路径


//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
    {
        path: '/login',
        name: 'login',//name的意义是 到时候 用来做路由权限用的 
        component: () => import('@/realviews/login/index.vue'),
        meta: {
            title: "登陆",
            hidden: true,//隐藏设置
            icon: 'SwitchButton'
        }
    },
    {
        path: "/404",
        name: "404",
        component: () => import('@/realviews/404/index.vue'),
        meta: {
            title: "404出错了",
            hidden: true,//隐藏设置
            icon: 'Histogram'
        }
    },

    // 这块我感觉视频里的老师 是想做 之前类似于node项目里的 mainbox (还真是)
    {
        path: '/',
        name: 'layout',
        redirect: "/home",//这里的home路由只是作为子路由显示，路径上和layout没关系
        component: () => import('@/layout/index.vue'),
        meta: {
            // title: "layout",
            title: "",
            hidden: false,//隐藏设置
            // icon: 'ChatRound'
            icon: ''


        },
        children: [
            {
                path: "/home",
                component: () => import('@/realviews/home/index.vue'),
                meta: {
                    title: "首页",
                    hidden: false,//隐藏设置
                    icon: 'HomeFilled'
                }
            },
            // {
            //     path: "/hi",
            //     component: () => import('@/realviews/home/index.vue'),
            //     meta: {
            //         title: "嗨嗨嗨",
            //         hidden: false,//隐藏设置
            //         icon: 'ChatLineSquare'

            //     },
            //     // 测试一下再添加两个 "孙子路由" 会怎样 (递归nb)
            //     children: [
            //         {
            //             path: "/123",
            //             component: () => import('@/realviews/home/index.vue'),
            //             meta: {
            //                 title: "123"
            //             }
            //         },
            //         {
            //             path: "/456",
            //             component: () => import('@/realviews/home/index.vue'),
            //             meta: {
            //                 title: "456"
            //             }
            //         }
            //     ]
            // }
        ]

    },
    {
        path: "/screen",
        name: "Screen",
        component: () => import('@/realviews/screen/index.vue'),
        meta: {
            title: "数据大屏",
            hidden: false,//隐藏设置 ！！！！！！！！！！！！！！！！！其实这个hidden：false不用写也没事，因为你不写 他就是undefined 也就是false
            icon: 'ZoomOut'
        }
    },
]







//异步路由
export const asnycRoute = [
    {
        path: "/acl",
        name: "Acl",
        component: () => import('@/layout/index.vue'),
        redirect: "/acl/user",
        meta: {
            title: "权限管理",
            icon: 'Lock'
        },
        children: [
            {
                path: "/acl/user",
                name: "User",
                component: () => import('@/realviews/acl/user/index.vue'),
                meta: {
                    title: "用户管理",
                    hidden: false,//隐藏设置
                    icon: 'User'


                }
            }, {
                path: "/acl/role",
                name: "Role",
                component: () => import('@/realviews/acl/role/index.vue'),
                meta: {
                    title: "角色管理",
                    hidden: false,//隐藏设置
                    icon: 'UserFilled'


                }
            }, {
                path: "/acl/permission",
                name: "Permission",
                component: () => import('@/realviews/acl/permission/index.vue'),
                meta: {
                    title: "菜单管理",
                    hidden: false,//隐藏设置
                    icon: 'Monitor'


                }
            },
        ]
    },
    {
        path: "/product",
        name: "Product",
        component: () => import('@/layout/index.vue'),
        redirect: "/product/trademark",
        meta: {
            title: "产品管理",
            icon: 'Goods'
        },
        children: [
            {
                path: "/product/trademark",
                name: "Trademark",
                component: () => import('@/realviews/product/trademark/index.vue'),
                meta: {
                    title: "品牌管理",
                    icon: 'ShoppingCartFull',
                }
            }, {
                path: "/product/attr",
                name: "Attr",
                component: () => import('@/realviews/product/attr/index.vue'),
                meta: {
                    title: "属性管理",
                    icon: 'ChromeFilled',
                }
            }, {
                path: "/product/sku",
                name: "Sku",
                component: () => import('@/realviews/product/sku/index.vue'),
                meta: {
                    title: "SKU管理",
                    icon: 'Calendar',
                }
            }, {
                path: "/product/spu",
                name: "Spu",
                component: () => import('@/realviews/product/spu/index.vue'),
                meta: {
                    title: "SPU管理",
                    icon: 'Orange',
                }
            },
        ]
    }

]







// 任意路由
export const anyRoute = {
    path: "/:pathMatch(.*)*", //未匹配到上面这仨的 (任意其他路径)都会走这里
    name: "Any",
    redirect: "/404",
    meta: {
        title: "任意路由",
        hidden: true,//隐藏设置
        icon: 'DataLine'
    }

}

