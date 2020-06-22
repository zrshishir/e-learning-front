<template>
<v-container>
     <template>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Item"
                    outlined
                    required
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Item"
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
                    <v-btn color="primary" @click="save">Submit</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </template>
        <v-simple-table border="1">
            <template v-slot:default>
            <thead >
                <tr class="font-weight-bold">
                    <th class="text-left">Serial No</th>
                    <th class="text-left">Lesson</th>
                    <th class="text-left">Question</th>
                    <th class="text-left">Option1</th>
                    <th class="text-left">Option2</th>
                    <th class="text-left">Option3</th>
                    <th class="text-left">Option4</th>
                    <th class="text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item">
                    <td>{{item.id}}</td>
                    <td v-bind="id">{{ item.id }}</td>
                    <td>{{ item.lesson_id }}</td>
                    <td><v-checkbox v-model="selected" :label="item.option1" :value="item.option1"></v-checkbox></td>
                    <td><v-checkbox v-model="selected" :label="item.option2" :value="item.option2"></v-checkbox></td>
                    <td><v-checkbox v-model="selected" :label="item.option3" :value="item.option3"></v-checkbox></td>
                    <td><v-checkbox v-model="selected" :label="item.option4" :value="item.option4"></v-checkbox></td>
                    <td><v-btn color="primary" @click="editItem(item)">Submit</v-btn></td>
                </tr>
                
            </tbody>
           
            </template>
        </v-simple-table>
</v-container>
</template>

<script>
  export default {
    data: () => ({
        id:"",
        selected:'',
        items:[
            {id: 1, lesson_id:1, question: "q1", option1: "op11", option2: 'op20', option3: 'op30', option4: 'op40'},
            // {id: 2, lesson_id:1, question: "q1", option1: "op12", option2: 'op21', option3: 'op31', option4: 'op41'}
        ],
        editItem (item) {
                // this.editedItem = Object.assign({}, item)
                console.log(item.id)
                console.log(this.selected)
                // this.editedIndex = this.indexData.datas.indexOf(item)
                // this.editedItem = Object.assign({}, item)
                // this.dialog = true
            },

        methods:{
            
            save(){
                console.log(this.selected)
            }
        }

        
    })
  }
</script>