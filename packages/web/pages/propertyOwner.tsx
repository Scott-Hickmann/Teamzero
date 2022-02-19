import FormPage from '../client/components/formPage';
import Layout from '../client/components/layout';
import PropertyOwnerForm from '../client/components/propertyOwner/form';

export default function OwnerPage() {
  return (
    <Layout>
      <FormPage>
        <PropertyOwnerForm />
      </FormPage>
    </Layout>
  );
}
