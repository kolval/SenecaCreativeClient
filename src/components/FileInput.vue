<template>
    <div style="text-align: center" >
      
        <input type="file" id="fileUpload" :style="green ? 'background: green !important;' : ''" @change="uploadFile()"/>
        <label for="fileUpload"  class="btn-3" :style="green ? 'background: green !important;' : ''"><span>{{text}}</span></label>

      <b-modal v-model="showModal">
        The file size cannot exceed 15 MB &#128577;
      </b-modal>
    </div>
</template>

<script>
export default {
    props: {
        text: String,
        green: false
    },
    data() {
      return {
        showModal: false
      }
    },
    methods: {
        uploadFile() {
            const file = document.querySelector('#fileUpload').files[0];

            if(file) {
              if(file.size/1024/1024 > 15) {
                this.showModal = true;
                this.$emit('fileUploaded', null);
              }
              else {
                this.showModal = false;
                this.$emit('fileUploaded', file);
              }
            }
            else {
              this.showModal = false;
              this.$emit('fileUploaded', null);
            }
        }
    }
}
</script>

<style scoped>
[type="file"],[type="button"] {
  height: 0;
  overflow: hidden;
  width: 0;
}

[type="file"] + label, [type="button"] + label {
  background: #f15d22;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Poppins", sans-serif;
  font-size: inherit;
  font-weight: 600;
  margin-bottom: 1rem;
  outline: none;
  padding: 1rem 50px;
  position: relative;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  vertical-align: middle;
}
[type="file"] + label:hover, [type="button"] + label:hover {
  background-color: #d3460d;
}
[type="file"] + label.btn-3, [type="button"] + label.btn-3 {
  background-color: #ee6d9e;
  border-radius: 0;
  overflow: hidden;
}
[type="file"] + label.btn-3 span,[type="button"] + label.btn-3 span {
  display: inline-block;
  height: 100%;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  width: 100%;
}
[type="file"] + label.btn-3::before, [type="button"] + label.btn-3::before {
  color: #fff;
  content: "\f382";
  font-family: "Font Awesome 5 Free";
  font-size: 130%;
  height: 100%;
  left: 0;
  line-height: 2.6;
  position: absolute;
  top: -180%;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  width: 100%;
}
[type="file"] + label.btn-3:hover,[type="button"] + label.btn-3:hover {
  background-color: #ae144f;
}
[type="file"] + label.btn-3:hover span, [type="button"] + label.btn-3:hover span {
  -webkit-transform: translateY(300%);
          transform: translateY(300%);
}
[type="file"] + label.btn-3:hover::before, [type="button"] + label.btn-3:hover::before {
  top: 0;
}



</style>