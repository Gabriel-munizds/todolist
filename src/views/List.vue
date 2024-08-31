<template>
  <div class="container mt-2">
    <template v-if="!isTasksEmpty">
      <div v-for="(task, index) in tasks" :key="index">
    <b-card :title="task.subject" class="mb-2">
      <b-card-text>{{ task.description }}</b-card-text>
      <b-button variant="outline-secondary" class="mr-2" @click="edit(index)">Editar</b-button>
      <b-button variant="outline-danger" class="mr-2" @click="excluir(task, index)">Excluir</b-button>
    </b-card>
    </div>
    </template>

    <template v-else="isTasksEmpty">
      <div class="empty-data mt-2">
        <img src="../assets/images/empty-data.svg" class="empty-data-image">
        <b-button 
            variant="outline-primary" 
            class="mt-3" 
            size="lg"
            to="/form"
            >Nova Tarefa 
          </b-button>
      </div>
    </template>
    

    <b-modal ref="modalRemove" hide-footer title="Exclusão de Tarefa"> 
      <div class="d-block text-center">
        Deseja Realmente excluir essa tarefa? {{ taskSelected.subject }}
      </div>

      <div class="mt3 d-flex justify-content-end">
        <b-button variant="outline-secondary" class="mr-2" @click="fecharModal">Cancelar</b-button>
        <b-button variant="outline-danger" class="mr-2" @click="confirmarExclusao(task, index)">Excluir</b-button>
      </div>

    </b-modal>

  </div>
</template>

<script>
export default {
  name: "List",

  data(){
    return {
      tasks : [],
      taskSelected : []
    }
  },
  created(){
    this.tasks = (localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")) : [];
  }, 
  methods: {
    edit(index){
      this.$router.push({name: "form", params: {index} });
    },
    excluir(task, index){
      this.taskSelected = task;
      this.taskSelected.index = index;
      this.$refs.modalRemove.show();
    },
    fecharModal(){
      this.$refs.modalRemove.hide();
    },
    confirmarExclusao(task, index){
      this.tasks.splice(this.taskSelected.index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.fecharModal();
    }
    
  },
  computed : {
    isTasksEmpty(){
      return this.tasks.length === 0;
    }

  }
}

</script>

<style scoped>

.empty-data-image {
  width: 300px;
  height: 300px;
}
.empty-data {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

</style>
