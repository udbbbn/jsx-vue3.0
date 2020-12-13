import { ElAside, ElContainer, ElMain, ElMessage } from 'element-plus'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    return () =>
      <>
        <div class="container">
          Hello vue tsx
          <ElContainer>
            <ElAside>
              <div onClick={() => ElMessage.success('test info')}>123</div>
            </ElAside>
            <ElMain>
            </ElMain>
          </ElContainer>
        </div>
      </>
  }
})