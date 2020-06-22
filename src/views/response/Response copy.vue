<template>
    <v-container v-if="isLoggedIn">
        <template>
          <v-alert type="error" v-if="error">
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
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Select Lesson"
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
                    <v-btn color="primary" @click="save">Get Questions</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </template>
        <template >
          <v-form v-for="item in questions" :key="item.id">
            <v-container>
              <v-row >
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
                <v-checkbox v-model="selected" :label="item.option1" :value="item.option1"></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                >
                <v-checkbox v-model="selected" :label="item.option2" :value="item.option2"></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                >
                <v-checkbox v-model="selected" :label="item.option3" :value="item.option3"></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                >
                <v-checkbox v-model="selected" :label="item.option4" :value="item.option4"></v-checkbox>
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
      apiUrl: 'question',
      alert:true,
      search: '',
      headers: [
        { text: 'Course Name', align: 'start', value: 'course_name'},
        { text: 'Lesson Name', value: 'lesson_name'},
        { text: 'Question Name', value: 'question'},
        { text: 'Option1', value: 'option1'},
        { text: 'Option2', value: 'option2'},
        { text: 'Option3', value: 'option3'},
        { text: 'Option4', value: 'option4'},
        { text: 'Correct Option', value: 'correct_option'},
        { text: 'Active', value: 'active' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [0 , 1],
      editedIndex: -1,
      editedItem: {
        lesson_id: '',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct_option: '',
        active: 1,
      },
      defaultItem: {
        lesson_id: '',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct_option: '',
        active: 1,
      },
      selected:'',
      questionId: '',
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

      save (item) {
        console.log(item.id)
        console.log(this.selected)
        const index = this.questions.indexOf(item)
        this.questions.splice(index, 1)
        // if (this.editedIndex > -1) {
        //   this.$store.dispatch('store', [this.apiUrl, this.editedItem])
        //   Object.assign(this.indexData.datas[this.editedIndex], this.editedItem)
        // } else {
        //   this.$store.dispatch('store', [this.apiUrl, this.editedItem])
        //   this.indexData.datas.push(this.editedItem)
        // }
        // this.close()
      },
    },
  }
</script>