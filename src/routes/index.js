import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import ContactForm from '../containers/contacts/ContactForm';

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    { path: '/', element: <ContactList /> },
    { path: '/add-contact', element: <ContactForm /> },
    { path: '/edit-contact/:id', element: <ContactForm /> },
  ]);
}

const ContactList = Loadable(
  lazy(() => import('../containers/contacts/ContactList'))
);
