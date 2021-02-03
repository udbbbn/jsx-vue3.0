import { ElAside, ElContainer, ElMain, ElMessage } from 'element-plus'
import { defineComponent } from 'vue'
import FlyCard from './components/flyCard'
import Logo from './assets/logo.png'
import Cat from './assets/cat.jpg'
import Avatar from './assets/24448345.jpeg'

export default defineComponent({
    name: 'App',
    setup() {
        return () => (
            <div class="container">
                <ElContainer>
                    <ElAside>
                        <div onClick={() => ElMessage.success('test info')}>123</div>
                    </ElAside>
                    <ElMain>
                        <FlyCard cardImgArray={[Avatar, Logo, Cat]}></FlyCard>
                    </ElMain>
                </ElContainer>
            </div>
        )
    }
})
