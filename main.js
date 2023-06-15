const axios = require('axios');

async function createFarmyard(name, location) {
  try {
    const response = await axios.post('http://localhost:3000/farmyard', {
      name,
      location,
    });
    console.log('Ferme créée avec succès :', response.data);
  } catch (error) {
    console.error('Erreur lors de la création de la ferme :', error.response.data);
  }
}

async function getChicken() {
  try {
    const response = await axios.get('http://localhost:3000/chicken');
    console.log('Poulets récupérés avec succès :', response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des poulet :', error.response.data);
  }
}

async function getChickenId(chickenId) {
  try {
    const response = await axios.get(`http://localhost:3000/chicken/${chickenId}`);
    console.log('Poulet récupéré avec succès :', response.data);
  } catch (error) {
    console.error('Erreur lors de la récuperation du poulet :', error.response.data);
  }
}

async function createChicken(name, birthday, weight, farmyardId) {
  try {
    const response = await axios.post('http://localhost:3000/chicken', {
      name,
      birthday,
      weight,
      farmyardId
    });
    console.log('Poulet créée avec succès :', response.data);
  } catch (error) {
    console.error('Erreur lors de la création du poulet :', error.response.data);
  }
}

async function runChicken(chickenId) {
  try {
    const response = await axios.post('http://localhost:3000/chicken/run', {
      chickenId
    });
    console.log('Poulet court avec succès :', response.data);
  } catch (error) {
    console.error('Erreur lors de la course du poulet :', error.response.data);
  }
}

async function deleteChicken(chickenId) {
  try {
    const response = await axios.delete(`http://localhost:3000/chicken/${chickenId}`);
    console.log('Poulet supprimé avec succès :', response.data);
  } catch (error) {
    console.error('Erreur lors de la suppression du poulet :', error.response.data);
  }
}

async function updateChicken(chickenId, name, birthday, weight, farmyardId, steps, isRunning) {
  try {
    const response = await axios.put(`http://localhost:3000/chicken/${chickenId}`, {
      name,
      birthday,
      weight,
      steps,
      isRunning,
      farmyardId,
    });
    console.log('Poulet mis a jour avec succès :', response.data);
  } catch (error) {
    console.error('Erreur lors de la mise a jour du poulet :', error.response.data);
  }
}

async function patchChicken(chickenId, chickenData) {
  try {
    const response = await axios.patch(`http://localhost:3000/chicken/${chickenId}`, 
    chickenData
    );
    console.log('Poulet mis a jour avec succès :', response.data);
  } catch (error) {
    console.error('Erreur lors de la mise a jour du poulet :', error.response.data);
  }
}

//Exemples de tests ( vous pouvez remplacer les valeurs d'id avec vos tuples créés )
// getChicken()
// getChickenId('6489e3c19cadf299de850c57')
// createChicken('testChicken',Date.now(),2.6,'6489d8ba5ea7e621b1c39a72');
// createFarmyard('testFarmyard','testland');
// runChicken('6489e3c19cadf299de850c57');
// updateChicken('6489e3c19cadf299de850c57','update',Date.now(),66,'648b1a23943dbdd88cba44ba',85,true)
// patchChicken('6489e3c19cadf299de850c57',{name: 'updatePatch'});
// deleteChicken('648b1a23943dbdd88cba44bc');