<template>
  <div class="job">
    <div id="wrapper">
      <div class="ui grid containers">
        <div class="four wide column" v-for="job in jobs">
          <div class="ui raised card jobOffer" >
            <div class="content">
              <img class="ui avatar image" :src="job.createdBy.company.logo">
              <div class="header">{{ job.createdBy.company.name }}</div>
              <div class="meta">
                <span class="category">{{ job.title }}</span>
              </div>
              <div class="description">
                <p></p>
              </div>
            </div>
            <div class="extra content">
              <div class="right floated author">
                <p>{{ job.description }}</p>
                </div>
                <div id="apply" class="large ui buttons">
                  <button class="ui button">Postuler</button>
                  <button class="ui button">En savoir plus</button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import JobService from '../services/job';

  export default {
  	data() {
  		return {
  			jobs: null
      }
    },
    beforeRouteEnter(to, from, next) {
  		JobService.getAll((err, response) => {
  			next(vm => {
  				vm.jobs = response.data.result;
        });
      });
    }
  };
</script>

<style>
  .containers {
    display: inline;
  }
  .job {
    padding: 50px;
    background-image: url("http://www.fondsecran.eu/pictures/2016/0817/1/triangle-abstract-abstract-pattern-green-wallpaper-766253.jpg");
    padding-bottom: 300px;
    background-repeat: no-repeat;
    background-size: cover;
  }
  #apply {
    margin-top: 20px;
  }
</style>
