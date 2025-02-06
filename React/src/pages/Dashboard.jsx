import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";

function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [totalDevices, setTotalDevices] = useState(0);
  const [activeDevices, setActiveDevices] = useState(0);
  const [inactiveDevices, setInactiveDevices] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState(1);
  const [historyData, setHistoryData] = useState([]);
  const [avgTemp, setAvgTemp] = useState(0);
  const [avgHumidity, setAvgHumidity] = useState(0);
  const [avgPressure, setAvgPressure] = useState(0);

  useEffect(() => {
    axios.get("/data/devices.json")
      .then((response) => {
        const devicesData = response.data;
        setDevices(devicesData);
        setTotalDevices(devicesData.length);
        setActiveDevices(devicesData.filter(d => d.status === "active").length);
        setInactiveDevices(devicesData.filter(d => d.status === "inactive").length);
        if (devicesData[0]?.history) {
          updateStatistics(devicesData[0].history);
        }
      })
      .catch((error) => console.error("Erreur chargement devices.json", error));
  }, []);

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
    const selectedDeviceData = devices.find(d => d.id === event.target.value);
    if (selectedDeviceData?.history) {
      updateStatistics(selectedDeviceData.history);
    }
  };

  const updateStatistics = (data) => {
    setHistoryData(data);
    const avg = (key) => (data.reduce((acc, entry) => acc + (entry[key] || 0), 0) / data.length).toFixed(1);
    setAvgTemp(avg("value"));
    setAvgHumidity(avg("humidity"));
    setAvgPressure(avg("pressure"));
  };

  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>

    {/* STATISTICAL CARDS - PREMIÈRE LIGNE */}
    <Grid container spacing={3}>
      {[
        { title: "Total Devices", value: totalDevices, color: "#1976d2" },
        { title: "Active Devices", value: activeDevices, color: "#2e7d32" },
        { title: "Inactive Devices", value: inactiveDevices, color: "#d32f2f" }
      ].map((stat, index) => (
        <Grid key={index} item xs={12} sm={4} md={4}>
          <Card sx={{ backgroundColor: "#f5f5f5", borderRadius: 3, boxShadow: 4, textAlign: "center", padding: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>{stat.title}</Typography>
            <Typography variant="h4" sx={{ color: stat.color, fontWeight: "bold" }}>{stat.value}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>

    {/* STATISTICAL CARDS - DEUXIÈME LIGNE */}
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {[
        { title: "Avg Temp (°C)", value: avgTemp, color: "#1976d2" }, 
        { title: "Avg Humidity (%)", value: avgHumidity, color: "#2e7d32" }, 
        { title: "Avg Pressure (hPa)", value: avgPressure, color: "#ff9800" }
      ].map((stat, index) => (
        <Grid key={index} item xs={12} sm={4} md={4}>
          <Card sx={{ backgroundColor: "#f5f5f5", borderRadius: 3, boxShadow: 4, textAlign: "center", padding: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>{stat.title}</Typography>
            <Typography variant="h4" sx={{ color: stat.color, fontWeight: "bold" }}>{stat.value}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>


      {/* CHARTS CONTAINER */}
      <Grid item xs={12}>
        <Card sx={{ borderRadius: 3, boxShadow: 5, padding: 3 }}>
          <CardContent>
          <FormControl sx={{ minWidth: 150, height: 40 }}>
            <InputLabel>Device</InputLabel>
            <Select 
            value={selectedDevice} 
            onChange={handleDeviceChange} 
            sx={{ height: 40, fontSize: 14 }} 
            >
            {devices.map(device => (
            <MenuItem key={device.id} value={device.id}>{device.name}</MenuItem>
            ))}
            </Select>
            </FormControl>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>Device Data History</Typography>

          <Grid container spacing={3}>
              {/* TEMPERATURE CHART */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ mb: 1 }}>Temperature (°C)</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </Grid>

              {/* HUMIDITY CHART */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ mb: 1 }}>Humidity (%)</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Grid>

              {/* PRESSURE CHART */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ mb: 1 }}>Pressure (hPa)</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pressure" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
}

export default Dashboard;
