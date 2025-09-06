import { useState } from "react";
import { storage, db } from "../../Components/Firebase/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  LinearProgress,
  Tabs,
  Tab,
} from "@mui/material";
import Proyectos from "../../Components/Proyectos/Proyectos";
import Post from "../../Components/Post/Post";

export default function Admin() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Selecciona un archivo primero");

    try {
      setUploading(true);
      const storageRef = ref(storage, "CV-HernandoRey.pdf");
      const metadata = {
        contentType: "application/pdf",
        contentDisposition: "attachment; filename=CV-HernandoRey.pdf",
      };
      await uploadBytes(storageRef, file, metadata);
      const url = await getDownloadURL(storageRef);
      setDownloadURL(url);
      await setDoc(doc(db, "config", "cv"), {
        url,
        updatedAt: new Date().toISOString(),
      });
      alert("Archivo subido y guardado en Firestore ✅");
    } catch (error) {
      console.error("Error al subir archivo:", error);
      alert("Error al subir archivo ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: { xs: 6, md: 8 },
        mb: { xs: 8.5, md: 8, lg: 2 },
        // border: "2px solid red",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
        Administrar Mi Sitio Web
      </Typography>

      {/* Sección para subir el CV */}
      <Card
        sx={{
          mb: 4,
          width: "100%",
          maxWidth: 800,
          // border: "2px solid red"
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Subir PDF de mi CV
          </Typography>

          <Box sx={{ display: "grid", gap: 2 }}>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            {uploading && <LinearProgress />}
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              Subir PDF
            </Button>
            {downloadURL && (
              <TextField
                label="URL del CV"
                value={downloadURL}
                fullWidth
                slotProps={{ readOnly: true }}
                sx={{ mt: 2 }}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Sección de administración con pestañas */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Pestañas */}
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ mb: 2 }}
        >
          <Tab label="Proyectos" />
          <Tab label="Post" />
          <Tab label="Articulos" />
        </Tabs>

        {/* Contenido de la pestaña Proyectos */}
        <Box hidden={tabValue !== 0} sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" color="primary" gutterBottom>
              Edita tus Proyectos
            </Typography>

            <Proyectos />
          </Box>
        </Box>

        {/* Contenido de la pestaña Post */}
        <Box hidden={tabValue !== 1} sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" color="primary" gutterBottom>
              Edita tus Post
            </Typography>

            <Post />
          </Box>
        </Box>

        {/* Contenido de la pestaña Articulos */}
        <Box hidden={tabValue !== 2} sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" color="primary" gutterBottom>
              Crea tus Articulos
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
