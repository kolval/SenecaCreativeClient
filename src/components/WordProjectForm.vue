<template>
<div>
    <div class="row">
        <div class="col-6">
            <standard-project-form :value="project" @input="updateStandardProjectFields(arguments[0])" :showErrors="showErrors"></standard-project-form>
        </div>
        <div class="col-6">
            <div class="flex-center">
                <div class="flex-center">
                    <b-img :src="wordDocImg" style="height: 40%; width: 40%" fluid ></b-img>
                </div>
                <div class="h-25">
                    <file-input v-bind:text="file ? file.name :'Upload Word Document'" @fileUploaded="file = arguments[0]" v-bind:green="file ? true : false"></file-input>
                </div>
            </div>
        </div>
    </div>

    <custom-pulsate-button v-bind:text="'Save'" class="row flex-center" @click="save()"></custom-pulsate-button>
    <b-modal v-model="showModal"> 
        Please upload word document
    </b-modal>
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
            project: {
                _id: 0,
                name: '',
                authorName: '',
                semester: 0,
                year: 0,
                projectType: 'W',
            },
            file: null,
            showWarningMessage: false,
            warningMessage: '',
            showErrors: false,
            showModal: false,
        }
    },
    computed: {
        canSave() {
            this.showErrors = false;
            
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
        wordDocImg() {
            return WorksService.getWordDocImageURL();
        }
    },
    methods: {
        save() {
            debugger;
            if(this.file == null) {
                this.showErrors = true;
                this.showModal = true;
                return;
            }

            if(this.canSave) {
                let project = {
                    ...this.project,
                }
                
                let fd = new FormData();

                fd.append('work', JSON.stringify(project));
                fd.append('file', this.file);
                
                this.$emit('save', fd);
            }
        },
        updateStandardProjectFields(standardProjectFields) {
            this.project._id = standardProjectFields._id;
            this.project.name = standardProjectFields.name;
            this.project.authorName = standardProjectFields.authorName;
            this.project.year = standardProjectFields.year;
            this.project.semester = standardProjectFields.semester;
        }
        
    }
}
</script>

<style>
.flex-center {
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    flex-wrap: wrap;
    margin-top: 1em
}
</style>