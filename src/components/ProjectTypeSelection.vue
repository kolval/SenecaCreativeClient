<template>
<div class="container">
    
    <b-tabs align="center" content-class="mt-3" :style="!showTypeSelection ? 'visibility: hidden' : ''" v-model="selected">
        <b-tab :title="youtubeImg"></b-tab>
        <b-tab :title="wordDocImg"></b-tab>
        <b-tab :title="powerPointImg"></b-tab>
        <b-tab :title="otherImg"></b-tab>
    </b-tabs>

   <!-- <img :src="youtubeImg"/>-->
</div>
</template>

<script>
import WorksService from '../services/works-service'

export default {
    props: {
        projectType: {
            default: 'Y',
            required: false
        },
    },
    data() {
        return {
            selected: null,
            options: [
                { value: 'Y', tabIndex: 0 },
                { value: 'W', tabIndex: 1 },
                { value: 'P', tabIndex: 2 },
                { value: 'O', tabIndex: 3 }
            ],
            youtubeImg: null,
            wordDocImg: null,
            powerPointImg: null,
            otherImg: null,
            showTypeSelection: false
        }
        

    },
    created() {
        this.youtubeImg = `<img title="YouTube Video" style="width:130px; height: 130px" src="${WorksService.getYoutubeImageURL()}"/>`;
        this.wordDocImg =`<img title="Word Document" style="width:130px; height: 130px" src="${WorksService.getWordDocImageURL()}"/>`;
        this.powerPointImg = `<img title="Power Point Presentation" style="width:130px; height: 130px" src="${WorksService.getPowerPointImageURL()}"/>`;
        this.otherImg = `<img title="Other Project" style="width:130px; height: 130px" src="${WorksService.getOtherProjectImageURL()}"/>`;

        const optionSelected = this.options.find(o => o.value == this.projectType);

        if(optionSelected) 
            this.selected = optionSelected.tabIndex;
        else
            this.selected = this.options[0].tabIndex;
            
        const self = this;
        setTimeout(() => {
            const anchors = document.querySelectorAll("a[role=tab]");
            anchors.forEach(a => a.innerHTML = a.text)
            self.showTypeSelection = true;
        }, 0);
    },
    watch: {
        projectType(val) {
            if(val)
                this.selected = this.options.find(o => o.value == val).tabIndex;
            else 
                this.selected = this.options[0].tabIndex;

            const newProjectType = this.options.find(o => o.tabIndex === this.selected ).value;
            this.$emit('projectTypeChange', newProjectType);
        },
        selected(newVal) {
            const newProjectType = this.options.find(o => o.tabIndex === newVal).value;

            this.selected = newVal;
            this.$emit('projectTypeChange', newProjectType);
        }
    },
    methods: {
        
    }
}
</script>