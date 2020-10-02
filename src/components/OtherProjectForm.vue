<template>
<div>
    <div class="row">
        <div class="col-6">
            <standard-project-form v-model="standardProject" @input="standardProject = arguments[0]" :showErrors="showErrors"></standard-project-form>
        </div>
        <div class="col-6 flex-center">
            <div class="flex-center">
                <div class="flex-center">
                    <b-img :src="otherProjectImg" style="height: 38%; width: 38%" fluid ></b-img>
                </div>
                <file-input v-bind:text="file ? file.name :'Upload a file'" @fileUploaded="file = arguments[0]" v-bind:green="file ? true : false"></file-input>
            </div>
        </div>
    </div>
    <custom-pulsate-button v-bind:text="'Save'" class="row flex-center" @click="save()"></custom-pulsate-button>
</div>

</template>

<script>
import ApiBase from '../services/ApiBase'
import WorksService from '../services/works-service'
import StandardProjectForm from '../components/StandardProjectForm'
import FileInput from '../components/FileInput'
import CustomPulsateButton from '../components/CustomPulsateButton'

export default {
    components: {
        StandardProjectForm,
        FileInput,
        CustomPulsateButton
    },
    data() {
        return {
            standardProject: {},
            projectType: 'O',
            file: null,
            showErrors: false,
        }
    },
    computed: {
        canSave() {
            this.showErrors = false;

            if(!this.standardProject || this.standardProject.name == '' || this.standardProject.name == undefined || this.standardProject.name == null) {
                this.showErrors = true;
            }
            if(!this.standardProject || this.standardProject.authorName == '' || this.standardProject.authorName == undefined || this.standardProject.authorName == null) {
                this.showErrors = true;
            }
            if(!this.standardProject || !this.standardProject.year) {
                this.showErrors = true;
            }
            if(!this.standardProject || !this.standardProject.semester) {
                this.showErrors = true;
            }

            return !this.showErrors;
        },
        otherProjectImg() {
            return WorksService.getOtherProjectImageURL();
        }
    },
    methods: {
        save() {
            if(this.canSave) {
                let project = {
                    ...this.standardProject,
                    projectType: this.projectType,
                }
                
                let fd = new FormData();

                fd.append('work', JSON.stringify(project));
                fd.append('file', this.file);
                
                this.$emit('save', fd);
            }
        },
        
    }
}
</script>

<style>

</style>