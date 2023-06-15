const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

//Connexion a la bd
mongoose.connect('mongodb+srv://bastounetdenay:5lbcaMa8jMpwCfvj@clusterbonus.jpiewxb.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connecté à la base de données MongoDB');
  })
  .catch((error) => {
    console.error('Erreur de connexion à la base de données MongoDB:', error);
  });

//Définition des shema mongoose
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

// Définition des modèles
const Chicken = mongoose.model('Chicken', chickenSchema);
const Farmyard = mongoose.model('Farmyard', farmyardSchema);

//POST farmyard
app.post('/farmyard', async (req, res) => {
  const { name, location } = req.body;

  const farmyard = new Farmyard({
    name,
    location,
  });

  try {
    const savedFarmyard = await farmyard.save();
    res.status(201).json(savedFarmyard);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la ferme' });
  }
});

//GET chicken
app.get('/chicken', async (req, res) => {
    try {
      const chickens = await Chicken.find().populate('farmyard');
      res.json(chickens);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des poulets' });
    }
  });

//GET chicken id
app.get('/chicken/:id', async (req, res) => {
    const chickenId = req.params.id;
  
    try {
      const chicken = await Chicken.findById(chickenId).populate('farmyard');
      if (chicken) {
        res.json(chicken);
      } else {
        res.status(404).json({ error: 'Poulet non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération du poulet' });
    }
  });
//POST chicken
app.post('/chicken', async (req, res) => {
  const { name, birthday, weight, farmyardId } = req.body;

  try {
    const farmyard = await Farmyard.findById(farmyardId);
    if (!farmyard) {
      return res.status(404).json({ error: 'Ferme non trouvée' });
    }

    const chicken = new Chicken({
      name,
      birthday,
      weight,
      farmyard: farmyard._id,
    });

    const savedChicken = await chicken.save();
    res.status(201).json(savedChicken);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du poulet' });
  }
});
//PUT chicken id
app.put('/chicken/:id', async (req, res) => {
    const chickenId = req.params.id;
    const { name, birthday, weight, steps, isRunning, farmyard } = req.body;
  
    try {
      const updatedChicken = await Chicken.findByIdAndUpdate(chickenId, {
        name,
        birthday,
        weight,
        steps,
        isRunning,
        farmyard,
      }, { new: true });
      
      if (updatedChicken) {
        res.json(updatedChicken);
      } else {
        res.status(404).json({ error: 'Poulet non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du poulet' });
    }
  });
//PATCH chicken id
app.patch('/chicken/:id', async (req, res) => {
    const chickenId = req.params.id;
    const data = req.body;
  
    try {
        const chicken = await Chicken.findById(chickenId);
    
        if (!chicken) {
          return res.status(404).json({ error: 'Poulet non trouvé' });
        }
    
        Object.assign(chicken, data);
        const savedChicken = await chicken.save();
    
        res.json(savedChicken);
      } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du poulet' });
      }
  });
//DELETE chicken id
app.delete('/chicken/:id', async (req, res) => {
    const chickenId = req.params.id;
  
    try {
      const deletedChicken = await Chicken.findByIdAndRemove(chickenId);
      
      if (deletedChicken) {
        res.json({ message: 'Poulet supprimé avec succès' });
      } else {
        res.status(404).json({ error: 'Poulet non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression du poulet' });
    }
  });
//POST chicken run
app.post('/chicken/run', async (req, res) => {
    const chickenId = req.body.chickenId;
  
    try {
      const updatedChicken = await Chicken.findByIdAndUpdate(chickenId, { $inc: { steps: 1 } }, { new: true });
      
      if (updatedChicken) {
        res.json(updatedChicken);
      } else {
        res.status(404).json({ error: 'Poulet non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du poulet' });
    }
  });
  app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
  });    

