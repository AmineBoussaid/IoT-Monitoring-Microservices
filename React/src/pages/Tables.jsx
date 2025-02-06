import { useState, useEffect } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, TextField, Select, MenuItem, InputLabel, FormControl, Box 
} from "@mui/material";
import axios from "axios";

function Tables() {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    axios.get("/data/devices.json")
      .then((response) => {
        setDevices(response.data);
        setFilteredDevices(response.data);
      })
      .catch((error) => console.error("Erreur chargement devices.json", error));
  }, []);

  // Fonction de filtrage et de recherche
  useEffect(() => {
    let filtered = devices;

    if (searchQuery) {
      filtered = filtered.filter((device) =>
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((device) => device.status === statusFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter((device) => device.type === typeFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter((device) => 
        new Date(device.created_at).toISOString().split("T")[0] === dateFilter
      );
    }

    setFilteredDevices(filtered);
  }, [searchQuery, statusFilter, typeFilter, dateFilter, devices]);

  return (
    <Box sx={{ mt: 0, p: 0 }}>
      {/* Zone de recherche et filtres */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField 
          label="Rechercher..." 
          variant="outlined" 
          fullWidth 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />

        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
            <MenuItem value="">Tous</MenuItem>
            <MenuItem value="active">Actif</MenuItem>
            <MenuItem value="inactive">Inactif</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Type</InputLabel>
          <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} label="Type">
            <MenuItem value="">Tous</MenuItem>
            <MenuItem value="sensor">Capteur</MenuItem>
            <MenuItem value="device">Appareil</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Date de création"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 3 }}>
        <Table>
          {/* En-tête du tableau */}
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              {[
                "Créé le", "Nom", "Description", "Type", "Localisation",
                "Status", "Valeur", "Unité",
                "Mis à jour", "Dernière lecture", "Dernière Humidité",
                "Dernière Pression", "Actions"
              ].map((head) => (
                <TableCell key={head} sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Corps du tableau */}
          <TableBody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <TableRow key={device.name} hover>
                  <TableCell align="center">{device.name}</TableCell>
                  <TableCell align="center">{device.description || "N/A"}</TableCell>
                  <TableCell align="center">{device.type || "N/A"}</TableCell>
                  <TableCell align="center">{device.location || "N/A"}</TableCell>
                  <TableCell align="center" sx={{ color: device.status === "active" ? "green" : "red", fontWeight: "bold" }}>
                    {device.status}
                  </TableCell>
                  <TableCell align="center">{device.measurement_value ?? "N/A"}</TableCell>
                  <TableCell align="center">{device.unit || "N/A"}</TableCell>
                  <TableCell align="center">{new Date(device.created_at).toLocaleDateString() || "N/A"}</TableCell>
                  <TableCell align="center">{new Date(device.updated_at).toLocaleDateString() || "N/A"}</TableCell>
                  <TableCell align="center">{new Date(device.last_reading).toLocaleDateString() || "N/A"}</TableCell>
                  <TableCell align="center">{device.history?.[device.history.length - 1]?.humidity ?? "N/A"}</TableCell>
                  <TableCell align="center">{device.history?.[device.history.length - 1]?.pressure ?? "N/A"}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" size="small">Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={13} align="center">Aucun résultat trouvé</TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
}

export default Tables;
