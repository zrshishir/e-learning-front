<template>
    <v-container v-if="isLoggedIn">
        <template>
          <v-alert type="error" v-if="error == 1">
            {{errorMsg}}
          </v-alert>
          <v-alert type="success" v-if="error == 2">
            {{errorMsg}}
          </v-alert>
          <v-form>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    :items="indexData.lessons"
                    :rules="[v => !!v || 'Item is required']"
                    label="Select Lesson"
                    item-text="name"
                    item-value="id"
                    v-model="lessonId"
                    outlined
                    required
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <!-- <v-btn color="blue darken-4" @click="save">Submit</v-btn> -->
                  <div class="my-2">
                    <v-btn color="primary" @click="getLesson">Get Questions</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </template>
        <template >
          <v-form v-for="item in indexData.questions" :key="item.id">
            <v-container >
              <v-row class="grey lighten-2 rounded-pill">
                <v-col
                  cols="12"
                  md="2"
                  class="pt-8"
                >
                <p class="font-weight-bold">{{item.question}}</p> 
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                >
                <v-checkbox v-model="selected[item.id]" :label="item.option1" :value="item.option1"></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                >
                <v-checkbox v-model="selected[item.id]" :label="item.option2" :value="item.option2"></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                >
                <v-checkbox v-model="selected[item.id]" :label="item.option3" :value="item.option3"></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                >
                <v-checkbox v-model="selected[item.id]" :label="item.option4" :value="item.option4"></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                >
                  <!-- <v-btn color="blue darken-4" @click="save">Submit</v-btn> -->
                  <div class="my-4">
                    <v-btn color="primary" @click="save(item)">Submit</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </template>
        <v-container v-if="reportButtonView">
          <v-row>
            <v-col cols="12" md="3">
                <div class="my-2">
                  <v-btn color="primary" x-large to="/report">
                      <v-icon>mdi-domain</v-icon>Show Result
                  </v-btn>
              </div>
            </v-col>
        </v-row>
        </v-container>
    </v-container>
    <v-container v-else>
        <template>
            <div>
                <v-alert
                v-model="alert"
                dismissible
                close-icon="mdi-delete"
                color="red"
                border="left"
                elevation="2"
                colored-border
                
                >
                You are <strong>not Logged In</strong>, please log in first!.
                </v-alert>

                <div class="text-center">
                <v-btn
                    v-if="!alert"
                    dark
                    @click="alert = true"
                >
                    Reset Alert
                </v-btn>
                </div>
            </div>
        </template>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      dialog: false,
      reportButtonView: false,
      apiUrl: 'response',
      alert:true,
      search: '',
      selected:[],
      lessonId: '',
      editedItem:{
        question_id: '',
        response: ''
      },
      questions:[
            {id: 1, lesson_id:1, question: "q1", option1: "op11", option2: 'op20', option3: 'op30', option4: 'op40'},
            {id: 2, lesson_id:1, question: "q2", option1: "op12", option2: 'op24', option3: 'op31', option4: 'op44'},
            {id: 3, lesson_id:1, question: "q3", option1: "op13", option2: 'op23', option3: 'op32', option4: 'op43'},
            {id: 4, lesson_id:1, question: "q4", option1: "op14", option2: 'op22', option3: 'op33', option4: 'op42'},
            {id: 5, lesson_id:1, question: "q5", option1: "op15", option2: 'op21', option3: 'op34', option4: 'op41'}
            // {id: 2, lesson_id:1, question: "q1", option1: "op12", option2: 'op21', option3: 'op31', option4: 'op41'}
        ],
    }),

    computed: {
        ...mapGetters(['isLoggedIn', 'indexData', 'error', 'statusCode', 'errorMsg']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Question' : 'Edit Question'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.dispatch('setIndexData', [this.apiUrl])
      },

      setErrorZero () {
        this.$store.dispatch('setErrorZero')
      },

      editItem (item) {
        this.editedIndex = this.indexData.datas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.indexData.datas.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.indexData.datas.splice(index, 1)
        this.$store.dispatch('delete', [this.apiUrl, item.id])
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      getLesson () {
        // console.log(this.lessonId)
        this.$store.dispatch('getLessonQuestion', ['question', this.lessonId])
      },

      save (item) {
        // console.log(item.id)
        // console.log(this.selected[item.id])
        this.editedItem.question_id = item.id
        this.editedItem.response = this.selected[item.id]
        // console.log(this.editedItem)
        const index = this.indexData.questions.indexOf(item)
        this.indexData.questions.splice(index, 1)
        this.$store.dispatch('responseUpdate', [this.apiUrl, this.editedItem])
        if(this.indexData.questions.length === 0){
          this.reportButtonView = true
        }
      },
    },
  }
</script>