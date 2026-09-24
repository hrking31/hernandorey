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

export default function Post() {
  const [logoFile, setLogoFile] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoURL, setLogoURL] = useState("");
  const [logos, setLogos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [nuevo, setNuevo] = useState({
    text: "",
    inputId: "",
    logoUrl: "",
  });

  // Obtener post desde Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Ordenar por el campo 'order'
        setPosts(postsData.sort((a, b) => (a.order || 0) - (b.order || 0)));
      } catch (error) {
        console.error("Error al obtener posts:", error);
        alert("Error al cargar posts ❌");
      }
    };
    fetchPosts();
  }, []);

  // Agregar post
  const handleAdd = async () => {
    try {
      const newProject = { ...nuevo, order: posts.length };
      const docRef = await addDoc(collection(db, "posts"), newProject);
      setPosts([...posts, { id: docRef.id, ...newProject }]);
      setNuevo({ text: "", inputId: "", logoUrl: "", order: 0 });
      alert("Post agregado correctamente ✅");
    } catch (error) {
      console.error("Error al agregar post:", error);
      alert("Error al agregar post ❌");
    }
  };

  // Actualizar estado local
  const handleLocalUpdate = (id, field, value) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Mover post hacia arriba o abajo
  const handleMovePost = async (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= posts.length) return;

    const newPosts = [...posts];

    // Intercambiar posiciones
    const temp = newPosts[index];
    newPosts[index] = { ...newPosts[newIndex], order: index };
    newPosts[newIndex] = { ...temp, order: newIndex };

    setPosts(newPosts);

    try {
      const currentRef = doc(db, "posts", newPosts[index].id);
      const swappedRef = doc(db, "posts", newPosts[newIndex].id);

      await Promise.all([
        updateDoc(currentRef, { order: newPosts[index].order }),
        updateDoc(swappedRef, { order: newPosts[newIndex].order }),
      ]);
    } catch (error) {
      console.error("Error al actualizar orden:", error);
      alert("Error al actualizar orden ❌");
    }
  };

  // Eliminar post
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "¿Seguro que deseas eliminar este post?\nRecuerda eliminar el logo si ya no lo vas a usar"
      )
    )
      return;

    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts((prev) => prev.filter((p) => p.id !== id));
      alert("Post eliminado ✅");
    } catch (error) {
      console.error("Error al eliminar post:", error);
      alert("Error al eliminar post ❌");
    }
  };

  // Sincronizar cambios con Firestore
  const handleSaveToFirestore = async (id) => {
    try {
      const post = posts.find((p) => p.id === id);
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        text: post.text || "",
        inputId: post.inputId || "",
        logoUrl: post.logoUrl || "",
        order: post.order || 0,
      });
      alert("Post actualizado en Firestore ✅");
    } catch (error) {
      console.error("Error al guardar post en Firestore:", error);
      alert("Error al guardar post ❌");
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
      const storageRef = ref(storage, `logosPost/${fileName}`);

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
        const logosRef = ref(storage, "logosPost");
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
      const logoRef = ref(storage, `logosPost/${logoName}`);
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
            Subir Logo para Post
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sube una imagen y obtén la URL para usarla en los post.
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
              label="Id"
              value={nuevo.inputId}
              onChange={(e) => setNuevo({ ...nuevo, inputId: e.target.value })}
              fullWidth
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
              disabled={!nuevo.text || !nuevo.inputId}
            >
              Agregar Post
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Sección para listar post */}
      <Typography variant="h6" gutterBottom>
        Lista de Post
      </Typography>

      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        // border="2px solid red"
      >
        {/* {post.map((p) => ( */}
        {posts.map((p, index) => (
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
                    // border: "2px solid red",
                  }}
                >
                  <Typography variant="body1" color="primary" gutterBottom>
                    {p.order + 1}
                  </Typography>

                  <Box>
                    <IconButton
                      onClick={() => handleMovePost(index, "up")}
                      disabled={index === 0}
                      color="primary"
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleMovePost(index, "down")}
                      disabled={index === posts.length - 1}
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
                  label="Id"
                  value={p.inputId || ""}
                  onChange={(e) =>
                    handleLocalUpdate(p.id, "inputId", e.target.value)
                  }
                  fullWidth
                  margin="dense"
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
    </Box>
  );
}
