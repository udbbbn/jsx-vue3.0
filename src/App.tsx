import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    return () =>
      <>
        <div class="container">
          Hello vue tsx
        </div>
      </>
  }
})