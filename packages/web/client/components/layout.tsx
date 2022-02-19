import Navigation from './navigation';

export type LayoutProps = React.PropsWithChildren<unknown>;

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}
