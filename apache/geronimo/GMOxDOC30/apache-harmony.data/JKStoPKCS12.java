import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.security.Key;
import java.security.KeyStore;
import java.security.cert.Certificate;

/**
 * Places the Apache Geronimo certificate and key stored
 * in a JKS keystore to a PKCS12 key store.
 */
public class JKStoPKCS12 {
    public static void main(String[] args) throws Exception {
        if (args.length != 2) {
            System.err.println("Usage:\njava JKStoPKCS12 keystore.jks keystore.pkcs12");
            return;
        }
        final String alias = "geronimo";
        final char[] password = "secret".toCharArray();
        KeyStore jks = KeyStore.getInstance("JKS");
        jks.load(new FileInputStream(args[0]), password);
        Certificate certificate = jks.getCertificate(alias);
        final Key key = jks.getKey(alias, password);
        KeyStore pkcs12 = KeyStore.getInstance("PKCS12");
        pkcs12.load(null, password);
        pkcs12.setKeyEntry(alias, key, password, new Certificate[] { certificate });
        FileOutputStream out = new FileOutputStream(args[1]);
        pkcs12.store(out, password);
        out.close();
    }
}
