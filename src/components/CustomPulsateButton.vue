<template>
    <div class="box" @click="$emit('click')">
        <a href="#" :class="`btn btn-animation-1 ${greenButton ? 'btn-green' : 'btn-white'}`">{{text}}</a> 
    </div>
</template>

<script>
export default {
    props: {
        text: String,
        greenButton: false
    }
}
</script>

<style scoped>

.box{
  position: relative;
  color:rgb(255, 255, 255) !important;
}

.btn:link,
.btn:visited{
  text-decoration: none;
  text-transform:uppercase;
  position:relative;
  padding:20px 40px;
  border-radius:100px;
  display:inline-block;
  transition: all .5s;
}

.btn-white{
  background:#fff;
  color:#000;
}

.btn-green {
  background:green;
  color:rgb(255, 255, 255);
}

.btn-white:hover{
   box-shadow:0px 10px 10px  rgba(0,0,0,0.2);
   transform : translateY(-3px);
}

.btn-green:hover{
   box-shadow:0px 10px 10px white !important;
   transform : translateY(-3px);
}

.btn:active{
  box-shadow:0px 5px 10px rgba(0,0,0,0.2);
  transform: translateY(-1px);
}

.btn-bottom-animation-1{
  animation:comeFromBottom 1s ease-out .8s;
}

.btn::after{
  content:"";
  text-decoration: none;
  text-transform:uppercase;
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  border-radius:100px;
  display:inline-block;
  z-index:-1;
  transition: all .5s;
}

.btn-white::after {
    background: #fff;
}
.btn-green::after {
    background:green;
}

.btn-green:hover{
   box-shadow:0px 10px 10px #fff;
   transform : translateY(-3px);
}
.btn-animation-1:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
}

@keyframes comeFromBottom{
  0%{
    opacity:0;
    transform:translateY(40px);
  } 
  100%{
    opacity:1;
    transform:translateY(0);
  }
}
</style>
