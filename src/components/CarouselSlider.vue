<template>
    <div class="carousel slide" data-ride="carousel" id="slider">

        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../../static/images/slide1.jpg">
                <div class="carousel-caption">
                    <h1 class="display-1">CREATE</h1>
                </div>
            </div>
            <div class="carousel-item">
                <img src="../../static/images/slide2.jpg">
                <div class="carousel-caption">
                    <h1 class="display-1">SHARE</h1>
                </div>
            </div>
            <div class="carousel-item">
                <img src="../../static/images/galaxy-background.jpg">
                <div class="carousel-caption">
                    <router-link id="exploreBtn" :to="{ name: 'works' }"><a >EXPLORE</a></router-link>
                </div>
            </div>
        </div>

        <a class="carousel-control-prev" href="#slider" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#slider" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>