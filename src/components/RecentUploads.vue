<template>
<div class="container" id="recentUploads-block">
    <h2>Most Recent Uploads</h2>
    <hr>

    <div class="row">
        <div style="width:100%; transform: translateX(45%);" v-if="loading">
            <breeding-rhombus-spinner
                :animation-duration="2000"
                :size="85"
                color="#168beb"
                />
        </div>

        <div v-for="work of works" :key="work._id" class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'work', params: { workId: work._id }}">
                <div class="card worksCard" >
                    <div class="card-header">
                        <img class="cardContentContainer" v-bind:src="work.thumbnailLink">
                    </div>
                    <div class="card-body">
                        <h3>{{work.name}}</h3>
                    </div>
                    <div class="card-footer">
                        <h4>{{work.authorName}}</h4>
                    </div>
                </div>
            </router-link>
        </div>

        <h1 v-if="works.length <= 0 && loading === false && error.length === 0">No content to display</h1>
        <h1 v-else-if="works.length <= 0 && loading === false && error.length !== 0">{{error}}</h1>  
    </div>
</div>
</template>

<script>
import ApiBase from '../services/ApiBase'
import YoutubeService from '../services/youtube-service'
import WorksService from '../services/works-service'
import { BreedingRhombusSpinner } from 'epic-spinners'

export default {
    components: {
        BreedingRhombusSpinner
    },
    data() {
        return {
            works: [],
            loading: true,
            error: ''
        }
    },
    created() {
        this.refreshMostRecentWorks();
    },
    methods: {
        refreshMostRecentWorks() {
            const self = this;
            WorksService.getMostRecentWorks()
                .then(works => {
                    works.forEach(w => w.thumbnailLink = WorksService.getThumbnailURL(w));

                    self.works = works;
                    self.loading = false;
                })
                .catch(e => {
                    self.error = e;
                    self.loading = false;
                })
        }
    }
}
</script>

<style>

</style>