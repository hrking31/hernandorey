import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ProyectosModal = ({
  open,
  onClose,
  file,
  setFile,
  uploading,
  setUploading,
  downloadURL,
  setDownloadURL,
  logoFile,
  setLogoFile,
  uploadingLogo,
  setUploadingLogo,
  logoURL,
  setLogoURL,
  proyectos,
  setProyectos,
  nuevo,
  setNuevo,
  handleFileChange,
  handleUpload,
  handleLogoFileChange,
  handleUploadLogo,
  handleAdd,
  handleLocalUpdate,
  handleMoveProject,
  handleSaveToFirestore,
  handleDelete,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Administrar Contenido</DialogTitle>
      <DialogContent>
        {/* Sección para subir logos */}
        <Card
          sx={{
            mb: 4,
            width: "100%",
            maxWidth: 800,
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
        <Grid container columnSpacing={2} rowSpacing={2}>
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
      </DialogContent>
    </Dialog>
  );
};

export default ProyectosModal;
