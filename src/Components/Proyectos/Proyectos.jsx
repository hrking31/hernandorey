import { useState, useEffect } from "react";
import { storage, db } from "../Firebase/Firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ProjectExtraFields from "./ProjectExtraFields";
import { toList } from "../../utils/lists";

const PROYECTO_VACIO = {
  text: "",
  href: "",
  subtext: "",
  logoUrl: "",
  imageUrl: "",
  techs: "",
  highlights: "",
  repoUrl: "",
  blogUrl: "",
  category: "",
  featured: false,
  client: false,
};

// Campos que se guardan en Firestore (las listas se guardan como arreglos).
const paraFirestore = (p) => ({
  text: p.text || "",
  href: p.href || "",
  subtext: p.subtext || "",
  logoUrl: p.logoUrl || "",
  imageUrl: p.imageUrl || "",
  techs: toList(p.techs),
  highlights: toList(p.highlights, "\n"),
  repoUrl: p.repoUrl || "",
  blogUrl: p.blogUrl || "",
  category: p.category || "",
  featured: Boolean(p.featured),
  client: Boolean(p.client),
});

export default function Proyectos() {
  const [logoFile, setLogoFile] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoURL, setLogoURL] = useState("");
  const [logos, setLogos] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [nuevo, setNuevo] = useState(PROYECTO_VACIO);

  // Obtener proyectos desde Firestore
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "proyectos"));
        const proyectosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Ordenar por el campo 'order'
        setProyectos(
          proyectosData.sort((a, b) => (a.order || 0) - (b.order || 0))
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
      const newProject = { ...paraFirestore(nuevo), order: proyectos.length };
      const docRef = await addDoc(collection(db, "proyectos"), newProject);
      setProyectos([...proyectos, { id: docRef.id, ...newProject }]);
      setNuevo(PROYECTO_VACIO);
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

  // Mover proyecto hacia arriba o abajo
  const handleMoveProject = async (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= proyectos.length) return;

    const newProyectos = [...proyectos];

    // Intercambiar posiciones
    const temp = newProyectos[index];
    newProyectos[index] = { ...newProyectos[newIndex], order: index };
    newProyectos[newIndex] = { ...temp, order: newIndex };

    setProyectos(newProyectos);

    try {
      const currentRef = doc(db, "proyectos", newProyectos[index].id);
      const swappedRef = doc(db, "proyectos", newProyectos[newIndex].id);

      await Promise.all([
        updateDoc(currentRef, { order: newProyectos[index].order }),
        updateDoc(swappedRef, { order: newProyectos[newIndex].order }),
      ]);
    } catch (error) {
      console.error("Error al actualizar orden:", error);
      alert("Error al actualizar orden ❌");
    }
  };

  // Eliminar proyecto
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "¿Seguro que deseas eliminar este proyecto?\nRecuerda eliminar el logo si ya no lo vas a usar"
      )
    )
      return;

    try {
      await deleteDoc(doc(db, "proyectos", id));
      setProyectos((prev) => prev.filter((p) => p.id !== id));
      alert("Proyecto eliminado ✅");
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
      alert("Error al eliminar proyecto ❌");
    }
  };

  // Sincronizar cambios con Firestore
  const handleSaveToFirestore = async (id) => {
    try {
      const proyecto = proyectos.find((p) => p.id === id);
      const proyectoRef = doc(db, "proyectos", id);
      await updateDoc(proyectoRef, {
        ...paraFirestore(proyecto),
        order: proyecto.order || 0,
      });
      alert("Proyecto actualizado en Firestore ✅");
    } catch (error) {
      console.error("Error al guardar proyecto en Firestore:", error);
      alert("Error al guardar proyecto ❌");
    }
  };

  // Manejo de subida de logos
  const handleLogoFileChange = (e) => {
    if (e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  // Subir logo a Firebase Storage
  const handleUploadLogo = async () => {
    if (!logoFile) return alert("Selecciona un archivo primero");

    try {
      setUploadingLogo(true);
      const fileName = `${Date.now()}_${logoFile.name}`;
      const storageRef = ref(storage, `logos/${fileName}`);

      await uploadBytes(storageRef, logoFile);
      const url = await getDownloadURL(storageRef);

      setLogos((prev) => [...prev, { name: fileName, url }]);

      setLogoURL(url);
      alert(`Logo subido ✅`);
    } catch (error) {
      console.error("Error al subir logo:", error);
      alert("Error al subir logo ❌");
    } finally {
      setUploadingLogo(false);
    }
  };

  //obtener logos de firebase storage
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const logosRef = ref(storage, "logos"); 
        const res = await listAll(logosRef);

        // Para cada archivo obtener su URL de descarga
        const urls = await Promise.all(
          res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return {
              name: itemRef.name, 
              url, 
            };
          })
        );

        setLogos(urls);
      } catch (error) {
        console.error("Error al obtener logos:", error);
      }
    };

    fetchLogos();
  }, []);

  // Eliminar logo
  const handleDeleteLogo = async (logoName) => {
    if (!window.confirm("¿Seguro que deseas eliminar este logo?")) return;

    try {
      const logoRef = ref(storage, `logos/${logoName}`);
      await deleteObject(logoRef);

      setLogos((prev) => prev.filter((logo) => logo.name !== logoName));

      alert("Logo eliminado ✅");
    } catch (error) {
      console.error("Error al eliminar logo:", error);
      alert("Error al eliminar logo ❌");
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
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
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

          <Box sx={{ display: "flex", mt: 4, gap: 2 }}>
            {logos.map((logo) => (
              <Box key={logo.name}>
                <img
                  src={logo.url}
                  alt={logo.name}
                  width={40}
                  onClick={() => handleDeleteLogo(logo.name)}
                />
              </Box>
            ))}
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
              label="Enlace (demo o sitio en vivo)"
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
            <ProjectExtraFields
              values={nuevo}
              onChange={(field, value) =>
                setNuevo((prev) => ({ ...prev, [field]: value }))
              }
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={!nuevo.text}
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
        {/* {proyectos.map((p) => ( */}
        {proyectos.map((p, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
            <Card
              sx={{
                p: 2,
                height: "100%",
                width: "100%",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" color="primary" gutterBottom>
                    {p.order + 1}
                  </Typography>

                  <Box>
                    <IconButton
                      onClick={() => handleMoveProject(index, "up")}
                      disabled={index === 0}
                      color="primary"
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleMoveProject(index, "down")}
                      disabled={index === proyectos.length - 1}
                      color="primary"
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                  </Box>
                </Box>

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
                  label="Enlace (demo o sitio en vivo)"
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
                <ProjectExtraFields
                  dense
                  values={p}
                  onChange={(field, value) =>
                    handleLocalUpdate(p.id, field, value)
                  }
                />

                <Box display={"flex"} justifyContent={"space-between"}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveToFirestore(p.id)}
                    sx={{ mt: 2 }}
                  >
                    Guardar Cambios
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(p.id)}
                    sx={{ mt: 2 }}
                  >
                    Eliminar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
