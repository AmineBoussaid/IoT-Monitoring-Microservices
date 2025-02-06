import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";

function Login() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les utilisateurs depuis users.json
    axios.get("/data/users.json")
      .then((response) => {
        // Assurer que la réponse est un tableau avant de le mettre dans le state
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Les données des utilisateurs ne sont pas sous forme de tableau");
        }
      })
      .catch((error) => console.error("Erreur chargement users.json", error));
  }, []);

  const handleLogin = () => {
    if (users.length === 0) {
      alert("Les données utilisateurs ne sont pas encore chargées.");
      return;
    }

    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      alert("Email ou mot de passe incorrect");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4">Login</Typography>
        <TextField label="Email" margin="normal" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" margin="normal" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Connexion
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
