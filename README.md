# Chicken Farm API

Une API en JavaScript (Node.js) pour gérer une ferme de poulets.

## Prérequis

Cloner le repository : 
```bash
git clone https://github.com/WoeFaker/ChickenFarmAPI.git
```
Installation des dépendances :
```bash
npm install
```
Lancement de l'application dans le terminal de app.js :
```bash
node .\app.js
```

## Introduction

Ce code est une application serveur utilisant Express.js, une bibliothèque Node.js pour la création d'API web. L'application utilise également Mongoose, une bibliothèque ODM (Object-Document Mapping) pour interagir avec une base de données MongoDB. L'API permet de gérer des informations sur les poulets et les fermes dans une base de données.


## Configuration et dépendances

On commence par importer les bibliothèques nécessaires : 
```javascript
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
```   
Ensuite, on crée une instance de l'application Express :
```javascript
const app = express();
```
L'application Express est configurée pour utiliser body-parser afin de pouvoir traiter les données au format JSON dans les requêtes :
```javascript
app.use(bodyParser.json());
```
## Connexion à la base de données

L'application se connecte à une base de données MongoDB en utilisant Mongoose. La ligne suivante établit la connexion :
```javascript
mongoose.connect('mongodb+srv://<username>:<password>@clusterbonus.jpiewxb.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
```
Remarque : `<username>`, `<password>` et `<dbname>` doivent être remplacés par les informations appropriées pour la connexion à votre propre base de données.

Si la connexion réussit, le message "Connecté à la base de données MongoDB" est affiché dans la console. Sinon, une erreur est affichée.

## Définition des schémas Mongoose

Ensuite, les schémas Mongoose sont définis pour les entités "Farmyard" (ferme) et "Chicken" (poulet) :
```javascript
const farmyardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

const chickenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthday: { type: Date },
  weight: { type: Number, required: true },
  steps: { type: Number, default: 0 },
  isRunning: { type: Boolean, default: false },
  farmyard: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmyard' },
});
```
Le schéma "Farmyard" a deux propriétés : `name` et `location`, toutes deux de type chaîne de caractères et requises.

Le schéma "Chicken" a plusieurs propriétés, dont certaines sont optionnelles (`birthday`) et d'autres ont des valeurs par défaut (`steps`, `isRunning`). La propriété `farmyard` est une référence à un document "Farmyard".

## Définition des modèles

Les modèles Mongoose sont créés à partir des schémas définis précédemment :
```javascript
const Chicken = mongoose.model('Chicken', chickenSchema);
const Farmyard = mongoose.model('Farmyard', farmyardSchema);
```
Ces modèles permettent d'interagir avec les collections "Chicken" et "Farmyard" de la base de données.

## Routes de l'API

L'API définit plusieurs routes pour effectuer des opérations sur les données des poulets et des fermes.

### Créer une ferme (POST /farmyard)

Cette route permet de créer une nouvelle ferme en enregistrant les informations fournies dans le corps de la requête. Les propriétés requises sont "name" et "location". Si la création de la ferme réussit, le code de réponse sera 201 (Créé) et le document de la ferme créée sera renvoyé. Sinon, une erreur avec le code 500 (Erreur interne du serveur) sera renvoyée.

### Récupérer tous les poulets (GET /chicken)

Cette route permet de récupérer tous les poulets de la base de données. Les poulets sont renvoyés avec les informations de leur ferme associée. Si la requête réussit, le code de réponse sera 200 (OK) et les poulets seront renvoyés au format JSON. Sinon, une erreur avec le code 500 (Erreur interne du serveur) sera renvoyée.

### Récupérer un poulet par son ID (GET /chicken/:id)

Cette route permet de récupérer un poulet spécifique en utilisant son ID. L'ID du poulet est spécifié dans l'URL de la requête.Si le poulet est trouvé, le code de réponse sera 200 (OK) et le poulet sera renvoyé au format JSON. Sinon, une erreur avec le code 404 (Non trouvé) sera renvoyée.

### Créer un poulet (POST /chicken)

Cette route permet de créer un nouveau poulet en enregistrant les informations fournies dans le corps de la requête. Les propriétés requises sont "name", "birthday", "weight" et "farmyardId". Si la création du poulet réussit, le code de réponse sera 201 (Créé) et le document du poulet créé sera renvoyé. Sinon, une erreur avec le code 500 (Erreur interne du serveur) sera renvoyée.

### Mettre à jour un poulet avec son ID (PUT /chicken/:id)

Cette route permet de mettre à jour un poulet spécifique en utilisant son ID. L'ID du poulet est spécifié dans l'URL de la requête. Les informations mises à jour sont fournies dans le corps de la requête. Si la mise à jour du poulet réussit, le code de réponse sera 200 (OK) et le document du poulet mis à jour sera renvoyé. Sinon, une erreur avec le code 404 (Non trouvé) sera renvoyée.

### Mettre à jour partiellement un poulet par son ID (PATCH /chicken/:id)

Cette route permet de mettre à jour partiellement un poulet spécifique en utilisant son ID. L'ID du poulet est spécifié dans l'URL de la requête. Les informations mises à jour sont fournies dans le corps de la requête. Si la mise à jour partielle du poulet réussit, le code de réponse sera 200 (OK) et le document du poulet mis à jour sera renvoyé. Sinon, une erreur avec le code 404 (Non trouvé) sera renvoyée.

### Supprimer un poulet par son ID (DELETE /chicken/:id)

Cette route permet de supprimer un poulet spécifique en utilisant son ID. L'ID du poulet est spécifié dans l'URL de la requête. Si la suppression du poulet réussit, le code de réponse sera 200 (OK) et un message de succès sera renvoyé. Sinon, une erreur avec le code 404 (Non trouvé) sera renvoyée.

### Faire courir un poulet (POST /chicken/run)

Cette route permet d'augmenter le nombre de pas d'un poulet spécifique en le faisant courir. L'ID du poulet est spécifié dans le corps de la requête. Si la mise à jour du poulet réussit, le code de réponse sera 200 (OK) et le document du poulet mis à jour sera renvoyé. Sinon, une erreur avec le code 404 (Non trouvé) sera renvoyée.

## Démarrage du serveur

Enfin, le serveur Express écoute les requêtes entrantes sur le port 3000 :
```javascript
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
```
Cela signifie que le serveur est accessible à l'adresse http://localhost:3000.

## Fonctions pour tester l'API

Dans le fichier main.js se trouve les fonctions pour tester les differentes requêtes de l'API.

