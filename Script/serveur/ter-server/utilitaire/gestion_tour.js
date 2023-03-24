

//TODO: veuillez me signaler les erreurs ou dysfonctionnement*/
module.exports = {
    //** =======================================================================================================================**/
//* joueur actuel
    currentPlayer : null,
//? fonction avec un message qui notifie le joueur que c'est son tour de joueur*/
    setTurnMessage : function (classToRemove, classToAdd, text) {
    //!une classe: exemple par hasard /
    // eslint-disable-next-line no-undef
    exemple.classList.remove(classToRemove);
    // eslint-disable-next-line no-undef
    exemple.classList.add(classToAdd);
    //eslint-disable-next-line no-undef
    exemple.innerHTML = text;
},

//! fonction pour trouver le prochain joueur ayant le droit de jouer**/

    getNextPlayer : function (players) {
    const cIndex = players.findIndex((p) => p === this.currentPlayer);
    let nIndex = cIndex;
    do {
        //**  je cherche l'index du next joueur*/
        nIndex = (nIndex + 1) % players.length;
    } while (!players[nIndex].turn); //* je passe le tour au prochain joueur
    return players[nIndex];
    },


//? fonction startgame ou deplacement
    startGame : function (players) {
    //* trouver le joueur hote
    //* à l'inverse de la vidéo envoyé dans le groupe je suis passé par le joueur hote au lieu du joueur ennemies*/

    const hote = players.find((p) => p.host);
    //!s'il n'est l'hôte*/
    if (!hote) {
        this.setTurnMessage("exemple", "exemple", `Ce n'est pas votre tour de jouer`);
        return;
    }

    //** définir le joueur actif*/
    //** la methode some () vérifie si un élément du tableau satisfait une condition*/

    while (players.some((p) => p.turn && p.host)) {
        this.setTurnMessage(
            "exemple",
            "exemple",
            `c'est le tour de ${this.currentPlayer.username}`
        );
    }
    // Todo: bah voila le code pour les deplacements possible du joueur
    //**ici */

    //! fin du tour du joueur actif*/
    this.currentPlayer.turn = false;
    //! deconnecte le joueur suivant*/
        this.currentPlayer = this.getNextPlayer();
    //!  tour du joueur suivant*/
        this.currentPlayer.turn = true;
}

}


