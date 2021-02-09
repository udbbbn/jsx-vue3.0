import { ElAside, ElContainer, ElMain, ElMessage } from 'element-plus'
import { defineComponent, h } from 'vue'
import FlyCard from './components/flyCard/flyCard'
import Logo from './assets/logo.png'
import Keji from './assets/keji.jpg'
import Napolun from './assets/napolun.jpg'
import Cat from './assets/cat.jpg'
import Avatar from './assets/24448345.jpeg'

export default defineComponent({
    name: 'App',
    setup() {
        return () => (
            <div class="container">
                {/* <ElContainer>
                    <ElAside>
                        <div onClick={() => ElMessage.success('test info')}>123</div>
                    </ElAside>
                    <ElMain>
                    </ElMain>
                </ElContainer> */}
                <FlyCard cardImgArray={[Avatar, Keji, Cat, Napolun]}></FlyCard>
            </div>
        )
    }
})
