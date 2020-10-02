<template>
<div>
    <div v-if="isValidSourceLink">
        <iframe 
            :src="embeddedLink"
            border="none"
            align="middle"
            width="355"
            height="200"
            frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
            >
        </iframe>
    </div>
    <div v-else-if="isValidSourceLink == false" class="flex-center">
        <span>Invalid Youtube Video URL :C</span>
    </div>
</div>
</template>

<script>
import YoutubeService from '../services/youtube-service'
import YoutubeProjectFormVue from './YoutubeProjectForm.vue';

export default {
    props: {
        sourceLink: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isValidSourceLink: null,
            embeddedLink: ''
        }
    },
    watch: {
        sourceLink: {
            immediate: true,
            handler(val) {
                this.sourceLink = val;
                if(this.sourceLink) {
                    let valid = YoutubeService.validateYoutubeUrl(this.sourceLink);
                    if(valid) {
                        this.embeddedLink = YoutubeService.getEmbedUrl(this.sourceLink);
                        this.isValidSourceLink = true;
                    }
                    else {
                        this.isValidSourceLink = false;
                    }
                    
                    this.$emit('validated', this.isValidSourceLink);
                }
            }
        }
    }
}

</script>
<style scoped>
.flex-center {
    display: flex; 
    align-items: center;
    align-self: center;
    justify-content: center;
    flex-wrap: wrap;
}
</style>