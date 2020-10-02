<template>
    <div>
        <div class="row form-group">
            <div class="col-6">
               
                <standard-project-form :value="project" @input="updateStandardProjectFields(arguments[0])" :showErrors="showErrors"/>
            </div>
            <div class="col-6">

                <label class="centred-text-horiz">YouTube Video Link</label>
                <b-form-input v-model="project.sourceLink"
                              :state="youtubeVideoState"
                              aria-describedby="input-live-help input-live-feedback"> </b-form-input>
                <youtube-link-validator class="flex-center" :sourceLink="project.sourceLink" @validated="youtubeVideoState = arguments[0]"></youtube-link-validator>
            </div>
        </div>
       
        <custom-pulsate-button v-bind:text="'Save'" class="row flex-center" @click="save()" :greenButton="greenButton"></custom-pulsate-button>
    </div>
</template>

<script>
import YoutubeLinkValidator from '../components/YoutubeLinkValidator';
import StandardProjectForm from '../components/StandardProjectForm';
import WorksService from '../services/works-service';
import CustomPulsateButton from '../components/CustomPulsateButton';

export default {
    props: {
        value: Object,
        greenButton: false,
    },
    components: {
        YoutubeLinkValidator,
        StandardProjectForm,
        CustomPulsateButton
    },
    data() {
        return {
            project: {
                _id: '',
                projectType: 'Y',
                name: '',
                authorName: '',
                semester: 0,
                sourceLink: '',
                year: 0,
            },
            youtubeVideoState: null,
            showErrors: false,
        }
    },
    computed: {
         canSave() {
            this.showErrors = false;
            
            if(this.youtubeVideoState == false || this.youtubeVideoState == null) {
                this.showErrors = true;
                this.youtubeVideoState = false;
            }

            if(!this.project || this.project.name == '' || this.project.name == undefined || this.project.name == null) {
                this.showErrors = true;
            }
            if(!this.project || this.project.authorName == '' || this.project.authorName == undefined || this.project.authorName == null) {
                this.showErrors = true;
            }
            if(!this.project || !this.project.year) {
                this.showErrors = true;
            }
            if(!this.project || !this.project.semester) {
                this.showErrors = true;
            }

            return !this.showErrors;
        },
    },
    created() {
        this.resetFromValue();
    },
    methods: {
        resetFromValue() {
            if(this.value) {
                this.project.name = this.value.name;
                this.project.authorName = this.value.authorName;
                this.project.semester = this.value.semester;
                this.project.year = this.value.year;
                this.project.sourceLink = this.value.sourceLink;
                this.project._id = this.value._id;
            }
        },
        save() {
            if(this.canSave) {
                let project = {
                    ...this.project
                };
                this.$emit('save', project)
            }
        },
        updateStandardProjectFields(standardProjectFields) {
            this.project._id = standardProjectFields._id;
            this.project.name = standardProjectFields.name;
            this.project.authorName = standardProjectFields.authorName;
            this.project.year = standardProjectFields.year;
            this.project.semester = standardProjectFields.semester;
        }
    },
        
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