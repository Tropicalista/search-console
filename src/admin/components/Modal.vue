<template id="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-on-clickaway="clickAway">
          <slot name="header">Header</slot>
          <div class="modal-content">
            <slot name="body">Header</slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">Header</slot>
          </div>
        </div>
      </div>
    </div>
</template>



<script>
import { directive as onClickaway } from 'vue-clickaway'

export default {
    directives: {
        onClickaway: onClickaway,
    },
  methods: {
        clickAway () {
            this.$emit('close')
        }
  }
} 
</script>

<style>  
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .4s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  
  /* Probably need media queries here */
  width: 600px;
  max-width: 100%;
  
  min-height: 200px;
  max-height: 50%;

  margin: 0px auto;
  padding: 20px 30px;
  min-height: 35px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .2s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-default-button {

}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}

.modal-content {
  overflow: auto;
}

.modal-footer {
  padding: 20px 20px 0px 20px;
  text-align: right;
}
</style>