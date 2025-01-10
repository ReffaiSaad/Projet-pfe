import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { db } from './firebaseConfig'; // Assurez-vous que le chemin est correct
import { collection, addDoc } from 'firebase/firestore'; // Importez les méthodes Firestore

const SignUpScreen = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); // Aucun rôle sélectionné par défaut

  // Fonction pour vérifier le format de l'email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    if (nom === '' || prenom === '' || email === '' || role === '') {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires, y compris le rôle.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erreur', 'Le format de l\'email est incorrect.');
      return;
    }

    try {
      // Ajouter l'utilisateur à Firestore avec un identifiant unique généré
      await addDoc(collection(db, 'utilisateurs'), {
        nom,
        prenom,
        email,
        role,
        dateInscription: new Date().toISOString(),
      });

      Alert.alert('Succès', `Inscription réussie pour ${prenom} ${nom} en tant que ${role}`);
    } catch (error) {
      Alert.alert('Erreur', `Erreur lors de l'inscription: ${error.message}`);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Inscription</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={setNom}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={prenom}
          onChangeText={setPrenom}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleButton, role === 'suiveur' && styles.selectedRoleButton]}
            onPress={() => setRole('suiveur')}
          >
            <Text style={role === 'suiveur' ? styles.selectedRoleText : styles.roleText}>Suiveur</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton, role === 'suivi' && styles.selectedRoleButton]}
            onPress={() => setRole('suivi')}
          >
            <Text style={role === 'suivi' ? styles.selectedRoleText : styles.roleText}>Suivi</Text>
          </TouchableOpacity>
        </View>
        
        <Button title="S'inscrire" onPress={handleSignUp} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  roleButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  selectedRoleButton: {
    backgroundColor: '#4CAF50', // Vert pour sélection
    borderColor: '#4CAF50',
  },
  roleText: {
    fontSize: 16,
    color: '#000',
  },
  selectedRoleText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default SignUpScreen;
