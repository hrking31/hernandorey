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
  Modal,
  Tabs,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

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

  const [openTabs, setOpenTabs] = useState(true);
  const [tabValue, setTabValue] = useState(0); // 0 = Proyectos, 1 = Post

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
      const newProject = { ...nuevo, order: proyectos.length };
      const docRef = await addDoc(collection(db, "proyectos"), newProject);
      setProyectos([...proyectos, { id: docRef.id, ...newProject }]);
      setNuevo({ text: "", href: "", subtext: "", logoUrl: "", order: 0 });
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
    if (!window.confirm("¿Seguro que deseas eliminar este proyecto?")) return;

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
        text: proyecto.text || "",
        href: proyecto.href || "",
        subtext: proyecto.subtext || "",
        logoUrl: proyecto.logoUrl || "",
        order: proyecto.order || 0,
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
      {/* ##################################################################### */}
      // {/* Modal con pestañas */}
      <Modal
        open={openTabs}
        onClose={() => setOpenTabs(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
 
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "background.paper",
              overflow: "auto",
              p: 3,
            }}
          >
            <Typography variant="h3" gutterBottom>
              Modal Pantalla Completa
            </Typography>

            {/* Pestañas */}
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{ mb: 2 }}
            >
              <Tab label="Proyectos" />
              <Tab label="Post" />
            </Tabs>

            {/* Contenido de la pestaña Proyectos */}
            {tabValue === 0 && (
              <Box>
                <Typography variant="h4" color="primary" gutterBottom>
                  Sección de Proyectos
                </Typography>
                <Typography variant="body1">
                  Aquí aparecerían tus proyectos con su lista y botones.
                </Typography>
              </Box>
            )}

            {/* Contenido de la pestaña Post */}
            {tabValue === 1 && (
              <Box>
                <Typography variant="h4" color="secondary" gutterBottom>
                  Sección de Post
                </Typography>
                <Typography variant="body1">
                  Aquí aparecerían tus posts con su lista y botones.
                </Typography>
              </Box>
            )}
          </Box>
        </Modal>

        {/* #####################################################################################         */}
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
                onChange={(e) =>
                  setNuevo({ ...nuevo, subtext: e.target.value })
                }
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
                onChange={(e) =>
                  setNuevo({ ...nuevo, logoUrl: e.target.value })
                }
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
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {p.order + 1}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}
                  >
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

        {/* Sección para agregar post */}
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
              Agregar Nuevo Post
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
                onChange={(e) =>
                  setNuevo({ ...nuevo, subtext: e.target.value })
                }
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
                onChange={(e) =>
                  setNuevo({ ...nuevo, logoUrl: e.target.value })
                }
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
                Agregar Post
              </Button>
            </Box>
          </CardContent>
        </Card>
      {/* </Modal> */}
    </Box>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import { storage, db } from "../../Components/Firebase/Firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   doc,
//   setDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   TextField,
//   Typography,
//   LinearProgress,
//   IconButton,
//   Modal,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// export default function Admin() {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [downloadURL, setDownloadURL] = useState("");

//   const [logoFile, setLogoFile] = useState(null);
//   const [uploadingLogo, setUploadingLogo] = useState(false);
//   const [logoURL, setLogoURL] = useState("");

//   const [proyectos, setProyectos] = useState([]);
//   const [nuevo, setNuevo] = useState({
//     text: "",
//     href: "",
//     subtext: "",
//     logoUrl: "",
//   });

//   const [openTabs, setOpenTabs] = useState(false);
//   const [tabValue, setTabValue] = useState(0); // 0 = Proyectos, 1 = Post

//   useEffect(() => {
//     const fetchProyectos = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "proyectos"));
//         const proyectosData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setProyectos(
//           proyectosData.sort((a, b) => (a.order || 0) - (b.order || 0))
//         );
//       } catch (error) {
//         console.error("Error al obtener proyectos:", error);
//         alert("Error al cargar proyectos ❌");
//       }
//     };
//     fetchProyectos();
//   }, []);

