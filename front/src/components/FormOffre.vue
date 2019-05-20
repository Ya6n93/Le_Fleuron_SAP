<template>
  <div class="wrapper">
    <div class="container">
      <form class="ui form" @submit="addOffer">
        <div class="field">
          <label class="txt">Nom du Poste</label>
          <input type="text" placeholder="Nom" v-model="title">
          <div class="field">
            <label class="txt">Type de Contrat</label>
            <input type="text" placeholder="Contrat" v-model="contract">
          </div>
          <div class="field">
            <label class="txt">Date de début</label>
            <input type="date" max="3000-12-31" min="2018-12-14" name="the_date" v-model="startAt">
          </div>
          <div class="field">
            <label class="txt">Localisation</label>
            <input type="text" placeholder="Localisation" v-model="localisation">
          </div>
          <div class="field">
            <label class="txt">Expérience requise</label>
            <textarea v-model="experience"></textarea>
          </div>
          <div class="field">
            <label class="txt">Description du Poste</label>
            <textarea v-model="description"></textarea>
          </div>
          <button class="ui button" type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
	import JobService from '../services/job';
	import { Container, Draggable } from 'vue-smooth-dnd'

	export default {
		components: {Container, Draggable},
		data() {
			return {
				title: null,
				contract: null,
				startAt: null,
				localisation: null,
				experience: null,
				description: null
			}
		},
		methods: {
			addOffer(e) {
				e.preventDefault();

				JobService.createOffer({
						title: this.title,
						contract: this.contract,
						startAt: this.startAt,
						localisation: this.localisation,
						experience: this.experience,
						description: this.description
					},
					(err, response) => {
						if (err) {

						} else {
							this.$router.push('/entreprise/dashboard');
						}
					});
			}
		}
	}
</script>

<style type="text/css">
  .container {
    display:inline-block;
    width: 30%;
    padding-bottom: 30px;
    padding-top: 15px;
  }
  .wrapper {
    background-image: url("../assets/fond.jpg");
    width: 100%;
    background-position: top;
    background-size: cover;
  }
  .ui.button {
    background-color: #1ebc30;
  }
  .field {
    color: white!important;
    height: 100%;
  }
</style>