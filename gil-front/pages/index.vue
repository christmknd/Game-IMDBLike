<script setup>
useHead({
  title: 'IMDBLike'
})
definePageMeta({
  layout: "default",
});

</script>

<template>
  <div>
    <Head>
      <Title>HomePage</Title>
    </Head>
    <Body>
      <div class="container">
        <h1>GameIMDBLike</h1>

        <!--Bannière -->

        <section>
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/img/ps1.jpg" class="d-block w-100" alt="ps1">
            </div>
            <div class="carousel-item">
              <img src="/img/xboxone.jpg" class="d-block w-100" alt="xboxone">
            </div>
            <div class="carousel-item">
              <img src="/img/switch.jpg" class="d-block w-100" alt="switch">
            </div>
                  </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </section>

        

        <section>
          <h3>Un ensemble de jeux divers et variés</h3>

          <p>Bienvenue sur notre plateforme dédiée aux jeux vidéo , et en particulier à leur critique ! <br> <br>
            Nous sommes fiers de vous offrir un vaste éventail de jeux, allant des dernières sorties aux classiques intemporels. <br>
            Que vous soyez un amateur de jeux d'action, d'aventure, de stratégie ou de jeux de rôle,
            vous trouverez certainement quelque chose qui éveillera votre intérêt. <br>
            Explorez notre collection, dans lequel vous pouvez aussi ajouter des jeux, 
            pour découvrir des mondes fascinants, des personnages captivants et des aventures inoubliables. <br><br></p>
        </section>

        <section>
          <h3>Donnez vos avis sur les différents jeux</h3>

          <p>
            Votre avis compte ! <br> <br> 
            Nous vous encourageons à partager vos opinions sur les jeux que vous avez joués. <br>
             Partagez vos critiques, vos évaluations et vos réflexions sur chaque jeu pour aider d'autres joueurs à faire leur choix. <br>
              Vous avez aimé un jeu en particulier ? Faites-le savoir ! Vous avez rencontré des aspects négatifs ? Partagez-les également. <br> 
              Vos avis contribuent à enrichir notre communauté de joueurs et à guider les autres dans leurs décisions d'achat. <br> 
            Alors, n'hésitez pas à donner votre avis. <br> <br>
            <router-link :to="`/login`">Connectez-vous</router-link>
          </p>
        </section>

        <section>
          <h3>Conditions générales d'utilisation</h3>

          <p>
            Les Conditions Générales d'Utilisation (CGU) de notre site établissent les règles et les directives pour l'utilisation de nos services. <br>
             Elles couvrent des aspects importants tels que vos droits et responsabilités en tant qu'utilisateur, les limitations de responsabilité, la propriété intellectuelle, la confidentialité et d'autres points essentiels. <br> 
             En utilisant notre site, vous acceptez ces conditions, alors assurez-vous de les lire attentivement pour comprendre comment notre plateforme fonctionne. <br>
          </p>
        </section>


        <section>
          <h3>Règlement Général sur la Protection des Données (RGPD)</h3>
          <p>
            Le Règlement Général sur la Protection des Données (RGPD) est une législation qui vise à protéger la confidentialité et les droits des individus en ce qui concerne le traitement de leurs données personnelles. Notre engagement envers la protection de vos données est une priorité. <br>
             Dans notre section RGPD, nous expliquons comment nous collectons, utilisons et protégeons vos données, ainsi que vos droits en tant qu'utilisateur. <br>
             Nous respectons strictement les dispositions du RGPD et nous sommes transparents quant à notre approche en matière de confidentialité. <br> <br>
          </p>
        </section>
      
      </div>
      
    </Body>
  </div>
</template>

<style scoped></style>