//   const handleAdd = async () => {
//     try {
//       const newProject = { ...nuevo, order: proyectos.length };
//       const docRef = await addDoc(collection(db, "proyectos"), newProject);
//       setProyectos([...proyectos, { id: docRef.id, ...newProject }]);
//       setNuevo({ text: "", href: "", subtext: "", logoUrl: "", order: 0 });
//       alert("Proyecto agregado correctamente ✅");
//     } catch (error) {
//       console.error("Error al agregar proyecto:", error);
//       alert("Error al agregar proyecto ❌");
//     }
//   };

//   const handleLocalUpdate = (id, field, value) => {
//     setProyectos((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
//     );
//   };

//   const handleMoveProject = async (index, direction) => {
//     const newIndex = direction === "up" ? index - 1 : index + 1;
//     if (newIndex < 0 || newIndex >= proyectos.length) return;

//     const newProyectos = [...proyectos];

//     const temp = newProyectos[index];
//     newProyectos[index] = { ...newProyectos[newIndex], order: index };
//     newProyectos[newIndex] = { ...temp, order: newIndex };

//     setProyectos(newProyectos);

//     try {
//       const currentRef = doc(db, "proyectos", newProyectos[index].id);
//       const swappedRef = doc(db, "proyectos", newProyectos[newIndex].id);

//       await Promise.all([
//         updateDoc(currentRef, { order: newProyectos[index].order }),
//         updateDoc(swappedRef, { order: newProyectos[newIndex].order }),
//       ]);
//     } catch (error) {
//       console.error("Error al actualizar orden:", error);
//       alert("Error al actualizar orden ❌");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("¿Seguro que deseas eliminar este proyecto?")) return;

//     try {
//       await deleteDoc(doc(db, "proyectos", id));
//       setProyectos((prev) => prev.filter((p) => p.id !== id));
//       alert("Proyecto eliminado ✅");
//     } catch (error) {
//       console.error("Error al eliminar proyecto:", error);
//       alert("Error al eliminar proyecto ❌");
//     }
//   };

//   const handleSaveToFirestore = async (id) => {
//     try {
//       const proyecto = proyectos.find((p) => p.id === id);
//       const proyectoRef = doc(db, "proyectos", id);
//       await updateDoc(proyectoRef, {
//         text: proyecto.text || "",
//         href: proyecto.href || "",
//         subtext: proyecto.subtext || "",
//         logoUrl: proyecto.logoUrl || "",
//         order: proyecto.order || 0,
//       });
//       alert("Proyecto actualizado en Firestore ✅");
//     } catch (error) {
//       console.error("Error al guardar proyecto en Firestore:", error);
//       alert("Error al guardar proyecto ❌");
//     }
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Selecciona un archivo primero");

//     try {
//       setUploading(true);
//       const storageRef = ref(storage, "CV-HernandoRey.pdf");
//       const metadata = {
//         contentType: "application/pdf",
//         contentDisposition: "attachment; filename=CV-HernandoRey.pdf",
//       };
//       await uploadBytes(storageRef, file, metadata);
//       const url = await getDownloadURL(storageRef);
//       setDownloadURL(url);
//       await setDoc(doc(db, "config", "cv"), {
//         url,
//         updatedAt: new Date().toISOString(),
//       });
//       alert("Archivo subido y guardado en Firestore ✅");
//       setOpenTabs(true); // Abrir modal al subir PDF
//     } catch (error) {
//       console.error("Error al subir archivo:", error);
//       alert("Error al subir archivo ❌");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleLogoFileChange = (e) => {
//     if (e.target.files[0]) {
//       setLogoFile(e.target.files[0]);
//     }
//   };

//   const handleUploadLogo = async () => {
//     if (!logoFile) return alert("Selecciona un archivo primero");

//     try {
//       setUploadingLogo(true);
//       const storageRef = ref(storage, `logos/${Date.now()}_${logoFile.name}`);
//       await uploadBytes(storageRef, logoFile);
//       const url = await getDownloadURL(storageRef);
//       setLogoURL(url);
//       alert(`Logo subido ✅ URL: ${url}`);
//     } catch (error) {
//       console.error("Error al subir logo:", error);
//       alert("Error al subir logo ❌");
//     } finally {
//       setUploadingLogo(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         mt: { xs: 6, md: 8 },
//         mb: { xs: 8.5, md: 8, lg: 2 },
//       }}
//     >
//       <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
//         Administrar Mi Sitio Web
//       </Typography>

