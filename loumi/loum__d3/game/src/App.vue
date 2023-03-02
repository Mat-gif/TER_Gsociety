<template>
  <div class="container">
    <div id="barrier"></div>
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
      .attr("height", "500px");

    //pas besoin de styliser pour le moment
    // .style("text-align", "center")
    // .style("justify-content", "center")
    // .style("align-items", "center");

    // const cellules = 9;   pas besion en tant que variables ont les utilises pas on mets directement la taille 9
    // const colonnes = 9;
    const matrice = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        matrice.push({
          a: i,
          o: j,
          id: `cellule n°:-${i}-${j}`,
        });
        // on cree directement l'objet svg pour ne pas se compliquer les choses
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

    // version ameliorée pour le moment
    let barriere = [
      {
        id: "barriere_1",
        x: 0,
        y: 0,
        width: 2 * m_case.attr("width"),
        height: 10,
      },
      {
        id: "barriere_2",
        x: 0,
        y: 0,
        width: 2 * m_case.attr("width"),
        height: 20,
      },
    ];
    const barrier = d3
      .select("#barrier")
      .append("svg")
      .attr("width", "200px")
      .attr("height", "200px");

    let m_barriere = barrier
      .selectAll(".barrier")
      .data(barriere)
      .enter()
      .append("rect")
      .attr("id", (d) => d.id)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .style("fill", "orange");
  },
  methods: {},
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
