<template>
    <div>
        <carousel-slider></carousel-slider>
        <recent-uploads></recent-uploads>
        <citation-block></citation-block>
    </div>
</template>

<script>
import CarouselSlider from '../components/CarouselSlider'
import RecentUploads from '../components/RecentUploads'
import CitationBlock from '../components/CitationBlock'

export default {
    components: {
        CarouselSlider,
        RecentUploads,
        CitationBlock
    },
    data() {
        return {
            recentUploads: []
        }
    }
}
</script>

<style>

</style>