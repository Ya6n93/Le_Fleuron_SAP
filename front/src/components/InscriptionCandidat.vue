<template>
    <div class="wrapper">
        <div class="container">
            <form @submit="signup" class="ui form">
                <label class="txt" ><h4>Civilité</h4></label><br>
                <input type="radio" v-model="women" value="Mme" /> <label class="txt">  Madame  </label>
                <input type="radio" v-model="men" value="Mr" /> <label class="txt">  Monsieur  </label>

                <div class="field">
                    <label class="txt">Url Photo de Profile</label>
                    <input type="text" v-model="avatar">
                </div>

                <div class="field">
                    <label class="txt">Identité</label>
                    <div class="two fields">
                        <div class="field">
                            <input type="text" v-model="lastname" placeholder="Nom">
                        </div>
                        <div class="field">
                            <input type="text" v-model="firstname" placeholder="Prénom">
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="txt">Date de Naissance</label>
                    <input v-model="birthday" type="date" max="2000-12-31" min="1950-01-01" name="the_date">
                </div>

                <div class="field">
                    <label class="txt">Adresse</label>
                    <input id="Adresse" v-model="address" type="text" placeholder=" ex : 31 rue du pont"/>
                </div>

                <div class="field">
                    <label class="txt">Code Postal</label>
                    <input id=codepostal v-model="postalCode" type="number" placeholder=" ex : 75000">
                </div>

                <div class="field">
                    <label class="txt">Numéro de téléphone</label>
                    <input id=Phonenumber v-model="phone" type="number" placeholder=" ex : 0611223344">
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
                <button class="ui button">S'inscrire</button>
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
						this.$router.push('/candidat/joboard');
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
        margin-bottom: 10px;
    }
    .txt {
        color: white!important;
        padding-top: 5px;
    }
</style>