//       {/* Sección para subir el CV */}
//       <Card sx={{ mb: 4, width: "100%", maxWidth: 800 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Subir PDF de mi CV
//           </Typography>
//           <Box sx={{ display: "grid", gap: 2 }}>
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handleFileChange}
//             />
//             {uploading && <LinearProgress />}
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleUpload}
//               disabled={!file || uploading}
//             >
//               Subir PDF
//             </Button>
//             {downloadURL && (
//               <TextField
//                 label="URL del CV"
//                 value={downloadURL}
//                 fullWidth
//                 slotProps={{ readOnly: true }}
//                 sx={{ mt: 2 }}
//               />
//             )}
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Modal con pestañas */}
//       <Modal
//         open={openTabs}
//         onClose={() => setOpenTabs(false)}
//         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             height: "100%",
//             bgcolor: "background.paper",
//             overflow: "auto",
//             p: 3,
//           }}
//         >
//           <Tabs
//             value={tabValue}
//             onChange={(e, newValue) => setTabValue(newValue)}
//             sx={{ mb: 2 }}
//           >
//             <Tab label="Proyectos" />
//             <Tab label="Post" />
//           </Tabs>

//           {tabValue === 0 && (
//             <Box>
//               {/* Aquí puedes renderizar la sección de proyectos tal cual está */}
//               <Typography variant="h6" gutterBottom>
//                 Lista de Proyectos
//               </Typography>
//               <Grid container columnSpacing={2} rowSpacing={2}>
//                 {proyectos.map((p, index) => (
//                   <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
//                     <Card sx={{ p: 2, height: "100%", width: "100%" }}>
//                       <CardContent>
//                         <Typography
//                           variant="subtitle2"
//                           color="primary"
//                           gutterBottom
//                         >
//                           {p.order + 1}
//                         </Typography>
//                         <Box
//                           sx={{
//                             display: "flex",
//                             justifyContent: "flex-end",
//                             mb: 1,
//                           }}
//                         >
//                           <IconButton
//                             onClick={() => handleMoveProject(index, "up")}
//                             disabled={index === 0}
//                             color="primary"
//                           >
//                             <ArrowUpwardIcon />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => handleMoveProject(index, "down")}
//                             disabled={index === proyectos.length - 1}
//                             color="primary"
//                           >
//                             <ArrowDownwardIcon />
//                           </IconButton>
//                         </Box>
//                         <TextField
//                           label="Nombre"
//                           value={p.text || ""}
//                           onChange={(e) =>
//                             handleLocalUpdate(p.id, "text", e.target.value)
//                           }
//                           fullWidth
//                           margin="dense"
//                         />
//                         <TextField
//                           label="Enlace"
//                           value={p.href || ""}
//                           onChange={(e) =>
//                             handleLocalUpdate(p.id, "href", e.target.value)
//                           }
//                           fullWidth
//                           margin="dense"
//                         />
//                         <TextField
//                           label="Descripción"
//                           value={p.subtext || ""}
//                           onChange={(e) =>
//                             handleLocalUpdate(p.id, "subtext", e.target.value)
//                           }
//                           fullWidth
//                           margin="dense"
//                           multiline
//                           rows={3}
//                         />
//                         <TextField
//                           label="Logo URL"
//                           value={p.logoUrl || ""}
//                           onChange={(e) =>
//                             handleLocalUpdate(p.id, "logoUrl", e.target.value)
//                           }
//                           fullWidth
//                           margin="dense"
//                         />
//                         <Box display={"flex"} justifyContent={"space-between"}>
//                           <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={() => handleSaveToFirestore(p.id)}
//                             sx={{ mt: 2 }}
//                           >
//                             Guardar Cambios
//                           </Button>
//                           <Button
//                             variant="outlined"
//                             color="error"
//                             onClick={() => handleDelete(p.id)}
//                             sx={{ mt: 2 }}
//                           >
//                             Eliminar
//                           </Button>
//                         </Box>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>
//           )}

