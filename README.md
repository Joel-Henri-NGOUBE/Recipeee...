<h1>Marche à suivre pour lancer et tester l'application</h1>

- Si vous avez téléchargé une version zippée et et que le dossier n'a pas été renommé, vous déplacer vers <b>/react-typescript/</b> avec la commande <code>cd /react-typescript</code>.
- Faire <code>npm install</code> pour récupérer l'entièreté des dépendances nécessaires à l'exécution du code.
- Réaliser la compilation du code grâce à la commande <code>npx tsc src/index.tsx --jsx preserve -t es2020 --outDir src --noEmit false --skipLibCheck true</code>.
- Une fois que la compilation est terminée, faire la commande <code>npm start</code> au même endroit et se déplacé vers le port choisi en local.