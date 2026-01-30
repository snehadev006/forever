
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/css/styles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-light">{children}</body>
    </html>
  );
}
