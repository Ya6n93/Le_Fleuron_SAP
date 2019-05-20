<template>
  <div id="app">
    <header class="head">
      <img class="logo" alt="Vue logo" src="./assets/logo.png">
      <router-link tag="button" to="/" class="btn" type="submit">Accueil</router-link>
      <a target="_blank" href="https://www.le-fleuron.fr/"><button class="btn2" type="submit">Site Le Fleuron</button></a>
    </header>
    <router-view></router-view>
    <footer class="footer">
      <div class="ui inverted vertical footer segment">
        <div class="ui center aligned container">
          <div class="ui stackable inverted divided grid">
            <div class="three wide column">
              <h4 class="ui inverted header">A propos</h4>
              <div class="ui inverted link list">
                <a href="#" class="item">Qui sommes nous ?</a>
              </div>
            </div>
            <div class="three wide column">
              <h4 class="ui inverted header">Adresse</h4>
              <div class="ui inverted link list">
                <a href="#" class="item">Le Soft</a>
                <a href="#" class="item">32, rue Pierre Rigaud</a>
                <a href="#" class="item">94200 Ivry sur Seine</a>
                <a href="#" class="item">Tél: 01 45 21 11 02</a>
              </div>
            </div>
            <div class="three wide column">
              <h4 class="ui inverted header">Trouvez-nous aussi</h4>
              <div class="ui inverted link list">
                <a id="network" href="https://www.facebook.com/Le-Fleuron-des-Entreprises-Responsables-221592781934088/"><i class="fab fa-facebook fa-2x"></i></a>
                <a id="network" href="https://www.linkedin.com/company/le-fleuron-des-entreprises-responsables/"><i class="fab fa-twitter fa-2x"></i></a>
                <a id="network" href="https://www.youtube.com/channel/UCP6IfYaY9CSiUMsOjjAE9tQ"><i class="fab fa-youtube fa-2x"></i></a>
                <a id="network" href="https://www.instagram.com/lefleuronentrepriseresponsable/"><i class="fab fa-instagram fa-2x"></i></a>
              </div>
            </div>
            <div class="seven wide column">
              <p>Le Fleuron - contact@le-fleuron.fr</p>
              <img class="logo-footer" src="./assets/logo.png">
            </div>
          </div>
        </div>
      </div>
    </footer>
    <v-dialog/>
  </div>
</template>
<script>

  export default {
    name: 'app',
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .logo{
    width: 200px;
    height: 100%;
    position: center;
  }
  .head {
    background-color: #2c3e50;;
    float: top;
    width: 100%;
    height: 80px;
  }
  #network {
    margin-right:6px;
  }
  .logo-footer {
    width: 250px;
    height: 100px;
    position: relative;
    display:inline-block;
  }
  .footer{
    width: 100%;
    position: relative;
    bottom: 0;
  }
  .ui.segment {
    position: relative;
    padding: inherit;
  }
  .btn {
    height: 30px;
    width: 150px;
    float: left;
    border-radius: 3px;
    border-color: #3c5876;
    background-color: #3c5876;
    color: white;
    font-family: "Arial Rounded MT Bold", sans-serif;
  }
  .btn2 {
    height: 30px;
    width: 150px;
    float: right;
    border-radius: 3px;
    border-color: #3c5876;
    background-color: #3c5876;
    color: white;
    font-family: "Arial Rounded MT Bold", sans-serif;
  }
</style>