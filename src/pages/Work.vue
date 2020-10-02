<template>
<div class="container">
    <h2 class="centred-text-horiz" style="margin: .5em;">{{loading ? '' : work.name}}</h2>

    <hr>
    <div style="display: flex; justify-content:center; align-items: center; margin-top: 2em; " v-if="loading">
        <breeding-rhombus-spinner
                :animation-duration="2000"
                :size="85"
                color="#168beb"
                />
    </div>
    <div v-else>
        <div class="container" v-if="work.projectType === 'Y'">
            <iframe 
                style="display: block; margin: 0 auto;"
                align="middle"
                id="projectFrame"
                width="560" 
                height="315" 
                :src="work.embedLink"
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
            <div class="container" v-else>
                <div class="centred-text-horiz" > 
                    <img :src="work.thumbnailLink" style="height: 20%; width: 20%; margin-bottom: 1em;" >
                </div>
            </div>
        
   
        <div class="container" v-if="work.projectType !== 'Y'" style="display: flex; justify-content:center; align-items: center">
            <custom-pulsate-button v-bind:text="'DOWNLOAD'" @click="downloadWork()"></custom-pulsate-button>
        </div>

        <div class="card centred-block-horiz" id="projectDescriptionBlock">
            <div class="card-block">
            
                <div class="card-text">
                    <div style="float: left">
                        <span id="descriptionAuthor">Author: {{work.authorName}}</span>
                    </div>
                   
                    <div style="float: right">
                        <span>{{work.year}}, </span>
                        <span>{{(work.semester === 1 ? 'Winter' : (work.semester === 2 ? 'Summer' : 'Fall'))}} </span>
                    </div>
                   
                    <br/>
                    
                </div>
            
            </div>
        </div>
    </div>
</div>
</template>

<script>
import WorksService from '../services/works-service'
import YoutubeService from '../services/youtube-service'
import download from 'downloadjs';
import CustomPulsateButton from '../components/CustomPulsateButton';
import { BreedingRhombusSpinner } from 'epic-spinners'

export default {
    props: {
        workId: String
    },
    components: {
        CustomPulsateButton,
        BreedingRhombusSpinner
    },
    data() {
        return {
            loading: true,
            work: Object
        }
    },
    created() {
        let self = this;
        WorksService.getWork(this.workId).then(work => {
            work.thumbnailLink = WorksService.getThumbnailURL(work);

            if(work.projectType == 'Y')
                work.embedLink = YoutubeService.getEmbedUrl(work.sourceLink);

            self.work = work;
            self.loading = false;
        })
    },
    methods: {
        downloadWork() {
            let self = this;
            
            if(self.work.projectType == 'W')
                download(Uint8Array.from(this.work.data.data), this.work.fileName, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            else if(self.work.projectType == 'P')
                download(Uint8Array.from(this.work.data.data), this.work.fileName, 'application/vnd.ms-powerpoint')
            else
                download(Uint8Array.from(this.work.data.data), this.work.fileName)
        }
    }

}

</script>

<style>

</style>