//           {tabValue === 1 && (
//             <Box>
//               {/* Aquí va tu sección de Post */}
//               <Typography variant="h6" gutterBottom>
//                 Lista de Posts
//               </Typography>
//               {/* Puedes reutilizar tu sección de agregar post o mostrar posts existentes */}
//             </Box>
//           )}
//         </Box>
//       </Modal>

//       {/* Resto de tu código de logos y agregar proyectos/post permanece igual */}
//     </Box>
//   );
// }

// ##########################################################################################

// import { useState, useEffect } from "react";
// import { storage, db } from "../../Components/Firebase/Firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   doc,
//   setDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   TextField,
//   Typography,
//   LinearProgress,
//   IconButton,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import ProyectosModal from "../../Components/ProyectosModal/ProyectosModal";
// export default function Admin() {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [downloadURL, setDownloadURL] = useState("");

//   const [logoFile, setLogoFile] = useState(null);
//   const [uploadingLogo, setUploadingLogo] = useState(false);
//   const [logoURL, setLogoURL] = useState("");

//   const [proyectos, setProyectos] = useState([]);
//   const [nuevo, setNuevo] = useState({
//     text: "",
//     href: "",
//     subtext: "",
//     logoUrl: "",
//   });

//   const [openModal, setOpenModal] = useState(false);

//   // Obtener proyectos desde Firestore
//   useEffect(() => {
//     const fetchProyectos = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "proyectos"));
//         const proyectosData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         // Ordenar por el campo 'order'
//         setProyectos(
//           proyectosData.sort((a, b) => (a.order || 0) - (b.order || 0))
//         );
//       } catch (error) {
//         console.error("Error al obtener proyectos:", error);
//         alert("Error al cargar proyectos ❌");
//       }
//     };
//     fetchProyectos();
//   }, []);

//   // Agregar proyecto
//   const handleAdd = async () => {
//     try {
//       const newProject = { ...nuevo, order: proyectos.length };
//       const docRef = await addDoc(collection(db, "proyectos"), newProject);
//       setProyectos([...proyectos, { id: docRef.id, ...newProject }]);
//       setNuevo({ text: "", href: "", subtext: "", logoUrl: "", order: 0 });
//       alert("Proyecto agregado correctamente ✅");
//     } catch (error) {
//       console.error("Error al agregar proyecto:", error);
//       alert("Error al agregar proyecto ❌");
//     }
//   };

//   // Actualizar estado local
//   const handleLocalUpdate = (id, field, value) => {
//     setProyectos((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
//     );
//   };

//   // Mover proyecto hacia arriba o abajo
//   const handleMoveProject = async (index, direction) => {
//     const newIndex = direction === "up" ? index - 1 : index + 1;
//     if (newIndex < 0 || newIndex >= proyectos.length) return;

//     const newProyectos = [...proyectos];

//     // Intercambiar posiciones
//     const temp = newProyectos[index];
//     newProyectos[index] = { ...newProyectos[newIndex], order: index };
//     newProyectos[newIndex] = { ...temp, order: newIndex };

//     setProyectos(newProyectos);

//     try {
//       const currentRef = doc(db, "proyectos", newProyectos[index].id);
//       const swappedRef = doc(db, "proyectos", newProyectos[newIndex].id);

//       await Promise.all([
//         updateDoc(currentRef, { order: newProyectos[index].order }),
//         updateDoc(swappedRef, { order: newProyectos[newIndex].order }),
//       ]);
//     } catch (error) {
//       console.error("Error al actualizar orden:", error);
//       alert("Error al actualizar orden ❌");
//     }
//   };

//   // Eliminar proyecto
//   const handleDelete = async (id) => {
//     if (!window.confirm("¿Seguro que deseas eliminar este proyecto?")) return;

//     try {
//       await deleteDoc(doc(db, "proyectos", id));
//       setProyectos((prev) => prev.filter((p) => p.id !== id));
//       alert("Proyecto eliminado ✅");
//     } catch (error) {
//       console.error("Error al eliminar proyecto:", error);
//       alert("Error al eliminar proyecto ❌");
//     }
//   };

