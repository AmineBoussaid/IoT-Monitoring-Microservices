import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Réinitialiser l'erreur

    try {
      const response = await axios.post("http://127.0.0.1:8080/signin", {
        email,
        password
      });

      if (response.status === 200) {
        const token = response.data.access_token; // Récupérer le token JWT
        localStorage.setItem("token", token); // Sauvegarder le token

        navigate("/dashboard"); // Redirection après connexion réussie
      } else {
        setError("Identifiants incorrects, veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError("Erreur de connexion au serveur.");
    }
  };

  return (
    <Box sx={{ width: "300px", margin: "auto", textAlign: "center", mt: 10 }}>
      <Typography variant="h5" mb={2}>Connexion</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField 
        label="Email" 
        variant="outlined" 
        fullWidth 
        margin="normal" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />

      <TextField 
        label="Mot de passe" 
        type="password" 
        variant="outlined" 
        fullWidth 
        margin="normal" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
        Se connecter
      </Button>
    </Box>
  );
}

export default Login;
