import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.security.Key;
import java.security.KeyStore;
import java.security.cert.Certificate;

/**
 * Places the Apache Geronimo certificate and key stored
 * in a JKS keystore to a PKCS12 key store.
 */
public class PKCS12toBKS {
    public static void main(String[] args) throws Exception {
        if (args.length != 2) {
            System.err.println("Usage:\njava PKCS12toBKS keystore.pkcs12 keystore.bks");
            return;
        }
        final String alias = "geronimo";
        final char[] password = "secret".toCharArray();
        KeyStore pkcs12 = KeyStore.getInstance("PKCS12");
        pkcs12.load(new FileInputStream(args[0]), password);
        Certificate certificate = pkcs12.getCertificate(alias);
        final Key key = pkcs12.getKey(alias, password);
        KeyStore bks = KeyStore.getInstance("BKS");
        bks.load(null, password);
        bks.setKeyEntry(alias, key, password, new Certificate[] { certificate });
        FileOutputStream out = new FileOutputStream(args[1]);
        bks.store(out, password);
        out.close();
    }
}
