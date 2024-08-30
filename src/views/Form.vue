<template>
  <div class="container mt-2">
    <h1>Formulário</h1>
    <b-form>
      <b-form-group
      label="Título"
      label-for="subject"
      >
      <b-form-input
      id="subject"
      v-model="form.subject"
      type="text"
      placeholder="Ex: lavar carro"
      required
      autocomplite="off"
      ></b-form-input>
      </b-form-group>
      <b-form-group
      label="Descrição"
      label-for="description"
      >
      <b-form-textarea
      id="description"
      v-model="form.description"
      type="text"
      placeholder="Ex: preciso levar o carro para lavar as 14:00"
      required
      autocomplite="off"
      ></b-form-textarea>
      </b-form-group>

      <b-button type ="submit" variant = "outline-primary" @click="salvar">Salvar</b-button>

    </b-form>
  </div>
</template>

<script>
import ToastMixin  from "@/mixins/ToastMixin.js";
import {required, minLength} from "vuelidate/lib/validators";
export default {
  name: "Form",

  mixins : [ToastMixin], 

  data(){
    return {
      form : {
        subject : "",
        description : ""
      },
      methodSave: "novo"
    }
  },

  validations : {
    form : {
      
    }

  },


  created() {
    if(this.$route.params.index === 0 || this.$route.params.index !== undefined){
      this.methodSave = "update";
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      this.form = tasks[this.$router.params.index];
    }
    
  },
  methods : {
    salvar(){
      if(this.methodSave === "update"){
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks[this.$route.params.index] = this.form;
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
        this.showToast("sucess", "Sucesso!", "Tarefa cadastrada com sucesso");
        this.$router.push({ name : "list"});
        return;
      }

      let tasks = (localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")) : [];
      tasks.push(this.form);
      localStorage.setItem("tasks", JSON.stringify(tasks));    
      this.$router.push({ name : "list"});
    }
  }
}

</script>
