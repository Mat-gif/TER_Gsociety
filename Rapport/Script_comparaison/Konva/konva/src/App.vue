<template>
  <div ref="container"></div>
</template>

<script>
import Konva from 'konva';
/*
  Stage : zone de dessin principale où les formes sont placées.
  Layer : conteneurs pour les formes qui sont placées sur le Stage 
          Chaque Layer peut contenir plusieurs formes et peut être manipulé indépendamment des autres
*/
export default {
  mounted() {
    const stage = new Konva.Stage({
      container: this.$refs.container, // ref de la div contenu dans le template
      width: 500, // Dimensions de la scène principale
      height: 500
    });

    const layer = new Konva.Layer(); // Creation d'une nouvelle Layer
    stage.add(layer); // Ajout de la Layer a la scène principale

    let prevRect = null; // Garder une référence à l'élément précédemment cliqué

    for (let i = 0; i < 9; i++ ) {
      for( let j = 0; j < 9; j++) {
        const rect = new Konva.Rect({
          id: "("+i+","+j+")",
          x: 50*i,
          y: 50*j,
          width: 40,
          height: 40,
          fill: 'blue',
          listening: true
        });
        
        rect.on('click', function(evt)  {
          if (prevRect) prevRect.fill('blue'); // Réinitialiser l'élément précédemment cliqué
          evt.target.fill('red');
          prevRect = evt.target; // Mettre à jour la référence de l'élément précédemment cliqué
          layer.draw();
        });

        layer.add(rect); // Ajouter le rectangle à la couche
      }
    }
    stage.draw(); // Mettre a jour la Scène principale
  },
}
</script>
