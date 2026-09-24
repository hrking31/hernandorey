import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { LuLogOut } from "react-icons/lu";
import { auth } from "../../Components/Firebase/Firebase";
import { Page, Section } from "../../Components/Layout/Layout";
import FeedbackProvider from "../../Components/Admin/FeedbackProvider";
import CvUpload from "../../Components/Admin/CvUpload";
import ProjectsAdmin from "../../Components/Admin/ProjectsAdmin";
import { Button } from "../../Components/Admin/ui";

export default function Admin() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <FeedbackProvider>
      <Page>
        <Section className="flex flex-col gap-6 pb-28 lg:pb-16">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-[2rem] leading-tight font-black lg:text-[2.6rem]">
              Administrar mi sitio
            </h1>
            <Button variant="secondary" onClick={handleSignOut}>
              <LuLogOut aria-hidden="true" className="size-4" />
              Cerrar sesión
            </Button>
          </header>

          <CvUpload />
          <ProjectsAdmin />
        </Section>
      </Page>
    </FeedbackProvider>
  );
}
