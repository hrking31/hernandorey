import Login from "../../Components/Login/Login";
import { Page, Section } from "../../Components/Layout/Layout";

export default function SignIn() {
  return (
    <Page>
      <Section className="pb-28 lg:pb-16">
        <Login />
      </Section>
    </Page>
  );
}
