import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
    console.log(123456789);

    //获取对应的用户仓库
    //全局自定义指令:实现按钮的权限
    app.directive('has', {
        //代表使用这个全局自定义指令的DOM或者是组件 挂载完毕的时候会执行一次
        mounted(el: any, options: any) {

            // console.log(el);//el是使用这个全局指令的dom元素 就是 product/trademark/index里的el-button
            // console.log(options);//option就是配置项 ， 而我们要的btn.Trademark.add 就能在配置项里拿到

            // console.log(userStore.buttons);

            //自定义指令右侧的数值:如果在用户信息buttons数组当中没有 就从DOM树上干掉
            if (!userStore.buttons.includes(options.value)) {
                el.parentNode.removeChild(el)//这个是原生dom发方法
            }
        },
    })
}
