import { ElAside, ElContainer, ElMain, ElMessage } from 'element-plus'
import { defineComponent, h, reactive, ref } from 'vue'
import FlyCard from './components/flyCard/flyCard'
import Logo from './assets/logo.png'
import Keji from './assets/keji.jpg'
import Napolun from './assets/napolun.jpg'
import Cat from './assets/cat.jpg'
import Avatar from './assets/24448345.jpeg'

export default defineComponent({
    name: 'App',
    setup() {
        const defaultImgs = [Avatar, Keji, Cat, Napolun]
        const flyCardArr = ref([...defaultImgs])

        function loadFlyCardImg() {
            return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    flyCardArr.value.push(...[Cat, Napolun, Keji, Avatar])
                    resolve()
                }, 3000)
            })
        }

        return () => (
            <div class="container">
                {/* <ElContainer>
                    <ElAside>
                        <div onClick={() => ElMessage.success('test info')}>123</div>
                    </ElAside>
                    <ElMain>
                    </ElMain>
                </ElContainer> */}
                <FlyCard moreLoading cardImgArray={[...flyCardArr.value]} remainNum={3} remainCallBack={loadFlyCardImg}></FlyCard>
            </div>
        )
    }
})
