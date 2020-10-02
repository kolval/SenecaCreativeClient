<template>
    <div>
        <div>
            <label class="centred-text-horiz">Project Name</label>
            <b-form-input  v-model="localValue.name"
                            :state="projectNameState"
                            aria-describedby="input-live-help input-live-feedback"> </b-form-input>
        </div>
        <div style="margin-top: 1em">
            <label class="centred-text-horiz">Author's Name</label>
            <b-form-input  v-model="localValue.authorName"
                            :state="authorNameState"
                            aria-describedby="input-live-help input-live-feedback"> </b-form-input>
        </div>
        <div style="margin-top: 1em"> 
            <label class="centred-text-horiz">Year</label>
            <select class="form-control" v-model="localValue.year">
                <option v-for="year in years" v-bind:key="year" :value="year">{{year}}</option>
            </select>
        </div>
        <div style="margin-top: 1em">
            <label class="centred-text-horiz">Semester</label>
            <select class="form-control" v-model="localValue.semester" required>
                <option value="1">Winter</option>
                <option value="2">Summer</option>
                <option value="3">Fall</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: Object,
        showErrors: false,
    },
    data() {
        return {
            localValue: {
                name: '',
                authorName: '',
                semester: 0,
                year: 0,
                _id: 0
            },
            projectNameState: null,
            authorNameState: null,
            years: [],
        }
    },
    watch: {
        showErrors(val,oldVal) {
            if(val === true) {
                if(this.localValue.name == null || this.localValue.name == undefined || this.localValue.name == '')
                    this.projectNameState = false;
                if(this.localValue.authorName == null || this.localValue.authorName == undefined || this.localValue.authorName == '')
                    this.authorNameState = false;   
            }
            else 
            {
                this.projectNameState = null;
                this.authorNameState = null;
            }
        },
       'localValue.name'(val,oldVal) {
            if(this.showErrors) {
                if(val == null || val == undefined || val == '')
                    this.projectNameState = false;
                else 
                    this.projectNameState  = true;
            }
            else 
                this.projectNameState = null;
        },
        'localValue.authorName'(val,oldVal) {
            if(this.showErrors) {
                if(val == null || val == undefined || val == '')
                    this.authorNameState = false;
                else 
                    this.authorNameState  = true;
            }
            else 
                this.authorNameState = null;
        },
        localValue: {
            handler(val) {
                this.$emit('input', { ...val });
            },
            deep: true,
        },
    },
    created() {
        this.resetFromValue();
        this.refreshYears();
    },
    methods: {
        resetFromValue() {
            if(this.value) {
                this.localValue.name  = this.value.name;
                this.localValue.semester  = this.value.semester;
                this.localValue.authorName  = this.value.authorName;
                this.localValue.year  = this.value.year;
                this.localValue._id  = this.value._id;

                if(this.localValue._id == '' || this.localValue._id == undefined || this.localValue._id == null || this.localValue._id == 0)
                    this.localValue._id = 0;
            
                if(this.localValue.year == null || this.localValue.year == '' || this.localValue.year == undefined || this.localValue.year == null || this.localValue.year == 0)
                    this.localValue.year = new Date().getFullYear();
                
                if(this.localValue.semester == '' || this.localValue.semester == undefined || this.localValue.semester == null || this.localValue.semester == 0) 
                    this.setSemester();
                
                this.localValue.authorName = (this.localValue.authorName == null || this.localValue.authorName == undefined) ? '' : this.localValue.authorName;
                this.localValue.name = (this.localValue.name == null || this.localValue.name == undefined) ? '' : this.localValue.name;
            }
            else {
                this.setStandardFields();
            }
        },
        refreshYears() {
            const minYear = new Date().getFullYear() - 10;
            const maxYear = new Date().getFullYear() + 10;

            for(let i = maxYear; i > minYear; i--) {
                this.years.push(i);
            }
        },
        setStandardFields() {
            this.setSemester();
            this.localValue._id = 0;
            this.localValue.year = new Date().getFullYear();
            this.localValue.authorName = '';
            this.localValue.name =  '';
        },
        setSemester() {
            const currentMonth = new Date().getMonth() + 1;
            if(currentMonth >= 1 && currentMonth <= 4)
                this.localValue.semester = 1;
            if(currentMonth >= 5 && currentMonth <= 8)
                this.localValue.semester = 2;
            else 
                this.localValue.semester = 3;
        }
    }
}
</script>

<style>

</style>