<template>
    <div class="wrapper">
        <div class="container">
            <form @submit="signup" class="ui form">

                <div class="field">
                    <label class="txt">Url Logo</label>
                    <input type="text" v-model="avatar">
                </div>

                <div class="field">
                        <div class="field">
                            <label class="txt">Nom de l'Entreprise</label>
                            <input type="text" v-model="lastname" placeholder="ex : ThePlaceToBe">
                        </div>
                </div>

                <div class="field">
                    <label class="txt">Adresse</label>
                    <input id="Adresse" v-model="address" type="text" placeholder="ex : 5 rue du pont"/>
                </div>

                <div class="field">
                    <label class="txt">Code Postal</label>
                    <input id=codepostal v-model="postalCode" type="number" placeholder=" ex : 75000 CEDEX">
                </div>

                <div class="field">
                    <label class="txt">Numéro de téléphone</label>
                    <input id=Phonenumber v-model="phone" type="number" placeholder="ex : 0611223344">
                </div>

                <div class="field">
                    <label class="txt">Adresse Mail</label>
                    <input id="email" v-model="email" type="email" placeholder=" ex : lefleuron@lefleuron.com">
                </div>
                <div class="two fields">
                    <div class="field">
                        <label class="txt">Mot de passe</label>
                        <input id="mdp" v-model="password" type="password">
                    </div>

                    <div class="field">
                        <label class="txt" for="cmdp">Confirmer le Mot de passe</label>
                        <input id="cmdp" type="password">
                    </div>
                </div>
                <div class="ui negative message" v-show="errors">
                    <div class="header">
                        {{ errors }}
                    </div>
                </div>
                <button class="ui-button">Inscrire cette Entreprise</button>
            </form>
        </div>
    </div>
</template>

<script>
	import AuthService from '../services/auth';
	import Cookies from 'js-cookie';

	export default {
		data() {
			return {
				men: null,
				women: null,
				avatar: null,
				lastname: null,
				firstname: null,
				birthday: null,
				address: null,
				postalCode: null,
				phone: null,
				email: null,
				password: null,
        errors: null,
			}
		},
		methods:{
			signup(e) {
				e.preventDefault();
				let gender = this.women ? 1 : 2;
				AuthService.signup({
					firstname: this.firstname,
					lastname: this.lastname,
					avatar: this.avatar,
					phone: this.phone,
					birthday: this.birthday,
					postalCode: this.postalCode,
					address: this.address,
					gender: gender,
          password: this.password,
          email: this.email
				}, (err, response) => {
					this.errors = null;
					if (err) {
						this.errors = err.response.data.result.errors.email || "Les informations sont mal renseignées";
					} else {
						Cookies.set('token', response.data.result.session.token, { expires: 1});
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
    .ui-button {
        background-color: #1ebc30;
    }
    .txt {
        color: white!important;
        padding-top: 5px;
    }
</style>