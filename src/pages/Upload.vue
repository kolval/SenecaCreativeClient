<template>
<div>
    <div class="container centred-text-horiz">
        <h1>Upload a Project</h1>
        <hr>
    </div>
    
        <div class="container-fluid">
            <project-type-selection :projectType="projectType" @projectTypeChange="projectType = arguments[0]"></project-type-selection>
        </div>
        <div class="container" v-if="projectType !== null" style="margin-top: 2em;">
            <youtube-project-form v-if="projectType === 'Y'" v-model="project" @save="uploadProject(arguments[0])"></youtube-project-form>
            <word-project-form v-else-if="projectType === 'W'" v-model="project" @save="uploadProject(arguments[0])"/>
            <power-point-project-form v-else-if="projectType === 'P'" v-model="project" @save="uploadProject(arguments[0])"></power-point-project-form>
            <other-project-form v-else-if="projectType === 'O'" v-model="project"  @save="uploadProject(arguments[0])"></other-project-form>
        </div>
    
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
                                    z-index:1501;
                                    transform: translate(-50%, -50%);"
                            />
    </div>
</div>
</template>

<script>
import ApiBase from '../services/ApiBase'
import ProjectTypeSelection from '../components/ProjectTypeSelection'
import YoutubeProjectForm from '../components/YoutubeProjectForm'
import PowerPointProjectForm from '../components/PowerPointForm'
import WorksService from '../services/works-service'
import OtherProjectForm from '../components/OtherProjectForm'
import WordProjectForm from '../components/WordProjectForm'
import { BreedingRhombusSpinner } from 'epic-spinners'

export default {
    components: {
        ProjectTypeSelection,
        YoutubeProjectForm,
        OtherProjectForm,
        WordProjectForm,
        PowerPointProjectForm,
        BreedingRhombusSpinner
    },
    data() {
        return {
            projectType: null,
            project: null,
            resultShow: false,
            message: '',
            loading: false,
        }
    },
    methods: {
        uploadProject(work) {
            this.project = work;
            let self = this;
            this.loading  = true;
            WorksService.saveWork(work).then(r => {
                self.loading  = false;

                if(r.success) {
                    self.resultShow = true;
                    self.message = `The project has been successfully uploaded!`

                    self.clearProject();
                }
                else {
                    self.resultShow = true;
                    self.message = `There was a failure while uploading the project! :(`
                    
                }
            })
        },
        clearProject() {
            this.projectType = null;
            this.project = null;
        },
        
    }
}
</script>

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
  z-index: 1500;
}
</style>