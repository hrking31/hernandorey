import { useState, useEffect } from "react";
import { storage, db } from "../../Components/Firebase/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  LinearProgress,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function Admin() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");

  const [logoFile, setLogoFile] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoURL, setLogoURL] = useState("");

  const [proyectos, setProyectos] = useState([]);
  const [nuevo, setNuevo] = useState({
    text: "",
    href: "",
    subtext: "",
    logoUrl: "",
  });

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "proyectos"));
        setProyectos(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
        alert("Error al cargar proyectos ❌");
      }
    };
    fetchProyectos();
  }, []);

  // Agregar proyecto
  const handleAdd = async () => {
    try {
      const docRef = await addDoc(collection(db, "proyectos"), nuevo);
      setProyectos([...proyectos, { id: docRef.id, ...nuevo }]);
      setNuevo({ text: "", href: "", subtext: "", logoUrl: "" });
      alert("Proyecto agregado correctamente ✅");
    } catch (error) {
      console.error("Error al agregar proyecto:", error);
      alert("Error al agregar proyecto ❌");
    }
  };

  // Actualizar estado local
  const handleLocalUpdate = (id, field, value) => {
    setProyectos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Sincronizar cambios con Firestore
  const handleSaveToFirestore = async (id) => {
    try {
      const proyecto = proyectos.find((p) => p.id === id);
      const proyectoRef = doc(db, "proyectos", id);
      await updateDoc(proyectoRef, {
        text: proyecto.text || "",
        href: proyecto.href || "",
        subtext: proyecto.subtext || "",
        logoUrl: proyecto.logoUrl || "",
      });
      alert("Proyecto actualizado en Firestore ✅");
    } catch (error) {
      console.error("Error al guardar proyecto en Firestore:", error);
      alert("Error al guardar proyecto ❌");
    }
  };

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

  const handleLogoFileChange = (e) => {
    if (e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleUploadLogo = async () => {
    if (!logoFile) return alert("Selecciona un archivo primero");

    try {
      setUploadingLogo(true);
      const storageRef = ref(storage, `logos/${Date.now()}_${logoFile.name}`);
      await uploadBytes(storageRef, logoFile);
      const url = await getDownloadURL(storageRef);
      setLogoURL(url);
      alert(`Logo subido ✅ URL: ${url}`);
    } catch (error) {
      console.error("Error al subir logo:", error);
      alert("Error al subir logo ❌");
    } finally {
      setUploadingLogo(false);
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

      {/* Sección para subir logos */}
      <Card
        sx={{
          mb: 4,
          width: "100%",
          maxWidth: 800,
          //  border: "2px solid red"
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Subir Logo para Proyecto
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sube una imagen y obtén la URL para usarla en los proyectos.
          </Typography>
          <Box sx={{ display: "grid", gap: 2 }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoFileChange}
            />
            {uploadingLogo && <LinearProgress />}
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadLogo}
              disabled={!logoFile || uploadingLogo}
            >
              Subir Logo
            </Button>

            {logoURL && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  label="URL del Logo"
                  value={logoURL}
                  fullWidth
                  slotProps={{ readOnly: true }}
                  sx={{ mt: 2 }}
                />
                <Box sx={{ display: "flex", alignItems: "center", mt:2 }}>
                  <IconButton
                    onClick={() => navigator.clipboard.writeText(logoURL)}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Sección para agregar proyectos */}
      <Card
        sx={{
          mb: 4,
          width: "100%",
          maxWidth: 800,
          //  border: "2px solid red"
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Agregar Nuevo Proyecto
          </Typography>
          <Box sx={{ display: "grid", gap: 2 }}>
            <TextField
              label="Nombre"
              value={nuevo.text}
              onChange={(e) => setNuevo({ ...nuevo, text: e.target.value })}
              fullWidth
              slotProps={{
                inputLabel: {
                  sx: { overflow: "visible" },
                },
              }}
            />
            <TextField
              label="Enlace"
              value={nuevo.href}
              onChange={(e) => setNuevo({ ...nuevo, href: e.target.value })}
              fullWidth
              slotProps={{
                inputLabel: {
                  sx: { overflow: "visible" },
                },
              }}
            />
            <TextField
              label="Descripción"
              value={nuevo.subtext}
              onChange={(e) => setNuevo({ ...nuevo, subtext: e.target.value })}
              fullWidth
              multiline
              rows={2}
              slotProps={{
                inputLabel: {
                  sx: { overflow: "visible" },
                },
              }}
            />
            <TextField
              label="Logo URL"
              value={nuevo.logoUrl}
              onChange={(e) => setNuevo({ ...nuevo, logoUrl: e.target.value })}
              fullWidth
              slotProps={{
                inputLabel: {
                  sx: { overflow: "visible" },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={!nuevo.text || !nuevo.href}
            >
              Agregar Proyecto
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Sección para listar proyectos */}
      <Typography variant="h6" gutterBottom>
        Lista de Proyectos
      </Typography>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        // border="2px solid red"
      >
        {proyectos.map((p) => (
          <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
            <Card
              sx={{
                p: 2,
                height: "100%",
                width: "100%",
              }}
            >
              <CardContent>
                <TextField
                  label="Nombre"
                  value={p.text || ""}
                  onChange={(e) =>
                    handleLocalUpdate(p.id, "text", e.target.value)
                  }
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Enlace"
                  value={p.href || ""}
                  onChange={(e) =>
                    handleLocalUpdate(p.id, "href", e.target.value)
                  }
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Descripción"
                  value={p.subtext || ""}
                  onChange={(e) =>
                    handleLocalUpdate(p.id, "subtext", e.target.value)
                  }
                  fullWidth
                  margin="dense"
                  multiline
                  rows={3}
                />
                <TextField
                  label="Logo URL"
                  value={p.logoUrl || ""}
                  onChange={(e) =>
                    handleLocalUpdate(p.id, "logoUrl", e.target.value)
                  }
                  fullWidth
                  margin="dense"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSaveToFirestore(p.id)}
                  sx={{ mt: 2 }}
                >
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
