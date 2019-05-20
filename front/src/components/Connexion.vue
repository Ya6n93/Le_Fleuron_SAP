<template>
  <div class="wrapper">
    <div class="container">
      <form @submit="signin" class="ui form">
        <div class="field">
          <label class="txt"><h3>Adresse Email</h3></label>
          <input type="email" v-model="email" placeholder="Adresse Email">
        </div>
        <div class="field">
          <label class="txt"><h3>Mot de passe</h3></label>
          <input type="password" v-model="password" placeholder="Mot de Passe">
        </div>
        <div class="ui negative message" v-show="errors">
          <div class="header">
            {{ errors }}
          </div>
        </div>
        <button id="login_button" class="ui button" type="submit">Se Connecter</button>
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
				email: null,
				password: null,
				errors: null
			}
		},
		beforeRouteEnter(to, from, next) {

			next();
		},
		methods:{
			signin(e) {
				e.preventDefault();
				AuthService.signin({password:this.password, email:this.email}, (err, response) => {
					this.errors = null;
					if (err)
						this.errors = 'Pseudo ou mot de passe incorrect !';
					else {
						Cookies.set('token', response.data.result.session.token, { expires: 1});
						this.$router.push('/entreprise/dashboard');
					}
				});
			}
		}
	}
</script>

<style scoped>
  h3 {
    padding-bottom: 5px;
  }
  .wrapper {
    padding-bottom: 50px;
    padding-top: 50px;
  }
  .container {
    display:inline-block;
    width: 30%;
  }
  .txt {
    color: white!important;
    padding-top: 5px;
  }
  .ui.button {
    margin-top: 20px;
  }
  @media all and (max-width: 1000px) {
    .container {
      width: 50%;
    }
  }
  @media all and (max-width: 500px) {
    .container {
      width: 90%;
    }
  }
</style>
