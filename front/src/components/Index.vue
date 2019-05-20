<template>
    <div class="home">
        <div class="contents">
            <div class="ui segment">
                <div class="ui two column very relaxed grid">
                    <div class="column">
                        <h3>Entreprises</h3>
                        <p>Vous êtes une entreprise ?</p><br>
                        <router-link tag="button" class="ui button" to="/entreprise/add" type="submit">S'inscrire</router-link>
                    </div>
                    <div class="column">
                        <h3>Postulants</h3>
                        <p>Vous souhaitez postuler pour un job ?</p>
                        <router-link tag="button" class="ui button" to="/candidat/inscription" type="submit">S'inscrire</router-link>
                    </div>
                </div>
                <div class="ui vertical divider">
                    ou
                </div>
            </div>
            <router-link id="btn" tag="button" to="/connexion" class="fluid ui green button">Connexion</router-link>
            <h1>Notre Mission</h1>
        </div>
        <div class="mission">
            <div id="rond" class="ui large circular rotate reveal image">
                <img id="img" src="https://www.le-fleuron.fr/img/earth.png" class="visible content">
                <div id="img" class="hidden content"><br><br><br>PROMOUVOIR<br>LES ENTREPRISES<br>RESPONSABLES</div>
            </div>
            <div id="rond" class="ui large circular rotate reveal image">
                <img id="img" src="https://www.le-fleuron.fr/img/network.png" class="visible content">
                <div id="img" class="hidden content"><br><br><br>EN<br> IMMERSION<br> VIDEO</div>
            </div>
            <div id="rond" class="ui large circular rotate reveal image">
                <img id="img" src="https://www.le-fleuron.fr/img/light.png" class="visible content">
                <div id="img" class="hidden content"><br><br><br>INSPIRER<br> FEDERER<br> FIDELISER<br> SUSCITER L'INTERET</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>
<style>
    #rond {
        margin-right: 10px;
        margin-left: 10px;
    }
    h1 {
        padding-top: 120px;
        padding-bottom: 10px;
        color: white;
    }
    .mission {
        display: flex;
        width: 680px;
        margin: 0 auto;
    }
    #img {
        width: 250px;
        height: 200px;
        font-family: "Arial Black", sans-serif;
        font-size: xx-large;
        color: white;
    }
    #btn {
        margin-bottom: 20px;
    }
    .fluid {
        height: 50px;
    }
    .home {
        background-image: url("../assets/fond.jpg");
        width: 100%;
        height: 900px;
        background-position: top;
        background-size: cover;
        margin: 0 auto;
    }
    .contents {
        display: inline-block;
        width: 30%;
        padding-bottom: 30px;
        padding-top: 100px;
    }
    .ui.segment {
        padding-top: 15px;
        padding-bottom: 30px;
        padding-left: 10px;
        padding-right: 10px;
    }
    @media all and (max-width: 1300px) {
        .contents {
            width: 40%;
        }
    }
    @media all and (max-width: 900px) {
        .contents {
            width: 55%;
        }
    }
    @media all and (max-width: 550px) {
        .contents {
            width: 90%;
        }
    }
</style>