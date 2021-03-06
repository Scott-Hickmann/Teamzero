import DonorForm from '../../client/components/donor/form';
import FormPage from '../../client/components/formPage';
import Layout from '../../client/components/layout';

export default function DonorDonatePage() {
  return (
    <Layout>
      <FormPage>
        <DonorForm />
      </FormPage>
    </Layout>
  );
}
