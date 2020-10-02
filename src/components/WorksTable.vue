
<template>
    
    <div class="container">
         <div class="form-inline form-group" style="margin-top: .5em;" id="filterId">
            <div class="col-2">
                <select class="form-control"  style="width: 100%"  v-model="searchRequest.semester">
                    <option :value="null" disabled selected>Semester</option>
                    <option :value="0">All</option>
                    <option :value="1">Winter</option>
                    <option :value="2">Summer</option>
                    <option :value="3">Fall</option>
                </select>
            </div>
            <div class="col-2">
                <select class="form-control" style="width: 100%" v-model="searchRequest.year">
                    <option :value="null" disabled selected>Year</option>
                    <option :value="0">All</option>
                    <option v-for="year of years" :value="year" :key="year">{{year}}</option>
                </select>
            </div>
            <div class="col-3">
                <input class="form-control" type="text" style="width: 100%" placeholder="Project Name" v-model="searchRequest.name">
            </div>
            <div class="col-3">
                <input class="form-control" type="text" style="width: 100%" placeholder="Author's name" v-model="searchRequest.authorName">
            </div>
            <div class="col-2">
                <button @click="refreshPagedWorks()" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true" style="margin-right: 0.5em"></i>SEARCH</button>
            </div>
        </div>
        
        <div class="row">
            <div v-for="work in works" v-bind:key="work._id" class="col-sm-12 col-md-6 col-lg-4, col-xl-3 workCard" id="">
                <div class="editIconContainer" v-if="profile.isAuthenticated">
                        <i @click="editWork(work._id)" class="fas fa-edit"></i>
                    </div>
                    <div class="removeIconContainer" v-if="profile.isAuthenticated">
                        <i @click="removeWorkPrompt(work._id)" class="fas fa-minus-circle"></i>
                    </div>
                <router-link :to="{ name: 'work', params: { workId: work._id }}"  style="text-decoration: none; color: inherit;">
                    <div class="card" id="videoCard">
                        <div class="card-header">
                            <img class="cardContentContainer" :src="work.thumbnailUrl"/>
                        </div>
                        <div class="card-body centred-text-horiz">
                            {{work.name}}
                        </div>
                        <div class="card-footer centred-text-horiz">
                            {{work.authorName}}
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <b-pagination
            v-model="currentPage"
            :total-rows="totalWorksCount"
            :per-page="searchRequest.take"
            last-number>
        </b-pagination>
        <b-modal v-model="modalShow" size="lg" @ok="saveWork()" :hide-footer="true">
            <youtube-project-form v-if="currentWork.projectType == 'Y'" :value="currentWork" @save="updateStandardProjectFields(arguments[0]); saveWork()" :greenButton="true"></youtube-project-form>
            <div v-else>
                <standard-project-form :value="currentWork" @input="updateStandardProjectFields(arguments[0])" :showErrors="showErrors"></standard-project-form>
                <custom-pulsate-button @click="saveWork()" :text="'SAVE'" class="flex-center" :greenButton="true" > </custom-pulsate-button>
            </div>
        </b-modal>
        <b-modal v-model="removeModalShow" @ok="removeWork()">
            <span> Are you sure that you want to remove work {{currentWork.name}} ? </span>
        </b-modal>
        <b-modal v-model="resultShow">
            {{message}}
        </b-modal>
        <div v-if="loading">
            <div class="infoi">
        
            </div>
            <breeding-rhombus-spinner
                            :animation-duration="2000"
                            :size="85"
                            color="#168beb"
                            style="position: fixed;
                                    top: 50%;
                                    left: 50%;
                                    z-index:9999;
                                    transform: translate(-50%, -50%);"
                            />
        </div>
  </div>
</template>
<style scoped>
.infoi {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: .45;
  background-color: grey;
  z-index: 9000;
}
</style>
<script>
import ApiBase from '../services/ApiBase';
import YoutubeService from '../services/youtube-service'
import { mapGetters } from 'vuex'
import WorksService from '../services/works-service'
import { BreedingRhombusSpinner } from 'epic-spinners'
import StandardProjectForm  from '../components/StandardProjectForm';
import CustomPulsateButton from '../components/CustomPulsateButton';
import YoutubeProjectForm from '../components/YoutubeProjectForm'

