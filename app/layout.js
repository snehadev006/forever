import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/css/styles.css';
import { GlobalAudioProvider } from "./components/GlobalAudio";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-light">
        <GlobalAudioProvider>
          {children}
        </GlobalAudioProvider>
      </body>
    </html>
  );
}
