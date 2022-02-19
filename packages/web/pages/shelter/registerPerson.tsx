import FormPage from '../../client/components/formPage';
import Layout from '../../client/components/layout';
import RegisterShelterPersonForm from '../../client/components/shelter/registerPersonForm';

export default function RegisterShelterPersonPage() {
  return (
    <Layout>
      <FormPage>
        <RegisterShelterPersonForm />
      </FormPage>
    </Layout>
  );
}
