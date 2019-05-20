<template>
    <form class="ui form" @submit="send">
        <div class="wrapper">
            <div class="container">
                <div class="field">
                    <label class="txt"><h3>Nom de votre Entreprise</h3></label>
                    <input type="text" name="nom_entreprise" placeholder="Le Nom de votre Entreprise" v-model="name">
                </div>
                <div class="field">
                    <label class="txt"><h3>Votre Site Web</h3></label>
                    <input type="text" name="site-web" placeholder="Lien vers votre Site Web" v-model="site">
                </div>
                <button class="ui button" type="submit">Faire une Requête au Fleuron</button>
            </div>
        </div>
    </form>
</template>

<script>
	import JobService from '../services/job';

	export default {
		data() {
			return {
				name: null,
				site: null,
			}
		},
		methods: {
			send(e) {
				e.preventDefault();
				if (this.name && this.site)
					JobService.addCompany({companyName: this.name, companySite: this.site}, (err, response) => {
						if (!err) this.$router.push('/');
          });
			}
		}
	}
</script>

<style scoped>
    .container {
        display:inline-block;
        width: 30%;
    }
    .field {
        padding-top: 10px;
        padding-bottom: 15px;
    }
    .txt {
        color: white!important;
        padding-top: 5px;
    }
    .form {
        border: 0;
    }
    .wrapper {
        padding-bottom: 100px;
        padding-top: 100px;
    }
    h3 {
        padding-bottom: 10px;
    }
</style>