//   // Sincronizar cambios con Firestore
//   const handleSaveToFirestore = async (id) => {
//     try {
//       const proyecto = proyectos.find((p) => p.id === id);
//       const proyectoRef = doc(db, "proyectos", id);
//       await updateDoc(proyectoRef, {
//         text: proyecto.text || "",
//         href: proyecto.href || "",
//         subtext: proyecto.subtext || "",
//         logoUrl: proyecto.logoUrl || "",
//         order: proyecto.order || 0,
//       });
//       alert("Proyecto actualizado en Firestore ✅");
//     } catch (error) {
//       console.error("Error al guardar proyecto en Firestore:", error);
//       alert("Error al guardar proyecto ❌");
//     }
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Selecciona un archivo primero");

//     try {
//       setUploading(true);
//       const storageRef = ref(storage, "CV-HernandoRey.pdf");
//       const metadata = {
//         contentType: "application/pdf",
//         contentDisposition: "attachment; filename=CV-HernandoRey.pdf",
//       };
//       await uploadBytes(storageRef, file, metadata);
//       const url = await getDownloadURL(storageRef);
//       setDownloadURL(url);
//       await setDoc(doc(db, "config", "cv"), {
//         url,
//         updatedAt: new Date().toISOString(),
//       });
//       alert("Archivo subido y guardado en Firestore ✅");
//     } catch (error) {
//       console.error("Error al subir archivo:", error);
//       alert("Error al subir archivo ❌");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleLogoFileChange = (e) => {
//     if (e.target.files[0]) {
//       setLogoFile(e.target.files[0]);
//     }
//   };

//   const handleUploadLogo = async () => {
//     if (!logoFile) return alert("Selecciona un archivo primero");

//     try {
//       setUploadingLogo(true);
//       const storageRef = ref(storage, `logos/${Date.now()}_${logoFile.name}`);
//       await uploadBytes(storageRef, logoFile);
//       const url = await getDownloadURL(storageRef);
//       setLogoURL(url);
//       alert(`Logo subido ✅ URL: ${url}`);
//     } catch (error) {
//       console.error("Error al subir logo:", error);
//       alert("Error al subir logo ❌");
//     } finally {
//       setUploadingLogo(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         mt: { xs: 6, md: 8 },
//         mb: { xs: 8.5, md: 8, lg: 2 },
//       }}
//     >
//       <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
//         Administrar Mi Sitio Web
//       </Typography>

//       {/* Sección para subir el CV */}
//       <Card
//         sx={{
//           mb: 4,
//           width: "100%",
//           maxWidth: 800,
//         }}
//       >
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Subir PDF de mi CV
//           </Typography>
//           <Box sx={{ display: "grid", gap: 2 }}>
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handleFileChange}
//             />
//             {uploading && <LinearProgress />}
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleUpload}
//               disabled={!file || uploading}
//             >
//               Subir PDF
//             </Button>
//             {downloadURL && (
//               <TextField
//                 label="URL del CV"
//                 value={downloadURL}
//                 fullWidth
//                 slotProps={{ readOnly: true }}
//                 sx={{ mt: 2 }}
//               />
//             )}
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Botón para abrir el modal */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => setOpenModal(true)}
//         sx={{ mb: 4 }}
//       >
//         Gestionar Proyectos y Logos
//       </Button>

//       {/* Modal para gestionar contenido */}
//       <ProyectosModal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         file={file}
//         setFile={setFile}
//         uploading={uploading}
//         setUploading={setUploading}
//         downloadURL={downloadURL}
//         setDownloadURL={setDownloadURL}
//         logoFile={logoFile}
//         setLogoFile={setLogoFile}
//         uploadingLogo={uploadingLogo}
//         setUploadingLogo={setUploadingLogo}
//         logoURL={logoURL}
//         setLogoURL={setLogoURL}
//         proyectos={proyectos}
//         setProyectos={setProyectos}
//         nuevo={nuevo}
//         setNuevo={setNuevo}
//         handleFileChange={handleFileChange}
//         handleUpload={handleUpload}
//         handleLogoFileChange={handleLogoFileChange}
//         handleUploadLogo={handleUploadLogo}
//         handleAdd={handleAdd}
//         handleLocalUpdate={handleLocalUpdate}
//         handleMoveProject={handleMoveProject}
//         handleSaveToFirestore={handleSaveToFirestore}
//         handleDelete={handleDelete}
//       />
//     </Box>
//   );
// }