export default {
    components: {
        BreedingRhombusSpinner,
        StandardProjectForm,
        YoutubeProjectForm,
        CustomPulsateButton
    },
    data() {
        return {
            works: [],
            loading: true,
            error: '',
            modalShow: false,
            removeModalShow: false,
            resultShow: false,
            message: '',
            currentWork: {},
            showErrors: null,
            years: [],
            searchRequest: {
                take: 20,
                skip: 0,
                year: null,
                semester: null,
                name: null,
                authorName: null
            },
           
            currentPage: 1,
            totalWorksCount: 0,
            stopPageWatcher: false
        }
    },
    created() {
        this.refreshDistinctYears();
        this.refreshPagedWorks();
       
    },
    computed: {
        ...mapGetters({
            profile: 'getProfile'
        }),
        canSave() {
            this.showErrors = false;
            if(!this.currentWork || this.currentWork.name == '' || this.currentWork.name == undefined || this.currentWork.name == null) {
                this.showErrors = true;
            }
            if(!this.currentWork || this.currentWork.authorName == '' || this.currentWork.authorName == undefined || this.currentWork.authorName == null) {
                this.showErrors = true;
            }
            if(!this.currentWork || !this.currentWork.year) {
                this.showErrors = true;
            }
            if(!this.currentWork || !this.currentWork.semester) {
                this.showErrors = true;
            }

            return !this.showErrors;
        }
    },
    watch: {
        currentPage(val) {
            this.searchRequest.skip = val - 1;
            
            this.refreshPagedWorks();
        }
    },
    methods: {
        updateStandardProjectFields(standardProjectFields) {
            this.currentWork.name = standardProjectFields.name;
            this.currentWork.authorName = standardProjectFields.authorName;
            this.currentWork.year = standardProjectFields.year;
            this.currentWork.semester = standardProjectFields.semester;
            this.currentWork.sourceLink = standardProjectFields.sourceLink;
        },
        editWork(id) {
            this.currentWork = JSON.parse(JSON.stringify(this.works.find(w => w._id == id)));
            this.modalShow = true;
        },
        saveWork() {
            let self = this;

            if(this.canSave) {
                WorksService.saveWork(this.currentWork).then(r => {
                    if(r.success) {
                        self.resultShow = true;
                        const savedWorkIndex = self.works.findIndex(s => s._id === self.currentWork._id);
                        self.currentWork.thumbnailUrl = WorksService.getThumbnailURL(self.currentWork);
                        self.works[savedWorkIndex] = self.currentWork;
                        self.message = `The project ${self.currentWork.name} has been successfully updated!`;
                        self.modalShow = false;
                    }
                    else {
                        self.resultShow = true;
                        self.message = `There was a failute updating the project ${self.currentWork.name} :C`;
                        self.modalShow = false;
                    }
                });

            }
        },
        removeWorkPrompt(id) {
            this.currentWork = this.works.find(w => w._id == id);
            this.removeModalShow = true;
        },
        removeWork() {
            let self = this;
            this.loading = true;
            WorksService.removeWork(this.currentWork._id)
                .then(r => {
                    self.loading = false;
                    if(r.success === true) {
                        self.message = `The project ${self.currentWork.name} has been successfully deleted`;
                        self.resultShow = true;     
                        const deletedWorkIndex = self.works.findIndex(w => w._id == self.currentWork._id);
                        self.works.splice(deletedWorkIndex,1);
                        self.refreshPagedWorks();
                    }
                    else
                        self.message = `There was an error deleting the project ${self.currentWork.name}`;
                        self.resultShow = true;   
                })
                .catch(e => {
                    self.message = e.message
                    self.resultShow = true;
                }); 
        },
        refreshPagedWorks() {
            const self = this;
            this.loading = true;
            this.stopPageWatcher = true;
            WorksService.getPagedWorks(this.searchRequest).then(r => { 
                r.works.forEach(record => record.thumbnailUrl = WorksService.getThumbnailURL(record));
                self.works = r.works;
                self.totalWorksCount = r.totalCount;

                self.loading = false;

                })
        },
        refreshDistinctYears() {
            const self = this;

            WorksService.getWorksDistinctYears().then(years => self.years = years);
        }
    }
}
</script>
