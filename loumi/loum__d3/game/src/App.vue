<template>
  <div class="container">
    <div id="plateau"></div>
  </div>

  <div class="containr">
    <form action="post" class="form-group" v-on:submit="onSubmit">
      <label for="username">Username</label>
      <input type="text" name="" id="username" class="form-control" />
      <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
    <p></p>
  </div>
</template>

<!-- le script  sans composants et methods  -->
<script>
import "bootstrap/dist/css/bootstrap.css";
import * as d3 from "d3";
/// les elemnents du joueur
const joueur = {
  hote: false,
  idSalon: null,
  usernamer: "",
  pion: "",
  turn: false,
  barriere: null,
};

export default {
  mounted() {
    /// optimisation du code pour les fonctions de retrait et ajout de classe
    let classToAdd = function (c, a) {
      const classe = document.getElementById(c);
      if (classe) {
        classe.classList.add(a);
      }
    };

    let classToHide = function (c, r) {
      const classe = document.getElementById(c);
      if (classe) {
        classe.classList.remove(r);
      }
    };
    const plateau = d3
      .select("#plateau")
      .append("svg")
      .attr("width", "500px")
      .attr("height", "500px")
      .style("text-align", "center")
      .style("justify-content", "center")
      .style("align-items", "center");

    const cellules = 9;
    const colonnes = 9;
    const matrice = [];

    for (let i = 0; i < cellules; i++) {
      for (let j = 0; j < colonnes; j++) {
        matrice.push({
          a: i,
          o: j,
          id: `cellule n°:-${i}-${j}`,
        });
      }
    }

    const m_case = plateau
      .selectAll(".cell")
      .data(matrice)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("id", (d) => d.id)
      .attr("x", (d) => d.a * 50)
      .attr("y", (d) => d.o * 50)
      .attr("height", 40)
      .attr("width", 40)
      .style("fill", "blue");

    ////le click dans une cellule

    m_case.on("click", function (p) {
      /// toutes l
      d3.selectAll(".cell").style("fill", "blue");
      d3.select(this).style("fill", "red");
    });
  },
  methods: {
    
  },
};
</script>

<!-- j'ai laissé le même style css -->
<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
